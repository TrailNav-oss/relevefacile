from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import ENVIRONMENT
from app.routers import detect, parse

app = FastAPI(
    title="ReleveFacile Parser",
    version="0.1.0",
    docs_url="/docs" if ENVIRONMENT == "development" else None,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if ENVIRONMENT == "development" else [],
    allow_methods=["POST"],
    allow_headers=["X-Api-Key"],
)

app.include_router(detect.router)
app.include_router(parse.router)


@app.get("/health")
async def health():
    return {"status": "ok", "environment": ENVIRONMENT}
