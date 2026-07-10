# Validation guard paths — every validator surfaces a 400 with a clear message.
import requests

def post(payload):
    return requests.post(f"{TARGET_URL}/api/results", json=payload, timeout=30)

def test_missing_assessment_key():
    r = post({"resultType": "X", "answers": {}, "result": {}})
    assert r.status_code == 400 and "assessmentKey" in r.json()["error"]

def test_missing_result_type():
    r = post({"assessmentKey": "turing", "answers": {}, "result": {}})
    assert r.status_code == 400 and "resultType" in r.json()["error"]

def test_bad_answers():
    r = post({"assessmentKey": "turing", "resultType": "X",
              "answers": "not-an-object", "result": {}})
    assert r.status_code == 400 and "answers" in r.json()["error"].lower()

def test_missing_result():
    r = post({"assessmentKey": "turing", "resultType": "X", "answers": {}})
    assert r.status_code == 400 and "result" in r.json()["error"].lower()

def test_invalid_json():
    r = requests.post(f"{TARGET_URL}/api/results", data="not json",
                      headers={"content-type": "application/json"}, timeout=30)
    assert r.status_code == 400 and "json" in r.json()["error"].lower()

def test_compute_missing_fields():
    r = requests.post(f"{TARGET_URL}/api/results/compute", json={}, timeout=30)
    assert r.status_code == 400

test_missing_assessment_key()
test_missing_result_type()
test_bad_answers()
test_missing_result()
test_invalid_json()
test_compute_missing_fields()
print("all validation-error cases passed")
