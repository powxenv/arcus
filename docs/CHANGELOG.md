# Changelog

Format: one entry per revision. Each states what changed and why. Newest first.

## v0.8 (2026-06-18): facet-level upgrade, honest ceiling locked

Why: the framework was axis-level, which is the structure of a shallow quiz. The user asked whether questions, result types, and scoring were the most advanced achievable through research synthesis alone. Audit showed three design-only upgrades were available.

Changes to `00-suite-framework.md`:
- §2 rewritten. Locked the facet-level structural model: 2 facets per axis, 4 items per facet, 8 per axis, 16 per test. This matches the NEO-PI-R domain-and-facet structure, the canonical organization of serious instruments.
- Scoring upgraded from flat item means to hierarchical facet-then-axis means. Facet sub-scores are now structural in every result, letting profiles say which facet drove the axis score.
- Added bias and quality handling: reverse-keying, extreme-response-style flag, per-respondent consistency proxy.
- Cross-test synthesis upgraded from AI-prose-only to a computed 8-dimensional profile (8 axes, 16 facets) with radar visualization. The AI layer enriches, not constitutes.
- Added §2.1 honest ceiling: named the four things that stay out of reach without pilot data (empirical weighting, data-driven typing, norms, adaptive testing) and stated the framework's authority line (theoretical grounding, not psychometric validity).
- §3 updated to describe facet sub-scores in both wheel and plane geometries.
- §4 table rebuilt with explicit facets per axis for all four tests.
- Noted Tests 1 and 2 need a retroactive facet pass (items re-organized, no new items).

Net: the framework moves from axis-level to facet-level. This is the genuine ceiling for a no-data theory-informed instrument. No roadmap or validation plan added, per user instruction; the decisions are written directly into the doc.

## v0.7 (2026-06-18): Test 4 temporal-orientation research, defensible axis

Why: the v0.6 Test 4 proposal used a naive past/future axis that merged Past-Positive and Past-Negative (near-orthogonal in ZTPI) and dropped the Present entirely. Research was needed to find a defensible 2D structure or honestly break the template.

Changes:
- Researched CFC-14 (Strathman, Joireman, Petrocelli), Carstensen socioemotional selectivity, ZTPI factor structure (Sircova cross-cultural), Bluedorn polychronicity, Mello time attitudes.
- Confirmed the naive axis was indefensible. Found two clean options: CFC's validated 2-factor structure (decision-theoretic, too instrumental for the poetic theme) and ZTPI Past-composite vs Future (humanistic, defensible as a composite in peer-reviewed use per Sailer 2014).
- Chose ZTPI composite for register match with Tests 1 to 3. Added explicit honesty notes: the composite merges orthogonal factors, and present-oriented people are handled via the boundary result, not misclassified. Lost Present and Past-Positive/Negative variance recovered as facet sub-scores.
- Confirmed 2 axes holds for Test 4. ZTPI's full 5 factors rejected: 5 types exceeds the 3-to-5 shareable sweet spot and breaks suite coherence for one test.
- Flagged the mono/poly vs future-orientation confound honestly.
- Updated §6 of `00-suite-framework.md` with the defensible Axis 1, the rejected CFC alternative, and the facet-recovery mechanism. Expanded references with Sircova, Sailer, CFC trio, and Bluedorn/Schell-Conte, each with its use.

## v0.6 (2026-06-18): suite framework doc

Why: before designing Tests 3 and 4, define the overall design so the four tests measure different personality domains with minimal overlap.

Changes:
- Created `00-suite-framework.md`. Maps the four themes (Solstice, Turing, Pride, Passage of Time) to four non-overlapping personality domains: affect, cognition, identity, time. Each test answers a different self-knowledge question (how do you burn, compute, show, flow).
- Answered the same-versus-different question: methodology is the same across all four tests (locked v0.4, non-negotiable). Theory is different per test, necessarily, because each domain has its own validated instruments.
- Documented geometry: only Test 1 is a true circumplex. Tests 2 to 4 are two-axis planes. Same scoring math either way.
- Proposed Test 3 (SSA, Pride): Identity Plurality x Identity Expression. Theory: self-concept differentiation (Showers, McConnell), multicultural identity integration (Benet-Martinez), self-monitoring (Snyder), authenticity (Wood). Draft results: Beacon, Ember, Prism, Aurora.
- Proposed Test 4 (TOA, Passage of Time): Temporal Orientation (past/future) x Temporal Mode (monochronic/polychronic). Theory: Zimbardo-Boyd ZTPI, Hall and Bluedorn polychronicity. Draft results: Archivist, Navigator, Storyteller, Pioneer.
- Flagged a theme shift: Test 4 moves from the original GDD's historical-era framing to passage of time, for cleaner theoretical separation.
- Stated cross-suite Big Five overlap honestly (Tests 1/3 share Extraversion; Tests 2/4 share Conscientiousness).
- Four open decisions surfaced for user sign-off (§8).

