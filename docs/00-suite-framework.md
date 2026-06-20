# Suite Framework: Solstice Soul Personality Suite

> Status: v0.23 framework document. Depth re-derivation. Each test now measures the *tension inside its theme* rather than the easiest component of it: SCA adds a perceived-trajectory layer; MMA adds a behavioral heuristics battery and reports the stated-vs-observed gap; SSA adds Marcia commitment and an opt-in informant path for real SOKA visibility; PTA adds a temporal-stance layer. The synthesis is reframed around the four internal gaps as a self-congruence profile. Every load-bearing source is full-text verified in the paper-downloads folder. See CHANGELOG v0.23.
> Purpose: define the overall design so the four tests measure four genuinely different things in four genuinely different ways, each capturing the tension its theme actually names, with the synthesis reading the agreements and divergences between methodologies.

---

## 1. The design principle: one theme, one domain, measured at its native depth

Each theme maps to one recognized area of personality psychology. The four tests answer four genuinely different self-knowledge questions.

| Theme | Domain | Self-knowledge question |
|---|---|---|
| Solstice | Affect, energy, motivation | How do you burn, and in which direction is it turning? |
| Turing | Cognition | Does what you say about your mind match what your choices show? |
| Pride | Identity, self-concept | How well do you know, claim, and show yourself : to yourself and to others? |
| Passage of Time | Temporality | How do you engage with time's zones, and what is your stance toward the passage itself? |

The v0.22 rewrite made each test measure *one* validated construct per axis in its native format. The v0.23 finding is that **each theme points at a tension, not a single construct**, and measuring only the easier pole of that tension leaves the theme half-measured. The depth-over-convenience instruction in the research pass forces the conclusion: build the harder component, don't downgrade the construct.

- Solstice names a **turning point with direction**, not a position. v0.22 measured position only.
- Turing names the **Imitation Game** (stated-vs-observed). v0.22 measured stated cognition only (plus a narrow CRT).
- Pride names **knowing, claiming, showing, and being-seen**. v0.22 measured knowing and showing.
- Passage of Time names **engagement with zones AND stance toward passage**. v0.22 measured zone engagement only.

The v0.23 suite adds the missing half of each theme, in the construct's native format, with the gap between the two halves as the interpretive lead.

---

## 2. Uniform methodology, NON-uniform structure, NON-uniform measurement depth

The rigor layer stays uniform from v0.22. The structure layer stays non-uniform from v0.22. v0.23 adds: **the measurement-depth layer is also non-uniform**, because each theme demands a different depth.

### 2.1 What stays uniform (the rigor layer, unchanged from v0.22)

- One validated construct per axis/factor/component, sourced and full-text-verified.
- Measurement format matches construct accessibility (self-report where introspectable, behavioral where not, real informant data where the construct demands it).
- Hybrid dimensional-plus-type reporting; types never asserted where the construct has no validated typology.
- Affirming scope limit (§3) stated once as a binding framework constraint.
- Honest ceiling (no pilot data → no empirical weighting, latent-profile typing, norms, or adaptive testing).

### 2.2 Per-test structure and depth (v0.23)

| Test | Components | Measurement depth | Why this depth |
|---|---|---|---|
| SCA | Position (2-axis circumplex) + perceived trajectory | Static + felt-direction | A solstice is a turning point with direction |
| MMA | Stated engagement (NFC, FI) + observed strategy (heuristics battery) | Self-report + behavioral + gap | The Imitation Game is stated-vs-observed |
| SSA | Clarity + authenticity + commitment + opt-in visibility | Self-report + (opt-in) informant | Pride is knowing, claiming, showing, being-seen |
| PTA | Zone engagement (3 factors) + temporal stance | Self-report (two layers) | Engagement with zones ≠ stance toward passage |

Four methodologies, four depths. Coherence lives at the rigor layer.

### 2.3 The affirming scope limit (unchanged from v0.22, restated)

