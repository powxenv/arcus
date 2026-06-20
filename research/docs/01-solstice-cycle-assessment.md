# Test 1: The Solstice Cycle Assessment (SCA)

> Status: v0.23 design document. Adds a perceived-trajectory component on top of the v0.22 position model, so the solstice is measured as a turning point with direction (its defining feature), not just a static position on the circumplex. The trajectory construct is grounded in Carver-Scheier self-regulation (the same research program as the verified Carver-White BIS/BAS). The position-plus-trajectory combination is our synthesis and is unvalidated. See CHANGELOG v0.23.
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
- **Schimmack and Reisenzein (2002), energetic arousal.** Demonstrated that energetic arousal is a distinct activation type, not a mixture of valence and general activation. *Use:* grounds Axis A's high pole (brightness) in an independently validated construct. The energetic arousal concept originates with Thayer (1989), but our direct source is Schimmack and Reisenzein.
- **Carver and White (1994), BIS/BAS scales.** Validated motivational dimension: approach and withdrawal are orthogonal systems, not opposite poles of one. *Use:* grounds Axis B (Tidal Direction) in approach and withdrawal.

### 2.2 Textural sources (define how we describe)

- **Big Five and HEXACO.** The consensus dimensional baseline. *Use:* reality check that our axes do not reinvent variance already captured elsewhere. Stated overlap in §8.

### 2.3 Why four types is defensible

- **Gerlach, Farb, Revelle and Amaral (2018, Nature Human Behaviour).** Gaussian mixture models with density-based significance testing on roughly 1.5 million people yielded four replicable types (Average, Reserved, Role-Model, Self-Centered). *Use:* empirical defense that four types can be data-supported, not arbitrary.
- **Kerber, Roth and Herzberg (2021), Personality types revisited.** Argues for a hybrid prototypical and dimensional representation. *Use:* justifies our scoring pattern. Dimensional underneath, labelled type on top.

### 2.4 Response-format sources (decide how we ask)

- **McCrae and Costa (1989), reinterpreting the MBTI.** MBTI's binary dichotomies show no bimodality. Dichotomizing discards about 26 to 32 percent of information and inflates reliability. *Use:* reason to reject binary A/B forced choice.
- **Schulte, Holling and Burkner (2020).** Pure forced-choice yields ipsative scores that cannot compare people, even with 30 traits. *Use:* reason to reject forced-choice scoring.
- **Sun, Schmidt and Henry (2025), "Don't Let Your Likert Scales Grow Up To Be Visual Analog Scales."** Visual analogue scales (0 to 100 sliders) do not outperform Likert and add measurement error, especially with few items. *Use:* primary reason to reject the slider format proposed in v0.1.
- **Chang (1994), four-point and six-point Likert scales.** *Use:* grounds the choice of seven points (at least five, with strong discrimination and low cognitive load).
- **Gosling, Rentfrow and Swann (2003), TIPI.** Ultra-short scales (two items per dimension) are too thin for acceptable reliability. *Use:* sets the item-count floor.
- **Spearman-Brown prophecy formula.** Reliability rises monotonically with item count, with diminishing returns past 8 per facet. *Use:* grounds the 8-items-per-facet standard, where expected Cronbach's alpha reaches the .85 to .92 strong band.

### 2.5 Facet grounding (added v0.6)

The facets under each axis are grounded in validated sub-constructs, not invented.

**Axis A facets.**
- **A1 Baseline Arousal:** Schimmack and Reisenzein (2002), energetic arousal. The tonic activation set-point, felt as energy versus tiredness. Demonstrated to be a distinct activation type, not reducible to valence plus general activation. The energetic arousal construct originates with Thayer (1989), but our direct source is Schimmack and Reisenzein.
- **A2 Stimulation Appetite:** Zuckerman (2007), Sensation Seeking Scale. The preferred level of varied, novel, and intense stimulation. The SSS-V has been validated across hundreds of studies with replicated four-subscale structure and discriminant validity. The general construct originates in Zuckerman (1979), but our direct source is the 2007 validation review.

