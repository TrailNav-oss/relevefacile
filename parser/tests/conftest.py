import os
import sys

import pytest
from fastapi.testclient import TestClient

# Add parser root to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from app.main import app  # noqa: E402


@pytest.fixture
def client():
    return TestClient(app)


@pytest.fixture
def api_headers():
    return {"X-Api-Key": "dev-secret-key"}
