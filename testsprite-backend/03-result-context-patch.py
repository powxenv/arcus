# Round-trip: create -> read context -> PATCH analysis -> verify persisted.
# Exercises fetchStoredResultRow + buildAnalysisInputForToken (GET /context) and
# validateUpdateAIInput + setAIAnalysis (PATCH /analysis) in isolation.
import requests

def make_result():
    return {
        "assessmentKey": "turing",
        "resultType": "The Logician",
        "answers": {"t1": 5, "t2": "correct", "t3": "A"},
        "result": {
            "assessmentKey": "turing",
            "type": "The Logician",
            "emoji": "🔬",
            "summary": "snapshot",
            "scores": [
                {"key": "need_for_cognition", "label": "Need for Cognition", "value": 72, "role": "scale"},
                {"key": "faith_in_intuition", "label": "Faith in Intuition", "value": 40, "role": "scale"},
                {"key": "override", "label": "Cognitive Override", "value": 60, "role": "scale"},
            ],
            "modifier": {"label": "Observed strategy", "value": "take-the-best"},
        },
    }

def test_context_then_patch():
    # 1. create
    r = requests.post(f"{TARGET_URL}/api/results", json=make_result(), timeout=30)
    assert r.status_code == 201, f"create failed: {r.status_code} {r.text[:200]}"
    token = r.json()["shareToken"]

    # 2. GET context — rebuilds the analysis input from the stored row
    c = requests.get(f"{TARGET_URL}/api/results/{token}/context", timeout=30)
    assert c.status_code == 200, f"context failed: {c.status_code}"
    ctx = c.json()
    assert ctx["assessmentKey"] == "turing"
    assert "context" in ctx and "questions" in ctx and "answers" in ctx
    assert ctx["result"]["type"] == "The Logician"

    # 3. PATCH analysis — replace the stored text directly (no NVIDIA call)
    custom = "— a patched analysis for testing"
    p = requests.request("PATCH", f"{TARGET_URL}/api/results/{token}/analysis",
                         json={"aiAnalysis": custom}, timeout=30)
    assert p.status_code == 200, f"patch failed: {p.status_code} {p.text[:200]}"
    assert p.json()["ok"] is True

    # 4. read public snapshot — aiAnalysis must reflect the patch
    g = requests.get(f"{TARGET_URL}/api/results/{token}", timeout=30)
    assert g.status_code == 200
    assert g.json()["aiAnalysis"] == custom, "patched analysis not persisted"

def test_context_404():
    c = requests.get(f"{TARGET_URL}/api/results/doesnotexist1234567890abc/context", timeout=30)
    assert c.status_code == 404, f"expected 404, got {c.status_code}"

test_context_then_patch()
test_context_404()
