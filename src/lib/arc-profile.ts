// Cross-assessment synthesis for the Full Arc.
//
// Pure functions only — no I/O, no React — so they are unit-testable. Grounded
// in research/framework.md:
//   §4 — the synthesis reads each assessment's *internal gap*; small gaps
//        everywhere = self-congruent, large gaps = divergent.
//   §5 — cross-suite shared-variance map (the suite's honesty about overlap).
// The pairing observations mirror the Theory page's "how they work together".
//
// Everything here is EXPLORATORY SYNTHESIS (the methodology labels cross-test
// integration as unvalidated). The page labels it as such.

import type { PublicSharedResult } from "../server/results";
import type { AssessmentResult } from "./scoring";

export type ArcResult = {
  assessmentKey: string;
  type: string;
  emoji: string;
  summary: string;
  /** Primary direction/trajectory/stance (waxing, committed, resource, …). */
  direction?: string;
  /** Secondary modifier where present (Turing's stated-vs-observed gap). */
  secondaryDirection?: string;
  scores: { key: string; label: string; value: number }[];
};

export const ARC_ORDER = ["solstice", "turing", "pride", "passage"] as const;

export const ARC_NAMES: Record<string, string> = {
  solstice: "Solstice",
  turing: "Turing",
  pride: "Pride",
  passage: "Passage",
};

export const ARC_DOMAINS: Record<string, string> = {
  solstice: "Energy",
  turing: "Thinking",
  pride: "Identity",
  time: "Time",
  passage: "Time",
};

/** Map a fetched public result into the minimal shape the profile needs. */
export function toArcResult(r: PublicSharedResult): ArcResult {
  return {
    assessmentKey: r.assessmentKey,
    type: r.result.type,
    emoji: r.result.emoji,
    summary: r.result.summary,
    direction: r.result.modifier?.value,
    secondaryDirection: r.result.secondaryModifier?.value,
    scores: (r.result.scores ?? []).map((s) => ({
      key: s.key,
      label: s.label,
      value: s.value,
    })),
  };
}

/** Map a freshly-computed AssessmentResult (pre-save) into the profile shape. */
export function assessmentResultToArc(r: AssessmentResult): ArcResult {
  return {
    assessmentKey: r.assessmentKey,
    type: r.type,
    emoji: r.emoji,
    summary: r.summary,
    direction: r.modifier?.value,
    secondaryDirection: r.secondaryModifier?.value,
    scores: (r.scores ?? []).map((s) => ({
      key: s.key,
      label: s.label,
      value: s.value,
    })),
  };
}

// ── Headline profile (ordering + completeness + pairings) ───────────────────

export type ArcProfile = {
  arcs: ArcResult[];
  completedCount: number;
  total: number;
  isComplete: boolean;
  headline: string;
  observations: string[];
};

export function computeArcProfile(results: ArcResult[]): ArcProfile {
  const byKey = new Map<string, ArcResult>();
  for (const r of results) byKey.set(r.assessmentKey, r);
  const arcs = ARC_ORDER.map((k) => byKey.get(k)).filter(
    (x): x is ArcResult => !!x,
  );
  return {
    arcs,
    completedCount: arcs.length,
    total: ARC_ORDER.length,
    isComplete: arcs.length === ARC_ORDER.length,
    headline:
      arcs.length === 0
        ? "No arcs mapped yet"
        : `${arcs.length} of ${ARC_ORDER.length} arcs mapped`,
    observations: pairingObservations(byKey),
  };
}

// ── Connections: internal gaps + self-congruence + shared variance ──────────

export type GapMagnitude = "small" | "moderate" | "large";

export type InternalGap = {
  assessmentKey: string;
  title: string;
  magnitude: GapMagnitude;
  description: string;
};

export type Congruence = {
  verdict: "self-congruent" | "mixed" | "divergent";
  score: number; // 0–100, higher = more congruent
  description: string;
};

export type Connections = {
  gaps: InternalGap[];
  congruence: Congruence;
  sharedVariance: string[];
  pairings: string[];
};

const GAP_WEIGHT: Record<GapMagnitude, number> = {
  small: 1,
  moderate: 2,
  large: 3,
};

