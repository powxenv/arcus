# Suite Framework: Solstice Soul Personality Suite

> Status: v0.1 framework document. Tests 1 and 2 complete. Tests 3 and 4 in proposal.
> Purpose: define the overall design before Tests 3 and 4 are built, so the four tests measure different aspects of personality with minimal overlap.
> Scope: themes, domains, test names, result types, and the same-versus-different decision for methodology and theory.

---

## 1. The design principle: one theme, one personality domain

Each theme maps to one recognized sub-discipline of personality psychology. The four tests together answer four different self-knowledge questions. No two tests measure the same thing.

| Theme | Domain | Self-knowledge question |
|---|---|---|
| Solstice | Affect, energy, motivation | How do you burn? |
| Turing | Cognition | How do you compute? |
| Pride | Identity, self-concept, self-expression | How do you show who you are? |
| Passage of Time | Temporality | How do you move through time? |

This partition is the suite's main strength. Affect, cognition, identity, and time are four established research areas, each with its own validated instruments. The final synthesis combines four genuinely additive signals into one self-portrait.

---

## 2. Same methodology, different theory

**Methodology is the same across all four tests.** Locked. Non-negotiable. This is the facet-level structural model used by serious instruments (NEO-PI-R organizes its domains into facets). It is the most advanced structure achievable through design and literature synthesis alone.

**Response format.**
- Seven-point bipolar Likert (segmented pips between two anchor statements).
- Pole direction randomized per item to counter position and acquiescence bias.

**Item structure. Facet-organized, not axis-level.**
- Two axes per test.
- Two theory-grounded facets per axis (sub-dimensions drawn from the parent construct).
- Eight items per facet, 16 per axis, 32 per test. This matches the NEO-PI-R standard of 8 items per facet, the structure of validated instruments.
- Facets are named and reported, not collapsed silently. This is the core move that separates this framework from a shallow quiz.

**Scoring. Hierarchical, not flat.**
- Facet score = mean of its 8 items, scaled 0 to 100.
- Axis score = mean of its 2 facet scores, scaled 0 to 100.
- Prototypicality = distance from center / 70.7.
- Position angle = atan2, for gradation and secondary leaning.
- Theory-weighted (facets chosen for construct centrality), not empirically weighted (that needs pilot data we do not have).

**Result structure.**
- Four quadrant types with gradation (early, mid, late) and a near-center boundary result.
- Each result reports the quadrant type plus the facet signature (which facets drove the axis scores). A high-Extraversion-style result can say "driven by social approach, not affect expansion," not just "high."
- 14-section deep profiles, one per quadrant type, modulated by facet signature, gradation, and leaning.
- AI narrative layer with a deterministic 16-result fallback (4 quadrants times 4 gradation states).
- Hybrid dimensional and prototypical reporting (Kerber et al. 2021), avoiding MBTI's midpoint cliff (McCrae and Costa 1989).

**Bias and quality handling.**
- Reverse-keyed items built into every axis.
- Extreme response style flag: if a respondent uses the endpoints on a disproportionate share of items, surface a soft note in the result.
- Internal consistency proxy: per-respondent facet spread reported as a confidence signal.

**Item count rationale.** 32 items per test (8 per facet) matches the NEO-PI-R facet standard and sits in the validated-instrument norm. Reliability rises with item count per Spearman-Brown: at 8 per facet the expected Cronbach's alpha is .85 to .92 (strong), versus .60 to .70 at 4 per facet (marginal). At roughly 8 to 10 minutes per test this stays within personality-test norms (16Personalities holds users through 60 items; tests in this suite are taken independently). The four-test suite is 128 items total, but each test is a separate sitting.

**Cross-test synthesis. Structural, not just narrative.**
- The four tests produce 8 axis scores and 16 facet scores.
- The final Solstice Identity is a computed 8-dimensional profile (radar visualization), enriched by the AI layer but not constituted by it.
- The synthesis is honest about overlap: where axes correlate across tests (noted in section 7), the synthesis surfaces the correlation rather than pretending independence.

**Why the same methodology across all four.** Coherence, shared componentry, equal depth, no test accidentally weaker than another.

**Theory is different per test.** Necessary, not optional.
- Affect is measured with affect models, not cognition models.
- Cognition is measured with cognitive-style models, not identity models.
- Identity is measured with self-concept models, not time models.
- Time is measured with temporal-orientation models.

Each test draws its two axes and four facets from the validated instruments of its own domain. The methodology transfers. The construct does not.

