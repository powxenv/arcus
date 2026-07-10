# POST /api/results/compute — dry-run scoring for every assessment (no DB write).
import requests

def rand_answers(set_payload):
    a = {}
    for q in set_payload["questions"]:
        t = q["type"]
        if t in ("bipolar", "unipolar"):
            a[q["id"]] = 1 if t == "bipolar" else 3
        elif t == "crt":
            a[q["id"]] = "correct"
        elif t == "heuristic":
            a[q["id"]] = "A"
        elif t == "stance":
            a[q["id"]] = "gift"
    return a

# The compute endpoint needs raw answers; build them from the public question
# shape via a health-adjacent read is not available, so use known-good answers
# keyed by stable question ids returned by the take page. Instead, exercise the
# endpoint with empty answers — computeResult must still return a well-formed
# result (it defaults unanswered items gracefully).
def test_compute_each_assessment():
    for key in ("solstice", "turing", "pride", "passage"):
        r = requests.post(
            f"{TARGET_URL}/api/results/compute",
            json={"assessmentKey": key, "answers": {}},
            timeout=30,
        )
        assert r.status_code == 200, f"{key}: {r.status_code} {r.text[:200]}"
        res = r.json()["result"]
        assert res["assessmentKey"] == key
        assert isinstance(res["type"], str) and res["type"], f"{key}: bad type"
        assert isinstance(res["scores"], list), f"{key}: no scores"
        for s in res["scores"]:
            assert 0 <= s["value"] <= 100, f"{key} score out of range: {s}"

def test_compute_rejects_unknown_key():
    r = requests.post(
        f"{TARGET_URL}/api/results/compute",
        json={"assessmentKey": "bogus", "answers": {}},
        timeout=30,
    )
    assert r.status_code == 404, f"expected 404, got {r.status_code}"

def test_compute_rejects_missing_fields():
    r = requests.post(f"{TARGET_URL}/api/results/compute", json={}, timeout=30)
    assert r.status_code == 400, f"expected 400, got {r.status_code}"

test_compute_each_assessment()
test_compute_rejects_unknown_key()
test_compute_rejects_missing_fields()
