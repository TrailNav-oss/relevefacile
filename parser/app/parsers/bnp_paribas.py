import re

from app.models import AccountInfo, ParseResult, Period, Transaction
from app.parsers.base import (
    BankParser,
    format_date,
    identify_table_columns,
    is_summary_line,
    parse_french_amount,
    parse_table_row,
)


class BNPParibasParser(BankParser):
    """Parser for BNP Paribas bank statements."""

    slug = "bnp-paribas"
    name = "BNP Paribas"
    detection_patterns = [
        r"BNP\s*PARIBAS",
        r"BNPPARIBAS",
        r"www\.bnpparibas",
        r"Banque Nationale de Paris",
    ]

    def parse(self, pages: list) -> ParseResult:
        transactions: list[Transaction] = []
        account_info = AccountInfo()
        period_start: str | None = None
        period_end: str | None = None
        current_year = ""

        for page in pages:
            text = page.extract_text() or ""

            self._extract_header(text, account_info)
            ps, pe, yr = self._extract_period(text)
            if ps:
                period_start, period_end = ps, pe
            if yr:
                current_year = yr

            # Try table-based extraction first (works with generated PDFs)
            for table in page.extract_tables() or []:
                if not table or len(table) < 2:
                    continue
                cols = identify_table_columns(table[0])
                if "date" not in cols:
                    continue
                for row in table[1:]:
                    tx = parse_table_row(row, cols, current_year or "2025")
                    if tx:
                        transactions.append(tx)

            # Fallback: position-based extraction for real BNP PDFs
            if not transactions:
                self._parse_with_positions(page, transactions, current_year)

        period = Period(start=period_start, end=period_end) if period_start and period_end else None

        return ParseResult(
            bank_slug=self.slug,
            bank_name=self.name,
            confidence=0.0,
            account=account_info if account_info.holder or account_info.number else None,
            period=period,
            transactions=transactions,
            page_count=len(pages),
            transaction_count=len(transactions),
        )

    def _extract_header(self, text: str, account: AccountInfo) -> None:
        if not account.holder:
            m = re.search(r"(?:Titulaire|Client)\s*:\s*(.+)", text, re.IGNORECASE)
            if m:
                account.holder = m.group(1).strip()
        if not account.number:
            m = re.search(r"(?:Compte|N[°o])\s*[:\s]*([\d\s]{10,})", text, re.IGNORECASE)
            if m:
                account.number = m.group(1).strip()[-4:]

    def _extract_period(self, text: str) -> tuple[str | None, str | None, str]:
        m = re.search(
            r"(?:du|[Pp].riode)\s+(\d{2}[./]\d{2}[./]\d{4})\s+(?:au|.)\s+(\d{2}[./]\d{2}[./]\d{4})",
            text, re.IGNORECASE,
        )
        if m:
            ps = format_date(m.group(1), "")
            pe = format_date(m.group(2), "")
            return ps, pe, pe[:4]
        return None, None, ""

    def _parse_with_positions(self, page, transactions: list[Transaction], year: str) -> None:
        """Parse using word positions to distinguish debit/credit columns.

        Real BNP PDFs have two amount columns (debit left, credit right).
        We detect the column boundary by finding the x-position midpoint
        between the "Debit" and "Credit" header words.
        """
        words = page.extract_words(keep_blank_chars=True, x_tolerance=3, y_tolerance=3)
        if not words:
            return

        # Find debit/credit column x-positions from header
        debit_x = None
        credit_x = None
        for w in words:
            wt = w["text"].lower().strip()
            if "débit" in wt or "debit" in wt:
                debit_x = float(w["x0"])
            elif "crédit" in wt or "credit" in wt:
                credit_x = float(w["x0"])

        # If we can't find column headers, use page width heuristic
        # BNP typically: debit at ~70% of page, credit at ~85%
        page_width = float(page.width)
        if debit_x is None:
            debit_x = page_width * 0.65
        if credit_x is None:
            credit_x = page_width * 0.80

        # Midpoint between debit and credit columns
        col_boundary = (debit_x + credit_x) / 2

        # Group words by line (same y position within tolerance)
        lines: dict[float, list[dict]] = {}
        for w in words:
            y_key = round(float(w["top"]) / 4) * 4  # 4pt tolerance
            lines.setdefault(y_key, []).append(w)

        for y_key in sorted(lines.keys()):
            line_words = sorted(lines[y_key], key=lambda w: float(w["x0"]))
            line_text = " ".join(w["text"] for w in line_words)

            # Must start with a date DD/MM
            date_match = re.match(r"(\d{2}[./]\d{2})\s+(.+)", line_text)
            if not date_match:
                continue

            date_str = date_match.group(1)
            rest = date_match.group(2).strip()

            # Extract amounts: find number-like words on the right side
            amounts_in_line: list[tuple[float, float]] = []  # (x_position, value)
            label_parts: list[str] = []

            for w in line_words:
                wt = w["text"].strip()
                x = float(w["x0"])

                # Skip the date itself
                if re.match(r"\d{2}[./]\d{2}$", wt):
                    continue

                # Is this a French amount? (digits with comma/space)
                if x > debit_x * 0.9 and re.match(r"^[\d\s.,+-]+$", wt) and "," in wt:
                    val = parse_french_amount(wt)
                    if val != 0.0:
                        amounts_in_line.append((x, val))
                        continue

                label_parts.append(wt)

            label = " ".join(label_parts).strip()

            # Skip if no label or summary line
            if not label or len(label) < 3:
                continue
            if is_summary_line(label):
                continue
            # Skip cheque number lines without amount
            if re.search(r"CHEQUE\s+N", label, re.IGNORECASE) and not amounts_in_line:
                continue

            if not amounts_in_line:
                continue

            # Determine debit vs credit by x position
            # Take the rightmost amount (most likely to be the actual amount)
            best_x, best_amount = max(amounts_in_line, key=lambda a: a[0])

            if best_x < col_boundary:
                # Debit column
                amount = -abs(best_amount)
            else:
                # Credit column
                amount = abs(best_amount)

            iso_date = format_date(date_str, year or "2025")

            transactions.append(
                Transaction(
                    date=iso_date,
                    label=label,
                    amount=amount,
                    category="credit" if amount > 0 else "debit",
                )
            )
