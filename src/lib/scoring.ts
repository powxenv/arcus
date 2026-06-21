// Scoring per the v0.23 research specs. Each test's formulas are taken from the
// matching design doc and the verified build/sim in research/.
//
// SCA / SSA share a circumplex position model: facet → axis → quadrant →
// prototypicality → angle/gradation → facet-tension modifier → boundary.
// MMA: NFC/FI unipolar scales + CRT override + heuristics strategy + gap.
// PTA: three independent unipolar factors + stance.
//
// Honesty: the position-plus-trajectory (SCA), four-component Pride profile
// (SSA), stated-vs-observed gap (MMA), and four-stance typology (PTA) are
// research-team syntheses and are unvalidated. They are computed transparently
// but should not be presented as validated constructs.

import type { Question, QuestionSet } from "../data/questions";
import type {
  BipolarQuestion,
  CrtQuestion,
  HeuristicQuestion,
  StanceQuestion,
  UnipolarQuestion,
} from "../data/questions";
import { RESULT_DETAILS, type ResultDetail } from "../data/result-details";

export type Answers = Record<string, number | string>;

export type ConstructScore = {
  key: string;
  label: string;
  value: number;
  role: string;
};

export type AssessmentResult = {
  assessmentKey: string;
  type: string;
  emoji: string;
  archetype?: string;
  summary: string;
  // Modifier layer (v0.23): trajectory for SCA, commitment for SSA, stance for
  // PTA, decision-strategy + gap for MMA. Reported alongside the type.
  modifier?: { label: string; value: string };
  secondaryModifier?: { label: string; value: string };
  // Dimensional scores (facets, axes, factors) reported with the type.
  scores: ConstructScore[];
  // Geometry for the two-axis tests (SCA, SSA).
  geometry?: {
    prototypicality: number;
    angleDeg: number;
    gradation: string | null;
    isBoundary: boolean;
    boundaryName?: string;
    facetTension?: { axis: string; tense: boolean }[];
  };
  detail?: ResultDetail;
  // Plain-language notes surfaced on the result screen.
  notes?: string[];
};

// ---------------------------------------------------------------------------
// Scale helpers
// ---------------------------------------------------------------------------

const MEAN = (xs: number[]) =>
  xs.length === 0 ? 0 : xs.reduce((a, b) => a + b, 0) / xs.length;

// Unipolar 5-point ((mean-1)/4)*100 (research MMA/PTA).
function scaleUnipolar(values: number[]): number {
  if (values.length === 0) return 0;
  return Math.round(((MEAN(values) - 1) / 4) * 100);
}

// Bipolar 7-point ((mean-1)/6)*100, poleA always construct-high (research SCA/SSA).
function scaleBipolar(values: number[]): number {
  if (values.length === 0) return 0;
  return Math.round(((MEAN(values) - 1) / 6) * 100);
}

// ---------------------------------------------------------------------------
// SCA / SSA shared circumplex model
// ---------------------------------------------------------------------------

const MAX_DIST = Math.sqrt(50 * 50 + 50 * 50); // 70.71
const TENSION_MARGIN = 20; // research: both facets ≥20 from 50 on opposite sides
const PROTOTYPICALITY_THRESHOLD = 0.28; // research: r < 0.28 → boundary

function questionsOf<T extends Question = Question>(
  set: QuestionSet,
  construct: string,
): T[] {
  return set.questions.filter((q) => q.construct === construct) as T[];
}

function bipolarValues(set: QuestionSet, construct: string, answers: Answers): number[] {
  return questionsOf<BipolarQuestion>(set, construct)
    .map((q) => answers[q.id])
    .filter((v): v is number => typeof v === "number");
}

function facetScores(set: QuestionSet, facets: string[], answers: Answers): Record<string, number> {
  const out: Record<string, number> = {};
  for (const facet of facets) {
    out[facet] = scaleBipolar(bipolarValues(set, facet, answers));
  }
  return out;
}

type CircumplexSpec = {
  facets: { A1: string; A2: string; B1: string; B2: string };
  axisLabels: { A: string; B: string };
  quadrants: {
    AHighBHigh: { name: string; emoji: string; archetype: string };
    AHighBLow: { name: string; emoji: string; archetype: string };
    ALowBLow: { name: string; emoji: string; archetype: string };
    ALowBHigh: { name: string; emoji: string; archetype: string };
  };
  boundaryName: string;
  // Per-axis "tense" depends only on the facet offsets.
};

