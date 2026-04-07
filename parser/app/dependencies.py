from fastapi import Header, HTTPException

from app.config import PARSER_API_KEY


async def verify_api_key(x_api_key: str = Header(...)) -> str:
    if x_api_key != PARSER_API_KEY:
        raise HTTPException(status_code=401, detail="Invalid API key")
    return x_api_key
