# Test 2: The Modes of Mind Assessment (MMA)

> Status: v0.3 design document. Full-text paper audit (7 cognitive psych PDFs reviewed, verified against actual findings). Citations updated: kept only sources with verified full-text; dropped redundant or unverified ones. Three construct honesty notes added (Axis C compositing, C1/C2 cross-construct split, D1/D2 designer decomposition). Four items replaced for construct alignment against paper content. Scoring updated to v0.19 parity (facet-tension detection, gradation convention). Boundary renamed Undecidable → The Halting Point. See CHANGELOG v0.3.
> Position: The Turing-themed test of the four-test Solstice Soul suite.
> Theme served: Alan Turing (computing, code-breaking, AI, the many valid ways a mind can compute).
> Honesty statement: The MMA is an original, theory-informed assessment for reflection and play. Its two axes are grounded in full-text-verified constructs: Processing Mode draws from Need for Cognition (Cacioppo & Petty, 1982), the Rational-Experiential Inventory (Epstein et al., 1996), and the Cognitive Reflection Test (Frederick, 2005); Encoding Structure draws from Riding's (1997) Wholist-Analytic dimension, with cross-cultural corroboration from Nisbett et al. (2001). It is not independently validated and is not clinical. Self-report Likert is a weaker measurement format for cognitive style than for the affective constructs in Test 1 — cognitive processes are often unconscious, and Riding (1997) and Frederick (2005) both use behavioral assessments for this reason. This is an explicit tradeoff stated in §10. The four result names are an interpretive metaphor drawn from computing and Turing's own work, not a claim that human minds are literally algorithms.

---

## 1. The name

**The Modes of Mind Assessment (MMA).**

"Modes" signals dual-process theory (System 1 and System 2 are the two modes of mind). "Mind" is the domain, distinct from Test 1's domain (energy and orientation). "Assessment" matches the SCA naming convention and signals a serious instrument.

The in-game UI may use "The Turing Modes" as a friendlier label, but the framework name is MMA.

---

## 2. Theoretical foundation (each source states its use, each verified against full-text)

Sources below are retained because full-text PDFs confirm the claimed use.

### 2.1 Structural sources (define what we measure)

- **Cacioppo and Petty (1982), Need for Cognition Scale (JPSP).** Four studies developing and validating the NFC. Factor analysis yielded ONE major factor — NFC is unidimensional. Items measure "the tendency for an individual to engage in and enjoy thinking" (p. 116). Unrelated to social desirability, weakly related to cognitive style, weakly negatively related to dogmatism, positively correlated with intelligence. Verified: items are entirely about enjoyment, not speed or ability. *Use:* core anchor for the C1 facet (Deliberation Preference). The unidimensionality finding means C1 and C2 are a cross-construct split, not a two-factor decomposition of NFC — stated in §2.5 honesty notes.
- **Cacioppo, Petty, Feinstein and Jarvis (1996), NFC meta-analysis (Psychological Bulletin).** A comprehensive review confirming NFC is a stable disposition — people differ systematically in how much they enjoy thinking, and this difference is not the same thing as intelligence. *Use:* backs up C1 and confirms that "enjoyment of thinking" is a real, measurable individual difference.

- **Epstein, Pacini, Denes-Raj and Heier (1996), Rational-Experiential Inventory (JPSP).** Two studies validating the REI. The key finding: factor analysis produced TWO ORTHOGONAL factors — NFC (rational) and Faith in Intuition (FI, experiential). Their correlation? r = .08 — practically zero. You can be high in both, or low in both. They're not opposites. The 10-item short form (5 NFC + 5 FI) had α = .73/.72; at 8+ items the Spearman-Brown projection exceeds .85. *Use:* core anchor for Axis C. This is the same pattern as Test 1's Axis B (approach and withdrawal are independent per Carver & White). What it means for our design is in §2.5.
- **Frederick (2005), Cognitive Reflection Test (J. Economic Perspectives).** Three simple questions (the bat-and-ball, machines, and lily-pad problems). Each has an intuitive but wrong answer, and getting it right requires overriding that first impulse. CRT scores predict decision-making biases above IQ. CRT is not the same as NFC — enjoying thinking doesn't mean you'll catch your own wrong intuitions. *Use:* behavioral anchor for the C2 facet. Our C2 items aren't the CRT problems — they're self-report questions about whether you *tend* to verify, not whether you *can* get the right answer.
- **Stanovich and West (2000), Individual differences in reasoning (BBS).** A landmark paper (82 pages plus peer commentary) establishing that thinking dispositions predict reasoning performance above and beyond cognitive ability. Introduces the dual-process framework: System 1 (fast, intuitive, automatic) vs. System 2 (slow, analytical, decontextualized). The key mechanism: "cognitive decontextualization" — the ability to set aside what you already believe and evaluate the problem on its own terms. *Use:* the overarching framework linking C1 (enjoying System 2) and C2 (using System 2 to check your work).
- **Stanovich and West (1997), Actively Open-Minded Thinking (J. Educational Psychology).** AOT is a composite of six subscales (Flexible Thinking + Openness-Ideas + Openness-Values − Absolutism − Dogmatism − Categorical Thinking; α = .88). AOT predicts argument evaluation above cognitive ability. BUT: two of the six subscales are NEO-PI-R facets — AOT substantially overlaps with Big Five Openness. *Use:* supplementary corroboration that individual differences in cognitive processing are real. Provides shading for the result profiles (open-minded/flexible vs. certain/rigid coloring across all four modes). Not used as a structural axis — AOT is more about how you handle beliefs than how you compute.