### 2.1 Honest ceiling: what is achievable without pilot data, and what is not

This framework is facet-organized, theory-weighted, and structurally synthesized. That matches the structural sophistication of validated instruments like NEO-PI-R. It is the genuine ceiling for a theory-informed framework built without respondents.

Four things stay out of reach because they require pilot data, and unlimited calendar time does not generate data:
- Empirical item weighting (factor loadings). We use theory-weighted facets instead.
- Data-driven typing (latent profile analysis). We use designed quadrants instead.
- Population norms (a reference distribution). Scores are unanchored; we say so.
- Adaptive testing (IRT-based item selection). We use a fixed form.

A lightly validated instrument is worse than an honestly unvalidated one, because it implies false authority. This framework claims theoretical grounding and structural honesty, not clinical or psychometric validity. That line is stated in every test doc.

---

## 3. Geometry note: circumplex versus plane

Only Test 1 is a true circumplex. Affect really is circular (Russell 1980). Tests 2, 3, and 4 are two orthogonal axes forming a plane.

The scoring math is identical either way: facet means rolled up to axis means, distance from center, angle, quadrant. The difference is only the visualization. Test 1 uses a wheel with facets as inner rings. Tests 2 to 4 use a 2x2 plane or radar with facets as sub-axes. The structure follows the construct. We do not force a circle where the construct is linear.

Facet sub-scores appear in every result, regardless of geometry. They are what let a profile distinguish "high on this axis because of this facet, not that one."

---

## 4. Per-test specifications

Each axis has 2 theory-grounded facets (8 items each). Facets named below; full definitions live in each test's doc.

| # | Theme | Name | Domain | Axis 1 (facets) | Axis 2 (facets) | Results |
|---|---|---|---|---|---|---|
| 1 | Solstice | SCA | Affect | Solar Height: baseline arousal, stimulation appetite | Tidal Direction: social approach, experiential approach | Summer, Autumn, Winter, Spring |
| 2 | Turing | MMA | Cognition | Processing Mode: deliberation preference, override tendency | Encoding Structure: entry point, working scale | Algorithm, Cipher, Gestalt, Architecture |
| 3 | Pride | SSA | Identity | Identity Plurality: self-concept integration, contextual variation | Identity Expression: visibility preference, disclosure selectivity | Beacon, Ember, Prism, Aurora |
| 4 | Passage of Time | TOA | Time | Temporal Orientation: past valence, future salience | Temporal Mode: scheduling preference, flow tolerance | Archivist, Navigator, Storyteller, Pioneer |

Status. Tests 1 and 2 are expanded to 32 items with the facet structure below (v0.9). Tests 3 and 4 are designed at 32 items from the start.

Facet note. Test 1 Axis B facets are "social approach" and "experiential approach" (the sociability versus activity distinction in Big Five extraversion), not "expressive disclosure" as in v0.8. The earlier name overlapped with Test 3 Axis 2 (identity expression); the refinement keeps the four tests non-redundant.


---

## 5. Test 3 proposal: Spectrum of Self Assessment (SSA)

**Domain.** Identity and self-expression. The personality side of Pride, not sexual orientation or gender as variables.

**Why Pride fits.** Pride celebrates the plurality and authenticity of identity. A spectrum is structurally correct: people vary on how their self is organized and how it is shown, and every position is valid. The test measures those variations as personality, themed through Pride's celebration of difference.

**Axis 1, Identity Plurality.** Singular and integrated versus plural and multi-faceted.
- Construct basis: self-concept differentiation and compartmentalization (Showers 1992; McConnell 2011). Multicultural and bicultural identity integration (Benet-Martinez 2002).
- Singular pole: one coherent core self across contexts.
- Plural pole: many facets, different selves in different rooms, all real.
- Neither pole is superior. Plural is reframed as complexity and range, never fragmentation.

**Axis 2, Identity Expression.** Reserved and private versus expressive and visible.
- Construct basis: self-monitoring (Snyder 1974). Authentic living and self-disclosure (Wood et al. 2008 Authenticity Scale).
- Reserved pole: identity held close, shown selectively or privately.
- Expressive pole: identity made visible, disclosed, worn openly.
- Neither pole is superior. Reserved is reframed as discernment and protection, never hiding or shame.

**Four results (draft, light/spectrum imagery).**
- Singular + Expressive: **The Beacon.** One clear identity, brightly shown.
- Singular + Reserved: **The Ember.** One strong core, glowing within.
- Plural + Expressive: **The Prism.** Many facets, all in the light.
- Plural + Reserved: **The Aurora.** Many facets, shifting, partially seen.

