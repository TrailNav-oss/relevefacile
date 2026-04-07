import os

import pdfplumber
import pytest

from app.parsers.credit_agricole import CreditAgricoleParser

FIXTURE = os.path.join(os.path.dirname(__file__), "..", "fixtures", "credit_agricole.pdf")


class TestCreditAgricoleParser:
    def setup_method(self):
        self.parser = CreditAgricoleParser()

    def test_detection(self):
        with pdfplumber.open(FIXTURE) as pdf:
            text = pdf.pages[0].extract_text()
        assert CreditAgricoleParser.can_detect(text) >= 0.5

    def test_parse_transaction_count(self):
        with pdfplumber.open(FIXTURE) as pdf:
            result = self.parser.parse(pdf.pages)
        assert result.bank_slug == "credit-agricole"
        assert result.transaction_count == 5

    def test_parse_debits(self):
        with pdfplumber.open(FIXTURE) as pdf:
            result = self.parser.parse(pdf.pages)
        debits = [t for t in result.transactions if t.amount < 0]
        assert len(debits) == 3
        amounts = sorted(t.amount for t in debits)
        assert amounts[0] == pytest.approx(-80.00)
        assert amounts[1] == pytest.approx(-67.50)
        assert amounts[2] == pytest.approx(-19.99)

    def test_parse_credits(self):
        with pdfplumber.open(FIXTURE) as pdf:
            result = self.parser.parse(pdf.pages)
        credits = [t for t in result.transactions if t.amount > 0]
        assert len(credits) == 2
        amounts = sorted(t.amount for t in credits)
        assert amounts[0] == pytest.approx(184.50)
        assert amounts[1] == pytest.approx(2450.00)

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

    def test_account_holder(self):
        with pdfplumber.open(FIXTURE) as pdf:
            result = self.parser.parse(pdf.pages)
        assert result.account is not None
        assert "DUPONT" in result.account.holder
