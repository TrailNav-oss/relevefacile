import re

from app.models import AccountInfo, ParseResult, Period, Transaction
from app.parsers.base import (
    BankParser,
    format_date,
    identify_table_columns,
    parse_table_row,
)


class SocieteGeneraleParser(BankParser):
    """Parser for Société Générale bank statements."""

    slug = "societe-generale"
    name = "Société Générale"
    detection_patterns = [
        r"SOCIETE\s*GENERALE",
        r"www\.societegenerale",
        r"SOGEFRPP",
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
            m = re.search(r"Titulaire\s*:\s*(.+)", text, re.IGNORECASE)
            if m:
                account.holder = m.group(1).strip()
        if not account.number:
            m = re.search(r"Compte\s*:\s*([\d\s]{10,})", text, re.IGNORECASE)
            if m:
                account.number = m.group(1).strip()[-4:]

    def _extract_period(self, text: str) -> tuple[str | None, str | None, str]:
        m = re.search(
            r"du\s+(\d{2}[./]\d{2}[./]\d{4})\s+au\s+(\d{2}[./]\d{2}[./]\d{4})",
            text, re.IGNORECASE,
        )
        if m:
            ps = format_date(m.group(1), "")
            pe = format_date(m.group(2), "")
            return ps, pe, pe[:4]
        return None, None, ""
