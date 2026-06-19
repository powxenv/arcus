# Test 2: The Modes of Mind Assessment (MMA)

> Status: v0.22 design document. Redesigned from the v0.3 design. The previous collapsed NFC×FI bipolar axis, the Riding D1/D2 axis (self-report on a behavioral construct), and the Algorithm/Cipher/Gestalt/Architecture quadrants are superseded. The v0.22 MMA restores Epstein's verified orthogonality (NFC ⊥ Faith-in-Intuition, r = .08) as two independent self-report scales and adds a behavioral CRT component for the override signal self-report cannot capture. See CHANGELOG v0.22.
> Position: The Turing-themed test of the four-test Solstice Soul suite.
> Theme served: Alan Turing (computing, code-breaking, the many valid ways a mind can think).
> Honesty statement: The MMA is an original, theory-informed assessment for reflection and play. Its two self-report scales are grounded in full-text-verified constructs: Need for Cognition (Cacioppo & Petty, 1982) and Faith in Intuition (Epstein et al., 1996, REI), which are verified orthogonal (r = .08). Its behavioral component is grounded in the Cognitive Reflection Test (Frederick, 2005). It is not independently validated and is not clinical. Cognitive processes are partly unconscious, and self-report is a weaker measure for cognitive style than for the affective and identity constructs in Tests 1 and 3; the behavioral component is included specifically to mitigate this where self-report is mismatched. This is an explicit tradeoff stated in §10. The four result names are an interpretive metaphor drawn from computing, not a claim that minds are literally algorithms.

---

## 1. The name

**The Modes of Mind Assessment (MMA).**

"Modes" signals dual-process theory (the two engagement modes of mind: rational and experiential). "Mind" is the domain. The in-game UI may use "The Turing Modes" as a friendlier label.

---

## 2. Theoretical foundation (each source verified against full-text)

### 2.1 Structural sources

- **Cacioppo and Petty (1982), Need for Cognition Scale (JPSP).** Four studies developing and validating the NFC. One major factor; NFC is unidimensional. Items measure "the tendency for an individual to engage in and enjoy thinking" (p. 116). Unrelated to social desirability, weakly related to cognitive style, weakly negatively related to dogmatism, positively correlated with intelligence. Items are entirely about enjoyment and engagement, not speed or ability. *Use:* core anchor for Scale 1. The unidimensionality finding means NFC is scored as a single scale, not split into facets.

- **Cacioppo, Petty, Feinstein and Jarvis (1996), NFC meta-analysis (Psychological Bulletin).** Confirms NFC as a stable disposition distinct from intelligence. *Use:* backs up Scale 1.

- **Epstein, Pacini, Denes-Raj and Heier (1996), Rational-Experiential Inventory (JPSP).** Two studies. Factor analysis produced **two orthogonal factors**: NFC (rational) and Faith in Intuition (FI, experiential), r = .08. A person can be high in both, low in both, or anywhere in between; they are not opposites. The 10-item short form (5 NFC + 5 FI) had α = .73/.72; at 8+ items the Spearman-Brown projection exceeds .85. *Use:* core anchor for Scale 2 and the central structural decision. **The v0.22 MMA restores this orthogonality.** The v0.3 MMA destroyed it by collapsing NFC and FI into one bipolar axis. Two independent scales is the verified-faithful implementation.

- **Frederick (2005), Cognitive Reflection Test (J. Economic Perspectives).** Three problems (bat-and-ball, widget machines, lily pad), each with an intuitive-but-wrong answer that requires deliberate override to avoid. CRT scores predict decision-making biases above IQ. *Use:* anchor for the behavioral Component 3. CRT cannot be self-reported (asking "do you override your intuitions?" lets the intuitive system answer). The behavioral format is the validated measure.

- **Stanovich and West (2000), Individual differences in reasoning (BBS).** Establishes that thinking dispositions predict reasoning performance above cognitive ability. Introduces the dual-process framework (System 1 vs System 2). The key mechanism: cognitive decontextualization. *Use:* the framework linking Scale 1 (engaging System 2) and Component 3 (using System 2 to check).

- **Stanovich and West (1997), Actively Open-Minded Thinking.** AOT is a composite (α = .88) that substantially overlaps with Big Five Openness (two of six subscales are NEO-PI-R facets). *Use:* supplementary corroboration and profile texture (open-minded vs certain coloring), not a structural axis.

### 2.2 Sources rejected after full-text review

- **Riding (1997), Wholist-Analytic cognitive style.** Two independent dimensions, validated behaviorally via the Cognitive Styles Analysis (reaction time). Riding explicitly rejected self-report for cognitive style ("inability to report accurately, unwillingness to make the necessary effort, social desirability bias," p. 31). The v0.3 MMA used self-report Likert on Riding, against Riding's own measurement argument. *Use in v0.22: rejected as a structural axis.* The self-report mismatch was a verified-evidence violation. (Note: Riding cites Allinson & Hayes 1996 as a validated self-report cognitive-style instrument. Allinson-Hayes is deferred pending full-text verification per 00 §2.5; until verified, the MMA uses the verified REI.)

