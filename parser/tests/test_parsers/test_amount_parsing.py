import pytest

from app.parsers.base import parse_french_amount


class TestParseFrenchAmount:
    def test_simple_amount(self):
        assert parse_french_amount("45,67") == pytest.approx(45.67)

    def test_negative_leading(self):
        assert parse_french_amount("-45,67") == pytest.approx(-45.67)

    def test_negative_trailing(self):
        assert parse_french_amount("45,67-") == pytest.approx(-45.67)

    def test_thousands_space(self):
        assert parse_french_amount("1 234,56") == pytest.approx(1234.56)

    def test_thousands_nbsp(self):
        assert parse_french_amount("1\u00a0234,56") == pytest.approx(1234.56)

    def test_thousands_narrow_nbsp(self):
        assert parse_french_amount("1\u202f234,56") == pytest.approx(1234.56)

    def test_thousands_period(self):
        assert parse_french_amount("1.234,56") == pytest.approx(1234.56)

    def test_large_amount(self):
        assert parse_french_amount("12 345 678,90") == pytest.approx(12345678.90)

    def test_zero(self):
        assert parse_french_amount("0,00") == pytest.approx(0.0)

    def test_empty_string(self):
        assert parse_french_amount("") == pytest.approx(0.0)

    def test_whitespace(self):
        assert parse_french_amount("  ") == pytest.approx(0.0)

    def test_integer(self):
        assert parse_french_amount("100") == pytest.approx(100.0)
