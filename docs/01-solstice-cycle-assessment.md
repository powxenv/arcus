# Test 1: The Solstice Cycle Assessment (SCA)

> Status: v0.7 design document. Theme-calibration pass complete. Solstice metaphor corrected, scoring thresholds justified, items de-confounded, hemisphere-aware.
> Position: The solstice-themed test of the four-test Solstice Soul suite.
> Theme served: June Solstice (light and dark, cycles, turning points).
> Honesty statement: The SCA is an original, theory-informed assessment for reflection and play. Its structure is inspired by validated models of affect (Russell's circumplex) and motivation (approach and withdrawal). It is not independently validated and is not clinical. Seasonal names are an interpretive metaphor, not a claim that personality is literally seasonal. Two further honesty notes: (1) Russell's circumplex is a model of momentary affect, a state model. We use its structure to organize trait-like dispositions, a move supported by the trait-affect literature but stated here openly rather than implied. (2) The June solstice is summer in the Northern Hemisphere and winter in the Southern. The SCA uses internal, hemisphere-neutral seasons and does not assume a hemisphere.

---

## 1. The name

**The Solstice Cycle Assessment (SCA).** Locked v0.3.

"Assessment" signals a serious instrument (NEO-PI, TEMPS, BIS/BAS). "Cycle" signals the circumplex foundation and the solstice's cyclical nature. "Solstice" ties it to theme and suite.

The in-game UI may use the friendlier "Solstice Compass" label, but the framework name is SCA.

---

## 2. Theoretical foundation (each source states its use)

Structure comes from validated models. Texture comes from classical and archetypal ones. The boundary is stated explicitly. That boundary is what makes the framework credible rather than pseudo-scientific.

### 2.1 Structural sources (define what we measure)

- **Russell (1980), Circumplex Model of Affect.** Affect is organized on a circle defined by two orthogonal axes, activation and valence. *Use:* core geometric anchor. A circle is the correct shape for anything seasonal, because seasons are cyclical.
- **Yik, Russell and Steiger (2011), 12-Point Affect Circumplex Scales.** Validated instrument for the circumplex. *Use:* evidence that the circular structure is measurable, not just conceptual.
- **Thayer (1989), energetic arousal.** A studied dimension of felt energy versus tiredness. *Use:* grounds Axis A's high pole (brightness) in a real construct.
- **Carver and White (1994), BIS/BAS scales.** **Gable and Harmon-Jones, approach and avoidance motivation.** Validated motivational dimension, energy moving toward versus away. *Use:* grounds Axis B (Tidal Direction) in approach and withdrawal. Cleaner for our theme than circumplex valence.
- **Horne and Ostberg (1976), Morningness-Eveningness Questionnaire.** Chronotype as temporal rhythm. *Use:* motivates framing the result as a phase on a cycle rather than a fixed box.

### 2.2 Textural sources (define how we describe)

- **Classical four temperaments (Hippocrates and Galen), revived as affective temperaments by Akiskal (TEMPS-A).** *Use:* archetype flavor only (sanguine, melancholic, and so on).
- **Kwapil et al. (2013), affective temperaments as Big Five dimensions.** *Use:* the caveat. Their work shows affective temperaments largely reduce to Big Five dimensions, so we borrow the poetry, never the clinical claims. All low-activation descriptions are reframed as depth and restoration.
- **Big Five and HEXACO.** The consensus dimensional baseline. *Use:* reality check that our axes do not reinvent variance already captured elsewhere. Stated overlap in §8.

### 2.3 Why four types is defensible

- **Gerlach, Farb, Revelle and Amaral (2018, Nature Human Behaviour).** Clustering and latent-profile analysis on roughly 1.5 million people yielded four replicable types (Average, Reserved, Role-Model, Self-Centered). *Use:* empirical defense that four types can be data-supported, not arbitrary.
- **Kerber, Roth and Herzberg (2021), Personality types revisited.** Argues for a hybrid prototypical and dimensional representation. *Use:* justifies our scoring pattern. Dimensional underneath, labelled type on top.

### 2.4 Response-format sources (decide how we ask)

- **McCrae and Costa (1989), reinterpreting the MBTI.** MBTI's binary dichotomies show no bimodality. Dichotomizing discards about 26 to 32 percent of information and inflates reliability. *Use:* reason to reject binary A/B forced choice.
- **Schulte, Holling and Burkner (2020).** Pure forced-choice yields ipsative scores that cannot compare people. *Use:* reason to reject forced-choice scoring.
- **Backstrom and Bjorklund (2024).** Forced-choice and Likert converge with enough items. Forced-choice's faking-resistance advantage is overstated. *Use:* reason not to sacrifice dimensional information for a marginal faking benefit.
- **Sun, Schmidt and Henry (2025), "Don't Let Your Likert Scales Grow Up To Be Visual Analog Scales."** Visual analogue scales (0 to 100 sliders) do not outperform Likert and add measurement error, especially with few items. *Use:* primary reason to reject the slider format proposed in v0.1.
- **Zhang et al. (2025, Assessment).** Compared Likert against three slider formats on a validated scale (CES-D). Likert held up best. *Use:* corroborates the rejection of sliders.
- **Kuhlmann, Dantlgraber and Reips (2017).** Visual analogue and Likert scales often fail measurement equivalence. *Use:* corroborates the rejection of sliders.
- **Vollbracht et al. (2026).** Sliders have some phone-UX advantages but the psychometric case is unsettled. *Use:* context for the slider decision, kept for honesty about the trade-off.
- **Chang (1994), four-point and six-point Likert scales.** *Use:* grounds the choice of seven points (at least five, with strong discrimination and low cognitive load).
- **Gosling, Rentfrow and Swann (2003), TIPI.** **Gliem and Gliem (2003), Cronbach's alpha.** Ultra-short scales (two items per dimension) are too thin for acceptable reliability. *Use:* sets the item-count floor.
- **Spearman-Brown prophecy formula.** Reliability rises monotonically with item count, with diminishing returns past 8 per facet. *Use:* grounds the 8-items-per-facet standard, where expected Cronbach's alpha reaches the .85 to .92 strong band.

### 2.5 Facet grounding (added v0.6)

The facets under each axis are grounded in validated sub-constructs, not invented.

**Axis A facets.**
- **A1 Baseline Arousal:** Thayer (1989), energetic arousal. The tonic activation set-point, felt as energy versus tiredness. Distinct from tense arousal, which we do not measure.
- **A2 Stimulation Appetite:** Zuckerman (1979), Sensation Seeking. The preferred level of varied, novel, and intense stimulation. Validated four-factor instrument; we draw on the general preference dimension.

**Axis B facets.**
- **B1 Social Approach:** DeYoung, Quilty and Peterson (2007), Big Five Aspect Scales. Extraversion splits into Enthusiasm (sociability, positive emotion, affiliation) and Assertiveness. B1 maps to the Enthusiasm aspect.
- **B2 Experiential Approach:** DeYoung, Quilty and Peterson (2007), the Assertiveness aspect of Extraversion (proactive agency, action initiation, drive toward goals and impact), reframed as experiential approach to fit the affect and motivation domain. The agentic-versus-affiliative split also mirrors Carver and White (1994) BAS subtypes (Drive, Fun-Seeking, Reward-Responsiveness).

Honesty note. The facet split is theory-grounded, but the specific SCA facet scales are not independently validated. That line is stated in section 10.

Every source above is used. No unused citations are listed.

---

## 3. Why the framework fits the solstice

The solstice is a point on the yearly cycle of light that produces the seasons. The SCA places a person on exactly such a cycle: Axis A measures activation (metaphorically, brightness), and the result is a phase on that cycle. No other jam theme has this clean a mapping to a validated structure.

A note on the metaphor. The solstices are the cycle's extremes (most and least light), and they are where the cycle turns, the sun stands still and reverses. The equinoxes are the cycle's balance points (equal light and dark). We use this distinction in the result structure: the Axis-A extremes carry the solstice poetry; the wheel's center is the equinox position.

| Solstice essence | How the framework embodies it |
|---|---|
| A point on a cycle | Result is a phase on a wheel, not a flat category |
| Light and dark (as metaphor) | Axis A is bright versus dim, the evocative label for high versus low affective activation |
| The turning point, where the cycle reverses | This lives at the Axis-A extremes (Summer and Winter), which carry the solstice poetry |
| Longest and shortest day | Summer (Bright) and Winter (Dim) are the high and low poles of the self's cycle |
| Balance and transition | The near-center result is the equinox position, a threshold between seasons, not the solstice |

Honesty note on Spring and Autumn. They are the transitional seasons, and we place them by current activation state, not trajectory: Spring is low-activation (energy still gathering), Autumn is high-activation (energy still abundant). Their trajectory (rising or falling) is captured by the angle gradation, not the axis. This is a designer reading grounded in the activation construct.

---

## 4. The dimensions measured

Two orthogonal continuous axes, each 0 to 100.

**Dimension A, Solar Height** (affective activation, energetic intensity).
- Construct basis: Russell circumplex activation axis. Thayer energetic arousal. Bright and Dim are evocative labels for high and low activation, inspired by the solstice's light cycle but not literal light measurements.
- High pole, Bright: radiant, high-energy, intense.
- Low pole, Dim: quiet, low-arousal, still, interior. Reframed as depth and calm, never depression.

**Dimension B, Tidal Direction** (motivational orientation, energy flow).
- Construct basis: BAS approach versus BIS withdrawal (Carver and White 1994). Approach and avoidance (Gable and Harmon-Jones).
- High pole, Outward: energy moving toward the world. Opening, expressive, approach-oriented.
- Low pole, Inward: energy drawing toward the interior. Conserving, gathering, reflective.

Each quadrant embodies a seasonal archetype. The person is always a point on the wheel, never forced into a binary.

---

## 5. The four result types

| | **Outward** | **Inward** |
|---|---|---|
| **Bright** | ☀️ Summer, The Zenith | 🍂 Autumn, The Turning |
| **Dim** | 🌱 Spring, The Greening | ❄️ Winter, The Deep |

Full 14-section profiles live in `01b-solstice-result-profiles.md`. Modeled on bigfive-test.com facet depth and mypersonality.net type profiles.

One-line essences:
- ☀️ **Summer, The Zenith** (Bright + Outward). Abundant, radiant, generative. The high point of the cycle, peak activation.
- 🍂 **Autumn, The Turning** (Bright + Inward). The harvest self. Luminous but consolidating. Intensity gathering for release.
- ❄️ **Winter, The Deep** (Dim + Inward). Richest in stillness and interiority. Quiet, rooted, renewing. Reframed as depth, never deficit.
- 🌱 **Spring, The Greening** (Dim + Outward). Tender, persistent new growth. Adaptive, hopeful, renewing. The courage of softness.

Why Autumn is Bright plus Inward: autumn is the harvest, still luminous (golden hour, peak color) but with the sap turning inward. The archetype is intensity gathering itself for release. This avoids "autumn equals sad" and keeps all four types affirming.

**Result label convention (locked v0.3): season-primary, archetype as subtitle.** The results screen reads `🍂 Autumn: The Turning`. The season is the headline. It answers the question the test asks and is the shareable unit ("I got Autumn, what did you get?"). The archetype is the evocative tagline for depth and texture. This mirrors bigfive-test.com ("Agreeableness" headline plus description) and mypersonality.net ("INTJ" plus type name).

---

## 6. Methodology and scoring

**Step 1, collect.** 32 responses, each 1 to 7. Four facets, 8 items each: A1, A2 (Axis A), B1, B2 (Axis B).

**Step 2, direction-normalize.** For each item, map so a higher value always means more Bright (Axis A) or more Outward (Axis B). For the bipolar two-anchor format, this is achieved by anchor position at render time (pole direction randomized), which is the functional equivalent of reverse-keying in a unipolar agree-disagree format.

**Step 3, facet scores.**
- A1 = mean of normalized A1 items, scaled 0 to 100. 0 is low baseline arousal, 100 is high.
- A2 = mean of normalized A2 items, scaled 0 to 100. 0 is low stimulation appetite, 100 is high.
- B1 = mean of normalized B1 items, scaled 0 to 100. 0 is socially withdrawn, 100 is socially approachful.
- B2 = mean of normalized B2 items, scaled 0 to 100. 0 is experientially inward, 100 is experientially outward.

**Step 4, axis scores.**
- A (Solar Height) = mean of A1 and A2, scaled 0 to 100. 0 is Dim, 100 is Bright.
- B (Tidal Direction) = mean of B1 and B2, scaled 0 to 100. 0 is Inward, 100 is Outward.

**Step 5, locate on the wheel.** Center is (50, 50).
- Quadrant (your season) from the signs of A−50 and B−50.
  - A>50, B>50: Summer
  - A>50, B<50: Autumn
  - A<50, B<50: Winter
  - A<50, B>50: Spring
- Prototypicality r = distance from center / 70.7. Higher means more clearly that season. Lower means more between.
- Phase angle = atan2(B−50, A−50). Maps to an exact position. Used for gradation (early, mid, late) and secondary leaning.

**Step 6, classify.**
- r ≥ 0.28: report primary season plus gradation plus leaning, plus the facet signature (which facets drove the axis scores). The extreme Axis-A results (most Bright, most Dim) additionally carry a solstice beat in the narrative, because those are the literal solstice positions on the wheel.
- r < 0.28 (near center or near an axis): report the **Threshold** result, the equinox position. "You sit at a threshold, the equinox point, the pause between X and Y where energy and stillness, outward and inward, are in balance." Facet signature still reported. This resolves gracefully instead of forcing an arbitrary call.

This is the hybrid dimensional and prototypical pattern Kerber et al. (2021) advocate, with facet-level reporting per the v0.9 suite standard. It avoids MBTI's central flaw, the false cliff at the midpoint. A person at 51 versus 49 gets a graduated reading, not a different identity.

---

## 7. Question format and response scale

**Format: a scenario stem plus a seven-point bipolar Likert between two anchor statements.**

```
"It's your first free morning in a while. No plans, no alarm."
[ I wake buzzing, wanting to get into things • • • • • • I let the day unfold slowly and calmly ]
                                       tap a pip
```

Each item shows two anchor statements (the two poles of the axis) with seven discrete, clickable segments between them. The midpoint is neutral. Pole direction alternates per item to counter position and acquiescence bias.

**Why a seven-point bipolar Likert, not a percentage slider.**
The v0.1 draft proposed a 0 to 100 slider. The literature forced a reversal.
- Sun, Schmidt and Henry (2025): sliders do not outperform Likert and add measurement error with few items.
- Zhang et al. (2025): Likert held up best against three slider formats on a validated scale.
- Kuhlmann et al. (2017): VAS and Likert often fail measurement equivalence.
- Vollbracht et al. (2026): sliders have some phone-UX advantages but the psychometric case is unsettled.

Decisive practical point: every validated personality inventory uses Likert. NEO-PI-R, BFI-2, HEXACO-PI-R, TIPI, IPIP. None use sliders. Likert is more familiar, more mobile-friendly (discrete taps, not dragging), and more reproducible (better test-retest). The bipolar two-statement form keeps the vivid either-or feel the theme wants while behaving psychometrically like a Likert or semantic-differential item.

Why seven points: Chang (1994) and the scale-points literature favor at least five. Seven gives strong discrimination with low cognitive load. A symmetric midpoint avoids forced dichotomizing, the MBTI flaw.

The wheel visualization is retained as a **results reveal only** (plot the point, animate into the quadrant). Keeping it out of the input phase avoids anchoring and contaminating responses.

Explicitly avoided: binary A/B forced choice (no bimodality, discards information, inflates reliability). Pure forced-choice and ipsative scoring (Schulte et al. 2020). Zero to 100 sliders as the input mechanism.

---

## 8. Number of questions

**32 items, facet-organized.** 2 axes, 2 facets per axis, 8 items per facet. Matches the NEO-PI-R facet standard.

**Why 32.** Reliability rises with items-per-facet per Spearman-Brown. At 8 per facet the expected Cronbach's alpha is .85 to .92 (strong), versus .60 to .70 at 4 per facet (marginal). Roughly 8 to 10 minutes, within personality-test norms. Tests in the suite are taken independently, so per-test length is what matters per sitting.

**Facet structure.**
- Axis A, Solar Height: A1 Baseline Arousal (tonic activation, your default energy set-point), A2 Stimulation Appetite (preferred input and activity level).
- Axis B, Tidal Direction: B1 Social Approach (toward or away from people), B2 Experiential Approach (toward or away from engagement, action, the world of experience). B2 was renamed from "expressive disclosure" in v0.8 to avoid overlap with Test 3 Axis 2 (identity expression). The two facets map to the sociability versus activity distinction in Big Five Extraversion.

**Item-writing rules applied.** Vary exactly one facet per item. True antonym poles on a single dimension. Neutral language (behavior, not virtue). No transparent giveaways. Gender-neutral and identity-agnostic. Both poles affirming. Pole direction randomized at render time to counter position and acquiescence bias.

### Facet A1: Baseline Arousal (8 items)

All items vary tonic activation only.

| # | Scenario stem | Bright pole (high activation) | Dim pole (low activation) |
|---|---|---|---|
| A1.1 | First free morning in a while. No plans, no alarm. | "I wake buzzing, wanting to get into things." | "I let the day unfold slowly and calmly." |
| A1.2 | When you walk into a room, your baseline is… | "Switched on, alert, ready to react." | "Settled, calm, observing without strain." |
| A1.3 | Your default resting state, nothing demanded… | "A hum. Something is always running." | "A stillness. Calm is my default." |
| A1.4 | People who know you well would say your inner state is… | "High-output. A lot runs in me." | "Low-output. I run quiet and steady." |
| A1.5 | Your inner engine, at rest, idles… | "High. Even at rest I'm primed." | "Low. At rest I'm genuinely still." |
| A1.6 | At your most ordinary moment, you are… | "Lit up, current flowing." | "Dialled down, quiet inside." |
| A1.7 | When you sit with nothing to do… | "I feel a charge building in me." | "I settle into stillness easily." |
| A1.8 | Physiologically, your resting baseline runs… | "Fast. Heart rate up, easily warmed." | "Slow. Heart rate low, runs cool." |

### Facet A2: Stimulation Appetite (8 items)

All items vary preferred input and activity level only.

| # | Scenario stem | Bright pole (seeks stimulation) | Dim pole (limits stimulation) |
|---|---|---|---|
| A2.1 | How much stimulation do you want in a given hour? | "A lot. Input and activity keep me lit." | "A little. I prefer a calm, low-stimulus current." |
| A2.2 | Loud, bright, busy environments… | "I seek them out. They charge me." | "I retreat from them. They drain me." |
| A2.3 | After something exciting happens, your body… | "Stays revved. The charge lingers." | "Settles back down quickly to calm." |
| A2.4 | Your ideal day is… | "Packed, varied, lots happening." | "Spacious, quiet, few demands." |
| A2.5 | If you had to choose, you'd take… | "More going on than you can track." | "Less going on, with room to spare." |
| A2.6 | A typical week's energy pattern is… | "Spiky. Peaks, bursts, high output." | "Even. Steady, moderate, sustainable." |
| A2.7 | When you can choose your surroundings… | "I go where the action is." | "I find the quiet corner." |
| A2.8 | The level of sensory input you function best at is… | "High. I need a lot of signal." | "Low. I do my best with less." |

### Facet B1: Social Approach (8 items)

All items vary orientation toward or away from people only.

| # | Scenario stem | Outward pole (toward people) | Inward pole (away from people) |
|---|---|---|---|
| B1.1 | Something difficult is on your mind. First move? | "Talk it out with someone." | "Sit with it alone first." |
| B1.2 | You land somewhere new, knowing no one. | "I open up to new people right away." | "I stay close to myself and let things come slowly." |
| B1.3 | At a gathering of people you half-know… | "Move toward the room. Circulate, join in." | "Find one person or a corner. Small and close rather than many." |
| B1.4 | In your closest relationships, you're more often the one who… | "Reaches out, initiates, extends toward." | "Holds space, waits, lets others come to you." |
| B1.5 | When life gets intense, your reflex with people is to… | "Get closer to them." | "Get more distance from them." |
| B1.6 | Meeting new people feels mostly… | "Like an opening. I lean in." | "Like an effort. I hang back." |
| B1.7 | In a group, you tend to… | "Move toward the center." | "Move toward the edges." |
| B1.8 | Connection with others is mostly something you… | "Go out and get." | "Wait to receive." |

### Facet B2: Experiential Approach (8 items)

All items vary orientation toward or away from engagement, action, and the world of experience. Each item targets a distinct content area (energy direction, opportunity response, novelty tolerance, mode of being, tempo, initiative, value orientation, agency) rather than repeating the move-toward or hang-back frame. Not about people (that is B1) and not about input volume (that is A2).

| # | Scenario stem | Outward pole (toward engagement) | Inward pole (toward interior) |
|---|---|---|---|
| B2.1 | When free energy is available, it flows toward… | "The world. Making, doing, engaging." | "My interior. Reflecting, tending, being." |
| B2.2 | A new opportunity appears. Your instinct is to… | "Reach for it. Engage." | "Watch it first. Decide slowly." |
| B2.3 | An activity you've never done comes up. | "I'm already moving toward it." | "I'd rather watch someone do it first." |
| B2.4 | You're most alive when… | "Out in the world, in motion." | "Inside yourself, in reflection." |
| B2.5 | When you could act or wait, you… | "Act. Doing clarifies." | "Wait. Watching clarifies." |
| B2.6 | In most situations, you're the one who… | "Starts things. Sets them in motion." | "Watches what starts, then responds." |
| B2.7 | When a situation calls for a response, you… | "Step in and act on it." | "Step back and let it unfold." |
| B2.8 | Your relationship to agency is… | "I make things happen." | "I let things happen." |

**Notes.** All 32 items are gender-neutral and identity-agnostic (Pride-inclusive by construction). Both poles of every item are affirming. For the bipolar two-anchor format, pole direction is randomized at render time, which is the functional equivalent of reverse-keying in a unipolar agree-disagree format and counters position and acquiescence bias. A launch pass should run an internal-consistency check per facet and drop or replace the weakest 1 to 2 items if any facet alpha falls below .75.

**Overlap honesty.** Axis B (approach and withdrawal) overlaps with the sociability facet of Big Five Extraversion. Axis A (activation) overlaps with Extraversion's assertiveness and energy facet and with Neuroticism's arousal component. These are validated constructs we build on, not inventions. The SCA's contribution is the combination, the facet structure, and the cyclical framing.

---

## 9. Interpretation and reporting

A result has four layers, surfaced in order:
1. **Your season** (quadrant). The shareable label.
2. **Your phase** (angle). Gradation and secondary leaning.
3. **Your prototypicality** (radius). Strongly versus with nuance. Near-center yields the Threshold result, the equinox position.
4. **Your narrative.** Two to three personalized paragraphs from the full answer pattern, ending with a "your solstice moment" line. Gemini layer per the GDD. Consumes the numeric profile and the per-item answers.

**Deterministic fallback (no-API path).** 4 primary season profiles plus 1 Threshold profile, modulated by gradation (early, mid, late) and axis-boundary handling per `01b-solstice-result-profiles.md`. This produces 16 distinguishable output states (4 seasons × {early, mid, late, threshold} plus the pure-Threshold reading), all from 5 base profile templates and the modulation rules. The game is fully playable without the API. The API only enriches the narrative.

**Never reported as:** a diagnosis, a ranking, a compatibility score, or a fixed identity. Always framed as a snapshot of where your energy tends to live right now.

---

## 10. Strengths, limitations, intended use

**Strengths.**
- Dimensional underneath, archetypal on top. Avoids MBTI's dichotomizing flaw while keeping a shareable label.
- Cyclical geometry. Thematically correct for the solstice and structurally honest (a phase, not a box).
- Grounded in validated constructs (affective activation, approach and withdrawal).
- Affirming and inclusive by design. No bad type. Gender-neutral. Low-activation framed as depth.
- Transparent about metaphor. Intellectual honesty is the credibility.
- Playable offline. Deterministic fallback. The AI layer is enrichment, not a dependency.

**Limitations, stated up front in the product.**
- Not a validated clinical instrument. Inspired by validated models. Not independently psychometrically evaluated.
- Self-report biases remain (social desirability, current mood). Mitigated, not eliminated, by scenario framing and Likert format.
- Short form trades reliability for brevity, intentional for a game.
- Seasonal metaphor is interpretive. We measure activation and orientation. We name the result seasonally.
- State versus trait ambiguity. The SCA blurs stable disposition with current phase. We lean into this (the solstice is a moment) but it is not a pure trait measure.

**Intended use.**
- Reflective self-discovery and play within the Solstice Soul game.
- Conversation-starting, shareable identity content.

**Explicitly not intended for.**
- Clinical diagnosis or mental-health screening.
- Employment, hiring, or performance decisions.
- Romantic or relationship matching and compatibility claims.
- Any high-stakes real-world decision about a person.

A short, plain-language disclaimer appears with every result.

---

## 11. Status

Test 1 decisions locked. No open decisions.
- Name: The Solstice Cycle Assessment (SCA). Locked v0.3.
- Result naming: season-primary with archetype subtitle (for example `🍂 Autumn: The Turning`). Locked v0.3.
- Suite template: Option A. Tests 2 to 4 reuse Test 1's structure (two validated axes, two facets per axis, continuous scoring, four quadrant types with gradation, 14-section profile, AI narrative, deterministic fallback, eight items per facet, seven-point bipolar Likert) with their own axes, themes, and result names. Locked v0.4.
- All v0.6 and v0.7 audit fixes applied.

See `CHANGELOG.md` for revision history.
