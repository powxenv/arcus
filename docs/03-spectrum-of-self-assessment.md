# Test 3: The Spectrum of Self Assessment (SSA)

> Status: v0.1 design document. Full-text paper audit of 6 identity/pride PDFs. Two axes grounded in full-text-verified constructs: Identity Clarity (Campbell 1996 SCC) and Self-Alignment (Kernis & Goldman 2006, Snyder 1974, Wood 2008). Showers (1992) and Linville (1987) rejected: both use card-sorting tasks incompatible with self-report. 32-item bank. See CHANGELOG v0.1.
> Position: The Pride-themed test of the four-test Solstice Soul suite.
> Theme served: Pride (authentic identity, self-knowledge, the courage to show who you are).
> Honesty statement: The SSA is an original, theory-informed assessment for reflection and play. Its two axes are grounded in full-text-verified constructs: Identity Clarity draws from the Self-Concept Clarity Scale (Campbell et al., 1996); Self-Alignment draws from the multicomponent authenticity model (Kernis & Goldman, 2006), the Authenticity Scale (Wood et al., 2008), and the Self-Monitoring Scale (Snyder, 1974). It is not independently validated and is not clinical. The four result names are an interpretive metaphor drawn from light and visibility: how brightly and genuinely your true self shines through. Self-report is the measurement format; the limitations of self-report for identity constructs are similar to those for cognitive style (stated in §10).

---

## 1. The name

**The Spectrum of Self Assessment (SSA).**

"Spectrum" signals the range of self-structures and expression styles, from clearly integrated to multifaceted, and from authentic to contextually adapted. "Self" is the domain, distinct from Tests 1 and 2 (affect and cognition). "Assessment" matches the suite naming convention.

The in-game UI may use "The Pride Spectrum" as a friendlier label, but the framework name is SSA.

---

## 2. Theoretical foundation (each source states its use, each verified against full-text)

Sources below are retained because full-text PDFs confirm the claimed use.

### 2.1 Structural sources (define what we measure)

- **Campbell, Trapnell, Heine, Katz, Lavallee, and Lehman (1996), Self-Concept Clarity Scale (JPSP).** Four studies developing and validating the SCC Scale. SCC measures "the extent to which the contents of an individual's self-concept are clearly and confidently defined, internally consistent, and temporally stable" (p. 141). Factor analysis yielded one major factor. The 12-item scale has high internal consistency (α > .85), test-retest stability, and discriminant validity from self-esteem. Low SCC is independently associated with high Neuroticism, low Conscientiousness, low Agreeableness, chronic self-analysis (rumination), and low internal state awareness. Cultural differences found: Japanese participants exhibit lower SCC than Canadian, consistent with independent vs. interdependent self-construal theory (Markus & Kitayama, 1991). *Use:* core anchor for Axis A (Identity Clarity). The unidimensionality finding means A1 and A2 are a designer split, stated in §2.5.

- **Kernis and Goldman (2006), A multicomponent conceptualization of authenticity (Advances in Experimental Social Psychology).** Proposes and validates a four-component model: awareness (knowledge of and trust in one's motives, feelings, desires), unbiased processing (objectively evaluating self-relevant information), behavior (acting in accord with one's true self), and relational authenticity (valuing openness and genuineness in close relationships). The four components are interrelated but conceptually distinct. The Authenticity Inventory demonstrates good psychometric properties. *Use:* core anchor for Axis B (Self-Alignment). The four components map onto two facets: B1 (authentic living from awareness + behavior) and B2 (genuine relating from unbiased processing + relational). See §2.5.

- **Snyder (1974), Self-Monitoring of expressive behavior (JPSP).** Develops and validates the Self-Monitoring Scale. Self-monitoring is "self-observation and self-control guided by situational cues to social appropriateness" (p. 526). High self-monitors adjust expressive behavior to fit social contexts; low self-monitors behave consistently across situations regardless of social cues. Four laboratory and field studies demonstrated convergent and discriminant validity. *Use:* corroborates the Axis B low pole ("Other-Oriented"), providing behavioral evidence that adjusting self-presentation to context is a stable individual difference. High self-monitoring is related to but distinct from low authenticity.

