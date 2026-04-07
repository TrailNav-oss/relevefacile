from app.models import DetectResult
from app.parsers.registry import get_all_parsers


def detect_bank(text: str) -> DetectResult:
    """Detect which bank issued a PDF statement by analyzing the first page text."""
    best_slug = "generic"
    best_name = "Banque inconnue"
    best_confidence = 0.0

    for parser_cls in get_all_parsers():
        confidence = parser_cls.can_detect(text)
        if confidence > best_confidence:
            best_confidence = confidence
            best_slug = parser_cls.slug
            best_name = parser_cls.name

    # Minimum confidence threshold
    if best_confidence < 0.4:
        return DetectResult(bank_slug="generic", bank_name="Banque inconnue", confidence=best_confidence)

    return DetectResult(bank_slug=best_slug, bank_name=best_name, confidence=best_confidence)