**Open decision.** Identity Plurality × Identity Expression, or an alternative (Marcia 1966 identity statuses, or the interpersonal circumplex of agency and communion). See §8.

---

## 6. Test 4 proposal: Temporal Orientation Assessment (TOA)

**Domain.** How a person relates to time. The personality side of the passage of time.

**Why passage of time fits.** Time perspective is a recognized, heavily validated personality domain. The passage-of-time theme maps onto it directly. People genuinely differ on where their attention and value sits across time horizons, and how they structure time itself.

**Axis 1, Temporal Orientation.** Past-anchored versus future-oriented.
- Construct basis: Zimbardo and Boyd Time Perspective Inventory, ZTPI (1999). The ZTPI has five factors (Past-Positive, Past-Negative, Present-Hedonistic, Present-Fatalistic, Future), confirmed across 24 countries (Sircova et al. 2014). We use the Past composite (Past-Positive and Past-Negative averaged, as in Sailer et al. 2014) as the past pole and the Future factor as the future pole.
- Past pole: value and attention on roots, memory, tradition, what has been.
- Future pole: value and attention on goals, possibility, what will be.
- Honesty note 1: this axis is a composite. Past-Positive and Past-Negative are near-orthogonal in ZTPI, not opposites. Merging them is a simplification used in peer-reviewed research, but it loses texture. That texture is recovered as facet sub-scores within each result (Past-Positive vs Past-Negative, Present-Hedonistic vs Present-Fatalistic).
- Honesty note 2: present-oriented people land mid-axis. They are not misclassified as weakly-past-or-future. They surface via the boundary result, framed affirmatively as living in the now.
- Alternative considered and rejected: Consideration of Future Consequences (CFC-14, Strathman 1994; Joireman 2012). CFC has a validated two-factor structure (CFC-Future and CFC-Immediate, Petrocelli 2003), which would give a cleaner single axis without compositing. Rejected because CFC is decision-theoretic (how far ahead you weigh consequences) rather than humanistic, which would break tonal parity with Tests 1 to 3 and reduce the poetic passage-of-time theme to a decision-horizon instrument.

**Axis 2, Temporal Mode.** Monochronic versus polychronic.
- Construct basis: Hall (1959) monochronic and polychronic time. Bluedorn et al. polychronicity inventory (Bluedorn 2007; Schell and Conte 2008).
- Monochronic pole: clock-time, one thing at a time, scheduled, linear.
- Polychronic pole: event-time, multiple flows at once, fluid, contextual.
- Neither pole is superior.
- Confound honesty: monochronicity correlates with future orientation (both involve planning and scheduling). This is the same kind of cross-axis correlation as Extraversion in Tests 1/3 and Conscientiousness in Tests 2/4. The two axes are not perfectly orthogonal. Stated plainly in the test doc.

**Why two axes, not ZTPI's five.** The ZTPI's full five-factor structure is richer, but breaks the suite template for one test, and five result types thins every profile and pushes past the 3-to-5 shareable-types sweet spot. Two axes keep suite coherence and synthesis evenness. The lost Present and Past-Positive/Negative variance is recovered as facet sub-scores, not lost.

**Four results (draft, journey and time imagery).**
- Past + Monochronic: **The Archivist.** Preserves, orders, keeps.
- Future + Monochronic: **The Navigator.** Charts one course forward.
- Past + Polychronic: **The Storyteller.** Weaves past into living present.
- Future + Polychronic: **The Pioneer.** Moves into the new on many threads.

**Open decision.** Passage of time (recommended) versus historical-era resonance from the original GDD. The passage-of-time research above confirms the theme maps cleanly onto validated time-perspective constructs. Historical-era would overlap messily with identity and time.

---

## 7. Cross-suite overlap honesty

Big Five is the backbone nearly everything in personality correlates with. Each test will state its own overlap. Audited loadings across the suite:

- Test 1 (SCA). Loads on Extraversion (energy) and Neuroticism (arousal).
- Test 2 (MMA). Loads on Conscientiousness (deliberate pole) and Openness.
- Test 3 (SSA, proposed). Loads on Openness (plurality) and Extraversion (expression). Some Extraversion overlap with Test 1, mitigated by framing Axis 2 as identity disclosure specifically, not social energy.
- Test 4 (TOA, proposed). Loads on Conscientiousness (future) and Openness (polychronic). Some Conscientiousness overlap with Test 2, mitigated by framing as temporal structure, not general diligence.