- **Nisbett, Peng, Choi and Norenzayan (2001), culture and systems of thought.** Cross-cultural corroboration of holistic vs analytic. *Use in v0.22:* noted as construct context; not structural.

### 2.3 Why two independent scales, not one bipolar axis

This is the central redesign decision, and it is forced by the verified evidence. Epstein et al. (1996) found NFC and FI are orthogonal (r = .08). The v0.3 MMA collapsed them into a single bipolar axis, which:

- destroyed the validated two-factor structure;
- made mid-axis scores psychometrically meaningless (a mid-score could mean high-in-both, low-in-both, or genuinely intermediate);
- could not distinguish a person who engages both systems richly from a person who engages neither.

The v0.22 MMA reports NFC and FI as two independent scales, exactly as Epstein validated them. The four quadrant combinations are now genuine: high-high (engages both), high-low (deliberate-only), low-high (intuitive-only), low-low (engages neither). This is strictly more faithful to the verified research than the v0.3 collapse.

### 2.4 Why a behavioral component, and only one

The override/verification signal (do you check your intuitions?) is not introspectable in the way NFC and FI are. Frederick (2005) built the CRT behaviorally precisely because self-report fails here: you cannot ask someone whether they override their gut and trust the answer, because the gut answers. The v0.22 MMA therefore includes Component 3 as a behavioral check, scored on override rate, reported alongside the two self-report scales.

Component 3 is the only behavioral component in the suite. The other three tests measure constructs that are introspectable (affect, identity, time perspective). Cognition is the one domain where the validated format diverges from self-report for at least one construct, and the MMA reflects that.

### 2.5 Response-format sources (decided per construct)

NFC and FI use **5-point agree-disagree unipolar Likert**, the native format of both the Cacioppo-Petty NFC and the Epstein REI. This is a deliberate departure from the 7-point bipolar format used in SCA and SSA. NFC and FI are unipolar engagement scales, not bipoles. Forcing them into bipolar items would recreate the v0.3 error in a different form.

- Chang (1994), five-point Likert.
- Sun, Schmidt & Henry (2025), reject sliders.
- McCrae & Costa (1989); Schulte et al. (2020), reject dichotomizing and forced-choice.
- Spearman-Brown, eight items per scale projects α .85 to .92.

### 2.6 Honesty notes

**Honesty note 1: NFC and FI overlap with personality.** NFC correlates with Openness-to-Ideas; FI's negative pole shades toward low Conscientiousness diligence. These are validated constructs the MMA builds on. The contribution is the cognitive framing and the orthogonality, which the v0.3 collapse discarded.

**Honesty note 2: Self-report is a compromise for cognitive engagement, even where validated.** NFC and FI are more introspectable than cognitive style (you know whether you enjoy thinking), but they are still self-reports of cognitive engagement, which carries more measurement error than self-reports of felt states. The behavioral CRT component mitigates this for the override signal specifically.

**Honesty note 3: The behavioral CRT has a prior-exposure problem.** The canonical CRT items are public. A user who has seen them recognizes the trick and gets them right for the wrong reason, inflating their override score. At launch, item selection should account for this (use a refreshed item bank or rotate items). This is a launch decision, not a design flaw; stated here for honesty.

**Honesty note 4: The Operator quadrant (low NFC + low FI) is the affirming-framing risk.** It reads, on the surface, as "doesn't think much." Reframed as action-oriented, pragmatic, low-dwelling. Real and affirming. Under the affirming scope limit, the MMA cannot detect genuine cognitive disengagement that warrants attention.

---

## 3. Why the framework fits the Turing theme

Turing's core insight was that there are many valid ways a mind can think. The Imitation Game asks whether a hidden mind can be inferred from its outputs. The MMA asks the inverse: given your outputs (your self-report and your behavioral responses), which mode of mind is yours? The behavioral component makes this literal: the user is given problems and their outputs are observed, which is the structure of the Imitation Game applied to the player.

The four quadrant types each represent a distinct, valid relationship between rational and experiential engagement. None is superior. The Turing resonance is structural, not decorative.

The test's framing: *Turing showed that minds, like machines, come in different architectures. Which of these is yours?*

---

## 4. The dimensions measured

Two independent self-report scales (each 0 to 100) plus one behavioral component (0 to 100 override rate).

**Scale 1, Need for Cognition.** How much you engage in and enjoy effortful thinking.
- Construct basis: Cacioppo & Petty (1982). Unidimensional.
- High: you find thinking satisfying and seek it out.
- Low: thinking is a tool you use when needed, not a pleasure.