- **Riding (1997), On the nature of cognitive style (Educational Psychology).** Review of the Cognitive Styles Analysis. Two independent dimensions: Wholist-Analytic (r ≈ ±0.1 with Verbal-Imagery). Wholist-Analytic is independent of intelligence (correlations with ability subtests: r ≈ 0.00–0.04) and independent of personality. The CSA uses behavioral (reaction-time) assessment, not self-report. Riding explicitly criticizes self-report measures (p. 31: "inability to report accurately, unwillingness to make the necessary effort, social desirability bias") but acknowledges validated self-report instruments exist (Allinson & Hayes, 1996). *Use:* core anchor for Axis D (Encoding Structure), specifically the Wholist-Analytic (parts-first vs. whole-first) dimension. The CSA is behavioral; our conversion to self-report is a design choice stated in §2.5.
- **Nisbett, Peng, Choi and Norenzayan (2001), Culture and systems of thought (Psychological Review).** Cross-cultural validation of the holistic vs. analytic distinction. East Asians tend toward holistic (context/field-sensitive) processing; Westerners tend toward analytic (object/category-based) processing. The distinction maps onto perceptual field dependence/independence (Witkin). *Use:* independent, cross-cultural corroboration that the parts/wholes distinction is a genuine, stable cognitive dimension — not a measurement artifact of one instrument. Supplementary citation; does not provide item content or a two-facet structure.

### 2.2 Textural sources (define how we describe)

Each result's profile draws vocabulary from the broader cognitive-styles and thinking-dispositions literature. No textural source below is used as a structural anchor.

- **Sternberg (1988, 1997), Thinking Styles.** 13 thinking styles across functions, forms, levels, scopes. *Use:* archetype vocabulary for the result profiles only. Too many dimensions to structure a two-axis test, so not used structurally. NOTE: not verified against full-text; cited for naming richness only.
- **Sowden, Pringle and Gabora (2014), creative thinking and dual-process theory.** Maps creative generation and refinement onto Type 1 and Type 2 processes. *Use:* conceptual argument for why creativity is not a separate axis (§2.3). NOTE: not verified against full-text; cited for the conceptual point only.


### 2.3 Why two axes, why these two, why not three

- **Why not three (Verbaliser-Imager).** Riding validates Verbaliser-Imager as orthogonal to Wholist-Analytic (r ≈ ±0.1). The dimension has genuine construct validity. We drop it because (a) it adds a third axis that breaks the suite's 4-quadrant template, (b) it overlaps with modality-of-study rather than core cognition, and (c) the suite template is locked (§2 of the framework doc). Wholist-Analytic is the more cognition-level construct.
- **Why not a creativity axis.** Creativity is a capability, not a cognitive mode. Sowden, Pringle and Gabora (2014) show creative generation and refinement map onto Type 1 and Type 2 processes, meaning creativity is distributed across all four quadrants. Forcing a creativity axis would conflate capability with style.
- **Why Epstein dual-process rather than MBTI thinking-vs-feeling.** Epstein treats rational and experiential as independent dimensions, confirmed as orthogonal in the full-text (r = .08). MBTI dichotomizes them. Same flaw as Test 1's rationale for rejecting MBTI (McCrae and Costa 1989).

### 2.4 Response-format sources (inherit from Test 1)

Decisions apply unchanged from Test 1. Full argument in `01-solstice-cycle-assessment.md` §7.
- **Sun, Schmidt and Henry (2025).** Sliders underperform Likert.
- **Chang (1994), Gosling et al. (2003), Spearman-Brown.** Seven points, eight items per axis.
- **McCrae and Costa (1989), Schulte et al. (2020).** Reject forced-choice and dichotomizing.