**Axis B facets.**
- **B1 Social Approach:** DeYoung, Quilty and Peterson (2007), Big Five Aspect Scales, Enthusiasm aspect. Sociability, affiliation, positive emotion toward others.
- **B2 Agency:** DeYoung, Quilty and Peterson (2007), Big Five Aspect Scales, Assertiveness aspect. Proactive agency, action initiation, dominance, drive toward impact. Together B1 and B2 mirror the validated two-aspect structure of Extraversion (Enthusiasm and Assertiveness), with Carver and White (1994) BAS subtypes (Drive, Reward-Responsiveness) as corroborating split.

Naming note. B2 was renamed twice. v0.8 named it "expressive disclosure" (overlapped Test 3 identity expression). v0.9 named it "experiential approach" (mixed three constructs: agency, experiential engagement, novelty seeking, while citing only the first). v0.12 renamed it "agency," the narrower construct DeYoung's Assertiveness aspect actually validates. Axis B now maps exactly to DeYoung's two-aspect structure of Extraversion.

Honesty note. The facet split is theory-grounded, but the specific SCA facet scales are not independently validated. That line is restated in section 10.

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

Honesty note on Spring and Autumn. They are the transitional seasons, and we place them by current activation state: Spring is low-activation (energy still gathering), Autumn is high-activation (energy still abundant). Their direction (rising or falling) is captured by the v0.23 trajectory component, not the axis. This is a designer reading grounded in the activation construct.

---

## 4. The dimensions measured

Two orthogonal continuous axes, each 0 to 100.

**Dimension A, Solar Height** (affective activation, energetic intensity).
- Construct basis: Russell circumplex activation axis. Schimmack and Reisenzein (2002) energetic arousal. Bright and Dim are evocative labels for high and low activation, inspired by the solstice's light cycle but not literal light measurements.
- High pole, Bright: radiant, high-energy, intense.
- Low pole, Dim: quiet, low-arousal, still, interior. Reframed as depth and calm, never depression.

**Dimension B, Tidal Direction** (motivational orientation, energy flow).
- Construct basis: BAS approach versus BIS withdrawal (Carver and White 1994).
- High pole, Outward: energy moving toward the world. Opening, engaging, approach-oriented.
- Low pole, Inward: energy drawing toward the interior. Conserving, gathering, reflective.
- **Honesty note (v0.22).** Carver and White's BIS/BAS is **four unipolar subscales** (BAS Drive, BAS Fun-Seeking, BAS Reward-Responsiveness, BIS), not a single validated bipolar. The SCA composites the BAS facets into the B1/B2 "approach" side and reads BIS as the "withdrawal" side. This is a designer composite of validated unipolar subscales, not a single validated bipolar. The affirming reframe of Inward as conservation and depth (not deficit) is what keeps the axis usable in a consumer game.

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

**Step 2, direction-normalize.** For each item, the raw response is mapped so a higher value always means more Bright (Axis A) or more Outward (Axis B). At render time, pole direction is randomized (which pole appears on the left versus the right), so the respondent cannot default to one side of the screen. This counters position bias.

**Step 3, facet scores.**
- A1 = mean of normalized A1 items, scaled 0 to 100. 0 is low baseline arousal, 100 is high.
- A2 = mean of normalized A2 items, scaled 0 to 100. 0 is low stimulation appetite, 100 is high.
- B1 = mean of normalized B1 items, scaled 0 to 100. 0 is socially withdrawn, 100 is socially approachful.
- B2 = mean of normalized B2 items, scaled 0 to 100. 0 is receptive, 100 is agentic.

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
- Gradation convention. "Early" means just entered the season from the previous one in the yearly cycle (Spring → Summer → Autumn → Winter → Spring); "Late" means about to leave into the next. Each quadrant's entry edge is the angle of its boundary with the previous season: Summer 90°, Autumn 0°, Winter 270°, Spring 180°. Progress = (entry edge − angle) mod 360, binned Early (0–30°), Mid (30–60°), Late (60–90°). So "Late Autumn" means approaching Winter, not the reverse. (v0.18 corrected an inversion here.)

