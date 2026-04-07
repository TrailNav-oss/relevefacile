import re

from app.models import ParseResult, Transaction
from app.parsers.base import BankParser, parse_french_amount


class GenericParser(BankParser):
    """Fallback parser using heuristics for unknown bank formats."""

    slug = "generic"
    name = "Banque inconnue"
    detection_patterns = []

    def parse(self, pages: list) -> ParseResult:
        transactions: list[Transaction] = []

        for page in pages:
            text = page.extract_text() or ""
            lines = text.split("\n")

            for line in lines:
                # Try to match lines that look like transactions
                # Pattern: date (DD/MM or DD/MM/YYYY) ... label ... amount
                tx_match = re.match(
                    r"\s*(\d{2}[./]\d{2}(?:[./]\d{2,4})?)\s+(.+?)\s+([-+]?[\d\s.,]+)\s*$",
                    line,
                )
                if not tx_match:
                    continue

                date_str = tx_match.group(1)
                label = tx_match.group(2).strip()
                amount_str = tx_match.group(3).strip()

                # Skip very short labels (likely noise)
                if len(label) < 3:
                    continue

                amount = parse_french_amount(amount_str)
                if amount == 0.0:
                    continue

                iso_date = self._parse_date(date_str)

                transactions.append(
                    Transaction(
                        date=iso_date,
                        label=label,
                        amount=amount,
                        category="credit" if amount > 0 else "debit",
                    )
                )

        return ParseResult(
            bank_slug=self.slug,
            bank_name=self.name,
            confidence=0.0,
            transactions=transactions,
            page_count=0,
            transaction_count=0,
        )

    def _parse_date(self, date_str: str) -> str:
        """Convert DD/MM/YYYY, DD.MM.YYYY, or DD/MM to ISO 8601."""
        parts = re.split(r"[./]", date_str)
        if len(parts) == 3:
            year = parts[2]
            if len(year) == 2:
                year = f"20{year}"
            return f"{year}-{parts[1]}-{parts[0]}"
        elif len(parts) == 2:
            return f"2024-{parts[1]}-{parts[0]}"
        return date_str