function gap(
  assessmentKey: string,
  title: string,
  magnitude: GapMagnitude,
  description: string,
): InternalGap {
  return { assessmentKey, title, magnitude, description };
}

function scoreLike(r: ArcResult, re: RegExp): number | undefined {
  const hit = r.scores.find((s) => re.test(s.label) || re.test(s.key));
  return hit?.value;
}

// SCA — position (season) vs perceived trajectory.
function solsticeGap(r: ArcResult): InternalGap {
  const bright = r.type === "Summer" || r.type === "Autumn";
  const traj = r.direction; // waxing | waning | steady
  if (traj === "steady") {
    return gap(
      "solstice",
      "Position vs trajectory",
      "small",
      `Your energy reads ${r.type} and feels level — position and trajectory agree.`,
    );
  }
  if (bright && traj === "waning") {
    return gap(
      "solstice",
      "Position vs trajectory",
      "large",
      `You sit in a bright ${r.type} position yet feel the energy turning toward rest — position and trajectory pull apart.`,
    );
  }
  if (bright && traj === "waxing") {
    return gap(
      "solstice",
      "Position vs trajectory",
      "small",
      `Bright and still climbing — your trajectory matches a ${r.type} position.`,
    );
  }
  if (!bright && traj === "waxing") {
    return gap(
      "solstice",
      "Position vs trajectory",
      "moderate",
      `Your energy reads ${r.type} (quiet) yet feels like it's gathering — a low position with building momentum.`,
    );
  }
  return gap(
    "solstice",
    "Position vs trajectory",
    "moderate",
    `Your ${r.type} position and ${traj ?? "current"} trajectory sit at an angle worth noticing.`,
  );
}

// MMA — stated engagement vs observed strategy. The gap is already computed.
function turingGap(r: ArcResult): InternalGap {
  const g = r.secondaryDirection; // divergent | congruent | neutral
  if (g === "divergent") {
    return gap(
      "turing",
      "Stated vs observed",
      "large",
      `What you say about your thinking and what your choices show point in different directions — your widest internal gap.`,
    );
  }
  if (g === "congruent") {
    return gap(
      "turing",
      "Stated vs observed",
      "small",
      `What you say about your thinking lines up with how your choices actually play out.`,
    );
  }
  return gap(
    "turing",
    "Stated vs observed",
    "moderate",
    `Your stated and observed thinking styles only partially overlap.`,
  );
}

// SSA — self-knowledge (clarity) vs self-expression (alignment).
function prideGap(r: ArcResult): InternalGap {
  const clarity = scoreLike(r, /clarity/i);
  const alignment = scoreLike(r, /alignment/i);
  if (clarity === undefined || alignment === undefined) {
    return gap(
      "pride",
      "Self-knowledge vs self-expression",
      "moderate",
      `How well you know yourself and how honestly you show it sit in tension.`,
    );
  }
  const diff = Math.abs(clarity - alignment);
  const magnitude: GapMagnitude = diff < 15 ? "small" : diff <= 30 ? "moderate" : "large";
  const dir =
    clarity > alignment
      ? "you know yourself more clearly than you show"
      : "you show more than you've fully pinned down";
  return gap(
    "pride",
    "Self-knowledge vs self-expression",
    magnitude,
    `Identity Clarity ${clarity} vs Self-Alignment ${alignment} — ${dir}.`,
  );
}

// PTA — time engagement (zones) vs temporal stance.
function passageGap(r: ArcResult): InternalGap {
  const past = scoreLike(r, /past/i) ?? 0;
  const present = scoreLike(r, /present/i) ?? 0;
  const future = scoreLike(r, /future/i) ?? 0;
  const stance = r.direction; // resource | weight | gift | mystery
  const zones: Array<[string, number]> = [
    ["past", past],
    ["present", present],
    ["future", future],
  ];
  const dominant = zones.reduce((a, b) => (b[1] > a[1] ? b : a))[0];
  const spread = Math.max(past, present, future) - Math.min(past, present, future);
  const aligned =
    (stance === "resource" && dominant === "future") ||
    (stance === "weight" && dominant === "past") ||
    (stance === "gift" && dominant === "present");
  const magnitude: GapMagnitude = aligned
    ? "small"
    : spread > 40
      ? "large"
      : "moderate";
  return gap(
    "passage",
    "Time engagement vs stance",
    magnitude,
    `You engage most with the ${dominant}, and hold time as ${stance ?? "something you move through"}${aligned ? " — they fit together." : " — they pull in different directions."}`,
  );
}