function scoreCircumplex(
  set: QuestionSet,
  answers: Answers,
  spec: CircumplexSpec,
): {
  facets: Record<string, number>;
  axis: { A: number; B: number };
  aOff: number;
  bOff: number;
  distance: number;
  prototypicality: number;
  angleDeg: number;
  quadrantName: string;
  emoji: string;
  archetype: string;
  gradation: string | null;
  isBoundary: boolean;
  facetTension: { axis: "A" | "B"; tense: boolean }[];
} {
  const facetMap = facetScores(set, [spec.facets.A1, spec.facets.A2, spec.facets.B1, spec.facets.B2], answers);
  const A = Math.round(MEAN([facetMap[spec.facets.A1], facetMap[spec.facets.A2]]));
  const B = Math.round(MEAN([facetMap[spec.facets.B1], facetMap[spec.facets.B2]]));
  const aOff = A - 50;
  const bOff = B - 50;
  const distance = Math.sqrt(aOff * aOff + bOff * bOff);
  const prototypicality = distance / MAX_DIST;
  const angleDeg = (Math.atan2(bOff, aOff) * 180) / Math.PI;

  const aHigh = A >= 50;
  const bHigh = B >= 50;
  const q = aHigh
    ? bHigh
      ? spec.quadrants.AHighBHigh
      : spec.quadrants.AHighBLow
    : bHigh
      ? spec.quadrants.ALowBHigh
      : spec.quadrants.ALowBLow;

  // Gradation: progress within the season from the entry edge. Entry edges
  // (research SCA §6): Summer 90°, Autumn 0°, Winter 270°, Spring 180°.
  const entryEdgeByQuadrant: Record<string, number> = {
    Summer: 90,
    Autumn: 0,
    Winter: 270,
    Spring: 180,
    "The Beacon": 90,
    "The Prism": 0,
    "The Aurora": 270,
    "The Ember": 180,
  };
  let gradation: string | null = null;
  const entry = entryEdgeByQuadrant[q.name];
  if (entry !== undefined) {
    const normalizedAngle = (angleDeg + 360) % 360;
    const progress = ((entry - normalizedAngle + 360) % 360);
    gradation = progress < 30 ? "Early" : progress < 60 ? "Mid" : "Late";
  }

  // Facet tension: both facets of an axis on opposite sides of 50 and both ≥20 away.
  const tenseA =
    facetMap[spec.facets.A1] * facetMap[spec.facets.A2] < 2500 &&
    Math.abs(facetMap[spec.facets.A1] - 50) >= TENSION_MARGIN &&
    Math.abs(facetMap[spec.facets.A2] - 50) >= TENSION_MARGIN;
  const tenseB =
    facetMap[spec.facets.B1] * facetMap[spec.facets.B2] < 2500 &&
    Math.abs(facetMap[spec.facets.B1] - 50) >= TENSION_MARGIN &&
    Math.abs(facetMap[spec.facets.B2] - 50) >= TENSION_MARGIN;

  const isBoundary = prototypicality < PROTOTYPICALITY_THRESHOLD;

  return {
    facets: facetMap,
    axis: { A, B },
    aOff,
    bOff,
    distance,
    prototypicality,
    angleDeg,
    quadrantName: q.name,
    emoji: q.emoji,
    archetype: q.archetype,
    gradation,
    isBoundary,
    facetTension: [
      { axis: "A", tense: tenseA },
      { axis: "B", tense: tenseB },
    ],
  };
}

function buildScoresFromFacets(
  set: QuestionSet,
  facetMap: Record<string, number>,
  axis: { A: number; B: number },
  axisLabels: { A: string; B: string },
): ConstructScore[] {
  const constructMeta = new Map(set.constructs.map((c) => [c.key, c]));
  const scores: ConstructScore[] = [];
  for (const [key, value] of Object.entries(facetMap)) {
    const meta = constructMeta.get(key);
    scores.push({ key, label: meta?.label ?? key, value, role: meta?.role ?? "facet" });
  }
  scores.push({ key: "A", label: axisLabels.A, value: axis.A, role: "axis" });
  scores.push({ key: "B", label: axisLabels.B, value: axis.B, role: "axis" });
  return scores;
}

// ---------------------------------------------------------------------------
// SCA
// ---------------------------------------------------------------------------

