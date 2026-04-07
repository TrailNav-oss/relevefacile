from app.parsers.base import BankParser
from app.parsers.bnp_paribas import BNPParibasParser
from app.parsers.generic import GenericParser

# Register all parsers here as they are implemented
_PARSERS: dict[str, type[BankParser]] = {
    "bnp-paribas": BNPParibasParser,
    "generic": GenericParser,
}


def get_parser(bank_slug: str) -> BankParser:
    """Get a parser instance for the given bank slug."""
    parser_cls = _PARSERS.get(bank_slug, GenericParser)
    return parser_cls()


def get_all_parsers() -> list[type[BankParser]]:
    """Return all registered parser classes (excluding generic)."""
    return [cls for slug, cls in _PARSERS.items() if slug != "generic"]
