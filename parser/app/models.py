from pydantic import BaseModel


class Transaction(BaseModel):
    date: str  # ISO 8601 (YYYY-MM-DD)
    value_date: str | None = None
    label: str
    amount: float  # Negative = debit, positive = credit
    balance: float | None = None
    category: str | None = None  # "debit" or "credit"


class AccountInfo(BaseModel):
    holder: str | None = None
    number: str | None = None


class Period(BaseModel):
    start: str  # ISO 8601
    end: str


class DetectResult(BaseModel):
    bank_slug: str
    bank_name: str
    confidence: float


class ParseResult(BaseModel):
    bank_slug: str
    bank_name: str
    confidence: float
    account: AccountInfo | None = None
    period: Period | None = None
    transactions: list[Transaction]
    page_count: int
    transaction_count: int
