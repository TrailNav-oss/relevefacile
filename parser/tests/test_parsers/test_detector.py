import pytest

from app.parsers.detector import detect_bank


class TestDetectBank:
    def test_detect_bnp(self):
        text = "BNP PARIBAS\nRelevé de compte\nPériode du 01/01/2024 au 31/01/2024"
        result = detect_bank(text)
        assert result.bank_slug == "bnp-paribas"
        assert result.confidence > 0.4

    def test_detect_unknown(self):
        text = "Some random text that doesn't match any bank"
        result = detect_bank(text)
        assert result.bank_slug == "generic"

    def test_detect_bnp_website(self):
        text = "Consultez vos comptes sur www.bnpparibas.net"
        result = detect_bank(text)
        assert result.bank_slug == "bnp-paribas"

    @pytest.mark.parametrize("text,expected_slug", [
        ("CREDIT AGRICOLE\nCAISSE REGIONALE", "credit-agricole"),
        ("SOCIETE GENERALE\nReleve de compte", "societe-generale"),
        ("CAISSE D'EPARGNE\nILE DE FRANCE", "caisse-epargne"),
        ("CREDIT MUTUEL\nCAISSE DE CREDIT MUTUEL", "credit-mutuel"),
        ("CIC\nBanque CIC\nwww.cic.fr", "cic"),
        ("LA BANQUE POSTALE\nReleve de compte", "la-banque-postale"),
        ("LCL\nLE CREDIT LYONNAIS\nwww.lcl.fr", "lcl"),
        ("BOURSORAMA BANQUE\nwww.boursorama.com", "boursorama"),
        ("BANQUE POPULAIRE\nReleve de compte", "banque-populaire"),
    ])
    def test_detect_all_banks(self, text, expected_slug):
        result = detect_bank(text)
        assert result.bank_slug == expected_slug
        assert result.confidence >= 0.4