**Step 6, classify.** Two checks run before a result is assigned.
- Facet-tension check. For each axis, if its two facets sit on opposite sides of 50 and both are at least 20 points from 50 (designer-set, tunable), the axis is **tense**: its mean lands near center because two strong facets cancel, not because the person is moderate. This is the failure mode the facet-signature layer was supposed to catch but, on its own, could not — the headline was coming from the cancelled mean.
- Result assignment. Note the type/boundary/modifier distinction, which follows the operational definition of a type in the person-centered literature (Gerlach 2018; Kerber 2021): a type is a cluster recovered by density or mixture methods. The four seasonal quadrants are cluster-compatible and are the only types. The near-center region is the sparsest part of any circumplex, so no density method would return it as a cluster — it is a single boundary condition, the Threshold, not a type. Facet tension is a within-person score pattern, not a between-person cluster, so it is a modifier, not a type.
  - r ≥ 0.28: report primary season plus gradation plus leaning, plus the facet signature. If either axis is tense, the season is still reported but carries a facet-tension modifier. The extreme Axis-A results (most Bright, most Dim) additionally carry a solstice beat, because those are the literal solstice positions on the wheel.
  - r < 0.28: report the **Threshold**, the wheel's boundary region. The narrative then depends on the modifier. With no tense axis it is the equinox reading — genuinely balanced. With at least one tense axis it is the facet-tension reading — the same boundary, but framed honestly as "not balanced; two strong facets cancelling," led by the facet signature. The type count does not change: it is still four seasons plus one boundary, with a modifier that can rewrite the boundary's narrative.


This is the hybrid dimensional and prototypical pattern Kerber et al. (2021) advocate, with facet-level reporting per the v0.9 suite standard. It avoids MBTI's central flaw, the false cliff at the midpoint. A person at 51 versus 49 gets a graduated reading, not a different identity. The Counterpoint extends the same honesty to the one place the midpoint metaphor breaks down: a cancelled axis mean that looks "balanced" but is not.

---

## 7. Question format and response scale

**Format: a scenario stem plus a seven-point bipolar Likert between two anchor statements.**

```
"When nothing demands your attention, your mind…"
[ Stays active • • • • • • Settles into quiet ]
                                       tap a pip
```

Each item shows two anchor statements (the two poles of the axis) with seven discrete, clickable segments between them. The midpoint is neutral. Pole direction alternates per item to counter position bias; the bipolar two-anchor format itself counters acquiescence bias.

**Why a seven-point bipolar Likert, not a percentage slider.**
The v0.1 draft proposed a 0 to 100 slider. The literature forced a reversal.
- Sun, Schmidt and Henry (2025): sliders do not outperform Likert and add measurement error with few items.

Decisive practical point: every validated personality inventory uses Likert. NEO-PI-R, BFI-2, HEXACO-PI-R, TIPI, IPIP. None use sliders. Likert is more familiar, more mobile-friendly (discrete taps, not dragging), and more reproducible (better test-retest). The bipolar two-statement form keeps the vivid either-or feel the theme wants while behaving psychometrically like a Likert or semantic-differential item.

Why seven points: Chang (1994) and the scale-points literature favor at least five. Seven gives strong discrimination with low cognitive load. A symmetric midpoint avoids forced dichotomizing, the MBTI flaw.

The wheel visualization is retained as a **results reveal only** (plot the point, animate into the quadrant). Keeping it out of the input phase avoids anchoring and contaminating responses.

Explicitly avoided: binary A/B forced choice (no bimodality, discards information, inflates reliability). Pure forced-choice and ipsative scoring (Schulte et al. 2020). Zero to 100 sliders as the input mechanism.

---

## 7. Perceived-trajectory component (v0.23)

A solstice is not a position. It is the moment a cycle reverses. Summer solstice: light has peaked and turns toward decline. Winter solstice: dark has peaked and turns toward renewal. Two things are essential: the cycle (recurrence), and the **direction of travel at the turning point** (waxing or waning). Strip either and it is not a solstice.

The v0.22 SCA measures position only (where you sit on the circumplex right now). It cannot measure direction, because direction requires change over time, and the validated affect-dynamics tradition (Kuppens, Allen & Sheeber 2010; Hamaker et al. 2015) requires intensive longitudinal data over days and weeks that a single-session consumer test cannot administer.

### 7.1 The trajectory construct

**Perceived cyclical trajectory**: not "how energetic are you" (state) and not "how does your affect move over weeks" (trait dynamics : unmeasurable here), but "in the arc you actually live, do you feel you are in a waxing phase (gathering, rising, becoming more) or a waning phase (consolidating, releasing, integrating) on each axis?"

