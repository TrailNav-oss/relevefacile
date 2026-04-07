import os

import pdfplumber
import pytest

from app.parsers.la_banque_postale import LaBanquePostaleParser

FIXTURE = os.path.join(os.path.dirname(__file__), "..", "fixtures", "la_banque_postale.pdf")


class TestLaBanquePostaleParser:
    def setup_method(self):
        self.parser = LaBanquePostaleParser()

    def test_detection(self):
        with pdfplumber.open(FIXTURE) as pdf:
            text = pdf.pages[0].extract_text()
        assert LaBanquePostaleParser.can_detect(text) >= 0.5

    def test_parse_transaction_count(self):
        with pdfplumber.open(FIXTURE) as pdf:
            result = self.parser.parse(pdf.pages)
        assert result.bank_slug == "la-banque-postale"
        assert result.transaction_count == 5

    def test_parse_debits(self):
        with pdfplumber.open(FIXTURE) as pdf:
            result = self.parser.parse(pdf.pages)
        debits = [t for t in result.transactions if t.amount < 0]
        assert len(debits) == 4
        amounts = sorted(t.amount for t in debits)
        assert amounts[0] == pytest.approx(-150.00)
        assert amounts[3] == pytest.approx(-12.45)

    def test_parse_credits(self):
        with pdfplumber.open(FIXTURE) as pdf:
            result = self.parser.parse(pdf.pages)
        credits = [t for t in result.transactions if t.amount > 0]
        assert len(credits) == 1
        assert credits[0].amount == pytest.approx(24.50)

    def test_summary_lines_excluded(self):
        with pdfplumber.open(FIXTURE) as pdf:
            result = self.parser.parse(pdf.pages)
        labels = [t.label for t in result.transactions]
        assert not any("SOLDE" in l for l in labels)

    def test_period_extracted(self):
        with pdfplumber.open(FIXTURE) as pdf:
            result = self.parser.parse(pdf.pages)
        assert result.period is not None
        assert result.period.start == "2025-03-01"
        assert result.period.end == "2025-03-31"
