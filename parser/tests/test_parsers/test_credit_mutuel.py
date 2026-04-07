import os

import pdfplumber
import pytest

from app.parsers.credit_mutuel import CICParser, CreditMutuelParser

CM_FIXTURE = os.path.join(os.path.dirname(__file__), "..", "fixtures", "credit_mutuel.pdf")
CIC_FIXTURE = os.path.join(os.path.dirname(__file__), "..", "fixtures", "cic.pdf")


class TestCreditMutuelParser:
    def setup_method(self):
        self.parser = CreditMutuelParser()

    def test_detection(self):
        with pdfplumber.open(CM_FIXTURE) as pdf:
            text = pdf.pages[0].extract_text()
        assert CreditMutuelParser.can_detect(text) >= 0.5

    def test_parse_transaction_count(self):
        with pdfplumber.open(CM_FIXTURE) as pdf:
            result = self.parser.parse(pdf.pages)
        assert result.bank_slug == "credit-mutuel"
        assert result.transaction_count == 5

    def test_parse_debits(self):
        with pdfplumber.open(CM_FIXTURE) as pdf:
            result = self.parser.parse(pdf.pages)
        debits = [t for t in result.transactions if t.amount < 0]
        assert len(debits) == 4
        amounts = sorted(t.amount for t in debits)
        assert amounts[0] == pytest.approx(-149.90)
        assert amounts[3] == pytest.approx(-39.99)

    def test_parse_credits(self):
        with pdfplumber.open(CM_FIXTURE) as pdf:
            result = self.parser.parse(pdf.pages)
        credits = [t for t in result.transactions if t.amount > 0]
        assert len(credits) == 1
        assert credits[0].amount == pytest.approx(850.00)

    def test_summary_lines_excluded(self):
        with pdfplumber.open(CM_FIXTURE) as pdf:
            result = self.parser.parse(pdf.pages)
        labels = [t.label for t in result.transactions]
        assert not any("SOLDE" in l for l in labels)


class TestCICParser:
    def setup_method(self):
        self.parser = CICParser()

    def test_detection(self):
        with pdfplumber.open(CIC_FIXTURE) as pdf:
            text = pdf.pages[0].extract_text()
        assert CICParser.can_detect(text) >= 0.5

    def test_parse_transaction_count(self):
        with pdfplumber.open(CIC_FIXTURE) as pdf:
            result = self.parser.parse(pdf.pages)
        assert result.bank_slug == "cic"
        assert result.transaction_count == 5

    def test_parse_amounts(self):
        with pdfplumber.open(CIC_FIXTURE) as pdf:
            result = self.parser.parse(pdf.pages)
        debits = [t for t in result.transactions if t.amount < 0]
        credits = [t for t in result.transactions if t.amount > 0]
        assert len(debits) == 3
        assert len(credits) == 2
        assert any(t.amount == pytest.approx(3200.00) for t in credits)
        assert any(t.amount == pytest.approx(-456.00) for t in debits)
