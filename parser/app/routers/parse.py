import io

import pdfplumber
from fastapi import APIRouter, Depends, File, Form, UploadFile

from app.dependencies import verify_api_key
from app.models import ParseResult
from app.parsers.detector import detect_bank
from app.parsers.registry import get_parser

router = APIRouter()


@router.post("/parse", response_model=ParseResult)
async def parse_pdf_endpoint(
    file: UploadFile = File(...),
    bank_slug: str | None = Form(None),
    _api_key: str = Depends(verify_api_key),
):
    content = await file.read()

    with pdfplumber.open(io.BytesIO(content)) as pdf:
        pages = pdf.pages
        first_page_text = pages[0].extract_text() or "" if pages else ""

        # Detect bank if not provided
        if bank_slug:
            detection = detect_bank(first_page_text)
            if detection.bank_slug != bank_slug:
                detection = detect_bank(first_page_text)
        else:
            detection = detect_bank(first_page_text)

        # Get the appropriate parser
        parser = get_parser(detection.bank_slug)

        # Parse all pages
        result = parser.parse(pages)
        result.bank_slug = detection.bank_slug
        result.bank_name = detection.bank_name
        result.confidence = detection.confidence
        result.page_count = len(pages)
        result.transaction_count = len(result.transactions)

    return result