The suite measures the affirming range of each construct and cannot detect maladaptive patterns. One line on every result screen. The v0.23 depth additions make this constraint more salient, not less: the SCA trajectory "waning" pole, the SSA informant-path large-gap reading, and the PTA stance "burden" pole all brush against the scope limit and are framed with explicit care in their test docs.

---

## 3. Per-test specifications (v0.23)

### Test 1 : SCA: position + perceived trajectory

> Full design: `01-solstice-cycle-assessment.md`.

**Domain.** Affect, energy, motivation.

**Why v0.23 adds trajectory.** The v0.22 SCA measures circumplex position (Russell) and approach-withdrawal (Carver-White). The solstice, however, is the moment a cycle reverses : it is defined by direction-of-travel, not position. Adding a perceived-trajectory layer measures the felt direction of the cycle the season names.

**The trajectory construct.** Carver & Scheier's self-regulation theory (the same research program as the verified Carver & White BIS/BAS) is built on feedback processes with goal gradients: people perceive their rate of progress toward or away from desired end-states, and that perceived trajectory is a validated driver of affect. The v0.23 trajectory items measure perceived direction-of-travel on the two SCA axes (am I moving toward more activation or less? toward more approach or less?).

**Evidence vs synthesis.** Circumplex position is validated (Russell; Carver-White). Perceived goal-gradient progress is validated as a mechanism (Carver-Scheier). **Combining the two into a position-plus-trajectory result is our synthesis and is unvalidated.** Stated as such.

**Results.** Seasons retain their position meaning and gain a direction modifier: e.g., "Summer, waxing" (arrived at the peak, still climbing) vs "Summer, waning" (at the peak, feeling it turn). The solstice poetry (reversal) finally has a measured referent.

### Test 2 : MMA: stated engagement + observed strategy + gap

> Full design: `02-modes-of-mind-assessment.md`.

**Domain.** Cognition.

**Why v0.23 adds the heuristics battery and the gap.** The Imitation Game is the Turing theme: can a hidden mind be identified from its outputs, and does what it says about itself match what it does. v0.22 MMA measured stated cognition (NFC, FI) plus a narrow CRT. The theme-native measurement is **stated-vs-observed**: state your cognitive engagement, then solve decision problems, and read the gap.

**The strategy construct.** Gigerenzer & Gaissmaier (2011, verified) document "systematic individual differences in the use of heuristics." Luan, Schooler & Gigerenzer (2011, verified) score fast-and-frugal trees per-individual via signal-detection theory. Behavioral strategy is a stable individual difference, measured from choice behavior.

**Evidence vs synthesis.** NFC, FI (Epstein 1996, verified), and heuristics use (Gigerenzer 2011, Luan 2011, verified) are each validated. **The stated-vs-observed gap as the interpretive lead is our synthesis and is unvalidated.** It is conservative because the gap is a transparent computation over two validated measurements, but no study has validated the gap as a construct.

**Results.** The quadrant type (Integrator/Logician/Reader/Operator from NFC×FI) is reported alongside an observed-strategy read (take-the-best/tallying/adaptive) and the signed gap between stated and observed. The result reads as a Turing signature: "you say X; your choices show Y."

**Build requirement.** The heuristics battery is a behavioral decision task with a prior-exposure problem (strategies are teachable). It requires a refreshed/rotated item bank at launch. This is beyond a single-session static form and is flagged as a build feature.

### Test 3 : SSA: clarity + authenticity + commitment + opt-in visibility

> Full design: `03-spectrum-of-self-assessment.md`.

**Domain.** Identity, self-concept, self-expression.

**Why v0.23 adds commitment and visibility.** Pride is multi-act: knowing, claiming, showing, being-seen. v0.22 SSA measured knowing (Campbell SCC) and showing (Kernis-Wood authenticity). It asserted the claim and the relational half. The depth instruction forces building them.

