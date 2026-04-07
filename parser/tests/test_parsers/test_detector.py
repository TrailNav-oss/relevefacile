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