function congruenceDescription(
  verdict: Congruence["verdict"],
  score: number,
  gaps: InternalGap[],
): string {
  const large = gaps.filter((g) => g.magnitude === "large").length;
  if (verdict === "self-congruent") {
    return `Your internal gaps are small across the board (congruence ${score}/100). What you say, what you do, what you show, and where you feel headed all roughly agree.`;
  }
  if (verdict === "divergent") {
    return `Your internal gaps are wide — ${large} of ${gaps.length} read as large (congruence ${score}/100). Your stated self, your behavior, your self-expression, and your felt direction disagree in several places.`;
  }
  return `Your internal gaps are mixed (congruence ${score}/100). Some dimensions agree and others pull apart.`;
}

// §5 — cross-suite shared variance. Static, grounded, lightly personalized.
function sharedVarianceNotes(byKey: Map<string, ArcResult>): string[] {
  const has = (k: string) => byKey.has(k);
  const notes: string[] = [];
  const consc = ["turing", "pride", "passage"].filter(has).length;
  if (consc >= 2) {
    notes.push(
      `Conscientiousness (diligence, cognitive override, commitment stability, future-focus) runs through ${consc} of your assessments — Turing, Pride, and Passage all carry parts of it.`,
    );
  }
  if (has("solstice")) {
    notes.push(
      "Extraversion (approach, outward energy) anchors your Solstice result.",
    );
  }
  if (has("pride") && has("solstice")) {
    notes.push(
      "Neuroticism loads negatively on both Pride clarity and Solstice arousal — a shared undercurrent across identity and energy.",
    );
  }
  if (has("turing")) {
    notes.push(
      "Openness to thought loads on your Turing Need-for-Cognition score.",
    );
  }
  notes.push(
    "Agreeableness is largely unmeasured by the suite — an honest gap, not a finding.",
  );
  return notes;
}

function pairingObservations(byKey: Map<string, ArcResult>): string[] {
  const out: string[] = [];
  const e = byKey.get("solstice");
  const t = byKey.get("turing");
  const p = byKey.get("pride");
  const s = byKey.get("passage");
  if (e && t) out.push(pairEnergyThinking(e, t));
  if (p && s) out.push(pairIdentityTime(p, s));
  if (e && p) out.push(pairEnergyIdentity(e, p));
  return out;
}

export function computeConnections(results: ArcResult[]): Connections {
  const byKey = new Map<string, ArcResult>();
  for (const r of results) byKey.set(r.assessmentKey, r);

  const gaps: InternalGap[] = [];
  if (byKey.get("solstice")) gaps.push(solsticeGap(byKey.get("solstice")!));
  if (byKey.get("turing")) gaps.push(turingGap(byKey.get("turing")!));
  if (byKey.get("pride")) gaps.push(prideGap(byKey.get("pride")!));
  if (byKey.get("passage")) gaps.push(passageGap(byKey.get("passage")!));

  const avg = gaps.length
    ? gaps.reduce((a, g) => a + GAP_WEIGHT[g.magnitude], 0) / gaps.length
    : 1;
  // avg 1 (all small) → 100; avg 3 (all large) → 0.
  const score = Math.max(0, Math.min(100, Math.round(100 - ((avg - 1) / 2) * 100)));
  const verdict: Congruence["verdict"] =
    score >= 70 ? "self-congruent" : score >= 40 ? "mixed" : "divergent";

  return {
    gaps,
    congruence: {
      verdict,
      score,
      description: congruenceDescription(verdict, score, gaps),
    },
    sharedVariance: sharedVarianceNotes(byKey),
    pairings: pairingObservations(byKey),
  };
}

// ── Pairing narratives (Theory page's "how they work together") ─────────────

function trajectoryWord(direction?: string): string {
  switch (direction) {
    case "waxing":
      return "gathering momentum";
    case "waning":
      return "settling toward rest";
    case "steady":
      return "holding steady";
    default:
      return "moving";
  }
}