**Grounding.** Carver & Scheier's self-regulation theory (the same Carver of the verified BIS/BAS in Axis B) is built on feedback processes with goal gradients: people perceive their rate of progress toward or away from desired and undesired end-states, and that perceived trajectory is a validated driver of affect and behavior. The perceived-discrepancy-rate signal : am I closing the gap to who I want to be, or watching it widen : is precisely the waxing-vs-waning the solstice names.

### 7.2 Evidence vs synthesis

- Circumplex position: validated (Russell; Carver-White).
- Perceived goal-gradient progress as a mechanism: validated (Carver-Scheier self-regulation).
- **Combining the two into a position-plus-trajectory result is our synthesis and is unvalidated.** Stated as such.

### 7.3 Trajectory items (design)

A small set of items (target 4: two per axis) measuring perceived direction-of-travel on the SCA axes. Each asks the felt direction, not the felt level. Examples (full items in the build spec):

- Activation trajectory: "Thinking about your energy right now, do you feel you are gathering toward more, or settling toward less?"
- Approach trajectory: "In your current season, do you feel yourself opening toward the world, or drawing inward?"

The trajectory items are scored on the same 7-point bipolar scale, with "gathering/opening" and "settling/drawing-inward" as the poles.

### 7.4 How trajectory modulates the result

The season (from position) gains a direction modifier:

- **Summer, waxing**: arrived at the peak, still climbing.
- **Summer, waning**: at the peak, feeling it turn toward Autumn.
- **Winter, waxing**: at the low, feeling the first turn toward Spring.
- **Winter, waning**: at the low and still descending.

The solstice poetry (reversal) finally has a measured referent. A Summer-waning result reads differently from a Summer-waxing result in a way the v0.22 SCA could not express.

### 7.5 Limitations

- Perceived trajectory is subject to current-mood contamination more than position is.
- Position and trajectory must be reported as two things, not merged into one muddy score.
- The trajectory construct has less direct validation than circumplex position; Carver-Scheier grounds the *mechanism*, not a published trajectory self-report scale.
- The trajectory items are an addition to the SCA item count; the build spec determines whether they fold into the standard form or appear as a short add-on.

---

## 8. Item bank and lengths

**Two lengths, one item bank.** The SCA is offered as a 32-item standard form (**SCA-32**) and a 16-item short form (**SCA-16**) drawn from the same bank. Both share the same axes, facets, scoring model, and result taxonomy (§6). SCA-32 is the default; SCA-16 is a quicker, screening-tier read (see §8.1).

**Why 32 is the standard.** 2 axes, 2 facets per axis, 8 items per facet. Matches the NEO-PI-R facet standard. Reliability rises with items-per-facet per Spearman-Brown: at 8 per facet the expected Cronbach's alpha is .85 to .92 (strong), versus .60 to .70 at 4 per facet (marginal) : which is exactly the band SCA-16 sits in, stated openly in §8.1. SCA-32 takes roughly 8 to 10 minutes, within personality-test norms. Tests in the suite are taken independently, so per-test length is what matters per sitting.

**Facet structure.**
- Axis A, Solar Height: A1 Baseline Arousal (tonic activation, your default energy set-point), A2 Stimulation Appetite (preferred input and activity level).

