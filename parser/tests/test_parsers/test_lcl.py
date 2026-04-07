import os

import pdfplumber
import pytest

from app.parsers.lcl import LCLParser

FIXTURE = os.path.join(os.path.dirname(__file__), "..", "fixtures", "lcl.pdf")


class TestLCLParser:
    def setup_method(self):
        self.parser = LCLParser()

    def test_detection(self):
        with pdfplumber.open(FIXTURE) as pdf:
            text = pdf.pages[0].extract_text()
        assert LCLParser.can_detect(text) >= 0.5

    def test_parse_transaction_count(self):
        with pdfplumber.open(FIXTURE) as pdf:
            result = self.parser.parse(pdf.pages)
        assert result.bank_slug == "lcl"
        assert result.transaction_count == 5

    def test_parse_debits(self):
        with pdfplumber.open(FIXTURE) as pdf:
            result = self.parser.parse(pdf.pages)
        debits = [t for t in result.transactions if t.amount < 0]
        assert len(debits) == 3
        amounts = sorted(t.amount for t in debits)
        assert amounts[0] == pytest.approx(-65.00)
        assert amounts[1] == pytest.approx(-29.99)
        assert amounts[2] == pytest.approx(-8.40)

    def test_parse_credits(self):
        with pdfplumber.open(FIXTURE) as pdf:
            result = self.parser.parse(pdf.pages)
        credits = [t for t in result.transactions if t.amount > 0]
        assert len(credits) == 2
        amounts = sorted(t.amount for t in credits)
        assert amounts[0] == pytest.approx(45.80)
        assert amounts[1] == pytest.approx(2100.00)

    def test_summary_lines_excluded(self):
        with pdfplumber.open(FIXTURE) as pdf:
            result = self.parser.parse(pdf.pages)
        labels = [t.label for t in result.transactions]
        assert not any("SOLDE" in l for l in labels)
