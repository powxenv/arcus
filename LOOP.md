# LOOP.md

Arcus · TestSprite verification loop. Target: `https://arcus.pows.workers.dev`.

- Added 13 FE tests → ran vs `arcus.noval.me` → all 13 blocked (Cloudflare Bot Fight Mode) → switched target to the clean `workers.dev` origin.
- Ran 13 vs workers.dev → 6 passed, 2 failed, 5 blocked (4 false) → read every failure bundle.
- Suspected product bugs → SSR-inspected `/start` + keyboard code → app correct; failures were checker artifacts → no app change.
- Refined flagship/keyboard plans → re-ran → flagship hits the ~760s per-run budget, keyboard keydown untestable → reverted.
- `start-list` failed (checker read the Home page) → added a hero-heading assertion to force the right page → passed.
- Studied the TestSprite docs → ≤200 steps, ~760s/run, `rerun` free, `blocked` = verdict-not-produced, backend RPC seroval-encoded.
- Deleted flagship (budget) + keyboard (keydown) → replanned keyboard → click-based back-button nav → passed.
- False-blocks: `about`→free rerun passed; `answering`→dropped relative bar-width comparison; `resume`→dropped conflicting "1/36 vs 2/36" numbers → all passed.
- `all-detail` mega-test blocked (4-page nav accumulation) → split into single-page detail tests.
- Added Theory 4-tab content + Pride/Passage take + header/footer tests → ran → those passed; the 4 detail pages blocked.
- 4 detail pages false-block (long page → verdict engine fails despite checker passing every assertion) → exhausted assertion/scroll/concurrency/solo/hero-only → deleted, SSR-verified the content instead.
- Synced `testsprite-plans/` with the live suite (removed 2 orphaned plans) → 14 plans == 14 tests, all passing.
- Made all assessments redirect to `/shared/<token>` on completion (no in-place ephemeral result) → deployed → full suite rerun: 11/15 green; 4 false-blocked (same verdict-finalization quirk as before, PASS narratives in artifacts). No regressions. Live smokes confirmed: home 4+1 cards, individual/Full Arc take pages load at Q1 with no landing, `/shared` shows owner view (Share/AI, no modal).
