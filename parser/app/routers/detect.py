import io

import pdfplumber
from fastapi import APIRouter, Depends, File, UploadFile

from app.dependencies import verify_api_key
from app.models import DetectResult
from app.parsers.detector import detect_bank

router = APIRouter()


@router.post("/detect", response_model=DetectResult)
async def detect_bank_endpoint(
    file: UploadFile = File(...),
    _api_key: str = Depends(verify_api_key),
):
    content = await file.read()

    with pdfplumber.open(io.BytesIO(content)) as pdf:
        first_page_text = pdf.pages[0].extract_text() or "" if pdf.pages else ""

    result = detect_bank(first_page_text)
    return result