**The added components.**
- **Commitment** (Marcia 1966, verified): the identity-commitment dimension measures whether identity is claimed ("this is who I am") or provisional ("I'm still exploring"). Earlier the suite rejected Marcia wholesale as developmental; that was wrong, because the *commitment* dimension specifically is the Pride claim-act and is meaningful in adults.
- **Visibility** (Vazire 2010 SOKA, verified; Beer & Vazire 2017, verified): the actual self-other agreement gap, computed from a real friend rating on the same clarity/authenticity items. Real SOKA requires real informants (Vazire 2010 used friends and strangers; Beer & Vazire 2017 call behavioral predictive validity "preliminary" even with informants). The paired-self-other item format measures *perceived* asymmetry, not SOKA : so the depth answer is the opt-in informant path.

**Evidence vs synthesis.** Clarity (Campbell), authenticity (Wood/Kernis), commitment (Marcia), and SOKA (Vazire, with informants) are each validated. **The four-component combination as a structural definition of Pride is our synthesis and is unvalidated.**

**Results.** With informants: a four-component Pride profile including the real visibility gap. Without informants (user declines): a three-component self-only read with an explicit "visibility not measured" note.

**Build requirement.** The informant path is a real product feature: consent, privacy, asynchronous invitations, voluntary, low completion rate. Flagged as a build feature; the test degrades gracefully to self-only when declined.

### Test 4 : PTA: zone engagement + temporal stance

> Full design: `04-passage-of-time-assessment.md`.

**Domain.** How a person relates to time.

**Why v0.23 adds the stance layer.** The three zone factors (Past-Positive, Present-eudaimonic, Future) measure *which* temporal zones you engage. The theme : the passage of time : is also about your relationship to the passage *itself*, independent of which room you are in. Time is the one medium you cannot opt out of; the deepest PTA question is how you relate to that fact.

**The stance construct.** Carstensen (2021, verified, gnab116) shows perceived time horizons (expansive vs limited) reshape motivation : the perception of time is a validated individual difference. The v0.23 stance layer measures stance toward passage (resource, weight, gift, mystery), grounded in Carstensen's perceived-horizon construct.

**Evidence vs synthesis.** The three zone factors are validated (Zimbardo-Boyd 1999; Sircova 2014; Vowinckel 2015; verified). Carstensen's perceived-horizon mechanism is validated. **The four-stance typology (resource/weight/gift/mystery) and its combination with the zone factors are our synthesis and are unvalidated.**

**Results.** The 8 temporal types (Keeper, Witness, Wayfinder, Hearth, Bridge, Flow, Balanced, Wanderer) retain their zone meanings and gain a stance modifier. The "weight" stance brushes the affirming scope limit (passage-as-weight can shade into hopelessness) and is reframed as "a weight you carry with dignity," with an explicit scope note.

---

## 4. The synthesis: self-congruence across four methodologies

This is where the v0.23 depth re-derivation pays off. Once each test measures *two things in tension* (position vs direction, stated vs observed, self vs other, engagement vs stance), the suite-level synthesis reads the **internal gaps** as the richest signal.

| Test | Internal gap the synthesis reads |
|---|---|
| SCA | Position vs perceived trajectory (am I at a peak and still climbing, or at a peak and feeling it turn?) |
| MMA | Stated engagement vs observed strategy (does what I say about my mind match what my choices show?) |
| SSA | Self-ratings vs informant ratings on the same items (does what I know and claim about myself match what others see?) |
| PTA | Zone engagement vs temporal stance (does how I spend my time match how I feel about time passing?) |

A user with small gaps across all four tests is *self-congruent* in a measurable sense. A user with large gaps everywhere is *divergent* : their stated self, their behavior, their informants' view, and their felt direction all disagree. The synthesis reports this as a **self-congruence profile**, alongside the narrative integration and the shared-variance map from v0.22.

**Evidence vs synthesis.** The four internal gaps are transparent computations over the validated component measurements. **Reading their cross-test agreement as a self-congruence profile is our synthesis and is unvalidated.** It is conservative because it claims no new construct, only a computed pattern. Stated as such.