**Scale 2, Faith in Intuition.** How much you trust experiential, gut-level processing.
- Construct basis: Epstein et al. (1996) REI. Verified orthogonal to NFC (r = .08).
- High: you trust your gut and follow it.
- Low: you distrust gut feelings and prefer explicit reasoning.

**Component 3, Cognitive Override.** Whether you check your intuitions before trusting them. Behavioral, not self-report.
- Construct basis: Frederick (2005) CRT.
- Scored as override rate (fraction of items where the intuitive wrong answer was overridden).

The two scales are scored independently and define the quadrant. Component 3 is reported alongside as a behavioral profile modifier.

---

## 5. The four result types

Quadrant from the NFC and FI thresholds (≥ 60 engaged):

| | **FI high (intuitive)** | **FI low (distrusts gut)** |
|---|---|---|
| **NFC high (enjoys thinking)** | 🧬 **The Integrator** | 🔬 **The Logician** |
| **NFC low (thinking is a tool)** | 🎯 **The Reader** | ⚙️ **The Operator** |

Plus **The Generalist** boundary (near-center on both scales).

One-line essences:
- 🧬 **The Integrator** (NFC high + FI high). You engage both reasoning and intuition richly, and you trust both.
- 🔬 **The Logician** (NFC high + FI low). You think deliberately and distrust gut; reasoning is your native mode.
- 🎯 **The Reader** (NFC low + FI high). You are pattern-fluent and intuitive; you don't dwell in analysis.
- ⚙️ **The Operator** (NFC low + FI low). You act over reflection; neither mode dominates.
- **The Generalist** (near-center both). Genuinely moderate on both engagement scales.

Component 3 (override rate) is reported alongside the type as a behavioral profile: e.g., "Logician with high override (checks gut rigorously)" vs "Logician with low override (thinks hard but trusts first conclusions)." This four-fold type × override combination gives each result texture beyond the quadrant.

Full profiles live in `02b-modes-result-profiles.md`.

---

## 6. Methodology and scoring

**Step 1, collect.** 16 self-report responses (8 NFC + 8 FI), each 1 to 5. Plus 5 behavioral CRT-style items.

**Step 2, direction-normalize.** All self-report items are written so "agree" means more engagement. No reverse-keying needed.

**Step 3, scale scores.** NFC = mean of its 8 items, scaled 0 to 100: `((mean − 1) / 4) × 100`. Same for FI.

**Step 4, behavioral score.** Override rate = (items answered correctly) / (total items), scaled 0 to 100. The "correct" answer is the one that requires overriding the intuitive wrong response.

**Step 5, quadrant assignment.** Apply the engagement threshold (≥ 60) to NFC and FI independently. The high/low pattern selects one of the four types. Near-center on both (within ±5 of 60) yields The Generalist.

**Step 6, prototypicality.** Distance of (NFC, FI) from (50, 50), scaled by max distance (70.7). Reported as type-strength.

There is no facet-tension modifier. The two scales are independent and cannot cancel. The behavioral component is a separate reported score, not crossed into the quadrant.

---

## 7. Question format and response scale

**Two formats in one test:**

- **Self-report scales (NFC, FI):** 5-point agree-disagree unipolar Likert, statement format. Native to Cacioppo-Petty NFC and Epstein REI.
- **Behavioral component (CRT):** problem-solving items with a free-text or multiple-choice response. Scored on correctness, not agreement.

This mixed-methods design is deliberate. Self-report measures engagement (introspectable); behavioral measures override (not introspectable). The format matches the construct in each case.

---

## 8. Item bank

**Scale 1: Need for Cognition (8 items).** Engagement with and enjoyment of effortful thinking. Native NFC content.

| # | Statement |
|---|---|
| N1.1 | I enjoy thinking hard about problems, even when I don't have to. |
| N1.2 | I prefer complex problems over simple ones. |
| N1.3 | Thinking is something I do for pleasure, not just when I have to. |
| N1.4 | I find it satisfying to work through a difficult idea. |
| N1.5 | I would rather figure something out myself than be told the answer. |
| N1.6 | I enjoy intellectual challenges. |
| N1.7 | I like to understand the reasoning behind things, not just the conclusion. |
| N1.8 | Thinking deeply about something is its own reward for me. |

**Scale 2: Faith in Intuition (8 items).** Trust in experiential, gut-level processing. Native Epstein REI FI content.

| # | Statement |
|---|---|
| I2.1 | I trust my initial impressions of people. |
| I2.2 | I often make decisions based on gut feeling. |
| I2.3 | I rely on my intuition to guide me. |
| I2.4 | I believe in listening to my feelings. |
| I2.5 | When something feels right, I trust it even before I can explain why. |
| I2.6 | I'm good at sensing things without being able to put them into words. |
| I2.7 | My first instinct is usually worth following. |
| I2.8 | I trust the part of me that just knows, without needing reasons. |