function solsticeResult(set: QuestionSet, answers: Answers): AssessmentResult {
  const geo = scoreCircumplex(set, answers, {
    facets: { A1: "A1", A2: "A2", B1: "B1", B2: "B2" },
    axisLabels: { A: "Solar Height", B: "Tidal Direction" },
    quadrants: {
      AHighBHigh: { name: "Summer", emoji: "☀️", archetype: "The Zenith" },
      AHighBLow: { name: "Autumn", emoji: "🍂", archetype: "The Turning" },
      ALowBLow: { name: "Winter", emoji: "❄️", archetype: "The Deep" },
      ALowBHigh: { name: "Spring", emoji: "🌱", archetype: "The Greening" },
    },
    boundaryName: "Threshold",
  });

  // Trajectory (v0.23): TA/TB bipolar means. poleA = waxing. >4.5 waxing, <3.5 waning.
  const ta = MEAN(bipolarValues(set, "TA", answers));
  const tb = MEAN(bipolarValues(set, "TB", answers));
  const taDir = ta > 4.5 ? "waxing" : ta < 3.5 ? "waning" : "steady";
  const tbDir = tb > 4.5 ? "waxing" : tb < 3.5 ? "waning" : "steady";
  const trajectory =
    taDir === "waxing" || tbDir === "waxing"
      ? "waxing"
      : taDir === "waning" || tbDir === "waning"
        ? "waning"
        : "steady";

  const scores = buildScoresFromFacets(
    set,
    geo.facets,
    geo.axis,
    { A: "Solar Height", B: "Tidal Direction" },
  );

  const typeForDetail = geo.isBoundary ? "Threshold" : geo.quadrantName;
  const detail = RESULT_DETAILS.solstice[geo.quadrantName];

  const result: AssessmentResult = {
    assessmentKey: "solstice",
    type: typeForDetail,
    emoji: geo.isBoundary ? "◐" : geo.emoji,
    archetype: geo.isBoundary ? undefined : geo.archetype,
    summary: geo.isBoundary
      ? "Your energy sits near the middle of its cycle — between seasons rather than firmly in one."
      : "A snapshot of where your energy sits right now, and which way the cycle is turning.",
    modifier: {
      label: "Trajectory",
      value: trajectory,
    },
    scores,
    geometry: {
      prototypicality: geo.prototypicality,
      angleDeg: geo.angleDeg,
      gradation: geo.isBoundary ? null : geo.gradation,
      isBoundary: geo.isBoundary,
      boundaryName: geo.isBoundary ? "Threshold" : undefined,
      facetTension: geo.facetTension,
    },
    detail,
  };
  return result;
}

// ---------------------------------------------------------------------------
// SSA
// ---------------------------------------------------------------------------

function prideResult(set: QuestionSet, answers: Answers): AssessmentResult {
  const geo = scoreCircumplex(set, answers, {
    facets: { A1: "A1", A2: "A2", B1: "B1", B2: "B2" },
    axisLabels: { A: "Identity Clarity", B: "Self-Alignment" },
    quadrants: {
      AHighBHigh: { name: "The Beacon", emoji: "🔦", archetype: "Clear & Self-Aligned" },
      AHighBLow: { name: "The Prism", emoji: "🔮", archetype: "Clear & Adaptive" },
      ALowBLow: { name: "The Aurora", emoji: "💠", archetype: "Exploring & Adaptive" },
      ALowBHigh: { name: "The Ember", emoji: "🔥", archetype: "Exploring & Genuine" },
    },
    boundaryName: "Reflection",
  });

  // Commitment (Marcia v0.23): bipolar C items, ≥60 committed / ≥40 exploring / else open.
  const cScore = scaleBipolar(bipolarValues(set, "C", answers));
  const commitment = cScore >= 60 ? "committed" : cScore >= 40 ? "exploring" : "open";

  const scores = buildScoresFromFacets(
    set,
    geo.facets,
    geo.axis,
    { A: "Identity Clarity", B: "Self-Alignment" },
  );
  scores.push({
    key: "C",
    label: "Commitment",
    value: cScore,
    role: "commitment",
  });

  const detail = RESULT_DETAILS.pride[geo.quadrantName];

  return {
    assessmentKey: "pride",
    type: geo.isBoundary ? "The Reflection" : geo.quadrantName,
    emoji: geo.isBoundary ? "🪞" : geo.emoji,
    archetype: geo.isBoundary ? undefined : geo.archetype,
    summary: geo.isBoundary
      ? "You sit near the middle between knowing yourself clearly and showing yourself honestly."
      : "A snapshot of how clearly you know yourself, and how honestly you show it.",
    modifier: { label: "Commitment", value: commitment },
    scores,
    geometry: {
      prototypicality: geo.prototypicality,
      angleDeg: geo.angleDeg,
      gradation: geo.isBoundary ? null : geo.gradation,
      isBoundary: geo.isBoundary,
      boundaryName: geo.isBoundary ? "The Reflection" : undefined,
      facetTension: geo.facetTension,
    },
    detail,
  };
}