Conceptually the four domains are distinct. At the trait level some correlation is unavoidable, because personality is not orthogonal. The contribution of each test is the facet combination and the framing, not novel dimensions. This will be stated plainly in every test doc.

---

## 8. Open decisions

1. **Test 4 theme.** Passage of time (recommended, theoretically clean, distinct domain) versus historical-era resonance (original GDD, overlaps messily with identity and time). 
2. **Axis cross.** Identity Plurality × Identity Expression (recommended) versus alternatives. Marcia (1966) identity statuses (commitment × exploration) is the strongest alternative, a validated 2x2 of identity, but its language (foreclosure, diffusion) is clinical and needs heavy reframing. The interpersonal circumplex (agency × communion, Wiggins 1979) is the most validated 2x2 of all, but agency overlaps more with Test 1's approach axis.
3. **Test 3 and 4 names.** SSA and TOA as proposed, or alternatives.
4. **Test 3 and 4 result names.** The drafts above, or redirect.

My recommendation on all four: as written. Passage of time. Plurality × Expression. SSA and TOA. The light and journey names.

---

## 9. The synthesis

With four non-overlapping domains, the final Solstice Soul synthesis combines four genuinely additive signals: how you burn (affect), how you compute (cognition), how you show (identity), and how you flow (time). This is the payoff of the domain partition. A redundant suite would re-measure the same trait four times. This suite measures four different things, so the whole is more than any part.

---

## 10. References (used only)

Test 1 and Test 2 references are documented in their own docs. This framework doc cites only the construct anchors for Tests 3 and 4.

- **Russell (1980), circumplex model of affect.** *Use:* justification that Test 1 is a genuine circumplex and Tests 2 to 4 are planes (§3).
- **Kerber, Roth and Herzberg (2021), personality types revisited.** *Use:* the hybrid dimensional and prototypical pattern shared across the suite (§2).
- **McCrae and Costa (1989), reinterpreting the MBTI.** *Use:* the midpoint-cliff flaw the suite avoids (§2).
- **Showers (1992), self-concept compartmentalization. McConnell (2011), self-concept organization.** *Use:* anchor for Test 3 Axis 1, identity plurality (§5).
- **Benet-Martinez (2002), bicultural identity integration.** *Use:* validation that plural identity is a measurable, healthy construct, central to the Pride reframing (§5).
- **Snyder (1974), self-monitoring.** *Use:* anchor for Test 3 Axis 2, identity expression (§5).
- **Wood et al. (2008), Authenticity Scale.** *Use:* corroboration for Test 3 Axis 2, authentic self-disclosure (§5).
- **Zimbardo and Boyd (1999), Time Perspective Inventory (ZTPI).** *Use:* anchor for Test 4 Axis 1, temporal orientation. The 5-factor structure (Past-Positive, Past-Negative, Present-Hedonistic, Present-Fatalistic, Future).
- **Sircova et al. (2014), A Global Look at Time.** *Use:* cross-cultural validation of ZTPI's 5-factor structure across 24 countries, n=12,200. Confirms the construct is robust, and confirms Past-Positive and Past-Negative are near-orthogonal (drives the honesty note about compositing).
- **Sailer et al. (2014), time perspective and well-being.** *Use:* precedent for using the Past composite (Past-Positive and Past-Negative averaged) as a scale in peer-reviewed research. Justifies our Axis 1 composite.
- **Strathman et al. (1994), Consideration of Future Consequences (CFC). Joireman et al. (2012), CFC-14. Petrocelli (2003), CFC factor validation.** *Use:* the alternative considered and rejected for Axis 1. CFC's validated 2-factor structure (Future and Immediate) would give a cleaner non-composite axis, but was rejected as too decision-theoretic for the poetic theme.
- **Hall (1959), monochronic and polychronic time. Bluedorn (2007), polychronicity in organizations. Schell and Conte (2008), polychronicity and goal orientation.** *Use:* anchor for Test 4 Axis 2, temporal mode. Validates mono/poly as a stable individual-difference dimension.
- **Marcia (1966), identity statuses.** *Use:* the strongest alternative for Test 3, named so the decision is informed (§8).
- **Wiggins (1979), interpersonal circumplex (agency and communion).** *Use:* the most validated 2x2 alternative for Test 3, named so the decision is informed (§8).

See `CHANGELOG.md` for revision history.
