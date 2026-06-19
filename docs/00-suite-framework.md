# Suite Framework: Solstice Soul Personality Suite

> Status: v0.22 framework document. Ground-up rewrite based on a full-suite audit and re-derivation from first principles. The methodology is uniform; the structure is not. Each test's dimensionality and result shape now follow its construct, not a shared template. Tests 1 and 3 retain their 2-axis geometry because their constructs are genuinely planar. Tests 2 and 4 break the template because their constructs are not. See CHANGELOG v0.22.
> Purpose: define the overall design so the four tests measure four genuinely different things at the same rigor bar, with minimal overlap and stated, not hidden, shared variance.
> Scope: domains, constructs, methodology, per-test structure, the synthesis, and the single binding scope constraint that shapes every test.

---

## 1. The design principle: one theme, one domain, one validated construct per axis

Each theme maps to one recognized area of personality psychology. The four tests answer four genuinely different self-knowledge questions.

| Theme | Domain | Self-knowledge question |
|---|---|---|
| Solstice | Affect, energy, motivation | How do you burn? |
| Turing | Cognition | How do you think? |
| Pride | Identity, self-concept | How well do you know and show yourself? |
| Passage of Time | Temporality | How do you relate to time? |

This partition is the suite's main strength. Affect, cognition, identity, and time are four established research areas. The synthesis combines four genuinely additive framings into one self-portrait, with the overlap between them stated rather than denied.

The change in v0.22 is structural, not thematic. Each axis (or factor) in each test is now **one named validated construct**, measured in **its native format**. No compositing of weakly-related factors into a bipolar axis. No designer splits dressed as validated facets. No forcing a planar template onto a multi-factor construct.

---

## 2. Uniform methodology, NON-uniform structure

**This is the core decision of the v0.22 rewrite, and it inverts the previous framework.**

The v0.1 to v0.21 framework locked a single structural template across all four tests: two orthogonal axes, four quadrants, one boundary condition, facet-tension detection. That template is construct-native to exactly one test (SCA, because affect is genuinely circumplex). Forcing it onto the other three produced documented validity violations:

- MMA destroyed Epstein's validated orthogonality (NFC ⊥ Faith-in-Intuition, r = .08, verified full-text) by collapsing two factors into one bipolar axis, then split a unidimensional construct (Riding's Wholist-Analytic) into two "facets."
- PTA composited weakly-related ZTPI factors (Future ↔ Past-Positive r = +.26, Sircova 2014 Table 4) into a bipolar axis and exiled the present to a "boundary" because the template has no place for a third temporal zone.
- SSA split a unidimensional construct (Campbell's Self-Concept Clarity, one factor, verified) into two "facets" to feed the template.

The template was the disease, not the tests. The fix is to keep the methodology uniform and let the structure vary.

### 2.1 What stays uniform (the rigor layer)

These are non-negotiable across all four tests:

- **One validated construct per axis or factor.** Named, sourced, verified against full-text PDF. No composites of weakly-related factors. No invented facets.
- **Measurement format matches construct accessibility.** Self-report only where the construct is introspectable (affect, identity, time perspective, Need for Cognition, Faith in Intuition). Behavioral where it is not (cognitive override). Bipolar only where the construct is genuinely bipolar; unipolar agree-disagree where the source instrument is unipolar.
- **Hybrid dimensional-plus-type reporting.** Dimensional scores are the measurement; archetypes are an optional interpretive metaphor for shareability. Types are never asserted where the construct has no validated typology.
- **Affirming scope limit** (§3): one binding constraint, stated once, with per-test validity costs.
- **Honest ceiling** (§2.4): no pilot data, so no empirical weighting, no latent-profile typing, no population norms, no adaptive testing. Stated in every test doc.
- **Self-review discipline:** every result screen carries the scope note; every test doc carries its limitations; the synthesis carries the shared-variance map.

### 2.2 What now varies (the structure layer)

Each test's dimensionality, result count, and scoring follow its construct:

| Test | Dimensionality | Structure | Why this shape |
|---|---|---|---|
| SCA | 2 axes | 4 quadrants + boundary | Affect is genuinely circumplex (Russell 1980). |
| MMA | 2 independent scales + 1 behavioral | 4 REI quadrants + behavioral override profile | NFC and FI are verified orthogonal (Epstein 1996); override is not introspectable (Frederick 2005). |
| SSA | 2 axes | 4 quadrants + boundary | Clarity and authenticity are genuinely distinct bipoles. |
| PTA | 3 independent factors | 8 temporal types | Time perspective is multi-factor (Zimbardo-Boyd 1999; Sircova 2014); forcing two axes composites and exiles the present. |

Two tests keep the quadrant geometry because their constructs are planar. Two tests drop it because their constructs are not. Coherence lives at the rigor layer, not the geometry layer.

### 2.3 Response format, decided per construct

| Construct | Format | Why |
|---|---|---|
| Affect / activation (SCA) | 7-point bipolar Likert | Activation is genuinely bipolar. |
| Need for Cognition (MMA) | 5-point agree-disagree unipolar | NFC is unipolar (Cacioppo-Petty native format). |
| Faith in Intuition (MMA) | 5-point agree-disagree unipolar | FI is unipolar (Epstein REI native format). |
| Cognitive override (MMA) | Behavioral problem-solving (CRT-style) | Override is not introspectable; behavioral is the validated measure (Frederick 2005). |
| Self-Concept Clarity (SSA) | 7-point bipolar Likert | Clear↔diffuse is a genuine bipolar. |
| Authenticity (SSA) | 7-point bipolar Likert | Self-aligned↔other-oriented is a genuine bipolar. |
| Time perspective factors (PTA) | 5-point agree-disagree unipolar | ZTPI factors are unipolar (Zimbardo-Boyd native format). |

Point counts follow the validated source instrument, not a suite default. Seven-point for the bipolar affect and identity items (where discrimination matters and the suite chose seven); five-point for NFC, FI, and ZTPI (their native validated formats).

### 2.4 Honest ceiling: what is achievable without pilot data

This framework is construct-grounded, theory-weighted, and structurally synthesized. That matches the structural sophistication of validated instruments. It is the genuine ceiling for a theory-informed framework built without respondents.

Four things stay out of reach because they require pilot data:
- Empirical item weighting (factor loadings). Theory-weighted constructs instead.
- Data-driven typing (latent profile analysis). Designed types instead, where the construct supports a typology.
- Population norms. Scores are unanchored; stated.
- Adaptive testing (IRT-based item selection). Fixed forms.

A lightly validated instrument is worse than an honestly unvalidated one, because it implies false authority. This framework claims theoretical grounding and structural honesty, not clinical or psychometric validity. That line is stated in every test doc.

### 2.5 Deferred and out-of-scope (stated, not hidden)

Several proposals from the audit and redesign were evaluated and deferred because they depend on constructs not yet full-text-verified. They are NOT implemented in v0.22:

- **Allinson-Hayes Cognitive Style Index (1996)** as MMA's primary axis. Cited in the Riding paper and used widely, but the full PDF has not been reviewed. Deferred until verified. The v0.22 MMA uses the verified Epstein REI instead.
- **Kirton Adaptor-Innovator.** Not verified. Deferred.
- **Behavioral temporal-discounting task for PTA.** The construct is real and the discounting literature is large, but no specific validated instrument has been full-text-reviewed for use here. Deferred. The v0.22 PTA is a validated self-report 3-factor instrument.
- **Showers self-structure card-sort for SSA.** Verified (Showers 1992) and implementable in a browser, but adds build complexity and is a different measurement paradigm. Deferred. The v0.22 SSA remains pure Likert.

These deferrals are the discipline that distinguishes this framework from the false-authority approach it rejects.

---

## 3. The affirming scope limit (binding, stated once)

This is the single constraint that shaped the most design decisions, and it deserves to be stated at framework level rather than scattered across per-test honesty notes.

**The suite measures the affirming range of each construct. It cannot detect maladaptive patterns.**

- This is a consumer game for self-discovery, not a clinical screen. A result that tells a user "you are high in bitter rumination," "you score in the hubristic-pride range," or "your life narrative is dominated by contamination" is harmful and unethical in this context.
- The cost, stated plainly: the tests exclude the predictive half of several constructs. Past-Negative (rumination), Future-Negative (dread), Present-Fatalistic (hopelessness), hubristic pride, and contamination sequences are all real, validated, and consequential, and none of them appear as scored poles. A user who is genuinely stuck can receive an affirming reading that misses the stuckness.
- The honest consequence: every result screen carries this one-line scope note: "This assessment measures the affirming range of [construct] and cannot detect rumination, anxiety, or other patterns that may warrant clinical attention."

This is the binding product constraint. It is the reason the suite cannot, even in principle, reach the validity of a clinical instrument, and it is stated once here rather than rediscovered in every test doc.

---

## 4. Per-test specifications

| # | Theme | Name | Domain | Constructs (each verified) | Format | Results |
|---|---|---|---|---|---|---|
| 1 | Solstice | SCA | Affect | Energetic arousal; BAS approach (+ BIS as moderator) | 7-pt bipolar Likert | Summer, Autumn, Winter, Spring + Threshold |
| 2 | Turing | MMA | Cognition | Need for Cognition; Faith in Intuition; Cognitive override (behavioral) | 5-pt unipolar + behavioral | Integrator, Logician, Reader, Operator + Generalist boundary |
| 3 | Pride | SSA | Identity | Self-Concept Clarity; Authenticity | 7-pt bipolar Likert | Beacon, Prism, Ember, Aurora + Reflection |
| 4 | Passage of Time | PTA | Time | Past-Positive engagement; Present-eudaimonic engagement; Future engagement | 5-pt unipolar | 8 temporal types |

Each test's full design lives in its own doc (`01` through `04`). Summary sections below.

---

## 5. Test 1: Solstice Cycle Assessment (SCA)

> Status: v0.22. Structure unchanged from v0.20; honesty tightened. See `01-solstice-cycle-assessment.md`.

**Domain.** Affect, energy, motivation.

**Why this structure is native here.** Affect is genuinely circular (Russell 1980; Yik et al. 2011). A two-axis circumplex with a boundary condition is the construct's own shape, not a forced template.

**Axis A, Solar Height (activation).** Energetic arousal (Schimmack & Reisenzein 2002). Axis A composites energetic arousal with stimulation appetite (Zuckerman 2007); both are activation constructs, but the composite is a stated design choice, not a validated higher-order factor.

**Axis B, Tidal Direction (approach-withdrawal).** Carver & White (1994) BIS/BAS. Honesty tightening in v0.22: BIS/BAS is four unipolar subscales (BAS Drive, BAS Fun-Seeking, BAS Reward-Responsiveness, BIS), not a bipolar. The SCA composites the BAS facets into "approach" and reports BIS as a moderator signal rather than pretending approach↔withdrawal is a single validated bipolar.

**Results.** Summer, Autumn, Winter, Spring (the seasons), plus the Threshold boundary. Seasonal names are interpretive metaphor; hemisphere-neutral; the solstice poetry lives at the Axis-A extremes.

**What changed in v0.22.** Structure unchanged. Honesty notes tightened: SCA is a Russell-plus-Gray hybrid, not "the circumplex"; Axis B composites unipolar BIS/BAS subscales. This is the solid test, and the audit confirmed why: both axes are single validated constructs measured in a format native to affect.

---

## 6. Test 2: Modes of Mind Assessment (MMA)

> Status: v0.22. Redesigned. Previous v0.3 design (collapsed NFC×FI bipolar + Riding D1/D2 axis + Algorithm/Cipher/Gestalt/Architecture quadrants) is superseded. See `02-modes-of-mind-assessment.md`.

**Domain.** Cognition.

**Why the redesign.** The v0.3 MMA had two verified-evidence violations, both caused by forcing the 2-axis-quadrant template onto cognition:

1. Epstein (1996) found NFC and Faith in Intuition are orthogonal (r = .08, verified full-text). The v0.3 MMA collapsed them into one bipolar axis, destroying the validated two-factor structure and rendering mid-axis scores psychometrically meaningless.
2. Riding (1997) validated Wholist-Analytic behaviorally (reaction-time Cognitive Styles Analysis) and explicitly rejected self-report for cognitive style. The v0.3 MMA used self-report Likert on Riding, against Riding's own measurement argument.

**The v0.22 structure.** Three independent components, reported as a profile, not crossed into a forced plane:

- **Scale 1: Need for Cognition** (Cacioppo & Petty 1982; Cacioppo et al. 1996). Unidimensional, self-report-native, verified. How much you engage in and enjoy effortful thinking. 5-point agree-disagree unipolar.
- **Scale 2: Faith in Intuition** (Epstein et al. 1996, REI second factor). Verified orthogonal to NFC (r = .08). How much you trust experiential, gut-level processing. 5-point agree-disagree unipolar.
- **Component 3: Cognitive override** (Frederick 2005 CRT; Stanovich & West 2000). Behavioral problem-solving items. Override is not introspectable; behavioral is the validated measure. Reported as an override rate alongside the two self-report scales.

**Why this is more valid.** Both self-report scales are introspectable (NFC is the enjoyment of thinking; FI is the felt trust in gut). Both preserve Epstein's verified orthogonality. The behavioral component handles the one part of cognition that self-report cannot. Riding is dropped (deferred self-report instruments like Allinson-Hayes CSI are noted in §2.5; until verified, the REI is the safer anchor).

**Results.** Four REI quadrants (the verified NFC×FI space) plus a behavioral override profile reported alongside:

- **The Integrator** (high NFC + high FI): engages both reasoning and intuition richly.
- **The Logician** (high NFC + low FI): deliberate reasoning dominant; distrusts gut.
- **The Reader** (low NFC + high FI): intuitive pattern-fluency; doesn't dwell in analysis.
- **The Operator** (low NFC + low FI): action over reflection; neither mode dominates.
- **The Generalist** (near-center on both): genuinely moderate on both engagement scales.

The Turing theme lands structurally: the user is given tasks (the CRT) and their outputs are observed, which inverts the Imitation Game. The mode names are interpretive metaphor, not a claim that minds are literally algorithms.

**What changed.** Dropped Riding entirely. Dropped the Algorithm/Cipher/Gestalt/Architecture quadrant names and the Halting Point boundary. Restored Epstein's verified orthogonality. Added the behavioral CRT component.

---

## 7. Test 3: Spectrum of Self Assessment (SSA)

> Status: v0.22. Structure unchanged; facet framing corrected. See `03-spectrum-of-self-assessment.md`.

**Domain.** Identity, self-concept, self-expression.

**Why this structure is native here.** Clarity and authenticity are genuinely distinct bipoles (clear↔diffuse; self-aligned↔other-oriented). Both poles of both axes are affirming. The 2-axis plane fits.

**Axis A, Identity Clarity.** Campbell et al. (1996) Self-Concept Clarity. Verified.

**Axis B, Self-Alignment.** Kernis & Goldman (2006) authenticity; Snyder (1974) self-monitoring; Wood et al. (2008) authenticity. Verified.

**Results.** Beacon, Prism, Ember, Aurora, plus the Reflection boundary.

**What changed in v0.22.** Structure unchanged. Framing corrected on the facets: Campbell's SCC is **unidimensional** (one factor, verified). The A1/A2 split (Self-Knowledge, Self-Consistency) is a **content-sampling bin**, not two validated sub-factors. Same correction for B1/B2 (Authentic Living, Relational Authenticity). The facet-tension detector still needs two sub-scores per axis to detect cancellation, so the split is retained, but it is now labeled honestly as a content bin retained for tension detection, not a validated facet decomposition. Same data model, honest framing.

The SSA's earlier 10-item rewrite and B1.8→B1.2 swap stand; they were construct improvements independent of this reframe.

---

## 8. Test 4: Passage of Time Assessment (PTA)

> Status: v0.22. Redesigned. Previous v0.21 design (ZTPI composite axis + self-continuity axis + Narrative Coherence designer facet + Archivist/Navigator/Storyteller/Pioneer quadrants + Horizon boundary + fullness-tension logic) is superseded. See `04-passage-of-time-assessment.md`.

**Domain.** How a person relates to time.

**Why the redesign.** The v0.21 PTA had three construct-level problems, all from forcing a 2-axis template onto a multi-factor construct:

1. ZTPI is five factors (Zimbardo-Boyd 1999; Sircova 2014). The v0.21 Axis 1 composited Past-Positive and Future (r = +.26, weakly related) into one bipolar and excluded Past-Negative (rumination) and Future-Negative (dread) under the affirming scope limit. It measured "direction of positive temporal engagement," narrower than "Temporal Direction" as named.
2. The v0.21 Axis 2 Self-Continuity facet was extended to the past self using a book chapter (Sani 2010), and that extension collided item-for-item with SSA's Self-Consistency facet (verified in audit: "I still see the same core person" vs "Feel like the same core self, grown" are the same question).
3. The v0.21 B2 Narrative Coherence facet was a self-report adaptation of interview-coded constructs (McAdams, Adler). It was a designer facet measuring an approximation.

**The v0.22 structure.** Three independent factors, each a single verified construct, each affirming, each scored 0–100 independently:

- **Factor 1: Past-Positive engagement.** ZTPI Past-Positive + Webster (1993) adaptive reminiscence functions. Warm, rooted relationship with where you have been.
- **Factor 2: Present-eudaimonic engagement.** Vowinckel et al. (2015). The validated positive-present factor that ZTPI lacks. Active, meaningful presence.
- **Factor 3: Future engagement.** ZTPI Future + the Future-Positive factor (Stolarski & Matthews 2016, citing Carelli et al.). Anticipatory, goal-directed.

Past-Negative, Present-Fatalistic, and Future-Negative stay excluded under the affirming scope limit (§3). This is now a single framework-level statement, not a scattered honesty note.

**Results.** Eight temporal types, derived from which factor(s) clear the engagement threshold (≥ 60):

- **The Keeper** (Past high): preserves, honors roots.
- **The Witness** (Present high): lives fully in the now.
- **The Wayfinder** (Future high): moves toward horizons.
- **The Hearth** (Past + Present): roots warming the living moment.
- **The Bridge** (Past + Future): spans from roots to horizons.
- **The Flow** (Present + Future): moves forward, fully present.
- **Balanced Time Perspective** (all three engaged): the validated BTP construct (Zimbardo & Boyd; Sobol-Kwapinska & Jankowski 2015).
- **The Wanderer** (none strongly engaged): unbound by any zone; affirming surface of freedom with an explicit scope note that low positive engagement across all zones can also reflect disengagement worth attending to.

Present-focused is now a first-class result, not an exile. No boundary condition, no facet-tension modifier (independent factors, nothing to cancel).

**What changed.** Dropped the 2-axis plane, the self-continuity axis (collides with SSA), the Narrative Coherence designer facet, the fullness-tension logic, and the Archivist/Navigator/Storyteller/Pioneer quadrant names (those were quadrant semantics). Narrative identity drops to profile texture (where interview-coded constructs belong in a self-report test), not a scored axis. The result is a validated 3-factor instrument with eight types, each grounded in a verified construct.

---

## 9. Cross-suite overlap honesty (shared variance map)

The v0.1–v0.21 framework claimed "four non-overlapping domains." The audit showed this is false at the trait level. The honest statement: **four distinct framings over partially shared trait variance.**

Big Five is the backbone nearly everything correlates with. The verified overlap map:

- **SCA.** Loads on Extraversion (activation + approach) and Neuroticism (arousal).
- **MMA.** Loads on Openness-to-Ideas (NFC) and Conscientiousness (FI's negative pole / override diligence).
- **SSA.** Loads on Neuroticism (negatively, via Identity Clarity) and Conscientiousness / Agreeableness (via authenticity).
- **PTA.** Loads on Conscientiousness (Future engagement; Stolarski 2016: ZTPI Future ↔ Conscientiousness r = .60) and, weakly, Openness.

**Notable patterns:**
- **Conscientiousness appears in three tests** (MMA, SSA, PTA). Unavoidable because Conscientiousness is broad. Stated, not hidden.
- **The previous SSA↔PTA identity-stability collision is gone.** PTA no longer measures past-self continuity, so SSA's Self-Consistency and PTA no longer ask the same question.
- **Agreeableness is largely unmeasured** across the suite (only a weak signal via SSA relational authenticity). This is a real coverage gap, stated here rather than implied as comprehensive.

Conceptually the four domains are distinct. At the trait level some correlation is unavoidable, because personality is not orthogonal. The synthesis (§10) surfaces the correlations rather than pretending independence.

---

## 10. The synthesis

The v0.1–v0.21 framework claimed an "8-dimensional radar profile." Without pilot data that claim is overclaiming. The honest synthesis is three layers, all buildable without data:

1. **Narrative integration** (AI layer, with a deterministic fallback). Takes the four results and writes a coherent self-portrait. This is the shareable payoff of taking four tests.
2. **Shared-variance map.** States, per pair of axes or factors, the expected trait correlation, so the user sees the overlap. Example: a high-Future-PTA + high-override-MMA + high-authenticity-SSA respondent is convergently Conscientious across three framings. The map names this rather than treating the four as independent.
3. **Convergence indicators.** Where multiple tests point to the same trait neighborhood, surface it descriptively. Not a new score; a pattern read off the four results against the shared-variance map.

The visualization is a placement of the four results against a stated Big Five backdrop, framed as "where your results cluster," not as a validated 8-dimensional profile. This is the strongest synthesis available without data, and it does not repeat the false-authority move the framework exists to avoid.

---

## 11. Status

Suite-level decisions:
- **Four tests, four domains, four different structures.** Locked v0.22. Structure follows the construct.
- **Uniform methodology at the rigor layer** (validated constructs, format-native measurement, affirming scope limit, honest ceiling, hybrid reporting). Locked v0.22.
- **Affirming scope limit** as a single binding framework constraint (§3). Locked v0.22.
- **Synthesis as narrative + shared-variance map**, not a fake radar. Locked v0.22.

Per-test:
- SCA: v0.22, structure unchanged, honesty tightened. Build and sim remain valid (structure unchanged).
- MMA: v0.22, redesigned (independent NFC/FI + behavioral CRT). Build and sim deleted; rebuild pending.
- SSA: v0.22, structure unchanged, facet framing corrected. Build and sim remain valid (structure unchanged).
- PTA: v0.22, redesigned (3 factors, 7 types). Build and sim deleted; rebuild pending.

Deferred (§2.5): Allinson-Hayes CSI, Kirton KAI, behavioral temporal discounting, Showers card-sort. All require full-text verification before structural use.

---

## 12. References (suite-level)

Per-test references are in each test doc. This framework doc cites only the construct anchors and the methodology sources that apply across the suite.

**Domain anchors:**
- Russell (1980), circumplex model of affect. SCA structural anchor.
- Yik, Russell & Steiger (2011), 12-point affect circumplex. SCA measurability.
- Schimmack & Reisenzein (2002), energetic arousal. SCA Axis A.
- Carver & White (1994), BIS/BAS. SCA Axis B.
- Zuckerman (2007), Sensation Seeking. SCA Axis A facet content.
- Cacioppo & Petty (1982); Cacioppo et al. (1996), Need for Cognition. MMA Scale 1.
- Epstein et al. (1996), Rational-Experiential Inventory (NFC ⊥ FI, r = .08). MMA Scale 2 and orthogonality.
- Frederick (2005), Cognitive Reflection Test. MMA behavioral component.
- Stanovich & West (1997), Actively Open-Minded Thinking; Stanovich & West (2000), dual-process. MMA framework.
- Campbell et al. (1996), Self-Concept Clarity. SSA Axis A.
- Kernis & Goldman (2006); Wood et al. (2008); Snyder (1974), authenticity and self-monitoring. SSA Axis B.
- Zimbardo & Boyd (1999); Sircova et al. (2014), ZTPI. PTA Factors 1 and 3.
- Vowinckel et al. (2015), present-eudaimonic. PTA Factor 2.
- Stolarski & Matthews (2016), incremental validity and Future-Positive split. PTA Factor 3 and cross-suite overlap.
- Webster (1993); Westerhof, Bohlmeijer & Webster (2010), reminiscence functions. PTA Factor 1 content.
- Sobol-Kwapinska & Jankowski (2015), balanced time perspective. PTA balanced type.

**Methodology sources (apply across all tests):**
- Gerlach et al. (2018), four personality types via mixture modeling. Use: empirical defense that types can be data-supported where the construct supports a typology. Not a license to assert types everywhere.
- Kerber et al. (2021), hybrid prototypical and dimensional representation. Use: the suite's reporting pattern.
- McCrae & Costa (1989), MBTI midpoint cliff. Use: reject dichotomizing.
- Schulte et al. (2020), forced-choice ipsativity. Use: reject forced-choice.
- Sun, Schmidt & Henry (2025), Likert vs sliders. Use: reject sliders.
- Chang (1994), Likert point counts. Use: point count follows the source instrument.
- Gosling et al. (2003), ultra-short scale floor. Use: item-count floor.
- Spearman-Brown. Use: reliability projection.

See `CHANGELOG.md` for revision history.