// ---------------------------------------------------------------------------
// MMA
// ---------------------------------------------------------------------------

type Strategy = "take-the-best" | "tallying" | "adaptive";
type GapLabel = "congruent" | "divergent" | "neutral";

function turingResult(set: QuestionSet, answers: Answers): AssessmentResult {
  const nfc = scaleUnipolar(
    questionsOf<UnipolarQuestion>(set, "need_for_cognition")
      .map((q) => answers[q.id])
      .filter((v): v is number => typeof v === "number"),
  );
  const fi = scaleUnipolar(
    questionsOf<UnipolarQuestion>(set, "faith_in_intuition")
      .map((q) => answers[q.id])
      .filter((v): v is number => typeof v === "number"),
  );

  // CRT override rate.
  const crtItems = questionsOf<CrtQuestion>(set, "override");
  let crtCorrect = 0;
  for (const item of crtItems) {
    const given = answers[item.id];
    if (typeof given !== "string") continue;
    if (normalizeAnswer(given) === normalizeAnswer(item.answer)) crtCorrect += 1;
  }
  const overrideRate = crtItems.length === 0 ? 0 : Math.round((crtCorrect / crtItems.length) * 100);

  // Heuristics strategy classification (research mma-simulate: aRatio thresholds).
  const heurItems = questionsOf<HeuristicQuestion>(set, "strategy");
  let aCount = 0;
  let answeredHeur = 0;
  for (const item of heurItems) {
    const given = answers[item.id];
    if (given !== "A" && given !== "B") continue;
    answeredHeur += 1;
    if (given === "A") aCount += 1;
  }
  const aRatio = answeredHeur === 0 ? 0.5 : aCount / answeredHeur;
  let strategy: Strategy;
  if (aRatio >= 0.6) strategy = "take-the-best";
  else if (aRatio <= 0.4) strategy = "tallying";
  else strategy = "adaptive";

  // Quadrant from engagement threshold ≥60; Generalist if both within ±5 of 60.
  const nfcHigh = nfc >= 60;
  const fiHigh = fi >= 60;
  const isGeneralist = Math.abs(nfc - 60) <= 5 && Math.abs(fi - 60) <= 5;

  let typeName: string;
  let emoji: string;
  let archetype: string;
  if (isGeneralist) {
    typeName = "The Generalist";
    emoji = "🧩";
    archetype = "Genuinely moderate on both engagement scales";
  } else if (nfcHigh && fiHigh) {
    typeName = "The Integrator";
    emoji = "🧬";
    archetype = "Engages both reasoning and intuition richly";
  } else if (nfcHigh && !fiHigh) {
    typeName = "The Logician";
    emoji = "🔬";
    archetype = "Thinks deliberately, distrusts gut";
  } else if (!nfcHigh && fiHigh) {
    typeName = "The Reader";
    emoji = "🎯";
    archetype = "Pattern-fluent and intuitive";
  } else {
    typeName = "The Operator";
    emoji = "⚙️";
    archetype = "Acts over reflection";
  }

  // Stated-vs-observed gap (v0.23 synthesis).
  let gap: GapLabel;
  if (strategy === "adaptive") gap = "neutral";
  else if (strategy === "take-the-best") gap = nfcHigh ? "divergent" : "congruent";
  else gap = nfcHigh ? "congruent" : "divergent"; // tallying

  const detail = RESULT_DETAILS.turing[typeName];
  const scores: ConstructScore[] = [
    { key: "need_for_cognition", label: "Need for Cognition", value: nfc, role: "scale" },
    { key: "faith_in_intuition", label: "Faith in Intuition", value: fi, role: "scale" },
    { key: "override", label: "Cognitive Override", value: overrideRate, role: "scale" },
  ];

  return {
    assessmentKey: "turing",
    type: typeName,
    emoji,
    archetype,
    summary:
      "A snapshot of how you tend to think — and how that lines up with how you actually decide.",
    modifier: { label: "Observed strategy", value: strategy },
    secondaryModifier: { label: "Stated-vs-observed gap", value: gap },
    scores,
    detail,
  };
}

function normalizeAnswer(v: string): string {
  return v.trim().toLowerCase().replace(/[^0-9a-z]/g, "");
}

// ---------------------------------------------------------------------------
// PTA
// ---------------------------------------------------------------------------