function commitmentWord(direction?: string): string {
  switch (direction) {
    case "committed":
      return "settled";
    case "exploring":
      return "still forming";
    case "open":
      return "situational";
    default:
      return "in motion";
  }
}

function stanceWord(direction?: string): string {
  switch (direction) {
    case "resource":
      return "a resource to spend well";
    case "weight":
      return "a weight you carry";
    case "gift":
      return "a gift";
    case "mystery":
      return "a mystery to sit with";
    default:
      return "something you move through";
  }
}

function isBrightEnergy(type: string): boolean {
  return type === "Summer" || type === "Autumn";
}

function pairEnergyThinking(e: ArcResult, t: ArcResult): string {
  const feels = isBrightEnergy(e.type)
    ? "effortful thinking tends to feel like fuel — something that charges you"
    : "effortful thinking tends to feel quieter and more restorative";
  return `Energy × Thinking — your energy is ${e.type} and ${trajectoryWord(
    e.direction,
  )}. As ${t.type}, ${feels}.`;
}

function pairIdentityTime(p: ArcResult, s: ArcResult): string {
  return `Identity × Time — your identity feels ${commitmentWord(
    p.direction,
  )} (${p.type}), and you hold time as ${stanceWord(s.direction)} (${s.type}). Together they shape which self you bring to which moment.`;
}

function pairEnergyIdentity(e: ArcResult, p: ArcResult): string {
  const visibility = isBrightEnergy(e.type)
    ? "self-expression tends to come easily right now"
    : "this reads as a season for private integration more than outward expression";
  return `Energy × Identity — with ${e.type} energy and a ${p.type} sense of self, ${visibility}.`;
}

// ── The composite Full Arc result ──────────────────────────────────────────
// The four assessments are combined into ONE new result (assessmentKey
// "full-arc"): its own type, scores, and detail — the self-congruence
// synthesis — so it can be shown on a single result page and shared as one.

function fullArcSummary(verdict: Congruence["verdict"]): string {
  if (verdict === "self-congruent") {
    return "Across energy, thinking, identity, and time, your four arcs agree. What you say, what you do, what you show, and where you feel headed point the same way.";
  }
  if (verdict === "divergent") {
    return "Across energy, thinking, identity, and time, your four arcs pull in different directions. Your stated self, your behavior, your self-expression, and your felt direction disagree in several places.";
  }
  return "Across energy, thinking, identity, and time, your four arcs are mixed — some dimensions agree and others pull apart.";
}

function gapToAlignment(magnitude: GapMagnitude): number {
  // Higher = the assessment's internal tension is more resolved (aligned).
  return magnitude === "small" ? 90 : magnitude === "moderate" ? 60 : 25;
}

export function computeFullArcResult(
  components: AssessmentResult[],
): AssessmentResult {
  const arcs = components.map(assessmentResultToArc);
  const { congruence, gaps, sharedVariance, pairings } = computeConnections(arcs);
  const verdict = congruence.verdict;
  const archetype =
    verdict === "self-congruent"
      ? "The Congruent Arc"
      : verdict === "divergent"
        ? "The Divergent Arc"
        : "The Layered Arc";

  return {
    assessmentKey: "full-arc",
    type: archetype,
    emoji: "✦",
    archetype,
    summary: fullArcSummary(verdict),
    scores: [
      {
        key: "congruence",
        label: "Self-congruence",
        value: congruence.score,
        role: "axis",
      },
      ...gaps.map((g) => ({
        key: `${g.assessmentKey}_alignment`,
        label: `${ARC_NAMES[g.assessmentKey] ?? g.assessmentKey} alignment`,
        value: gapToAlignment(g.magnitude),
        role: "facet",
      })),
    ],
    modifier: { label: "Profile", value: verdict },
    notes: [
      `Your four arcs: ${components.map((r) => r.type).join(" · ")}.`,
      ...pairings,
      ...sharedVariance,
    ],
    detail: {
      meaning: congruence.description,
      howToRead:
        "Each bar is one side of the synthesis — overall self-congruence, then how aligned each assessment's internal tension is. A higher bar means more aligned.",
      distinct:
        "This is a single profile read across all four assessments — a new, combined result, not a list of separate ones.",
    },
    components,
  };
}
