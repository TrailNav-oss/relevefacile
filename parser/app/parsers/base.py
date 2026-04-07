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