### 2.5 Facet grounding and honesty notes

The facets under each axis are grounded in validated constructs. Three honesty notes document design choices where we stray from the source instruments — the same transparency Test 1 uses for its Axis A compositing.

**Axis C facets.**
- **C1 Deliberation Preference:** Need for Cognition (Cacioppo & Petty, 1982). The tendency to engage in and enjoy effortful thinking. NFC is one thing — one major factor, confirmed in four studies. Items are about enjoyment: "I prefer complex to simple problems"; "Thinking is not my idea of fun" [reversed]. Not about speed, not about ability.
- **C2 Override Tendency:** The dispositional side of cognitive override (Frederick, 2005). Do you pause and check your intuitions, or trust them and move on? CRT is a behavioral test — our items convert this to self-report, asking about your tendency to verify, not your ability to get the right answer. Stanovich & West (2000) on "cognitive decontextualization" provides the bridge: both C1 and C2 are about engaging System 2, but C1 is about enjoying it and C2 is about checking with it.

**Honesty note 1 — Axis C puts two independent dimensions on one scale.** NFC (enjoyment of rational thinking) and Faith in Intuition (experiential) are separate dimensions in the REI (Epstein et al., 1996; r = .08). A person can be high in both or low in both. Treating them as opposite ends of one axis collapses two dimensions into one. A mid-axis score on our test could mean you're high in both systems, low in both, or genuinely in the middle. The C1 and C2 facet scores help tell these apart: if your C1 (enjoyment) is high but your axis score is mid-range, you're probably bimodal — you engage both rational AND intuitive thinking. The facet signature surfaces this; the axis mean alone doesn't.

**Honesty note 2 — C1 and C2 come from different constructs.** C1 is NFC (enjoyment of thinking). C2 is override tendency (checking your intuitions). These are different things — the CRT paper (Frederick, 2005) confirmed you can enjoy thinking without being good at checking your gut. We put them under one axis because they share a "System 2 engagement" theme (Stanovich & West, 2000), but they're not two halves of one validated scale. We report them separately so any divergence is visible. If pilot data ever shows they merge into one factor, the separate reporting is harmless.

**Axis D facets.**
- **D1 Entry Point:** Riding (1997) Wholist-Analytic. What registers first when you encounter something new — the parts, or the whole picture? Riding's original test uses computer-based reaction-time tasks, not a questionnaire.
- **D2 Decomposition Habit:** Same Riding source, but applied to what you do once you have the information. Do you break things down into units, or look for patterns that connect them? D2 is our extension — Riding doesn't split Wholist-Analytic into two sub-facets.

**Honesty note 3 — D1 and D2, and the switch from behavioral to self-report.** Riding treats Wholist-Analytic as one dimension and measures it behaviorally. We split it into two facets and use Likert self-report. Both are design choices. Riding himself flagged self-report weaknesses for cognitive style ("inability to report accurately… social desirability bias"). We're transparent: D1 and D2 are reported separately so you can see any differences; if they turn out to be the same factor, the split is harmless. The self-report format carries the same caveats as every other test in this suite.

**Honesty note 4 — Overlap with personality.** C1 overlaps with Big Five Openness-to-Ideas. C2 overlaps with Conscientiousness. Axis D overlaps weakly with Openness. These are real, validated constructs — we're not inventing dimensions, we're combining established ones into a new structure. The MMA's contribution is asking "how do you compute?" from two angles (process and structure), framed through Turing's work rather than through personality.


---

## 3. Why the framework fits the Turing theme

Turing's core insight was that there are many valid ways a mind can compute. The Imitation Game asks whether a hidden mind can be inferred from its outputs. The MMA asks the inverse: given your outputs (your item responses), which mode of mind is yours?

The fit is structural. Turing's own work spans all four quadrants — not as a retrospective mapping, but as a direct correspondence between the cognitive mode each quadrant describes and what Turing actually built or discovered:

