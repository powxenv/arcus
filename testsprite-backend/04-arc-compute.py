import os
BASE = os.environ.get("TARGET_URL", "https://arcus.pows.workers.dev").rstrip("/")
# POST /api/arc/compute — Full Arc composite + profile + connections.
import requests

def test_arc_compute():
    r = requests.post(
        f"{BASE}/api/arc/compute",
        json={"solstice": {}, "turing": {}, "pride": {}, "passage": {}},
        timeout=30,
    )
    assert r.status_code == 200, f"arc compute failed: {r.status_code} {r.text[:200]}"
    body = r.json()
    # four individual components
    comps = body["components"]
    assert len(comps) == 4, f"expected 4 components, got {len(comps)}"
    keys = {c["assessmentKey"] for c in comps}
    assert keys == {"solstice", "turing", "pride", "passage"}, keys
    # composite full-arc result
    fa = body["fullArc"]
    assert fa["assessmentKey"] == "full-arc"
    assert isinstance(fa["type"], str) and fa["type"], "no full-arc type"
    assert isinstance(fa.get("components"), list) and len(fa["components"]) == 4
    # profile + connections are computed
    assert "profile" in body, "no profile"
    assert "connections" in body, "no connections"
    assert "congruence" in body["connections"], "no congruence"

def test_arc_compute_rejects_missing():
    r = requests.post(
        f"{BASE}/api/arc/compute",
        json={"solstice": {}, "turing": {}},
        timeout=30,
    )
    assert r.status_code == 400, f"expected 400, got {r.status_code}"

test_arc_compute()
test_arc_compute_rejects_missing()
