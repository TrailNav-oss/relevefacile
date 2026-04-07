from app.parsers.banque_populaire import BanquePopulaireParser
from app.parsers.base import BankParser
from app.parsers.bnp_paribas import BNPParibasParser
from app.parsers.boursorama import BoursoramaParser
from app.parsers.caisse_epargne import CaisseEpargneParser
from app.parsers.credit_agricole import CreditAgricoleParser
from app.parsers.credit_mutuel import CICParser, CreditMutuelParser
from app.parsers.generic import GenericParser
from app.parsers.la_banque_postale import LaBanquePostaleParser
from app.parsers.lcl import LCLParser
from app.parsers.societe_generale import SocieteGeneraleParser

# Register all parsers here as they are implemented
_PARSERS: dict[str, type[BankParser]] = {
    "bnp-paribas": BNPParibasParser,
    "credit-agricole": CreditAgricoleParser,
    "societe-generale": SocieteGeneraleParser,
    "caisse-epargne": CaisseEpargneParser,
    "credit-mutuel": CreditMutuelParser,
    "cic": CICParser,
    "la-banque-postale": LaBanquePostaleParser,
    "lcl": LCLParser,
    "boursorama": BoursoramaParser,
    "banque-populaire": BanquePopulaireParser,
    "generic": GenericParser,
}


def get_parser(bank_slug: str) -> BankParser:
    """Get a parser instance for the given bank slug."""
    parser_cls = _PARSERS.get(bank_slug, GenericParser)
    return parser_cls()


def get_all_parsers() -> list[type[BankParser]]:
    """Return all registered parser classes (excluding generic)."""
    return [cls for slug, cls in _PARSERS.items() if slug != "generic"]