| Turing's work | Cognitive mode | Why the fit is genuine, not decorative |
|---|---|---|
| The Turing Machine, the Halting Problem (1936) | ⚙️ The Algorithm (sequential + deliberate) | Turing formalized computation as a deterministic sequence of exact operations. The Algorithm is the mode this formalization describes: stepwise, verifiable, each operation justified by the one before it. The Turing Machine IS the operational definition of sequential+deliberate. |
| Enigma codebreaking, Bombe design (1939–42) | 🕸️ The Cipher (sequential + intuitive) | Cryptanalysis involves sequential operation (character by character, frequency by frequency) driven by pattern recognition rather than formal proof. The Bombe automated this: an electro-mechanical pattern-matcher that tested rotor settings against known cribs. The mapping is to the cognitive mode of the activity, not to Turing's personal style — the weakest of the four mappings, stated openly. |
| Morphogenesis, reaction-diffusion (1952) | 🔮 The Gestalt (holistic + intuitive) | Turing's morphogenesis paper describes how global patterns (spots, stripes, spirals) emerge from simple local rules — the definition of a holistic+intuitive insight. He saw the whole pattern arising from the system dynamics, not from specifying each element. This is the purest expression of the Gestalt mode. |
| ACE architecture, computability theory (1945) | 🏗️ The Architecture (holistic + deliberate) | The ACE design was a complete system architecture — Turing designed the whole machine, not a component. His computability work asks what can be computed in principle, a systems-level question approached with formal rigor. The Architecture mode: deliberate, structured, and about wholes. |

The test's framing: *Turing showed that minds, like machines, come in different architectures. Which of these is yours?* The mapping is structural and historically grounded, not decorative. The one mapping that stretches (the Cipher → Enigma via the mode of the activity, not the man) is stated openly rather than implied.

---

## 4. The dimensions measured

Two orthogonal continuous axes, each 0 to 100.

**Axis C, Processing Mode** (how you arrive at answers).
- Construct basis: Cacioppo & Petty (1982) Need for Cognition. Epstein et al. (1996) REI. Frederick (2005) CRT (behavioral anchor for C2). Stanovich & West (2000) dual-process framework.
- High pole, Deliberate (System 2): effortful, analytical, and enjoys the thinking itself — not just the answer. The NFC core.
- Low pole, Intuitive (System 1): rapid, automatic, pattern-based, low-effort. Reframed as fluency and speed, never as laziness or error.
- **Honesty note (full-text verified).** NFC and Faith in Intuition are orthogonal in the REI (Epstein et al., 1996; r = .08). Treating them as a single bipolar axis is a design choice. A mid-axis score may reflect being high in both, low in both, or genuinely intermediate. The C1 and C2 facet sub-scores disambiguate. See §2.5.

**Axis D, Encoding Structure** (how you take in and structure information).
- Construct basis: Riding (1997) Wholist-Analytic dimension. Nisbett et al. (2001) cross-cultural corroboration.
- High pole, Sequential: parts-first, ordered, builds bottom-up.
- Low pole, Holistic: whole-first, configurational, builds top-down. Neither pole is superior.
- **Honesty note (full-text verified).** Riding's CSA assesses Wholist-Analytic behaviorally (reaction time), not via self-report. Our conversion to self-report Likert is a design choice. The D1/D2 split into Entry Point and Decomposition Habit is a designer decomposition of a unidimensional construct — see §2.5.
Each quadrant embodies a recognizable cognitive mode. The person is always a point on the plane, never forced into a binary.

---

## 5. The four result types

| | **Intuitive (System 1)** | **Deliberate (System 2)** |
|---|---|---|
| **Sequential** | 🕸️ The Cipher | ⚙️ The Algorithm |
| **Holistic** | 🔮 The Gestalt | 🏗️ The Architecture |

Full 14-section profiles live in `02b-modes-result-profiles.md`. Modeled on the same depth schema as Test 1.

One-line essences:
- ⚙️ **The Algorithm** (Sequential + Deliberate). Formal, exact, stepwise. You think in proofs and procedures.
- 🕸️ **The Cipher** (Sequential + Intuitive). Pattern-fluent. You read sequences and signatures by feel, fast.
- 🔮 **The Gestalt** (Holistic + Intuitive). You see wholes and emergent forms before anyone has named the parts.
- 🏗️ **The Architecture** (Holistic + Deliberate). Systems-level, structured. You design and reason about whole systems on purpose.

Why "The Cipher" is Sequential plus Intuitive: a cryptanalyst works sequentially (character by character, frequency by frequency) but arrives at the answer through pattern recognition, not formal proof. This is the mode Enigma codebreaking called for, and it is Turing's most celebrated applied work. The reading is deliberate and historically grounded, not arbitrary.

---

## 6. Methodology and scoring

Inherits Test 1's model identically — the math is construct-agnostic and applies to any two-axis continuous instrument.

**Step 1, collect.** 32 responses, each 1 to 7. Four facets (C1, C2, D1, D2), 8 items each.

**Step 2, direction-normalize.** Map each item so a higher value always means more Deliberate (Axis C) or more Sequential (Axis D). Reverse-keyed items are inverted.

