# Arcus

**See the arc you're on.** Four personality assessments that show where you stand and which direction you're heading across energy, thinking, identity, and time.

---

## What Arcus is

Arcus measures personality as a curve with a direction. Every result has two parts: a position and a direction. The position tells you where you stand. The direction tells you where you are headed. Together they trace an arc.

Arcus asks four questions. Where is your energy sitting, and which way is it turning? Does what you say about your mind match what your choices show? How well do you know yourself, and how well do you show it? Where does your attention sit across time, and how do you feel about time passing?

The name comes from the Latin word for arc. An arc has a shape and a direction. It connects where you were to where you are going.

---

## The four assessments

Four tests give you four arcs. Each maps a different part of who you are using a methodology native to that domain. The tests are independent. Take any of them first, in any order, at your own pace.

### Solstice — The arc of your energy

Measures affect, energy, and motivation. Energy rises and falls in cycles. Solstice maps where you sit on that cycle right now and which direction your energy is heading: gathering toward a peak, settling toward rest, or holding steady.

Built on Russell's circumplex model of affect, Carver-White BIS/BAS scales, and Carver-Scheier self-regulation theory. Uses a 7-point bipolar format with two axes (Solar Height and Tidal Direction) plus a trajectory layer.

**36 questions · ~10 minutes**

### Turing — The arc of your mind

Measures cognition and thinking. Turing captures how you describe your thinking and then observes how you decide. It reads the gap between the two.

Built on the Need for Cognition scale (Cacioppo & Petty), the Rational-Experiential Inventory (Epstein), the Cognitive Reflection Test (Frederick), and heuristic decision-making research (Gigerenzer & Gaissmaier). Uses self-report scales, behavioral problems, and a decision-strategy battery.

**31 questions · ~9 minutes**

### Pride — The arc of your self

Measures identity, self-concept, and self-expression. Whether you know yourself with confidence, show yourself without pretense, and feel your identity is claimed or still forming.

Built on Self-Concept Clarity (Campbell), authenticity models (Kernis & Goldman, Wood), Marcia's identity commitment dimension, and self-other knowledge asymmetry research (Vazire). Uses a 7-point bipolar format across two axes (Identity Clarity and Self-Alignment) plus a commitment score.

**36 questions · ~10 minutes**

### Passage — The arc of your time

Measures temporality. Which parts of time you inhabit. Past, present, and future each get their own score. And how you feel about time moving forward.

Built on the Zimbardo Time Perspective Inventory, the Present-Eudaimonic scale (Vowinckel), a 24-country cross-cultural validation (Sircova), and Carstensen's socioemotional selectivity theory. Uses 5-point unipolar scales plus a forced-pick stance layer.

**28 questions · ~8 minutes**

---

## How the assessments work

Each assessment follows the same structure.

1. **Position.** A set of questions places you on continuous dimensions specific to that domain. Scores are 0-100 with 50 as the midpoint.

2. **Direction.** A secondary layer measures the felt direction of the pattern. Are you gathering or settling? Does your identity feel claimed or still forming?

3. **Result.** A type label derived from your position, plus a direction modifier. The result is a point on a curve with a trajectory.

4. **Dimensions.** The result shows the individual dimension scores that produced the type. You can see the scores behind the label.

### Geometry notes

For the two-axis tests (Solstice and Pride), the result includes three pieces of information about your position inside the type.

**Prototypicality** describes how squarely you sit in your type. The fit is strong, clear, or near the boundary between types.

**Gradation** describes where you are within the type. You land in the early, mid, or late phase.

**Facet tension** describes when two sub-dimensions of an axis pull in opposite directions and both are strong. The axis score lands in the middle. Two sides cancel each other.

### Honest scope

Every result page carries one line: Arcus measures the affirming range of each construct and cannot detect maladaptive patterns. The suite is for self-discovery and reflection.

---

## The research foundation

Every construct in Arcus draws from published, peer-reviewed psychology research. The key sources are full-text verified in the `research/sources/` directory. The framework design, evidence reviews, and profile specifications for each assessment live in the `research/assessments/` directory alongside a full changelog.

**Verified construct sources:**

| Area | Sources |
|---|---|
| Affect & Energy | Russell (1980), Carver & White (1994), Schimmack & Reisenzein (2002), Zuckerman (2007), Carver-Scheier self-regulation theory |
| Cognition | Cacioppo & Petty (1982), Cacioppo et al. (1996), Epstein et al. (1996), Frederick (2005), Gigerenzer & Gaissmaier (2011), Luan, Schooler & Gigerenzer (2011) |
| Identity | Campbell et al. (1996), Kernis & Goldman (2006), Wood et al. (2008), Marcia (1966), Vazire (2010), Beer & Vazire (2017) |
| Time | Zimbardo & Boyd (1999), Sircova et al. (2014), Vowinckel et al. (2015), Carstensen (2021) |
| Methodology | Gerlach et al. (2018), Kerber et al. (2021), McCrae & Costa (1989), Schulte et al. (2020) |

### What is validated and what is synthesis

The framework document (research/framework.md) labels each component.

**Validated (used as-is):**
- Russell's circumplex model for affect
- Carver-White BIS/BAS scales
- Cacioppo-Petty Need for Cognition scale
- Epstein's Rational-Experiential Inventory
- Campbell's Self-Concept Clarity scale
- Marcia's identity commitment dimension
- Zimbardo-Boyd Time Perspective Inventory
- Carstensen's perceived time horizons

**Synthesis (our combination, labeled as unvalidated):**
- Position-plus-trajectory result for Solstice
- Stated-vs-observed gap as the interpretive lead for Turing
- Four-component Pride profile (clarity, authenticity, commitment, visibility)
- Four-stance typology (resource, weight, gift, mystery) for Passage
- Cross-test self-congruence profile reading the four internal gaps together

The syntheses derive from the validated component measurements. They are exploratory integration layers.

---

## Features

### Encrypted local progress

Your browser encrypts assessment progress using AES-GCM via the Web Crypto API and stores it in localStorage. You can leave an assessment partway through and continue later. The encryption protects progress from casual inspection.

### Anonymous result sharing

When you finish an assessment, the server generates a share link and stores it in Cloudflare D1. The share link is a 32-character cryptographically random token. Shared results show only the derived result snapshot (type, scores, geometry). The individual answers stay private. The shared page matches your own results screen.

### AI-powered personalized analysis

You can opt in to send your scores and responses to Google Gemma 4 31B hosted on NVIDIA for a narrative interpretation. The service stores no personal data. It generates the analysis from the session only and discards it afterward. You opt in. The result page labels the text as AI-generated.

### Keyboard navigation

During assessments, you navigate with the keyboard:
- **1-7** (or 1-5 for unipolar scales) select an answer
- **Enter / ArrowRight** advances to the next question
- **Backspace / ArrowLeft** goes back to the previous question

---

## What Arcus is for

Arcus is for self-discovery and reflection. You take the assessments to see the shape and direction of your own personality patterns. Each test takes a few minutes and the results reward deeper reflection.

Arcus shows you the arc you are on.
