import os
BASE = os.environ.get("TARGET_URL", "https://arcus.pows.workers.dev").rstrip("/")
# GET /api/health — DB connectivity, AI config, token sample, assessment catalog.
import requests

def test_health_reports_ok():
    r = requests.get(f"{BASE}/api/health", timeout=30)
    assert r.status_code == 200, f"expected 200, got {r.status_code}: {r.text[:200]}"
    body = r.json()
    assert body["status"] == "ok", f"status not ok: {body.get('status')}"
    assert body["db"]["ok"] is True, "db not ok"
    assert body["ai"]["configured"] is True, "NVIDIA key not configured"
    # token sample proves Web-Crypto entropy path
    t = body["token"]
    assert t["length"] == 32 and t["charsetOk"] is True, f"bad token sample: {t}"
    # all four assessments loaded
    keys = {a["key"] for a in body["assessments"]}
    assert keys == {"solstice", "turing", "pride", "passage"}, f"missing assessments: {keys}"
    for a in body["assessments"]:
        assert a["questions"] > 0, f"{a['key']} has no questions"

test_health_reports_ok()