**Step 3, facet scores.** C1 = mean of normalized C1 items, scaled 0–100. Similarly for C2, D1, D2.

**Step 4, axis scores.** C = mean of C1 and C2, 0–100 (0 = Intuitive, 100 = Deliberate). D = mean of D1 and D2, 0–100 (0 = Holistic, 100 = Sequential).

**Step 5, locate on the plane.** Center is (50, 50). Quadrant from the signs of C−50 and D−50.
  - C>50, D>50: The Algorithm
  - C<50, D>50: The Cipher
  - C<50, D<50: The Gestalt
  - C>50, D<50: The Architecture
- Prototypicality r = distance from center / 70.7.
- Gradation convention. Same geometry as Test 1. Within each quadrant, progress is measured from the entry edge (the boundary with the adjacent quadrant). Binned Early (0–30°), Mid (30–60°), Late (60–90°).
**Step 6, classify.** Follows Test 1's v0.19 model.
- **Facet-tension check.** An axis is "tense" when its two facets pull in opposite directions and both are at least 20 points from 50. That means the axis mean landed near center because the two facets cancelled each other — not because you're moderate.
- **r ≥ 0.28** (clear mode): report your mode, gradation, and facet signature. If an axis is tense, add a tension flag.
- **r < 0.28, no tension** (genuinely balanced): report **The Halting Point** — the boundary condition. Named for Turing's proof that no algorithm can determine in general whether a program will halt. Similarly, your responses don't strongly favor any one mode — not a failure, just an honest answer.
- **r < 0.28, with tension** (near center from cancellation): same Halting Point boundary, but the narrative changes. Instead of "you're balanced," it says "you're near center because two strong facets cancel — not because you're moderate. Read the facet signature." This is the tension modifier rewriting the story, not a new result type.

This is the hybrid dimensional and prototypical pattern (Kerber et al., 2021) inherited from Test 1. It avoids the midpoint cliff (McCrae and Costa, 1989). The Halting Point, like the Threshold in Test 1, is a boundary condition — not a fifth type.


---

## 7. Question format and response scale

Format, response scale, and rationale are identical to Test 1. Summarized here, see `01-solstice-cycle-assessment.md` §7 for the full argument.
The format: each question shows a short scenario and two opposing anchor statements on a seven-point scale. The poles alternate randomly so you can't default to one side. The bipolar format itself handles acquiescence bias (always-agree tendency).

Every validated cognitive-style instrument uses Likert — the REI, NFC, and CSA are all questionnaire-based. None use sliders. Seven points gives enough precision without overwhelming you.

---

**Two lengths, one item bank.** Standard form: 32 questions (~8–10 minutes). Quick form: 16 questions (~4–5 minutes). Both use the same scoring and give the same result types. The 16 is a subset of the 32 — the same items, fewer of them. You can start with 16 and finish the rest later for the full result. The 16-item version is a quick read: it places you in a mode reliably, but the facet detail is rougher (four items per facet lands in a lower reliability band, which we state on the result screen).

