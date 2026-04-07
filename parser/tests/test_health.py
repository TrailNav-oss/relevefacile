def test_health(client):
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"


def test_detect_requires_api_key(client):
    response = client.post("/detect")
    assert response.status_code == 422 or response.status_code == 401


def test_parse_requires_api_key(client):
    response = client.post("/parse")
    assert response.status_code == 422 or response.status_code == 401
