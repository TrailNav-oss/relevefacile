import re
from abc import ABC, abstractmethod

from app.models import ParseResult


class BankParser(ABC):
    """Abstract base class for bank-specific PDF parsers."""

    slug: str = ""
    name: str = ""
    detection_patterns: list[str] = []

    @abstractmethod
    def parse(self, pages: list) -> ParseResult:
        """Extract transactions from pdfplumber pages."""
        ...

    @classmethod
    def can_detect(cls, text: str) -> float:
        """Return confidence score 0-1 that this PDF belongs to this bank.

        Any single match gives 0.5 confidence. Each additional match adds
        proportionally up to 1.0. This ensures one strong keyword is enough.
        """
        if not cls.detection_patterns:
            return 0.0

        matches = 0
        for pattern in cls.detection_patterns:
            if re.search(pattern, text, re.IGNORECASE):
                matches += 1

        if matches == 0:
            return 0.0

        # First match = 0.5, each additional adds up to 1.0
        return min(0.5 + (matches - 1) * 0.5 / max(len(cls.detection_patterns) - 1, 1), 1.0)


def parse_french_amount(text: str) -> float:
    """Parse a French-formatted amount string to float.

    Handles:
    - "1 234,56" -> 1234.56
    - "-45,67" -> -45.67
    - "45,67-" -> -45.67  (trailing minus)
    - "1.234,56" -> 1234.56  (period as thousands separator)
    """
    if not text or not text.strip():
        return 0.0

    cleaned = text.strip()

    # Check for trailing minus sign
    trailing_negative = cleaned.endswith("-")
    if trailing_negative:
        cleaned = cleaned[:-1].strip()

    # Check for leading minus sign
    leading_negative = cleaned.startswith("-")
    if leading_negative:
        cleaned = cleaned[1:].strip()

    # Remove spaces (thousands separator in French)
    cleaned = cleaned.replace("\u00a0", "").replace("\u202f", "").replace(" ", "")

    # Remove period thousands separator (1.234,56 -> 1234,56)
    # Only if comma is present as decimal separator
    if "," in cleaned and "." in cleaned:
        cleaned = cleaned.replace(".", "")

    # Replace comma with period for decimal
    cleaned = cleaned.replace(",", ".")

    try:
        value = float(cleaned)
    except ValueError:
        return 0.0

    if leading_negative or trailing_negative:
        value = -abs(value)

    return value


def identify_table_columns(header_row: list[str | None]) -> dict[str, int]:
    """Identify column roles from a French bank statement table header.

    Returns a dict mapping role names to column indices.
    Possible roles: 'date', 'date_valeur', 'label', 'debit', 'credit', 'amount'.
    """
    cols: dict[str, int] = {}
    for i, cell in enumerate(header_row or []):
        if not cell:
            continue
        c = cell.strip().lower()
        if re.search(r"date\s*(val|valeur)", c):
            cols["date_valeur"] = i
        elif "date" in c:
            cols["date"] = i
        elif any(k in c for k in ["libellé", "libelle", "opération", "operation", "nature", "désignation", "designation"]):
            cols["label"] = i
        elif any(k in c for k in ["débit", "debit"]):
            cols["debit"] = i
        elif any(k in c for k in ["crédit", "credit"]):
            cols["credit"] = i
        elif "montant" in c:
            cols["amount"] = i
    return cols


def format_date(date_str: str, year: str) -> str:
    """Convert DD/MM or DD/MM/YYYY to ISO 8601."""
    parts = re.split(r"[./]", date_str)
    if len(parts) == 3:
        y = parts[2]
        if len(y) == 2:
            y = f"20{y}"
        return f"{y}-{parts[1]}-{parts[0]}"
    elif len(parts) == 2 and year:
        return f"{year}-{parts[1]}-{parts[0]}"
    return date_str


def is_summary_line(label: str) -> bool:
    """Check if a label is a summary/total line that should be skipped."""
    patterns = [
        r"SOLDE\s+(CREDITEUR|DEBITEUR|PRECEDENT|ANTERIEUR)",
        r"TOTAL\s+DES",
        r"NOUVEAU\s+SOLDE",
        r"ANCIEN\s+SOLDE",
        r"SOLDE\s+AU",
        r"SOLDE\s+EN\s+EUROS",
        r"CUMUL",
        r"TOTAUX",
    ]
    for pattern in patterns:
        if re.search(pattern, label, re.IGNORECASE):
            return True
    return False


def parse_table_row(
    row: list[str | None],
    cols: dict[str, int],
    current_year: str,
) -> "Transaction | None":
    """Parse a table row into a Transaction using column mapping.

    Works for both two-column (debit/credit) and single-column (amount) formats.
    """
    from app.models import Transaction

    if not row:
        return None

    max_idx = max(cols.values(), default=0)
    if len(row) <= max_idx:
        return None

    # Get date
    date_idx = cols.get("date")
    if date_idx is None:
        return None
    date_str = (row[date_idx] or "").strip()
    if not re.match(r"\d{2}[./]\d{2}", date_str):
        return None

    # Get label
    label_idx = cols.get("label")
    label = (row[label_idx] or "").strip() if label_idx is not None else ""
    if not label or len(label) < 2:
        return None

    # Skip summary lines
    if is_summary_line(label):
        return None

    # Get amount
    amount = 0.0
    if "amount" in cols:
        amount_str = (row[cols["amount"]] or "").strip()
        amount = parse_french_amount(amount_str)
    else:
        debit_str = (row[cols["debit"]] or "").strip() if cols.get("debit") is not None else ""
        credit_str = (row[cols["credit"]] or "").strip() if cols.get("credit") is not None else ""
        if debit_str:
            amount = -abs(parse_french_amount(debit_str))
        elif credit_str:
            amount = abs(parse_french_amount(credit_str))

    if amount == 0.0:
        return None

    iso_date = format_date(date_str, current_year)

    value_date = None
    if "date_valeur" in cols:
        vd_str = (row[cols["date_valeur"]] or "").strip()
        if re.match(r"\d{2}[./]\d{2}", vd_str):
            value_date = format_date(vd_str, current_year)

    return Transaction(
        date=iso_date,
        value_date=value_date,
        label=label,
        amount=amount,
        category="credit" if amount > 0 else "debit",
    )