---

## 5. Cross-suite overlap honesty (shared variance map)

The v0.22 honesty stands and is deepened by the v0.23 components:

- **Conscientiousness** appears in MMA (override, NFC-diligence), SSA (authenticity, commitment stability), and PTA (future engagement). Three tests.
- **Extraversion** is the backbone of SCA approach.
- **Neuroticism** loads negatively on SSA clarity and on SCA arousal.
- **Openness** loads on MMA NFC.
- **Agreeableness** is largely unmeasured (weak signal via SSA relational authenticity). Stated gap.
- **The previous SSA↔PTA identity-stability collision is gone.** PTA no longer measures past-self continuity.

The four domains are distinct framings over partially shared trait variance. The synthesis surfaces the overlap rather than pretending independence.

---

## 6. Status

Suite-level decisions (v0.23):
- Each test measures the tension inside its theme, in the construct's native format. Locked v0.23.
- Self-congruence synthesis (four internal gaps) as the suite payoff. Locked v0.23.
- Affirming scope limit as binding framework constraint. Locked (v0.22, restated).
- Uniform methodology at the rigor layer; non-uniform structure; non-uniform depth. Locked (v0.22 + v0.23).

Per-test:
- SCA v0.23: position + perceived trajectory.
- MMA v0.23: stated + observed + gap (heuristics battery is a build feature).
- SSA v0.23: clarity + authenticity + commitment + opt-in informant path (informant path is a build feature).
- PTA v0.23: zone engagement + temporal stance.

Build status:
- SCA build exists for position; trajectory component is a v0.23 spec addition (build pending).
- MMA build deleted in v0.22; rebuild pending against v0.23 (includes behavioral heuristics battery).
- SSA build exists for clarity + authenticity; commitment and informant path are v0.23 additions (build pending).
- PTA build deleted in v0.22; rebuild pending against v0.23 (includes stance layer).

Deferred / out-of-scope (stated, not hidden):
- Lee & Cummins (2004) and Nosofsky & Bergert (2007) primary heuristics individual-difference studies : cited by the verified Gigerenzer review, not full-text-reviewed. The verified review is sufficient to build on.
- Wittmann subjective-time primary sources for PTA stance : Carstensen (gnab116) is sufficient to build on without them.
- Carver & Scheier (1990) control-process canonical citation for SCA trajectory : the verified Carver-White BIS/BAS grounds the same research program.

---

## 7. References (suite-level, all verified)

Per-test references are in each test doc. This framework doc cites the construct anchors across the suite and the methodology sources.

**SCA:** Russell (1980); Yik, Russell & Steiger (2011); Schimmack & Reisenzein (2002); Carver & White (1994); Zuckerman (2007); Carver-Scheier self-regulation theory (textbook, same program as verified Carver-White).

**MMA:** Cacioppo & Petty (1982); Cacioppo et al. (1996); Epstein et al. (1996); Frederick (2005); Stanovich & West (1997, 2000); Gigerenzer & Gaissmaier (2011); Luan, Schooler & Gigerenzer (2011).

**SSA:** Campbell et al. (1996); Kernis & Goldman (2006); Wood et al. (2008); Snyder (1974); Marcia (1966); Vazire (2010); Beer & Vazire (2017); Carlson, Vazire & Oltmanns (2013).

**PTA:** Zimbardo & Boyd (1999); Sircova et al. (2014); Vowinckel et al. (2015); Stolarski & Matthews (2016); Webster (1993); Westerhof, Bohlmeijer & Webster (2010); Sobol-Kwapinska & Jankowski (2015); Carstensen (2021).

**Methodology (all tests):** Gerlach et al. (2018); Kerber et al. (2021); McCrae & Costa (1989); Schulte et al. (2020); Sun, Schmidt & Henry (2025); Chang (1994); Gosling et al. (2003); Spearman-Brown.

See `CHANGELOG.md` for revision history.