**Facet structure.**
- Axis C, Processing Mode: **C1 Deliberation Preference** (do you enjoy thinking hard?) and **C2 Override Tendency** (do you check your intuitions?). C1 comes from Need for Cognition (Cacioppo & Petty, 1982). C2 is the self-report equivalent of the Cognitive Reflection Test's behavioral pattern (Frederick, 2005) — the tendency to verify, not the ability to get the right answer.
- Axis D, Encoding Structure: **D1 Entry Point** (what do you notice first — the pieces or the whole?) and **D2 Decomposition Habit** (once you're in, do you break things down or look for patterns?). Both draw from Riding's (1997) parts-first vs. whole-first dimension. D1/D2 is our split — Riding treats it as one dimension. See §2.5 for the honesty note.

**Item-writing rules.** Each item varies exactly one facet — no mixing. True opposite poles on one dimension. Neutral language (no "good" or "bad" framing). No transparent giveaways. Gender-neutral. Both poles are affirming. Pole direction is randomized at render time.

### Facet C1: Deliberation Preference (8 items)

All items vary enjoyment of and preference for effortful thinking. Each item uses a behavioral scenario — asking what you would do in a specific situation, not what you claim to be in general. This is consistent with the measurement philosophy of Riding (1997) and Frederick (2005): for cognitive processing, demonstrated preference is a more valid signal than self-assessed identity. Content areas: free-time choice, learning approach, thinking endurance, problem impulse, seeking thinking, post-effort experience, complexity approach, and engaging with ideas when depleted.

| # | Scenario stem | Deliberate pole (System 2) | Intuitive pole (System 1) |
|---|---|---|---|
| C1.1 | A Sunday afternoon with nothing scheduled. You find yourself… | "Reading something challenging, working on a puzzle, or exploring an idea." | "Relaxing with something that doesn't require much thought." |
| C1.2 | When you're learning something new, you prefer to… | "Understand the principles first, deliberately." | "Pick it up by doing, before I have the theory." |
| C1.3 | When a problem makes you think hard for an extended time, you feel… | "Energized. This is why I'm here." | "Drained. I'd rather be done." |
| C1.4 | A hard problem lands on you. Your impulse is to… | "Sit with it and work it through." | "Find the quickest path to an answer." |
| C1.5 | When you have free time and nothing pressing, you're likely to… | "Pick up something mentally challenging." | "Do something that doesn't require much thought." |
| C1.6 | After spending an hour working through a genuinely hard problem, you feel… | "Satisfied. That was a good use of time." | "Drained. I need to recover." |
| C1.7 | When something is complex… | "I want to map it fully before acting." | "I want to get the gist and act." |
| C1.8 | You've just finished a long day. A friend asks you a genuinely interesting but difficult question. You… | "Engage fully — a good question pulls me back in." | "Give a brief answer — I'm done thinking for now." |


### Facet C2: Override Tendency (8 items)

All items vary how much you check or verify intuitions before trusting them. Not about preference for thinking — that is C1. Content areas: initial-impulse verification, gut-vs-analysis conflict, tolerance for unexplained knowledge, verification as default vs. exception.

| # | Scenario stem | Deliberate pole (verifies) | Intuitive pole (trusts fast) |
|---|---|---|---|
| C2.1 | You get an answer quickly and it feels right. What do you do? | "Slow down and verify it before trusting it." | "Trust it, then move on." |
| C2.2 | A gut feeling conflicts with your analysis. You tend to… | "Follow the analysis." | "Follow the gut, even if I can't justify it yet." |
| C2.3 | When you can't explain how you know something, you… | "Don't fully trust it until I can." | "Trust it anyway. Some knowledge is pre-verbal." |
| C2.4 | Your first instinct on a question is usually… | "A hypothesis I then check." | "Something I trust and run with." |
| C2.5 | Someone tells you something surprising. Before you accept it, you… | "Try to verify it from another source." | "Accept it if the person seems credible." |
| C2.6 | When you make a snap judgment… | "I usually circle back and check it later." | "I trust it and move on." |
| C2.7 | Doubt, for you, is… | "A signal to dig deeper." | "A drag I'd rather skip." |
| C2.8 | When the stakes are real… | "I override instinct with analysis." | "I trust instinct and analyze after." |


### Facet D1: Entry Point (8 items)

All items vary what registers first when you approach new information. No processing-mode words.

| # | Scenario stem | Sequential pole (parts-first) | Holistic pole (whole-first) |
|---|---|---|---|
| D1.1 | You're handed a problem you've never seen before. First move? | "Break it into steps and solve each one." | "Get the overall shape of it, then fill in." |
| D1.2 | How do you usually grasp a new idea? | "Component by component, until the whole assembles." | "Whole first, then I learn what the parts are." |
| D1.3 | When you read, your eye moves… | "Line by line, in order." | "Around the page, grabbing the shape of it first." |
| D1.4 | A new subject. You start with… | "The basics, the building blocks." | "The big picture, what it's about." |
| D1.5 | Entering a new situation… | "I notice the pieces first." | "I get the overall feel first." |
| D1.6 | When learning a new skill, you start with… | "The individual techniques, one at a time." | "Understanding what the skill feels like as a whole." |
| D1.7 | When information arrives… | "I take it in piece by piece." | "I take in the whole pattern." |
| D1.8 | Your entry point into anything new is… | "The parts." | "The whole." |


### Facet D2: Decomposition Habit (8 items)

All items vary how you work with information once you have it — ongoing processing: decompose into units or synthesize into wholes. Distinct from D1 (first entry): D1 is the moment of encountering; D2 is the habit of working.

| # | Scenario stem | Sequential pole (decomposes) | Holistic pole (synthesizes) |
|---|---|---|---|
| D2.1 | You're explaining something you understand well. You tend to… | "Build it up piece by piece for the listener." | "Give the whole picture first, then refine." |
| D2.2 | A complex system is in front of you. Where do you start? | "With the individual components and how each works." | "With the overall structure and what it's doing." |
| D2.3 | You're designing something from scratch. You… | "Work through the components in sequence." | "Hold the complete vision in mind, then realize it." |
| D2.4 | A pile of details lands on you. You prefer to… | "Order them into a sequence and work through it." | "Stand back and find the pattern they form." |
| D2.5 | When the details don't add up to a sensible whole, you… | "Keep working the parts until they do." | "Step back and reconsider the shape of the whole." |
| D2.6 | Faced with complexity… | "I decompose it into manageable units." | "I look for the unifying pattern." |
| D2.7 | You're working on a complex project with a team. Your natural role is… | "Breaking the work into clear parts and sequences." | "Keeping the overall picture clear while others handle the details." |
| D2.8 | Understanding, for you, comes from… | "Assembling parts into wholes." | "Grasping wholes that contain their parts." |


**Notes.** All 32 items use behavioral-scenario framing ("what do you do") rather than trait endorsement ("what are you like"), consistent with the measurement philosophy of Riding's (1997) CSA and Frederick's (2005) CRT — for cognitive processing, demonstrated preference is a more valid signal than self-assessed identity. Both poles of every item are affirming. A launch pass should run an internal-consistency check per facet and drop or replace the weakest 1 to 2 items if any facet alpha falls below .75. Ten items were replaced in v0.3 (C1.1, C1.3, C1.5, C1.6, C1.8, C2.5, C2.6, D1.6, D2.3, D2.7) for construct alignment and behavioral-scenario conversion; none have been pilot-tested.


**Overlap honesty.** Axis C (Processing Mode) overlaps with Big Five Openness-to-Ideas (via C1, confirmed in Stanovich & West, 1997) and Conscientiousness (via C2's deliberation/responsibility shading). Axis D (Encoding Structure) overlaps weakly with Openness. These are validated constructs we build on, not inventions. The MMA's contribution is the combination, the facet structure, and the cognitive (not personality) framing.

### 8.1 The 16-item short form (MMA-16)

Same subset approach as SCA-16: curated selection of 4 items per facet from the 32-item bank. MMA-16 is a screening-tier quick read (Spearman-Brown α ≈ .60–.70 — the same marginal band as SCA-16, stated openly on the result screen). Scoring model and result taxonomy are identical; only the number of items feeding each facet mean changes. An upgrade path exists: finish the 16, then answer the remaining items for the full result.

**Selection** (content-driven, no pilot data): most construct-central items per facet, maximally spread across content areas.

**MMA-16 = {C1.1, C1.4, C1.6, C1.8, C2.1, C2.2, C2.5, C2.7, D1.1, D1.4, D1.5, D1.6, D2.2, D2.5, D2.7, D2.8}** (16 items, 4 per facet).

| Facet | Retained (4) | Dropped (4) | Why |
|---|---|---|---|
| C1 Deliberation Pref. | C1.1, C1.4, C1.6, C1.8 | C1.2, C1.3, C1.5, C1.7 | Four NFC items using behavioral scenarios: free-time choice, problem impulse, post-effort feeling, social endurance. Dropped C1.2 (learning — narrow), C1.3/C1.5/C1.7 (overlap retained). |
| C2 Override Tendency | C2.1, C2.2, C2.5, C2.7 | C2.3, C2.4, C2.6, C2.8 | Four distinct verification contexts: self-generated intuition, internal conflict, claims from others, and doubt as epistemic signal. Dropped C2.3/C2.4 (narrower overlaps), C2.6 (replaced), C2.8 (partially context-dependent). |
| D1 Entry Point | D1.1, D1.4, D1.5, D1.6 | D1.2, D1.3, D1.7, D1.8 | Four broad entry contexts: problem, learning, situation, skill. Dropped D1.2 (overlaps D1.1), D1.3 (reading — narrow), D1.7/D1.8 (overlap retained / too generic). |
| D2 Decomposition | D2.2, D2.5, D2.7, D2.8 | D2.1, D2.3, D2.4, D2.6 | Span approach, conflict, collaboration, and foundational understanding. Dropped D2.1 (output — narrow), D2.3 (replaced), D2.4/D2.6 (overlap retained). |

The short-form caveat ("screening-tier; facet detail is provisional") appears on MMA-16 results.
---

## 9. Interpretation and reporting

A result has four layers, surfaced in order:
1. **Your mode** (quadrant). The shareable label.
2. **Your position** (angle). Gradation and secondary leaning.
3. **Your prototypicality** (radius). Strongly versus with nuance. Near-center yields **The Halting Point** — the boundary condition, named for Turing's formal undecidability result. Its narrative splits depending on the facet-tension modifier: genuinely balanced ("no algorithm can settle this") or holding opposites ("two strong facets cancel, not balance").
4. **Your narrative.** Two to three personalized paragraphs from the full answer pattern, ending with a "your halting point" line (the Turing-flavored equivalent of Test 1's "your moment on the cycle"). Gemini layer per the GDD.

**Deterministic fallback (no-API path).** 12 seasonal-mode states (4 modes × {early, mid, late}) plus the Halting Point boundary reading (two narrative variants via the facet-tension modifier). The type count is four; the Halting Point is a boundary condition, not a fifth type. The game is fully playable without the API.

**Never reported as:** an IQ score, a creativity score, a competence ranking, a fixed identity, or a clinical assessment. Always framed as a snapshot of how your mind tends to work right now.

---

## 10. Strengths, limitations, intended use

**Strengths.**
- Dimensional underneath, archetypal on top. Inherits Test 1's structural honesty.
- Two genuinely cognitive axes. Minimal overlap with Test 1's affective and motivational axes.
- Grounded in validated constructs (Epstein dual-process, Riding Wholist-Analytic).
- Turing resonance is structural, not decorative. Each result points at a real piece of Turing's work.
- Affirming and inclusive by design. No bad mode. Intuitive reframed as fluency and speed, never laziness or error.
- Playable offline. Deterministic fallback. The AI layer is enrichment, not a dependency.

**Limitations, stated up front in the product.**
- Not a validated clinical instrument. Inspired by validated models (NFC, REI, CRT, Wholist-Analytic). Not independently psychometrically evaluated.

- **Domain-specific honesty note — self-report is a weaker instrument for cognitive style than for affect.** Test 1 measures felt states (how energized you feel, how socially oriented you are). Those are accessible to introspection. Test 2 measures cognitive processes (how you process and structure information), which are often unconscious. System 1 is automatic by definition — people may have limited introspective access to their own cognitive style. Riding (1997) built the CSA as a behavioral reaction-time test specifically because he rejected self-report for cognitive style: "introspective self-report measures have inherent weaknesses… inability to report accurately… unwillingness to make the necessary effort… social desirability bias" (p. 31). Frederick's (2005) CRT is likewise behavioral — you cannot ask someone if they override their intuitions and trust the answer; you have to give them a problem and observe. We use self-report Likert because validated instruments exist for this domain (the NFC and REI use it successfully), and a behavioral test is impractical in a self-administered game context. But the measurement error is genuinely higher here than for Test 1, and the ceiling on what self-report can capture for cognitive processing is lower. This is an explicit tradeoff, not an equivalence.

- The REI dimensions (NFC and FI) are orthogonal (Epstein et al., 1996). Collapsing them into one bipolar axis loses information — the facet signature recovers some, not all, of the lost texture. See §2.5 honesty note 1.

- The mode names are interpretive. We measure processing preference and encoding structure. We name the result computationally.
- The Halting Problem reference is a metaphor. Formal undecidability is a proof about Turing machines, not about cognitive profiles. The metaphor is made explicit so it is not mistaken for a formal claim.
- State versus trait ambiguity. The MMA blurs stable disposition with current thinking habits. We lean into this, but it is not a pure trait measure.


**Intended use.**
- Reflective self-discovery and play within the Solstice Soul game.
- Conversation-starting, shareable identity content.

**Explicitly not intended for.**
- IQ, aptitude, or competence assessment.
- Employment, hiring, or performance decisions.
- Learning-style-based instruction matching. We deliberately do not claim instructional consequences, see §2.3.
- Any high-stakes real-world decision about a person.

A short, plain-language disclaimer appears with every result.

---

## 11. Status

- Name: The Modes of Mind Assessment (MMA).
- Result naming: mode-primary with archetype subtitle (`⚙️ The Algorithm`).
- Boundary: The Halting Point.
- Scoring: matches Test 1's v0.19 model (facet-tension detection, gradation convention, tension modifier). Inherits the suite template.
- Item bank: 32 items (4 facets, 8 per facet). 10 items replaced in v0.3. None pilot-tested.
- Short form: MMA-16 selected and documented in §8.1.
- Citations: 9 structural sources verified against full-text PDFs; 2 textural sources flagged as unverified.

- Build: `mma-debug.html` implemented (debug build, length toggle, scoring engine, debug panel).
- Simulation: `mma-simulate.ts` implemented (length-aware scoring, cross-length agreement, full audit suite).
- Research paper: `docs/MMA-research-paper.md` created.
- Profiles: `02b` re-audited, Halting Point boundary profile added, closing-line name conflict resolved.




See `CHANGELOG.md` for revision history.