- **Wood, Linley, Maltby, Baliousis, and Joseph (2008), The authentic personality (Journal of Counseling Psychology).** Develops and validates the Authenticity Scale. Factor analysis yields three factors: self-alienation (feeling out of touch with one's true self), authentic living (behaving in accord with one's values and beliefs), and accepting external influence (being influenced by others' expectations). The factor structure is invariant across sample, ethnicity, and gender. The scale shows discriminant validity from the Big Five and social desirability. *Use:* corroborates Axis B (Self-Alignment), providing a second validated instrument that converges with Kernis & Goldman's model. The three-factor structure aligns with the B1/B2 facet decomposition without contradicting it.

### 2.2 Sources rejected after full-text review

- **Showers (1992), Compartmentalization of self-knowledge.** Uses a card-sorting task to measure how participants organize positive and negative self-knowledge into separate self-aspects. No self-report Likert scale exists for this construct. The method cannot be adapted to the suite's questionnaire format. Rejected as a structural source.

- **Linville (1987), Self-complexity.** Uses a card-sorting task to measure the number and distinctiveness of self-aspects. No self-report Likert scale exists. The method cannot be adapted. Rejected as a structural source.

### 2.3 Why two axes, why these two

- **Identity Clarity × Self-Alignment.** These two dimensions capture the two fundamental ways people differ in "how they show who they are": the clarity of the self they are showing (how well they know themselves) and the alignment between that self and what they present to the world (how authentically they express it). A person with a clear self-concept who lives authentically is very different from someone with a diffuse self-concept who adjusts to every situation, and all four combinations are recognizable and common.

- **Why not pride emotion (Tracy & Robins, 2007).** The psychology of pride identifies two distinct facets: authentic pride (achievement-based, prosocial) and hubristic pride (self-aggrandizing, defensive, correlated with narcissism and shame-proneness). This is a valid construct but creates two problems for a game context. First, hubristic pride is inherently negative: Tracy & Robins (2007) confirm it correlates with low agreeableness, low conscientiousness, and shame, making it a pole that would violate the suite's affirming-by-design principle. No result should diagnose a person as narcissistic or shame-prone. Second, pride-as-emotion measures how you feel when you succeed, which is a different question from the framework's intended "how do you show who you are?" The Tracy & Robins framework is noted as a potential source for profile texture, but it cannot ground a structural axis without creating a negatively-framed pole.

- **Why not identity statuses (Marcia, 1966).** The four identity statuses (achievement, moratorium, foreclosure, diffusion) are developmental, not dispositional. They describe stages an individual may pass through, not stable individual differences. The SSA focuses on adult dispositional variation.

### 2.4 Response-format sources (inherit from Test 1)

Decisions apply unchanged from Test 1. Full argument in `01-solstice-cycle-assessment.md` §7.
- **Sun, Schmidt and Henry (2025).** Sliders underperform Likert.
- **Chang (1994), Gosling et al. (2003), Spearman-Brown.** Seven points, eight items per axis.
- **McCrae and Costa (1989), Schulte et al. (2020).** Reject forced-choice and dichotomizing.

### 2.5 Facet grounding and honesty notes

**Axis A, Identity Clarity.** How clearly you know who you are: your attributes, values, and identity.

- **A1 Self-Knowledge:** Campbell et al. (1996). The degree to which you feel you know your own attributes, values, preferences, and identity. Items ask about the clarity of self-beliefs, not their positivity or negativity.
- **A2 Self-Consistency:** Campbell et al. (1996). The degree to which your self-beliefs are stable over time and internally consistent (across contexts and aspects of personality).

**Honesty note 1: A1/A2 designer split.** Campbell et al. (1996) report that the SCC Scale has one major factor. Our split into A1 (Self-Knowledge) and A2 (Self-Consistency) applies DeYoung's two-aspect pattern to a construct with no jointly validated two-factor structure. The split is conceptual: clarity involves both the *contents* of self-knowledge and the *stability* of that knowledge over time and across contexts. If pilot data shows the two loading on a single factor, the separate reporting is harmless.

**Axis B, Self-Alignment.** How closely your behavior and relationships match your true self versus being shaped by external expectations.

- **B1 Authentic Living:** Kernis & Goldman (2006) awareness + behavior components; Wood et al. (2008) authentic living factor. Acting in accord with your true self, values, and preferences rather than adjusting to gain approval or avoid consequences.
- **B2 Relational Authenticity:** Kernis & Goldman (2006) relational orientation component; Wood et al. (2008) accepting external influence factor (reversed). Being open, genuine, and truthful in close relationships: letting others know the real you rather than playing a role or keeping parts hidden.

**Honesty note 2: B1/B2 decomposition.** Kernis and Goldman (2006) propose four interrelated components; Wood et al. (2008) find three factors. Our pairing of these into B1 (Awareness + Behavior) and B2 (Relational Authenticity) covers three of Kernis & Goldman's four components. The Unbiased Processing component, the ability to objectively evaluate oneself without denying, distorting, or exaggerating self-relevant information, is not directly measured by the current B1 or B2 items. Unbiased processing is the hardest component to self-report: people who are good at self-deception cannot accurately report on their self-deception. Kernis & Goldman's own Unbiased Processing subscale has the lowest internal consistency (α = .64) of the four. We note the gap rather than pretend it is covered.

**Honesty note 3: Overlap with self-esteem.** Identity Clarity and self-esteem are moderately correlated (Campbell et al., 1996). People with higher self-esteem tend to report clearer self-concepts, and vice versa. The relationship is not so strong as to suggest they are the same construct (Campbell presents discriminant validity evidence across multiple studies), but the two share variance. The authenticity components (Kernis & Goldman, 2006) and self-monitoring (Snyder, 1974) are also related to self-esteem. The SSA measures identity structure and expression, not self-esteem. But the SSA results may partially reflect self-esteem variance that the scales do not fully disentangle. This is a measurement ceiling the framework acknowledges, not a claim the instrument can circumvent.

**Honesty note 4: Overlap with personality.** Identity Clarity (Axis A) is negatively correlated with Neuroticism and positively with Conscientiousness (Campbell et al., 1996). Self-Alignment (Axis B) is positively correlated with Agreeableness and negatively with Neuroticism. These are validated constructs we build on. The SSA's contribution is the combination of the two axes and the identity, not personality-trait, framing.

---

## 3. Why the framework fits the Pride theme

Pride celebrates the courage to show who you really are: to live authentically and openly rather than in the shadow of others' expectations. The SSA measures exactly this: how clearly you know yourself, and how authentically you express that self in the world. The four result types each represent a different relationship between knowing yourself and showing yourself.

The test's framing: *Pride is the light that shines when you show who you really are. Which way does your light shine?*

---

## 4. The dimensions measured

Two continuous axes, each 0 to 100.

**Axis A, Identity Clarity** (how clearly you know yourself).
- Construct basis: Campbell et al. (1996) Self-Concept Clarity.
- High pole, Clear: stable, confident self-knowledge. You know your attributes, values, and identity with confidence and consistency.
- Low pole, Diffuse: uncertain, unstable self-beliefs. You are still figuring out who you are, and your sense of self shifts across context and time.
- Honesty note: SCC has one major factor. The A1/A2 split is our design choice: see §2.5.
- Honesty note: The Unbiased Processing component of Kernis & Goldman's authenticity model is not directly captured by B1 or B2: see §2.5 honesty note 2.

**Axis B, Self-Alignment** (how authentically you express yourself).
- Construct basis: Kernis & Goldman (2006) authenticity; Snyder (1974) self-monitoring; Wood et al. (2008) authenticity.
- High pole, Self-Aligned: behavior and relationships match your internal values and feelings. You show who you are.
- Low pole, Other-Oriented: behavior adjusts to social expectations. You adapt to the situation, sometimes at the cost of expressing your true self.

Each quadrant embodies a recognizable identity mode. The person is always a point on the plane, never forced into a binary.

---

## 5. The four result types

| | **Self-Aligned** | **Other-Oriented** |
|---|---|---|
| **Clear** | 🔦 The Beacon | 🔮 The Prism |
| **Diffuse** | 🔥 The Ember | 💠 The Aurora |

Full 14-section profiles live in `03b-ssa-result-profiles.md`.

One-line essences:
- 🔦 **The Beacon** (Clear + Self-Aligned). You know yourself, and you show yourself. There is little gap between who you are and what the world sees.
- 🔮 **The Prism** (Clear + Other-Oriented). You know yourself, but you refract differently depending on who you're with. Your inner clarity stays steady while your presentation shifts.
- 🔥 **The Ember** (Diffuse + Self-Aligned). You don't have a fully formed sense of yourself, but what you do show is genuine. The light is soft, but it is real.
- 💠 **The Aurora** (Diffuse + Other-Oriented). Your sense of self shifts with context, and your presentation shifts with it. You are fluid, adaptive, and always in motion.

**The Reflection** is the boundary condition (near-center). Named for the surface where light meets itself and bounces back: the act of self-reflection needed to arrive at a clear identity. A reflection is a boundary (the mirror's surface), an image (who you see when you look), and a process (the ongoing work of knowing yourself). When facet tension fires, the modifier rewrites the narrative.

---

## 6. Methodology and scoring

Inherits Test 1's model. The math is the same for any two-axis instrument.

**Step 1, collect.** 32 responses, each 1 to 7. Four facets (A1, A2, B1, B2), 8 items each.

**Step 2, direction-normalize.** Map each item so a higher value always means more Clear (Axis A) or more Self-Aligned (Axis B). Reverse-keyed items are inverted.

**Step 3, facet scores.** A1 = mean of normalized A1 items, scaled 0–100. Similarly for A2, B1, B2.

**Step 4, axis scores.** A = mean of A1 and A2, 0–100 (0 = Diffuse, 100 = Clear). B = mean of B1 and B2, 0–100 (0 = Other-Oriented, 100 = Self-Aligned).

**Step 5, locate on the plane.** Center is (50, 50). Quadrant from the signs of A−50 and B−50.
- A>50, B>50: The Beacon
- A>50, B<50: The Prism
- A<50, B<50: The Aurora
- A<50, B>50: The Ember

Prototypicality, angle, gradation, facet-tension detection, and the boundary classification follow Test 1's v0.19 model exactly.

**Step 6, classify.**
- r ≥ 0.28: report primary mode plus gradation plus leaning, plus the facet signature. If an axis is tense, the mode is still reported but carries a facet-tension modifier.
- r < 0.28 and no tense axis: report **The Reflection**, the boundary condition.
- r < 0.28 with at least one tense axis: same Reflection, but with the facet-tension modifier rewriting the narrative from "balanced" to "holding opposites."

---

## 7. Question format and response scale

Format, response scale, and rationale are identical to Test 1. Summarized here, see `01-solstice-cycle-assessment.md` §7.

The format: each question presents a short scenario and two opposing anchor statements on a seven-point scale. The poles alternate randomly so you cannot default to one side. The bipolar format itself handles acquiescence bias.

---

## 8. Item bank, facets, and lengths

**Two lengths, one item bank.** Standard form: 32 questions (~8–10 minutes). Quick form: 16 questions (~4–5 minutes). Both use the same scoring and give the same result types. The 16 is a subset of the 32: the same items, fewer of them. The 16-item version is a screening-tier quick read (4 items per facet, Spearman-Brown α ≈ .60–.70).

**Facet structure.**
- Axis A, Identity Clarity: **A1 Self-Knowledge** (how well you know your own attributes, values, and preferences) and **A2 Self-Consistency** (how stable and internally consistent your self-beliefs are across time and contexts). Both draw from Campbell et al. (1996) SCC. The split is our design: see §2.5 honesty note 1.
- Axis B, Self-Alignment: **B1 Authentic Living** (acting in accord with your true self) and **B2 Relational Authenticity** (being open and genuine in close relationships). Draws from Kernis & Goldman (2006) and Wood et al. (2008). The pairing covers three of Kernis & Goldman's four authenticity components (Awareness + Behavior → B1, Relational → B2); Unbiased Processing is the component not directly captured: see §2.5 honesty note 2.

**Item-writing rules.** Each item varies exactly one facet. No mixing. True opposite poles on one dimension. Neutral language. No transparent giveaways. Gender-neutral and identity-agnostic. Both poles affirming. Pole direction randomized at render time.

### Facet A1: Self-Knowledge (8 items)

All items vary how well you feel you know your attributes, values, and identity. Content areas drawn from Campbell et al. (1996) SCC Scale. No consistency-over-time language (that is A2).

| # | Scenario stem | Clear pole (knows self) | Diffuse pole (seeks self) |
|---|---|---|---|
| A1.1 | When someone asks you to describe what you're like, you… | "Can give a clear and confident answer." | "Struggle to find the right words. I'm still figuring it out." |
| A1.2 | Your sense of what matters to you in life is… | "Something I've thought about a lot and know well." | "Something I haven't fully sorted out yet." |
| A1.3 | When you need to make a decision that reflects your values… | "You know what those values are and what they call for." | "You're not always sure what you actually believe." |
| A1.4 | When you think about who you are as a person… | "I have a clear sense of who I am." | "It's still unclear to me." |
| A1.5 | When people ask what interests or activities truly engage you… | "I can name them without hesitation." | "I'm still figuring out what I'm drawn to." |
| A1.6 | How well do you know your own strengths and weaknesses? | "I have a pretty clear picture." | "I'm still discovering them." |
| A1.7 | When you think about where your life is headed… | "I have a clear sense of direction." | "It raises more questions than answers. I'm still finding my way." |
| A1.8 | Your sense of who you are is best described as… | "Well-defined. I know myself." | "In progress. I'm still becoming." |

### Facet A2: Self-Consistency (8 items)

All items vary the stability and internal coherence of self-beliefs over time and across contexts. Content areas drawn from Campbell et al. (1996) SCC Scale. A2.4 (self-beliefs under challenge), A2.6 (best-self/worst-self coherence), and A2.7 (self-other gap) extend SCC content.

| # | Scenario stem | Clear pole (consistent) | Diffuse pole (shifting) |
|---|---|---|---|
| A2.1 | How you see yourself… | "Is pretty stable from day to day." | "Changes depending on what's happening." |
| A2.2 | Different parts of your personality… | "Feel like they belong together." | "Don't always feel like they fit into one person." |
| A2.3 | Looking back at who you were a few years ago… | "I still see the same core person." | "I almost feel like a different person." |
| A2.4 | When someone challenges how you see yourself… | "My view of myself stays solid. I know what I think." | "I start to question whether I really know myself." |
| A2.5 | Your opinions about yourself… | "Tend to stay consistent over time." | "Change more often than you'd expect." |
| A2.6 | Your best self and your worst self… | "Feel like different versions of the same person." | "Almost feel like two different people." |
| A2.7 | Between how you see yourself and how others describe you… | "There's a pretty close match." | "There's often a gap." |
| A2.8 | Your sense of who you really are… | "Is clear and doesn't waver much." | "Can shift depending on my mood or situation." |

### Facet B1: Authentic Living (8 items)

All items vary how much you behave in accord with your true self, values, and preferences. Relationship-focused items are in B2.

| # | Scenario stem | Self-Aligned pole (true to self) | Other-Oriented pole (adapts) |
|---|---|---|---|
| B1.1 | In most social situations, you… | "Act the same way you feel inside." | "Adjust your behavior to fit what the situation seems to call for." |
| B1.2 | The person people see in public is… | "The same as who I am in private." | "A version of me, not the whole picture." |
| B1.3 | When your gut and the situation don't match… | "You stay true to what matters to you." | "You adapt to what the situation requires." |
| B1.4 | When doing what you believe means going against the crowd… | "Feels right. I'd rather stand by what I believe." | "Is a real tension. Belonging matters too." |
| B1.5 | Across the different groups in your life (work, friends, family)… | "I'm fundamentally the same person with all of them." | "Different sides of me show up in each one." |
| B1.6 | How you act on the outside… | "Accurately reflects what I'm feeling on the inside." | "Is often different from what I'm actually feeling." |
| B1.7 | Doing what others expect of you… | "Is something I do rarely. I prefer to follow my own path." | "Is something I do often. It keeps things smooth." |
| B1.8 | Being yourself, even when it's not the easy choice… | "Comes naturally to me." | "Takes effort. There's a cost to standing out." |

### Facet B2: Relational Authenticity (8 items)

All items vary how open and genuine you are in your closest relationships. Draws from Kernis & Goldman's (2006) Relational Orientation component. Not about general social presentation (that is B1).

| # | Scenario stem | Self-Aligned pole (genuine) | Other-Oriented pole (guarded) |
|---|---|---|---|
| B2.1 | In close relationships, you tend to… | "Share your real thoughts and feelings openly." | "Hold some things back to avoid conflict or judgment." |
| B2.2 | When friends describe you to someone new, they'd say… | "What you see is what you get." | "There's more to me than most people see." |
| B2.3 | Being completely honest about how you feel with the people closest to you… | "Comes naturally to me." | "Feels risky. I'm selective about what I share." |
| B2.4 | In arguments with people you're close to, you… | "Express what you truly think, even if it might upset them." | "Tend to say what will keep the peace." |
| B2.5 | Over time in your closest relationships… | "People see more of who I really am. I gradually open up." | "I tend to show myself the same way from the start." |
| B2.6 | When someone gets close to you, do you… | "Let them in and show your real self." | "Keep some distance. It's safer that way." |
| B2.7 | When a close relationship reaches a new level of depth… | "I lean into it. Deeper honesty is part of closeness." | "I move carefully. There are some things I keep to myself." |
| B2.8 | In your closest relationships, you'd rather… | "Be fully known, even if it's messy." | "Keep certain parts of yourself private." |

**Notes.** All 32 items are gender-neutral and identity-agnostic. Both poles of every item are affirming. A launch pass should run an internal-consistency check per facet and drop or replace the weakest 1 to 2 items if any facet alpha falls below .75.

**Overlap honesty.** Identity Clarity (Axis A) is negatively associated with Neuroticism and positively with Conscientiousness (Campbell et al., 1996). Self-Alignment (Axis B) is positively associated with Agreeableness and negatively with Neuroticism. These are validated constructs we build on. The SSA's contribution is the combination of the two axes and the identity-focused (not personality-trait) framing.

### 8.1 The 16-item short form (SSA-16)

Same subset approach as SCA-16: curated selection of 4 items per facet from the 32-item bank. SSA-16 is a screening-tier quick read (Spearman-Brown α ≈ .60–.70). Scoring model and result taxonomy are identical; only the number of items feeding each facet mean changes. An upgrade path exists: finish the 16, then answer the remaining items for the full result.

**Selection** (content-driven, no pilot data): most construct-central items per facet, maximally spread across content areas.

**SSA-16 = {A1.1, A1.2, A1.4, A1.8, A2.1, A2.3, A2.5, A2.8, B1.1, B1.2, B1.3, B1.6, B2.1, B2.3, B2.6, B2.8}** (16 items, 4 per facet).

| Facet | Retained (4) | Dropped (4) | Why |
|---|---|---|---|
| A1 Self-Knowledge | A1.1, A1.2, A1.4, A1.8 | A1.3, A1.5, A1.6, A1.7 | Four most-direct SCC items: describing yourself, what matters, introspection, self-definition. |
| A2 Self-Consistency | A2.1, A2.3, A2.5, A2.8 | A2.2, A2.4, A2.6, A2.7 | Four most-direct temporal/structural items: daily stability, longitudinal consistency, opinion stability, core self. |
| B1 Authentic Living | B1.1, B1.2, B1.3, B1.6 | B1.4, B1.5, B1.7, B1.8 | Four strongest items: social authenticity, public-private consistency, values-alignment, internal-external match. B1.8 dropped (measures effort-cost, not commitment). |
| B2 Relational Authenticity | B2.1, B2.3, B2.6, B2.8 | B2.2, B2.4, B2.5, B2.7 | Four strongest relational items: sharing, honesty, letting people in, being fully known. |

The short-form caveat ("screening-tier; facet detail is provisional") appears on SSA-16 results.

---

## 9. Interpretation and reporting

A result has four layers, surfaced in order:
1. **Your mode** (quadrant). The shareable label.
2. **Your position** (angle). Gradation and secondary leaning.
3. **Your prototypicality** (radius). How strongly you fit your mode. Near-center yields **The Reflection**, the boundary condition.
4. **Your narrative.** Two to three personalized paragraphs, ending with a "your reflection point" line. Gemini layer per the GDD.

**Deterministic fallback (no-API path).** 12 seasonal-mode states (4 modes × {early, mid, late}) plus the Reflection boundary reading (two narrative variants via the facet-tension modifier). The type count is four; the Reflection is a boundary condition, not a fifth type. The game is fully playable without the API.

**Never reported as:** a self-esteem score, a narcissism score, a diagnostic, a fixed identity, or a clinical assessment. Always framed as a snapshot of how you currently relate to your identity.

---

## 10. Strengths, limitations, intended use

**Strengths.**
- Dimensional underneath, archetypal on top. Inherits Test 1's structural honesty.
- Two axes measuring distinct aspects of identity: how clearly you know yourself and how authentically you express that self.
- Grounded in full-text-verified constructs (Campbell SCC, Kernis & Goldman authenticity, Snyder self-monitoring, Wood authenticity).
- Pride resonance is structural: the test measures the courage and clarity of showing who you are.
- Affirming by design. No bad mode. Diffuse reframed as openness and flexibility, not deficiency. Other-oriented reframed as social intelligence and adaptation, not inauthenticity.

**Limitations.**
- Not a validated clinical instrument. Inspired by validated models. Not independently psychometrically evaluated.
- Self-report biases remain. Identity constructs may be particularly susceptible to self-enhancement and social desirability.
- The A1/A2 and B1/B2 facet splits are designer choices, not independently validated factor structures (see §2.5).
- State versus trait ambiguity. Self-concept clarity and authenticity fluctuate with life circumstances (major transitions, identity crises). The SSA captures current disposition but is not a pure trait measure.
- The Pride cultural movement has specific social and political meanings. The SSA measures the universal psychological dimension of identity expression: knowing yourself and showing yourself. Pride as a movement is about marginalized identities attaining visibility; the SSA measures showing who you are in general, not the specific experience of marginalized groups. This gap is stated explicitly rather than implied.

**Intended use.** Reflective self-discovery and play within the Solstice Soul game. Conversation-starting, shareable identity content.

**Explicitly not intended for.** Clinical diagnosis, employment decisions, relationship matching, or any high-stakes real-world application.

A short, plain-language disclaimer appears with every result.

---

## 11. Status

- Name: The Spectrum of Self Assessment (SSA).
- Result naming: mode-primary with archetype subtitle (`🔦 The Beacon`).
- Boundary: The Reflection.
- Scoring: matches Test 1's v0.19 model (facet-tension detection, gradation convention, tension modifier). Inherits the suite template.
- Item bank: 32 items (4 facets, 8 per facet). 10 items rewritten in v0.1 for construct alignment and content-area spread. None pilot-tested.
- Short form: SSA-16 selected and documented in §8.1 (B1.8 swapped for B1.2 in final selection).
- Citations: 4 structural sources verified against full-text PDFs (Campbell 1996, Kernis & Goldman 2006, Snyder 1974, Wood 2008). 2 sources rejected (Showers 1992, Linville 1987: card-sorting tasks incompatible with self-report).
- Profiles: `03b-ssa-result-profiles.md` contains draft profiles. Not yet through a full audit cycle.
- Research paper: `docs/SSA-research-paper.md` created (public-facing companion document following SCA/MMA format).
- Build: `ssa-debug.html` implemented. Simulation: `ssa-simulate.ts` implemented. Cross-length agreement: 100%.

See `CHANGELOG.md` for revision history.