**Component 3: Cognitive Reflection Test (5 items).** Behavioral problem-solving. Each item has an intuitive wrong answer and a deliberative right answer. Scored on override rate.

The canonical Frederick (2005) three items (bat-and-ball, widget machines, lily pad) plus two CRT-style items in the same format. **Launch caveat:** the canonical items are public and prior exposure inflates scores. A launch implementation should use a refreshed or rotated item bank. The specific items are a launch decision; the component structure (5 behavioral override items, scored on correctness) is the v0.22 design.

**Notes.** All self-report items are engagement-positive; disagreement reads as "this isn't how I engage," not as deficit. A launch pass should run an internal-consistency check per scale and drop or replace the weakest 1 to 2 items if any scale alpha falls below .75.

### 8.1 The short form (MMA-13)

Curated 4 items per scale from the 16-item self-report bank, plus the behavioral component unchanged (the CRT is already short). Screening-tier for the self-report portion (α ≈ .60 to .70).

**MMA-13 self-report = {N1.1, N1.4, N1.6, N1.8, I2.2, I2.3, I2.5, I2.7}** (8 items, 4 per scale) plus the 5 behavioral CRT items = 13 items total. The number reflects the actual item count (8 self-report + 5 behavioral); the self-report portion is half the standard form's 16.

The short-form caveat appears on MMA-13 results.

---

## 9. Interpretation and reporting

A result has three layers:
1. **Your mode** (one of four quadrants, or The Generalist). The shareable label.
2. **Your two scale scores plus your override rate** (NFC, FI, override, each 0 to 100). The measurement.
3. **Your narrative.** Two to three personalized paragraphs, ending with a "your mode of mind" line. Gemini layer per the GDD, deterministic fallback.

**Deterministic fallback.** 4 quadrant profiles + 1 Generalist profile (see `02b-modes-result-profiles.md`), modulated by prototypicality and the override rate. Fully playable without the API.

**Never reported as:** an IQ score, a competence ranking, a learning style (the MMA explicitly does not claim instructional consequences), or a clinical assessment.

---

## 10. Strengths, limitations, intended use

**Strengths.**
- Two independent validated self-report scales that restore Epstein's verified orthogonality, which the v0.3 collapse destroyed.
- A behavioral component (CRT) for the override signal that self-report cannot capture, in the construct's native format.
- Dropped the Riding axis, which was self-report-mismatched (Riding rejected self-report explicitly).
- Four genuinely independent quadrant types, not collapsed-bipolar types.
- Turing resonance is structural, including the behavioral "given tasks, observe outputs" inversion.

**Limitations.**
- Not a validated clinical instrument. Not independently psychometrically evaluated.
- Self-report is a compromise for cognitive engagement, even where validated. NFC and FI are more introspectable than cognitive style, but carry more measurement error than self-reports of felt states.
- The behavioral CRT has a prior-exposure problem (canonical items are public; prior exposure inflates override scores). A launch item bank must account for this.
- The Operator quadrant (low NFC + low FI) is the affirming-framing risk; reframed as pragmatic and action-oriented, but the MMA cannot detect cognitive disengagement that warrants attention.
- NFC overlaps with Openness-to-Ideas; FI's low pole overlaps with low Conscientiousness-diligence. Cross-suite overlap stated in 00 §9.

**Intended use.** Reflective self-discovery and play within the Solstice Soul game.

**Explicitly not intended for.** IQ, aptitude, competence assessment, learning-style instructional matching, employment decisions, or any high-stakes real-world application.

---

## 11. Status

- Name: The Modes of Mind Assessment (MMA).
- Structure: 2 independent self-report scales (NFC, FI) + 1 behavioral component (CRT). 4 quadrant types + Generalist boundary. v0.22.
- Format: mixed (5-pt unipolar self-report + behavioral problem-solving).
- Item bank: 16 self-report (8 NFC + 8 FI) + 5 behavioral. None pilot-tested.
- Short form: MMA-13 (4 self-report per scale + behavioral).
- Citations: 6 structural sources verified (Cacioppo & Petty 1982; Cacioppo et al. 1996; Epstein et al. 1996; Frederick 2005; Stanovich & West 1997, 2000). Rejected: Riding (1997, self-report mismatch); Nisbett et al. (2001, not structural in v0.22). Deferred: Allinson-Hayes CSI (00 §2.5).
- Profiles: `02b-modes-result-profiles.md` contains the 5 profiles (v0.22 drafts).
- Build and simulation: deleted (implemented v0.3 framework). Rebuild pending against v0.22.
- Research paper: `docs/MMA-research-paper.md` updated to v0.22.

See `CHANGELOG.md` for revision history.