Honesty note. Unlike Axis B, whose two facets sit within a single validated domain (DeYoung's two-aspect Extraversion), Axis A composites two constructs from different research traditions : energetic arousal and sensation seeking : without a jointly validated higher-order activation factor. The compositing is a design choice. The facet signature recovers lost texture by reporting which sub-component drove the axis score; when the two facets cancel outright (Step 6 facet-tension modifier), that recovery becomes the result's lead, not just a footnote.
- Axis B, Tidal Direction: B1 Social Approach (toward or away from people, DeYoung Enthusiasm aspect), B2 Agency (proactive action and initiation versus receptive response, DeYoung Assertiveness aspect). B2 was renamed from "experiential approach" (v0.9) and from "expressive disclosure" (v0.8); both earlier names were either off-construct or overlapping with Test 3. The two facets now map exactly to DeYoung's validated two-aspect structure of Extraversion.

**Item-writing rules applied.** Vary exactly one facet per item. True antonym poles on a single dimension. Neutral language (behavior, not virtue). No transparent giveaways. Gender-neutral and identity-agnostic. Both poles affirming. Two bias controls: pole direction randomized at render time (counters position bias), and the bipolar two-anchor format where respondents choose between two statements rather than agreeing or disagreeing with one (counters acquiescence bias, the function reverse-keying serves in a unipolar format).

### Facet A1: Baseline Arousal (8 items)

All items vary the tonic activation set-point. Each item targets a distinct content area (waking state, default attention, inner current, default readiness, transition speed, somatic primed-ness, evening energy, comparative frame) rather than paraphrasing one idea. No agency, social, or stimulation-volume language.

| # | Scenario stem | Bright pole (high activation) | Dim pole (low activation) |
|---|---|---|---|
| A1.1 | When you wake, you're… | "Already at full charge." | "Still coming online, quietly." |
| A1.2 | When nothing demands your attention, your mind… | "Stays active." | "Settles into quiet." |
| A1.3 | Inside you, there's… | "A steady current running." | "A stillness." |
| A1.4 | Your default state is closer to… | "Readiness." | "Rest." |
| A1.5 | Moving from stillness into action, you… | "Shift quickly." | "Ease into it." |
| A1.6 | Your body at rest is… | "Primed." | "Deeply still." |
| A1.7 | At the end of a full day, you're… | "Still humming." | "Winding down." |
| A1.8 | Compared to most people, you run… | "Hotter." | "Cooler." |

### Facet A2: Stimulation Appetite (8 items)

All items vary preferred stimulation level. Each item targets a distinct content area (sensory intensity, environmental density, pace, information input volume, free-time scheduling density, boredom susceptibility, variety, comparative frame). No sensory-processing-sensitivity language (no "drains me", "overwhelmed"), no energy-variability language (no "spiky", "peaks"), no agency language (no "actively doing", "getting things done").

| # | Scenario stem | Bright pole (seeks stimulation) | Dim pole (limits stimulation) |
|---|---|---|---|
| A2.1 | The sensory intensity you prefer is… | "Intense." | "Gentle." |
| A2.2 | You prefer your environment… | "Busy and full." | "Sparse and open." |
| A2.3 | The pace you prefer is… | "Fast." | "Slow." |
| A2.4 | How much information and input you want coming at you is… | "A lot." | "A little." |
| A2.5 | Your free time, you prefer… | "Packed with things to do." | "Open and unscheduled." |
| A2.6 | When nothing much is happening, you feel… | "Restless. You want more." | "Content. The quiet is fine." |
| A2.7 | You prefer things… | "Changing and varied." | "Steady and uniform." |
| A2.8 | Compared to most people, you run on… | "More stimulation." | "Less stimulation." |

### Facet B1: Social Approach (8 items)

All items vary orientation toward or away from people. Each item targets a distinct content area (distress sharing, new-people approach, group positioning, close-relationship initiation, circle breadth, default orientation, energy source, connection direction). No state-framed language (no "when tired", "when low"), no negative-valence inward poles (no "corner", "effort", "demand").

| # | Scenario stem | Outward pole (toward people) | Inward pole (away from people) |
|---|---|---|---|
| B1.1 | When something's on your mind, you want to… | "Talk it out with someone." | "Sit with it alone." |
| B1.2 | Meeting new people is something you… | "Move toward." | "Let come to you." |
| B1.3 | In a group, you move toward… | "The center." | "The edges." |
| B1.4 | In your close relationships, you tend to… | "Reach out first." | "Wait to be reached out to." |
| B1.5 | Most of your days involve… | "Lots of people time." | "Lots of solo time." |
| B1.6 | Your default orientation is toward… | "People." | "Your own world." |
| B1.7 | Your primary energy source is… | "Other people." | "Solitude." |
| B1.8 | Connection with others is something you… | "Actively pursue." | "Let find you." |

### Facet B2: Agency (8 items)

All items vary proactive agency and action-initiation versus receptive, responsive orientation. Grounded in DeYoung's Assertiveness aspect of Extraversion. Each item targets a distinct content area (decision tempo, leadership, impact drive, persuasion, control orientation, initiative, self-direction, pursuit orientation) rather than repeating the act-fast or take-charge frame. Not about people (that is B1) and not about stimulation or novelty (that is A2).

| # | Scenario stem | Outward pole (agentic) | Inward pole (receptive) |
|---|---|---|---|
| B2.1 | When a decision is yours, you… | "Make it and move." | "Sit with it before acting." |
| B2.2 | In groups, you tend to… | "Step forward and lead." | "Support whoever steps forward." |
| B2.3 | You want to ___ how things turn out. | "Shape." | "Let unfold." |
| B2.4 | When views differ, you… | "Try to bring others to yours." | "Try to take in others'." |
| B2.5 | You prefer to… | "Hold the reins." | "Adapt to what arrives." |
| B2.6 | If something needs doing, you… | "Do it." | "Let it find the right person." |
| B2.7 | You mostly… | "Set your own course." | "Respond to what's asked of you." |
| B2.8 | When something's yours to go after, you… | "Go after it." | "Let it come to you." |

**Notes.** All 32 items are gender-neutral and identity-agnostic (Pride-inclusive by construction). Both poles of every item are affirming. Two distinct bias controls operate, and they address different biases. (1) Pole direction is randomized at render time, which counters position bias. (2) The bipolar two-anchor format, where the respondent chooses between two statements rather than agreeing or disagreeing with one, counters acquiescence bias. This is the same function reverse-keying serves in a unipolar agree-disagree format. The v0.8 draft conflated these two mechanisms; this note corrects it. A launch pass should run an internal-consistency check per facet and drop or replace the weakest 1 to 2 items if any facet alpha falls below .75. Note that with this v0.9 bank, apparent alpha may run lower than the v0.8 bank because redundant paraphrases have been removed; that is the correct trade, since the earlier inflation was measuring overlap, not signal.

**Overlap honesty.** Axis B (approach and withdrawal) overlaps with the sociability facet of Big Five Extraversion. Axis A (activation) overlaps with Extraversion's assertiveness and energy facet and with Neuroticism's arousal component. These are validated constructs we build on, not inventions. The SCA's contribution is the combination, the facet structure, and the cyclical framing.

### 8.1 The 16-item short form (SCA-16)

The SCA is offered in two lengths sharing one item bank, one scoring model, and one result taxonomy.

**Same questions, not different ones. The 16-item form is a curated subset of the 32, not a parallel form.** This follows the standard short-form method: NEO-FFI (60) is drawn from NEO-PI-R (240); HEXACO-60 from HEXACO-200; BFI-2-S (30) from BFI-2 (60). A subset preserves construct fidelity : it is the same instrument, administered shorter : and whatever content-validity argument supports the 32 carries to the 16. A separate parallel form would be a different instrument requiring its own defense, for no gain. The subset also enables an **upgrade path**: a respondent who finishes the 16 can go deeper by answering the remaining 16 items, producing the full 32-item result with no re-testing. That path exists only because the 16 is a subset.

**Selection (4 items per facet).** Without pilot data we cannot select on factor loadings or item-total correlations, so selection is content-driven: retain the most construct-central items, maximally spread across each facet's content areas, and avoid items flagged as judgment calls or confounded in earlier audits.

| Facet | Retained (4) | Dropped (4) | Why this cut |
|---|---|---|---|
| A1 Baseline Arousal | A1.1 waking · A1.2 default attention · A1.4 default readiness · A1.6 somatic | A1.3 · A1.5 · A1.7 · A1.8 | Four pure tonic-set-point items spanning mind/body and morning/idle. Dropped A1.5 (mild A1↔B2 confound flagged v0.17), A1.7 (energy-depletion, drifts toward capacity not set-point), A1.8 (meta-cognitive comparative), A1.3 (overlaps A1.2 phenomenologically). |
| A2 Stimulation Appetite | A2.1 sensory intensity · A2.2 environmental density · A2.3 pace · A2.6 boredom susceptibility | A2.4 · A2.5 · A2.7 · A2.8 | Core sensation-seeking signals: intensity, richness, pace, intolerance of low stimulation (a named Zuckerman subscale). Dropped A2.4/A2.7 (redundant with retained), A2.5 (behavioral, circumstance-driven), A2.8 (meta-cognitive comparative). |
| B1 Social Approach | B1.2 new-people · B1.3 group position · B1.5 daily density · B1.6 default orientation | B1.1 · B1.4 · B1.7 · B1.8 | Four trait-stable behavioral items (strangers, group, daily, default). Dropped B1.1 (state-framed), B1.4 (narrow domain), B1.7 (transparent introvert/extravert giveaway : our item-writing rules discourage transparent giveaways, so it is excluded despite high face validity), B1.8 (overlaps B1.2). |
| B2 Agency | B2.1 decision tempo · B2.2 leadership · B2.3 shape/let unfold · B2.6 initiative | B2.4 · B2.5 · B2.7 · B2.8 | Four clean DeYoung-Assertiveness items: tempo, lead, control-of-outcome, proactive initiation. Dropped B2.5/B2.7 (overlap B2.3), B2.4 (influence ≠ agency), B2.8 (receptive pole overlaps B1 wording, flagged v0.17). |

Result: 16 items, balanced 4-4-4-4 across facets, 8 per axis. The retained set is **SCA-16 = {A1.1, A1.2, A1.4, A1.6, A2.1, A2.2, A2.3, A2.6, B1.2, B1.3, B1.5, B1.6, B2.1, B2.2, B2.3, B2.6}**.

**Scoring is identical to the 32.** Facet score = mean of its (now 4) normalized items, scaled 0–100. Axis score = mean of its two facet scores. Distance, prototypicality, angle, quadrant, gradation, the 0.28 Threshold boundary, and the facet-tension modifier are all computed by the same formulas (§6). The only thing that changes is the number of items feeding each facet mean.

**Reliability : the honest tier.** This is the load-bearing caveat. Per Spearman-Brown, 4 items per facet lands in the .60 to .70 alpha band : "marginal" in the very terms this framework used in v0.9 to justify going from 16 to 32. SCA-16 does not escape that band; it sits in it. Gosling, Rentfrow and Swann (2003), the source this framework already cites for the item-count floor, describe ultra-short scales as adequate for screening but with "diminished psychometric properties." SCA-16 is therefore positioned and labeled as a **screening-tier quick read**, not an equivalent-strength result:

- SCA-32 is the standard. Its facet-level detail (facet signature, facet-tension modifier) is reported at full confidence.
- SCA-16 reliably places a respondent in a season or the Threshold, but its facet-level signals are noisier. The facet-tension modifier in particular may fire on sampling noise more readily, because fewer items give each extreme response more leverage. SCA-16 results therefore surface facet detail as **provisional** and display a short-form caveat on the result screen.
- Offering SCA-16 without this caveat would imply equal authority to SCA-32, which the reliability math says it does not have. That would repeat exactly the false-authority move this framework exists to avoid (§2.1 of the framework doc).

**Which to default to.** SCA-32 is the recommended default. SCA-16 is offered where time or attention budget requires it, with the explicit tradeoff stated at the point of choice (roughly half the time, at the cost of precision in the facet detail : not in the seasonal placement, which remains the reliable output).

**Validation note.** Both forms are theory-informed, not validated. If pilot data is ever gathered, the item-total correlations and factor loadings it yields should re-order this short-form selection : the present cut is the best content-driven choice in the absence of data, not the empirically optimal one. This is the same authority line the rest of the framework carries.

## 9. Interpretation and reporting

A result has four layers, surfaced in order:
1. **Your season** (quadrant). The shareable label.
2. **Your phase** (angle). Gradation and secondary leaning.
3. **Your prototypicality** (radius). Strongly versus with nuance. Near-center yields the **Threshold** boundary reading : not a type, just the honest handling of the midpoint. Its narrative is either equinox (balanced) or, when a facet-tension modifier fires, the "holding opposites" reading led by the facet signature.
4. **Your narrative.** Two to three personalized paragraphs from the full answer pattern, ending with a "your moment on the cycle" line. Gemini layer per the GDD. Consumes the numeric profile and the per-item answers.

**Deterministic fallback (no-API path).** 5 full base profiles (4 seasons + Threshold), modulated by gradation (early, mid, late) and the facet-tension modifier per `01b-solstice-result-profiles.md`. That yields 12 seasonal states (4 seasons × {early, mid, late}) plus the Threshold boundary reading, which itself has two narrative variants (equinox, or facet-tension when the modifier fires). The type count is four. The game is fully playable without the API. The API only enriches the narrative.

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
- Not a validated clinical instrument. Inspired by validated models. Not independently psychometrically evaluated. The two axes and four facets are grounded in validated constructs, but the specific SCA scales built from them are not independently validated.
- Self-report biases remain (social desirability, current mood). Mitigated, not eliminated, by scenario framing and the bipolar two-anchor format.
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
- All audit and reference fixes through v0.18 applied. See CHANGELOG for full history.

See `CHANGELOG.md` for revision history.
