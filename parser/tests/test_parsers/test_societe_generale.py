import os

import pdfplumber
import pytest

from app.parsers.societe_generale import SocieteGeneraleParser

FIXTURE = os.path.join(os.path.dirname(__file__), "..", "fixtures", "societe_generale.pdf")


class TestSocieteGeneraleParser:
    def setup_method(self):
        self.parser = SocieteGeneraleParser()

    def test_detection(self):
        with pdfplumber.open(FIXTURE) as pdf:
            text = pdf.pages[0].extract_text()
        assert SocieteGeneraleParser.can_detect(text) >= 0.5

    def test_parse_transaction_count(self):
        with pdfplumber.open(FIXTURE) as pdf:
            result = self.parser.parse(pdf.pages)
        assert result.bank_slug == "societe-generale"
        assert result.transaction_count == 5

    def test_parse_debits(self):
        with pdfplumber.open(FIXTURE) as pdf:
            result = self.parser.parse(pdf.pages)
        debits = [t for t in result.transactions if t.amount < 0]
        assert len(debits) == 4
        amounts = sorted(t.amount for t in debits)
        assert amounts[0] == pytest.approx(-200.00)
        assert amounts[3] == pytest.approx(-34.20)

    def test_parse_credits(self):
        with pdfplumber.open(FIXTURE) as pdf:
            result = self.parser.parse(pdf.pages)
        credits = [t for t in result.transactions if t.amount > 0]
        assert len(credits) == 1
        assert credits[0].amount == pytest.approx(1890.00)

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
