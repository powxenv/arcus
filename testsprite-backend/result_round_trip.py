# Backend integration test: the real result pipeline, end to end.
# Exercises the REST API (src/routes/api/results/*) added to enable external
# integration testing — same real logic as the in-app server functions (real D1,
# real NVIDIA/Gemma analysis), over plain JSON.
#
# Runs in the TestSprite backend sandbox (stdlib + requests). TARGET_URL is
# injected; we fall back to the workers.dev origin.

import os
import time
import requests
from requests.exceptions import RequestException

BASE = os.environ.get("TARGET_URL", "https://arcus.pows.workers.dev").rstrip("/")


def request_with_retry(method, url, *, tries=3, backoff=5, timeout=120, **kwargs):
    """HTTP request with retry on network errors and 5xx.

    The analysis step proxies NVIDIA/Gemma, which intermittently times out or
    returns a transient upstream error. A few retries absorb that so the test
    only goes red when the failure is persistent, not on a one-off slow call.
    """
    last_resp = None
    for attempt in range(1, tries + 1):
        try:
            resp = requests.request(method, url, timeout=timeout, **kwargs)
            if resp.status_code >= 500 and attempt < tries:
                last_resp = resp
                time.sleep(backoff * attempt)
                continue
            return resp
        except RequestException:
            if attempt < tries:
                time.sleep(backoff * attempt)
                continue
            raise
    return last_resp


def test_result_pipeline_round_trip():
    # 1. Create a real Solstice result (answers keyed by real question IDs so
    #    the AI step receives actual responses).
    payload = {
        "assessmentKey": "solstice",
        "resultType": "Summer",
        "answers": {"A1.1": 6, "A1.2": 5, "A2.1": 7, "A2.2": 6, "A1.8": 5},
        "result": {
            "assessmentKey": "solstice",
            "type": "Summer",
            "emoji": "sun",
            "summary": "Energy runs bright and reaches outward.",
            "scores": [
                {"key": "solar_height", "label": "Solar Height", "value": 78, "role": "axis"},
                {"key": "tidal_direction", "label": "Tidal Direction", "value": 65, "role": "axis"},
            ],
            "modifier": {"label": "Trajectory", "value": "waxing"},
        },
    }
    r = requests.post(f"{BASE}/api/results", json=payload, timeout=30)
    assert r.status_code == 201, f"create failed: {r.status_code} {r.text}"
    token = r.json().get("shareToken")
    assert isinstance(token, str) and len(token) >= 16, f"bad token: {token}"

    # 2. Read the public snapshot back.
    g = requests.get(f"{BASE}/api/results/{token}", timeout=30)
    assert g.status_code == 200, f"read failed: {g.status_code}"
    data = g.json()
    assert data["shareToken"] == token
    assert data["assessmentKey"] == "solstice"
    assert data["resultType"] == "Summer"
    assert data["result"]["type"] == "Summer"
    assert data["result"]["summary"].startswith("Energy runs bright")
    # Raw answers must NOT be exposed on the public read path (privacy).
    assert "answers" not in data, "public read leaked raw answers"
    assert data.get("aiAnalysis") is None, "aiAnalysis should be null before generation"

    # 3. Generate the real AI analysis (NVIDIA/Gemma) and verify it persists.
    #    Retried: NVIDIA intermittently times out.
    a = request_with_retry("POST", f"{BASE}/api/results/{token}/analysis", timeout=120)
    assert a.status_code == 200, f"analysis failed: {a.status_code} {a.text[:200]}"
    ai = a.json().get("aiAnalysis")
    assert isinstance(ai, str) and len(ai) > 0, "empty analysis"

    g2 = requests.get(f"{BASE}/api/results/{token}", timeout=30)
    assert g2.status_code == 200
    assert g2.json().get("aiAnalysis") == ai, "analysis was not persisted"

    # 4. Not-found semantics for an unknown token.
    nf = requests.get(f"{BASE}/api/results/zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz", timeout=30)
    assert nf.status_code == 404, f"expected 404, got {nf.status_code}"

    print(f"OK round-trip token={token} ai_len={len(ai)}")


# Required: invoke so assertions actually run (sandbox has no pytest auto-collection).
test_result_pipeline_round_trip()
