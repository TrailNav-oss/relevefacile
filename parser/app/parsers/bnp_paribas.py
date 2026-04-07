import re

from app.models import AccountInfo, ParseResult, Period, Transaction
from app.parsers.base import BankParser, parse_french_amount


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
            lines = text.split("\n")

            for line in lines:
                # Try to extract account holder from header
                if not account_info.holder:
                    holder_match = re.search(r"(?:Titulaire|Client)\s*:\s*(.+)", line, re.IGNORECASE)
                    if holder_match:
                        account_info.holder = holder_match.group(1).strip()

                # Try to extract account number
                if not account_info.number:
                    num_match = re.search(r"(?:Compte|N°)\s*[:\s]*(\d[\d\s]{5,})", line)
                    if num_match:
                        account_info.number = num_match.group(1).strip()[-4:]  # Keep only last 4 digits

                # Try to extract period
                period_match = re.search(
                    r"(?:du|periode)\s+(\d{2}[./]\d{2}[./]\d{4})\s+(?:au|à)\s+(\d{2}[./]\d{2}[./]\d{4})",
                    line,
                    re.IGNORECASE,
                )
                if period_match:
                    period_start = self._parse_date(period_match.group(1))
                    period_end = self._parse_date(period_match.group(2))
                    if period_end:
                        current_year = period_end[:4]

                # Extract year from date headers
                year_match = re.search(r"(\d{4})", line)
                if year_match and not current_year:
                    candidate = year_match.group(1)
                    if 2000 <= int(candidate) <= 2099:
                        current_year = candidate

                # Try to parse transaction lines
                # Common BNP format: DD/MM  LABEL  AMOUNT
                tx_match = re.match(
                    r"\s*(\d{2}[./]\d{2})\s+(.+?)\s+([\d\s,.+-]+)\s*$",
                    line,
                )
                if tx_match:
                    date_str = tx_match.group(1)
                    label = tx_match.group(2).strip()
                    amount_str = tx_match.group(3).strip()

                    # Skip summary/total lines
                    if self._is_summary_line(label):
                        continue

                    amount = parse_french_amount(amount_str)
                    if amount == 0.0:
                        continue

                    iso_date = self._parse_short_date(date_str, current_year)

                    transactions.append(
                        Transaction(
                            date=iso_date,
                            label=label,
                            amount=amount,
                            category="credit" if amount > 0 else "debit",
                        )
                    )

        period = None
        if period_start and period_end:
            period = Period(start=period_start, end=period_end)

        return ParseResult(
            bank_slug=self.slug,
            bank_name=self.name,
            confidence=0.0,
            account=account_info if account_info.holder or account_info.number else None,
            period=period,
            transactions=transactions,
            page_count=0,
            transaction_count=0,
        )

    def _parse_date(self, date_str: str) -> str:
        """Convert DD/MM/YYYY or DD.MM.YYYY to ISO 8601."""
        parts = re.split(r"[./]", date_str)
        if len(parts) == 3:
            return f"{parts[2]}-{parts[1]}-{parts[0]}"
        return date_str

    def _parse_short_date(self, date_str: str, year: str) -> str:
        """Convert DD/MM to ISO 8601 using the given year."""
        parts = re.split(r"[./]", date_str)
        if len(parts) == 2 and year:
            return f"{year}-{parts[1]}-{parts[0]}"
        return date_str

    def _is_summary_line(self, label: str) -> bool:
        """Check if a line is a summary/total that should not be parsed as a transaction."""
        summary_patterns = [
            r"SOLDE\s+(CREDITEUR|DEBITEUR)",
            r"TOTAL\s+DES",
            r"NOUVEAU\s+SOLDE",
            r"ANCIEN\s+SOLDE",
            r"SOLDE\s+AU",
            r"CUMUL",
        ]
        for pattern in summary_patterns:
            if re.search(pattern, label, re.IGNORECASE):
                return True
        return False