## v0.5 (2026-06-18): Test 2 (Modes of Mind) initial design

Why: extend the suite to the Turing theme with the same rigor as Test 1, applying the locked template from the start.

Changes:
- Created `02-modes-of-mind-assessment.md`. The Modes of Mind Assessment (MMA). Two cognitive axes: Processing Mode (deliberate versus intuitive, grounded in Epstein dual-process and Cacioppo-Petty Need for Cognition) and Encoding Structure (sequential versus holistic, grounded in Riding Wholist-Analytic).
- Four result modes: The Algorithm, The Cipher, The Gestalt, The Architecture. Each maps to a real piece of Turing's work (Turing Machine, Enigma, morphogenesis, ACE).
- Created `02b-modes-result-profiles.md`. Four full 14-section profiles using the same schema as Test 1.
- Inherited the locked methodology unchanged: 16 items (8 per axis), seven-point bipolar Likert, continuous scoring, deterministic fallback.
- Explicitly rejected: a third Verbaliser-Imager axis (thinner validation, breaks the template), a creativity axis (creativity is a capability, not a cognitive mode, per Sowden, Pringle and Gabora 2014).
- Near-center result named "Undecidable" as a Halting Problem nod.

## v0.4 (2026-06-18): Test 1 decisions locked

Why: confirm the three open decisions so Test 1 is final and the suite structure is fixed before starting Test 2.

Changes:
- Name locked: The Solstice Cycle Assessment (SCA). "Solstice Compass" remains as an in-game UI label only.
- Result naming locked: season-primary with archetype subtitle (for example `🍂 Autumn: The Turning`). Season is the headline and the shareable unit; archetype is the tagline. Mirrors bigfive-test.com and mypersonality.net convention.
- Suite template locked: Option A. Tests 2 to 4 reuse Test 1's structure (validated axes, continuous scoring, four quadrant types with gradation, 14-section profile, AI narrative, deterministic fallback, eight items per axis, seven-point bipolar Likert) with their own axes, themes, and result names. Axis and type count may flex only when the theory demands it. Methodology is fixed across the suite.
- Updated §1, §5, and §11 of `01-solstice-cycle-assessment.md` to mark these as locked.
- Test 1 is final.

## v0.3 (2026-06-18): stop-slop pass, references tightened

Why: enforce two writing rules across the docs (no em dashes, stop-slop) and make every reference accountable to its actual use.

Changes:
- Rewrote `01-solstice-cycle-assessment.md` and `01b-solstice-result-profiles.md` end to end. Removed all em dashes. Cut filler, rhetorical hedges, and redundant justifications. Shortest accurate version throughout.
- References: each source in §2 now states exactly how it was used ("Use: ..."). Removed the standalone references list at the end of the main doc, since §2 is now the single source of truth and a separate list duplicated author and year. Dropped Altuna and Arslan (2016): Chang (1994) already covered the scale-points point, so it was unused padding.
- Replaced stale content rather than accumulating it. v0.1 and v0.2 rationales for the slider and the 12-item count were rewritten in place, not appended beside the new version.
- Added this changelog.

## v0.2 (2026-06-18): response format, item count, item quality, profile depth

Why: the user challenged four decisions on credibility and reliability grounds. Review of the literature forced reversals.

Changes:
- Response format: reversed the v0.1 slider recommendation. Now a seven-point bipolar Likert (segmented pips between two anchor statements). Reasons documented in §7: Sun, Schmidt and Henry (2025); Zhang et al. (2025); Kuhlmann et al. (2017); Vollbracht et al. (2026); and the fact that no validated inventory uses sliders. Wheel retained as a results reveal only.
- Item count: 12 to 16 (8 per axis). Reason: Spearman-Brown and NEO-PI-R / IPIP precedent (§8).
- Item quality: rewrote the bank. Removed a double-barreled item (old A3), two axis confounds (old A6, old B5), leading language, and a transparent introvert/extravert giveaway (old B6). Added an overlap-honesty note: Axis B overlaps Big Five Extraversion sociability; Axis A overlaps Extraversion energy and Neuroticism arousal.
- Result depth: added `01b-solstice-result-profiles.md`. Four full 14-section profiles, modeled on bigfive-test.com facet depth and mypersonality.net type profiles.

## v0.1 (2026-06-17): initial design document

Why: produce a credible, theory-grounded framework for Test 1 and confirm the concept before research deepens.

Changes:
- Created `01-solstice-cycle-assessment.md`. Circumplex structure on two axes (Solar Height, Tidal Direction), four seasonal quadrant types, hybrid dimensional-and-prototypical scoring, MBTI critique, and a 12-item bank with a 0-to-100 slider response format.
- Two flaws carried into v0.1 and corrected in v0.2: the slider (psychometrically weaker than Likert) and the 12-item count (at the reliability floor).