const PTA_PATTERN_TO_TYPE: Record<number, string> = {
  0: "The Wanderer",
  1: "The Wayfinder",
  2: "The Witness",
  3: "The Flow",
  4: "The Keeper",
  5: "The Bridge",
  6: "The Hearth",
  7: "Balanced",
};

const PTA_EMOJI: Record<string, string> = {
  "The Keeper": "📜",
  "The Witness": "⏳",
  "The Wayfinder": "🧭",
  "The Hearth": "🕯️",
  "The Bridge": "🌉",
  "The Flow": "🌊",
  Balanced: "⚖️",
  "The Wanderer": "🍃",
};

function passageResult(set: QuestionSet, answers: Answers): AssessmentResult {
  const past = scaleUnipolar(
    questionsOf<UnipolarQuestion>(set, "past")
      .map((q) => answers[q.id])
      .filter((v): v is number => typeof v === "number"),
  );
  const present = scaleUnipolar(
    questionsOf<UnipolarQuestion>(set, "present")
      .map((q) => answers[q.id])
      .filter((v): v is number => typeof v === "number"),
  );
  const future = scaleUnipolar(
    questionsOf<UnipolarQuestion>(set, "future")
      .map((q) => answers[q.id])
      .filter((v): v is number => typeof v === "number"),
  );

  const THRESHOLD = 60;
  const bits = {
    P: past >= THRESHOLD ? 1 : 0,
    R: present >= THRESHOLD ? 1 : 0,
    F: future >= THRESHOLD ? 1 : 0,
  };
  const pattern = (bits.P << 2) | (bits.R << 1) | bits.F;
  const type = PTA_PATTERN_TO_TYPE[pattern];

  // "Between types" note if any factor is within ±5 of the threshold.
  const nearThreshold: string[] = [];
  if (Math.abs(past - THRESHOLD) <= 5) nearThreshold.push("Past");
  if (Math.abs(present - THRESHOLD) <= 5) nearThreshold.push("Present");
  if (Math.abs(future - THRESHOLD) <= 5) nearThreshold.push("Future");

  // Stance (forced pick, majority across the stance items).
  const stanceItems = questionsOf<StanceQuestion>(set, "stance");
  const stanceCounts = new Map<string, number>();
  for (const item of stanceItems) {
    const v = answers[item.id];
    if (typeof v !== "string") continue;
    stanceCounts.set(v, (stanceCounts.get(v) ?? 0) + 1);
  }
  let stance = "gift";
  let stanceCount = -1;
  for (const [value, count] of stanceCounts) {
    if (count > stanceCount) {
      stance = value;
      stanceCount = count;
    }
  }

  const detail = RESULT_DETAILS.passage[type];
  const scores: ConstructScore[] = [
    { key: "past", label: "Past-Positive", value: past, role: "factor" },
    { key: "present", label: "Present-Eudaimonic", value: present, role: "factor" },
    { key: "future", label: "Future", value: future, role: "factor" },
  ];

  // Only surface a note when it's useful, plain context for the user — never
  // technical disclaimers. The "between types" case is the one that matters:
  // the label is a soft fit and the scores tell the truer story.
  const notes: string[] = [];
  if (nearThreshold.length > 0) {
    notes.push(
      `You're close to the line on: ${nearThreshold.join(", ")}. The scores below tell a truer story than the label.`,
    );
  }

  return {
    assessmentKey: "passage",
    type,
    emoji: PTA_EMOJI[type] ?? "⏳",
    summary:
      "A snapshot of which parts of time you live in — and how you feel about time passing.",
    modifier: { label: "Stance toward time", value: stance },
    scores,
    detail,
    notes,
  };
}

// ---------------------------------------------------------------------------
// Dispatch
// ---------------------------------------------------------------------------

const SCORERS: Record<
  string,
  (set: QuestionSet, answers: Answers) => AssessmentResult
> = {
  solstice: solsticeResult,
  turing: turingResult,
  pride: prideResult,
  passage: passageResult,
};

export function computeResult(set: QuestionSet, answers: Answers): AssessmentResult {
  const scorer = SCORERS[set.assessmentKey];
  if (!scorer) {
    return {
      assessmentKey: set.assessmentKey,
      type: "Unknown",
      emoji: "•",
      summary: set.summary,
      scores: [],
    };
  }
  return scorer(set, answers);
}

// Test helper exposed for the simulation/tests.
export const __internals = {
  scaleUnipolar,
  scaleBipolar,
  PROTOTYPICALITY_THRESHOLD,
  TENSION_MARGIN,
  PTA_PATTERN_TO_TYPE,
  normalizeAnswer,
};
