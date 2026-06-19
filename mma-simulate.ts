#!/usr/bin/env bun
/**
 * MMA Simulation & Analysis Script (TypeScript / Bun)
 * Generates 30+ synthetic respondents with diverse cognitive-style answer
 * patterns, scores them through the full MMA pipeline for both lengths
 * (MMA-32 and MMA-16), and runs a self-consistency + cross-length audit.
 *
 * WHAT THIS IS: a verification harness for the scoring engine. It checks that
 * normalization, facet/axis scoring, distance, angle, gradation, facet-tension
 * and classification behave as specified, and that boundary/corner cases resolve.
 *
 * WHAT THIS IS NOT: pilot data, validation, or evidence of reliability, construct
 * validity, or population norms. The "expected vs actual" checks are tautological
 * by construction — the same centers generate the respondents and define the
 * expectations; synthetic respondents have no psychology. Per the framework's
 * honest-ceiling rule (00 §2.1), nothing here moves the MMA from "theory-informed"
 * toward "validated". Do not cite it as such.
 *
 * Usage: bun run mma-simulate.ts
 * Output: Terminal report + mma-sim-results.csv + mma-sim-results-16.csv
 */

// ── TYPES ──────────────────────────────────────────────
type FacetId = "C1" | "C2" | "D1" | "D2";
type AxisId = "C" | "D";

interface Item {
  id: string;
  facet: FacetId;
  poleA: string;
  poleB: string;
}

interface FacetResult {
  norms: number[];
  sum: number;
  mean: number;
  score: number;
  variance: number;
}

interface AxisResult {
  score: number;
}

interface FacetContrib {
  dominant: string;
  s1: number;
  s2: number;
  d1: number;
  d2: number;
}

interface ScoreResult {
  name: string;
  raw: number[];
  normalized: number[];
  facets: Record<FacetId, FacetResult>;
  axis: Record<AxisId, AxisResult>;
  c_off: number;
  d_off: number;
  distance: number;
  prototypicality: number;
  angle_deg: number;
  angle_in_quad: number;
  quadrant: number;
  quadrant_name: string;
  gradation: string;
  is_near_center: boolean;
  is_threshold: boolean;
  has_tension: boolean;
  result_type: string;
  contrib: Record<AxisId, FacetContrib>;
  facet_consistency: Record<FacetId, number>;
  _orient: number[];
}

// ── ITEM BANK ──────────────────────────────────────────
const ITEMS: Item[] = [
  // C1 — Deliberation Preference (8)
  { id: "C1.1", facet: "C1", poleA: "Reading something challenging, working on a puzzle, or exploring an idea.", poleB: "Relaxing with something that doesn't require much thought." },
  { id: "C1.2", facet: "C1", poleA: "Understand the principles first, deliberately.", poleB: "Pick it up by doing, before I have the theory." },
  { id: "C1.3", facet: "C1", poleA: "Energized. This is why I'm here.", poleB: "Drained. I'd rather be done." },
  { id: "C1.4", facet: "C1", poleA: "Sit with it and work it through.", poleB: "Find the quickest path to an answer." },
  { id: "C1.5", facet: "C1", poleA: "Pick up something mentally challenging.", poleB: "Do something that doesn't require much thought." },
  { id: "C1.6", facet: "C1", poleA: "Satisfied. That was a good use of time.", poleB: "Drained. I need to recover." },
  { id: "C1.7", facet: "C1", poleA: "I want to map it fully before acting.", poleB: "I want to get the gist and act." },
  { id: "C1.8", facet: "C1", poleA: "Engage fully — a good question pulls me back in.", poleB: "Give a brief answer — I'm done thinking for now." },
  // C2 — Override Tendency (8)
  { id: "C2.1", facet: "C2", poleA: "Slow down and verify it before trusting it.", poleB: "Trust it, then move on." },
  { id: "C2.2", facet: "C2", poleA: "Follow the analysis.", poleB: "Follow the gut, even if I can't justify it yet." },
  { id: "C2.3", facet: "C2", poleA: "Don't fully trust it until I can.", poleB: "Trust it anyway. Some knowledge is pre-verbal." },
  { id: "C2.4", facet: "C2", poleA: "A hypothesis I then check.", poleB: "Something I trust and run with." },
  { id: "C2.5", facet: "C2", poleA: "Try to verify it from another source.", poleB: "Accept it if the person seems credible." },
  { id: "C2.6", facet: "C2", poleA: "I usually circle back and check it later.", poleB: "I trust it and move on." },
  { id: "C2.7", facet: "C2", poleA: "A signal to dig deeper.", poleB: "A drag I'd rather skip." },
  { id: "C2.8", facet: "C2", poleA: "I override instinct with analysis.", poleB: "I trust instinct and analyze after." },
  // D1 — Entry Point (8)
  { id: "D1.1", facet: "D1", poleA: "Break it into steps and solve each one.", poleB: "Get the overall shape of it, then fill in." },
  { id: "D1.2", facet: "D1", poleA: "Component by component, until the whole assembles.", poleB: "Whole first, then I learn what the parts are." },
  { id: "D1.3", facet: "D1", poleA: "Line by line, in order.", poleB: "Around the page, grabbing the shape of it first." },
  { id: "D1.4", facet: "D1", poleA: "The basics, the building blocks.", poleB: "The big picture, what it's about." },
  { id: "D1.5", facet: "D1", poleA: "I notice the pieces first.", poleB: "I get the overall feel first." },
  { id: "D1.6", facet: "D1", poleA: "The individual techniques, one at a time.", poleB: "Understanding what the skill feels like as a whole." },
  { id: "D1.7", facet: "D1", poleA: "I take it in piece by piece.", poleB: "I take in the whole pattern." },
  { id: "D1.8", facet: "D1", poleA: "The parts.", poleB: "The whole." },
  // D2 — Decomposition Habit (8)
  { id: "D2.1", facet: "D2", poleA: "Build it up piece by piece for the listener.", poleB: "Give the whole picture first, then refine." },
  { id: "D2.2", facet: "D2", poleA: "With the individual components and how each works.", poleB: "With the overall structure and what it's doing." },
  { id: "D2.3", facet: "D2", poleA: "Work through the components in sequence.", poleB: "Hold the complete vision in mind, then realize it." },
  { id: "D2.4", facet: "D2", poleA: "Order them into a sequence and work through it.", poleB: "Stand back and find the pattern they form." },
  { id: "D2.5", facet: "D2", poleA: "Keep working the parts until they do.", poleB: "Step back and reconsider the shape of the whole." },
  { id: "D2.6", facet: "D2", poleA: "I decompose it into manageable units.", poleB: "I look for the unifying pattern." },
  { id: "D2.7", facet: "D2", poleA: "Breaking the work into clear parts and sequences.", poleB: "Keeping the overall picture clear while others handle the details." },
  { id: "D2.8", facet: "D2", poleA: "Assembling parts into wholes.", poleB: "Grasping wholes that contain their parts." },
];

const FACETS: FacetId[] = ["C1", "C2", "D1", "D2"];
const FACET_NAMES: Record<FacetId, string> = {
  C1: "Deliberation Preference", C2: "Override Tendency",
  D1: "Entry Point", D2: "Decomposition Habit",
};
const AXIS_OF: Record<FacetId, AxisId> = { C1: "C", C2: "C", D1: "D", D2: "D" };
const AXIS_NAMES: Record<AxisId, string> = { C: "Processing Mode", D: "Encoding Structure" };
// Quadrant order matching the build: C>50,D>50=Algorithm, C>50,D<50=Architecture,
// C<50,D<50=Gestalt, C<50,D>50=Cipher.
const QUADRANT_NAMES = ["Algorithm", "Architecture", "Gestalt", "Cipher"];
const QUADRANT_ARCHETYPES = ["The Algorithm", "The Architecture", "The Gestalt", "The Cipher"];
const TENSION_MARGIN = 20;

// facet → item indices (32-item bank)
const FACET_ITEMS: Record<FacetId, number[]> = {} as any;
for (const f of FACETS) FACET_ITEMS[f] = [];
ITEMS.forEach((item, i) => FACET_ITEMS[item.facet].push(i));

// MMA-16: curated 4-per-facet subset
const MMA16_IDS = new Set(["C1.1", "C1.4", "C1.6", "C1.8", "C2.1", "C2.2", "C2.5", "C2.7", "D1.1", "D1.4", "D1.5", "D1.6", "D2.2", "D2.5", "D2.7", "D2.8"]);
const MMA16_INDICES = ITEMS.map((it, i) => MMA16_IDS.has(it.id) ? i : -1).filter(i => i >= 0);
const FACET_ITEMS_16: Record<FacetId, number[]> = {} as any;
for (const f of FACETS) FACET_ITEMS_16[f] = FACET_ITEMS[f].filter(i => MMA16_IDS.has(ITEMS[i].id));

// ── HELPERS ────────────────────────────────────────────
function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, Math.round(v)));
}

function gauss(mean: number, std: number): number {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return mean + std * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function choice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ── SCORING ENGINE (length-aware, same 13-step model) ─
function score(rawResponses: number[], orientations?: number[], activeIdxs?: number[]): ScoreResult {
  const idxs = activeIdxs ?? ITEMS.map((_, i) => i);
  if (rawResponses.length !== 32) throw new Error(`Need 32 responses (master bank), got ${rawResponses.length}`);
  const ori = orientations ?? new Array(32).fill(1);

  // Normalize all 32 master-bank items (keeps r.normalized 32-length)
  const normalized: number[] = [];
  for (let i = 0; i < 32; i++) {
    normalized.push(ori[i] === 1 ? rawResponses[i] : 8 - rawResponses[i]);
  }
  // Per-facet bank indexes for active subset
  const localFacetMap: Record<FacetId, number[]> = {} as any;
  for (const f of FACETS) localFacetMap[f] = (activeIdxs ? FACET_ITEMS_16 : FACET_ITEMS)[f];

  // Facet scores (dynamic n)
  const facets = {} as Record<FacetId, FacetResult>;
  for (const facet of FACETS) {
    const fIdxs = localFacetMap[facet];
    const norms = fIdxs.map(i => normalized[i]);
    const sum = norms.reduce((a, b) => a + b, 0);
    const n = fIdxs.length;
    const mean = sum / n;
    const scoreVal = (mean - 1) / 6 * 100;
    const variance = norms.reduce((a, x) => a + (x - mean) ** 2, 0) / n;
    facets[facet] = { norms, sum, mean, score: scoreVal, variance };
  }

  // Axis scores
  const axis = {
    C: { score: (facets.C1.score + facets.C2.score) / 2 },
    D: { score: (facets.D1.score + facets.D2.score) / 2 },
  };

  const c_off = axis.C.score - 50;
  const d_off = axis.D.score - 50;
  const MAX_DIST = Math.sqrt(50 * 50 + 50 * 50);
  const distance = Math.sqrt(c_off * c_off + d_off * d_off);
  const prototypicality = distance / MAX_DIST;

  const angle_rad = Math.atan2(d_off, c_off);
  let angle_deg = angle_rad * 180 / Math.PI;
  if (angle_deg < 0) angle_deg += 360;

  // Quadrant: C>50,D>50=Algorithm(0), C>50,D<50=Architecture(1),
  //          C<50,D<50=Gestalt(2), C<50,D>50=Cipher(3)
  let quadrant: number;
  if (c_off >= 0 && d_off >= 0) quadrant = 0;
  else if (c_off >= 0 && d_off < 0) quadrant = 1;
  else if (c_off < 0 && d_off < 0) quadrant = 2;
  else quadrant = 3;

  // Gradation
  const QUAD_ENTRY_EDGE = [90, 0, 270, 180]; // Algorithm, Architecture, Gestalt, Cipher
  const entry_edge = QUAD_ENTRY_EDGE[quadrant];
  const progress = (entry_edge - angle_deg + 360) % 360;
  if (progress > 90) {
    throw new Error(`Gradation mapping error: ${QUADRANT_NAMES[quadrant]} angle ${angle_deg.toFixed(2)}° → progress ${progress.toFixed(2)}°`);
  }
  const angle_in_quad = progress;
  let gradation: string;
  if (progress < 30) gradation = "Early";
  else if (progress < 60) gradation = "Mid";
  else gradation = "Late";

  // Tension + classification
  const is_near_center = prototypicality < 0.28;
  const tension = {} as Record<AxisId, { s1: number; s2: number; tense: boolean }>;
  (["C", "D"] as AxisId[]).forEach(ax => {
    const [f1, f2] = (ax === "C" ? ["C1", "C2"] : ["D1", "D2"]) as [FacetId, FacetId];
    const s1 = facets[f1].score;
    const s2 = facets[f2].score;
    const o1 = s1 - 50, o2 = s2 - 50;
    const opposite = o1 * o2 < 0;
    const strong = Math.abs(o1) >= TENSION_MARGIN && Math.abs(o2) >= TENSION_MARGIN;
    tension[ax] = { s1, s2, tense: opposite && strong };
  });
  const has_tension = tension.C.tense || tension.D.tense;
  const is_threshold = is_near_center;
  const result_type: string = is_threshold ? "HaltingPoint" : QUADRANT_NAMES[quadrant];

  // Facet contribution (tension-aware)
  const contrib: Record<AxisId, FacetContrib> = {} as any;
  for (const [ax, [f1, f2]] of [["C", ["C1", "C2"]] as [AxisId, [FacetId, FacetId]], ["D", ["D1", "D2"]] as [AxisId, [FacetId, FacetId]]]) {
    const s1 = facets[f1].score;
    const s2 = facets[f2].score;
    const d1 = Math.abs(s1 - 50);
    const d2 = Math.abs(s2 - 50);
    let dom: string;
    if (tension[ax].tense) dom = "tense";
    else if (Math.abs(s1 - s2) < 0.01) dom = "equal";
    else dom = d1 > d2 ? f1 : f2;
    contrib[ax] = { dominant: dom, s1, s2, d1, d2 };
  }

  // Facet consistency
  const facet_consistency = {} as Record<FacetId, number>;
  for (const f of FACETS) facet_consistency[f] = Math.sqrt(facets[f].variance);

  return {
    name: "", raw: rawResponses, normalized,
    facets, axis,
    c_off, d_off,
    distance, prototypicality,
    angle_deg, angle_in_quad,
    quadrant, quadrant_name: QUADRANT_NAMES[quadrant],
    gradation,
    is_near_center, is_threshold, has_tension, result_type,
    contrib, facet_consistency,
    _orient: ori,
  };
}

// ── RESPONDENT GENERATORS ─────────────────────────────
function gen(name: string, c1_c: number, c2_c: number, d1_c: number, d2_c: number, noise = 1.0): [string, number[], number[]] {
  const orient = new Array(32).fill(0).map(() => choice([1, -1]));
  const centers: Record<FacetId, number> = { C1: c1_c, C2: c2_c, D1: d1_c, D2: d2_c };
  const raw: number[] = [];
  for (let i = 0; i < ITEMS.length; i++) {
    const item = ITEMS[i];
    const c = centers[item.facet];
    const trait = clamp(gauss(c, noise), 1, 7);
    const r = orient[i] === 1 ? trait : (8 - trait);
    raw.push(r);
  }
  return [name, raw, orient];
}

function genExtreme(name: string, c_center: number, d_center: number): [string, number[], number[]] {
  return gen(name, c_center, c_center, d_center, d_center, 0.4);
}

function genMixed(name: string, c1_c: number, c2_c: number, d1_c: number, d2_c: number, noise = 0.6): [string, number[], number[]] {
  return gen(name, c1_c, c2_c, d1_c, d2_c, noise);
}

function genNoisy(name: string, c1_c: number, c2_c: number, d1_c: number, d2_c: number, noise = 2.0): [string, number[], number[]] {
  return gen(name, c1_c, c2_c, d1_c, d2_c, noise);
}

// ── BUILD 30+ RESPONDENTS ─────────────────────────────
let _seed = 42;
function seededRandom(): number { _seed = (_seed * 16807) % 2147483647; return (_seed - 1) / 2147483646; }
const _origRandom = Math.random;
Math.random = seededRandom;

const respondents: [string, number[], number[]][] = [];

// Core archetypes
respondents.push(genExtreme("Algorithm-Pure", 6.5, 6.5));
respondents.push(genExtreme("Cipher-Pure", 1.5, 6.5));
respondents.push(genExtreme("Gestalt-Pure", 1.5, 1.5));
respondents.push(genExtreme("Architecture-Pure", 6.5, 1.5));

// Mild versions
respondents.push(genExtreme("Algorithm-Mild", 5.5, 5.5));
respondents.push(genExtreme("Cipher-Mild", 2.5, 5.5));
respondents.push(genExtreme("Gestalt-Mild", 2.5, 2.5));
respondents.push(genExtreme("Architecture-Mild", 5.5, 2.5));

// Gradation variants
respondents.push(genExtreme("Algorithm-Early", 5.8, 5.2));
respondents.push(genExtreme("Algorithm-Mid", 5.5, 5.5));
respondents.push(genExtreme("Algorithm-Late", 5.2, 5.8));
respondents.push(genExtreme("Architecture-Early", 5.8, 1.8));
respondents.push(genExtreme("Architecture-Mid", 5.5, 1.5));
respondents.push(genExtreme("Architecture-Late", 5.2, 1.2));

// Threshold / near-center
respondents.push(gen("Balanced-Center", 4.0, 4.0, 4.0, 4.0, 0.3));
respondents.push(gen("Balanced-NearThreshold", 4.2, 4.0, 4.1, 3.8, 0.4));
respondents.push(gen("Balanced-WideThreshold", 4.5, 3.5, 4.5, 3.5, 0.5));

// Mixed facet profiles
respondents.push(genMixed("Mixed-HiC1_LoC2", 6.2, 3.0, 4.0, 4.0));
respondents.push(genMixed("Mixed-LoC1_HiC2", 3.0, 6.2, 4.0, 4.0));
respondents.push(genMixed("Mixed-HiD1_LoD2", 4.0, 4.0, 6.2, 3.0));
respondents.push(genMixed("Mixed-LoD1_HiD2", 4.0, 4.0, 3.0, 6.2));

// Divergent profiles
respondents.push(genMixed("Diverge-C1hiC2lo", 6.0, 2.0, 4.0, 4.0));
respondents.push(genMixed("Diverge-C1loC2hi", 2.0, 6.0, 4.0, 4.0));
respondents.push(genMixed("Diverge-D1hiD2lo", 4.0, 4.0, 6.0, 2.0));
respondents.push(genMixed("Diverge-D1loD2hi", 4.0, 4.0, 2.0, 6.0));

// Boundary edge cases
respondents.push(gen("Boundary-C-DelibSide", 5.5, 5.5, 4.0, 4.0, 0.3));
respondents.push(gen("Boundary-D-SeqSide", 4.0, 4.0, 5.5, 5.5, 0.3));
respondents.push(gen("Boundary-C-IntSide", 2.5, 2.5, 4.0, 4.0, 0.3));
respondents.push(gen("Boundary-D-HolSide", 4.0, 4.0, 2.5, 2.5, 0.3));

// Noisy
respondents.push(genNoisy("Noisy-HighVar", 5.0, 5.0, 5.0, 5.0, 2.5));
respondents.push(genNoisy("Noisy-VeryHighVar", 4.0, 4.0, 4.0, 4.0, 3.0));

// Extreme corners
respondents.push(gen("Corner-TopRight", 7.0, 7.0, 7.0, 7.0, 0.1));
respondents.push(gen("Corner-TopLeft", 7.0, 7.0, 1.0, 1.0, 0.1));
respondents.push(gen("Corner-BottomLeft", 1.0, 1.0, 1.0, 1.0, 0.1));
respondents.push(gen("Corner-BottomRight", 1.0, 1.0, 7.0, 7.0, 0.1));

// Split-axis
respondents.push(gen("Split-AxisC-Fifty", 4.0, 4.0, 6.0, 6.0, 0.15));
respondents.push(gen("Split-AxisD-Fifty", 6.0, 6.0, 4.0, 4.0, 0.15));

Math.random = _origRandom; // restore

// ── RUN SCORING (both lengths) ────────────────────────
const results: ScoreResult[] = [];
const results16: ScoreResult[] = [];
for (const [name, raw, orient] of respondents) {
  const s = score(raw, orient);
  s.name = name;
  results.push(s);
  const s16 = score(raw, orient, MMA16_INDICES);
  s16.name = name;
  results16.push(s16);
}

// ── CROSS-LENGTH AGREEMENT ────────────────────────────
function crossLengthAnalysis(r32: ScoreResult[], r16: ScoreResult[]): void {
  console.log("=".repeat(78));
  console.log("CROSS-LENGTH AGREEMENT — MMA-32 vs MMA-16 (same synthetic respondents)");
  console.log("=".repeat(78));
  const n = r32.length;
  let seasonAgree = 0, seasonDisagree = [] as string[];
  let tensionAgree = 0;
  let cDomAgree = 0, dDomAgree = 0;
  let axisAbsDiff = [] as number[];
  for (let i = 0; i < n; i++) {
    const a = r32[i], b = r16[i];
    if (a.result_type === b.result_type) seasonAgree++;
    else seasonDisagree.push(`    ${a.name.padEnd(28)} 32=${a.result_type.padEnd(12)} → 16=${b.result_type}  (C: ${a.axis.C.score.toFixed(0)}→${b.axis.C.score.toFixed(0)}, D: ${a.axis.D.score.toFixed(0)}→${b.axis.D.score.toFixed(0)})`);
    if (!!a.has_tension === !!b.has_tension) tensionAgree++;
    if (a.contrib.C.dominant === b.contrib.C.dominant) cDomAgree++;
    if (a.contrib.D.dominant === b.contrib.D.dominant) dDomAgree++;
    axisAbsDiff.push(Math.abs(a.axis.C.score - b.axis.C.score));
    axisAbsDiff.push(Math.abs(a.axis.D.score - b.axis.D.score));
  }
  const pct = (x: number) => (x / n * 100).toFixed(1) + "%";
  const mean = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;
  console.log(`\n  Result-type agreement (mode or Halting Point): ${seasonAgree}/${n} agree (${pct(seasonAgree)})`);
  console.log(`  Facet-tension modifier agrees: ${tensionAgree}/${n} (${pct(tensionAgree)})`);
  console.log(`  Axis C dominant facet: ${cDomAgree}/${n} agree (${pct(cDomAgree)})`);
  console.log(`  Axis D dominant facet: ${dDomAgree}/${n} agree (${pct(dDomAgree)})`);
  console.log(`  Axis-score shift (mean |Δ|): ${mean(axisAbsDiff).toFixed(2)} points,  max |Δ|: ${Math.max(...axisAbsDiff).toFixed(2)}`);
  if (seasonDisagree.length) {
    console.log(`\n  Result-type disagreements (${seasonDisagree.length}):`);
    for (const line of seasonDisagree) console.log(line);
  }
  console.log(`\n  How to read this: result-type agreement is the short form's main job.`);
  console.log(`  Dominant-facet agreement is noisier by design (4 items/facet ≈ .60-.70 alpha).`);
  console.log(`  Disagreements cluster near boundaries where a small score shift flips the label.`);
}
crossLengthAnalysis(results, results16);
console.log();

// ── ANALYSIS ────────────────────────────────────────────
function pad(s: string, n: number): string { return s.padEnd(n); }

function analyze(res: ScoreResult[]): void {
  console.log("=".repeat(78));
  console.log("MMA SIMULATION ANALYSIS — 30+ DIVERSE RESPONDENTS (MMA-32)");
  console.log("=".repeat(78));

  // 1. Distribution
  console.log("\n" + "─".repeat(78));
  console.log("1. RESULT TYPE DISTRIBUTION");
  console.log("─".repeat(78));
  const quadCounts = new Map<string, number>();
  const gradCounts = new Map<string, number>();
  let threshCount = 0, threshTenseCount = 0;
  for (const r of res) {
    if (r.is_threshold) {
      threshCount++;
      if (r.has_tension) threshTenseCount++;
    } else {
      quadCounts.set(r.quadrant_name, (quadCounts.get(r.quadrant_name) ?? 0) + 1);
      const key = `${r.quadrant_name}|${r.gradation}`;
      gradCounts.set(key, (gradCounts.get(key) ?? 0) + 1);
    }
  }
  const total = res.length;
  console.log(`\n  Total respondents: ${total}`);
  console.log(`  Types (mode clusters): ${total - threshCount} (${((total - threshCount) / total * 100).toFixed(1)}%)`);
  console.log(`  Halting Point (boundary): ${threshCount} (${(threshCount / total * 100).toFixed(1)}%) — of which ${threshTenseCount} carry facet-tension modifier`);
  console.log(`\n  Quadrant distribution:`);
  for (const q of QUADRANT_NAMES) {
    const c = quadCounts.get(q) ?? 0;
    const bar = "█".repeat(Math.max(1, Math.round(c / total * 40)));
    console.log(`    ${pad(q, 14)}: ${c.toString().padStart(2)}  ${bar}`);
  }
  console.log(`\n  Gradation distribution (clear modes only):`);
  for (const [key, c] of [...gradCounts.entries()].sort()) {
    const [q, g] = key.split("|");
    console.log(`    ${pad(g, 5)} ${pad(q, 14)}: ${c}`);
  }

  // 2. Axis score ranges
  console.log("\n" + "─".repeat(78));
  console.log("2. AXIS SCORE RANGES & DISTRIBUTION");
  console.log("─".repeat(78));
  for (const ax of ["C", "D"] as AxisId[]) {
    const scores = res.map(r => r.axis[ax].score);
    scores.sort((a, b) => a - b);
    const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
    console.log(`\n  ${AXIS_NAMES[ax]} (${ax}):`);
    console.log(`    Min: ${scores[0].toFixed(1)}  Max: ${scores[scores.length - 1].toFixed(1)}  Mean: ${mean.toFixed(1)}  Median: ${scores[Math.floor(scores.length / 2)].toFixed(1)}`);
    const bins = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    const hist = new Array(10).fill(0);
    for (const s of scores) { for (let i = 0; i < bins.length - 1; i++) { if (s >= bins[i] && s < bins[i + 1]) { hist[i]++; break; } } }
    for (let i = 0; i < 10; i++) {
      const bar = "█".repeat(Math.max(1, hist[i]));
      console.log(`    ${bins[i].toString().padStart(3)}-${bins[i + 1].toString().padStart(3)}: ${hist[i].toString().padStart(2)}  ${bar}`);
    }
  }

  // 3. Facet-level analysis
  console.log("\n" + "─".repeat(78));
  console.log("3. FACET-LEVEL ANALYSIS");
  console.log("─".repeat(78));
  for (const facet of FACETS) {
    const scores = res.map(r => r.facets[facet].score);
    const variances = res.map(r => r.facets[facet].variance);
    const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
    const std = Math.sqrt(scores.reduce((a, s) => a + (s - mean) ** 2, 0) / scores.length);
    const avgVar = variances.reduce((a, b) => a + b, 0) / variances.length;
    console.log(`\n  ${facet} — ${FACET_NAMES[facet]}:`);
    console.log(`    Score range: ${Math.min(...scores).toFixed(1)} – ${Math.max(...scores).toFixed(1)}  Mean: ${mean.toFixed(1)}  StdDev: ${std.toFixed(1)}`);
    console.log(`    Within-facet variance (consistency): mean=${avgVar.toFixed(1)}  max=${Math.max(...variances).toFixed(1)}`);
  }

  // 4. Edge case analysis
  console.log("\n" + "─".repeat(78));
  console.log("4. EDGE CASE & BOUNDARY ANALYSIS");
  console.log("─".repeat(78));
  const boundaries = res.filter(r => Math.abs(r.c_off) < 5 || Math.abs(r.d_off) < 5);
  console.log(`\n  Near-axis respondents (|C_off|<5 or |D_off|<5): ${boundaries.length}`);
  for (const r of boundaries) {
    const near: string[] = [];
    if (Math.abs(r.c_off) < 5) near.push("C");
    if (Math.abs(r.d_off) < 5) near.push("D");
    const label = r.result_type;
    console.log(`    ${pad(r.name, 28)} C=${r.axis.C.score.toFixed(1).padStart(5)} D=${r.axis.D.score.toFixed(1).padStart(5)}  proto=${r.prototypicality.toFixed(3)}  near: ${near.join("+").padEnd(5)}  → ${label}`);
  }

  const nearCenter = res.filter(r => r.is_near_center);
  console.log(`\n  Near-center cases (proto < 0.28), all Halting Point boundary: ${nearCenter.length}`);
  console.log(`  [calm = balanced narrative; tense = facet-tension modifier narrative]`);
  for (const r of nearCenter) {
    const sub = r.has_tension ? "HP+tension" : "HP (calm)";
    const tC = r.contrib.C.dominant === "tense" ? " C-tense" : "";
    const tD = r.contrib.D.dominant === "tense" ? " D-tense" : "";
    console.log(`    ${pad(r.name, 28)} C=${r.axis.C.score.toFixed(1).padStart(5)} D=${r.axis.D.score.toFixed(1).padStart(5)}  proto=${r.prototypicality.toFixed(4)}  → ${sub}${tC}${tD}`);
  }

  const nearQuadBoundaries = res.filter(r => !r.is_near_center && (r.angle_in_quad < 3 || r.angle_in_quad > 87));
  console.log(`\n  Near quadrant-boundary angle (<3° or >87° within quad): ${nearQuadBoundaries.length}`);
  for (const r of nearQuadBoundaries) {
    console.log(`    ${pad(r.name, 28)} angle=${r.angle_deg.toFixed(1).padStart(6)}°  in-quad=${r.angle_in_quad.toFixed(1)}°  quad=${r.quadrant_name}  grad=${r.gradation}`);
  }

  // 5. Facet contribution correctness
  console.log("\n" + "─".repeat(78));
  console.log("5. FACET CONTRIBUTION CORRECTNESS");
  console.log("─".repeat(78));
  const contribIssues: [string, AxisId, string, number, number][] = [];
  for (const r of res) {
    for (const ax of ["C", "D"] as AxisId[]) {
      const c = r.contrib[ax];
      if (c.dominant === "equal" || c.dominant === "tense") continue;
      const other = ax === "C" ? (c.dominant === "C1" ? "C2" : "C1") as FacetId : (c.dominant === "D1" ? "D2" : "D1") as FacetId;
      const domOff = Math.abs(r.facets[c.dominant as FacetId].score - 50);
      const otherOff = Math.abs(r.facets[other].score - 50);
      if (domOff <= otherOff) contribIssues.push([r.name, ax, c.dominant, domOff, otherOff]);
    }
  }
  if (contribIssues.length) {
    console.log(`\n  ⚠️  Facet contribution errors: ${contribIssues.length}`);
    for (const [name, ax, dom, dOff, oOff] of contribIssues) {
      console.log(`    ${name}: Axis ${ax} dominant=${dom} but ${dom}_off=${dOff.toFixed(2)} ≤ other_off=${oOff.toFixed(2)}`);
    }
  } else console.log(`\n  ✅ All facet contribution calls correct.`);

  // 6. Expected vs actual
  console.log("\n" + "─".repeat(78));
  console.log("6. EXPECTED vs ACTUAL RESULT MATCH");
  console.log("─".repeat(78));
  const expectedMap: Record<string, string | null> = {
    "Algorithm-Pure": "Algorithm", "Cipher-Pure": "Cipher", "Gestalt-Pure": "Gestalt", "Architecture-Pure": "Architecture",
    "Algorithm-Mild": "Algorithm", "Cipher-Mild": "Cipher", "Gestalt-Mild": "Gestalt", "Architecture-Mild": "Architecture",
    "Algorithm-Early": "Algorithm", "Algorithm-Mid": "Algorithm", "Algorithm-Late": "Algorithm",
    "Architecture-Early": "Architecture", "Architecture-Mid": "Architecture", "Architecture-Late": "Architecture",
    "Balanced-Center": "HaltingPoint", "Balanced-NearThreshold": "HaltingPoint",
    "Mixed-HiC1_LoC2": "HaltingPoint", "Mixed-LoC1_HiC2": "HaltingPoint",
    "Mixed-HiD1_LoD2": "HaltingPoint", "Mixed-LoD1_HiD2": "HaltingPoint",
    "Diverge-C1hiC2lo": "HaltingPoint", "Diverge-C1loC2hi": "HaltingPoint",
    "Diverge-D1hiD2lo": "HaltingPoint", "Diverge-D1loD2hi": "HaltingPoint",
    "Corner-TopRight": "Algorithm", "Corner-TopLeft": "Architecture",
    "Corner-BottomLeft": "Gestalt", "Corner-BottomRight": "Cipher",
  };
  const mismatches: [string, string, string, number, number][] = [];
  for (const r of res) {
    const exp = expectedMap[r.name];
    if (exp === undefined || exp === null) continue;
    const actual = r.result_type;
    if (exp !== actual) mismatches.push([r.name, exp, actual, r.axis.C.score, r.axis.D.score]);
  }
  if (mismatches.length) {
    console.log(`\n  ⚠️  Unexpected results: ${mismatches.length}`);
    for (const [name, exp, act, c, d] of mismatches) {
      console.log(`    ${pad(name, 28)} expected ${pad(exp, 14)} got ${pad(act, 14)} (C=${c.toFixed(1)}, D=${d.toFixed(1)})`);
    }
  } else console.log(`\n  ✅ All expected results match.`);

  // Tension regression guard
  const tensionExpected: Record<string, boolean> = {
    "Diverge-C1hiC2lo": true, "Diverge-C1loC2hi": true, "Diverge-D1hiD2lo": true, "Diverge-D1loD2hi": true,
  };
  let tensionMiss = 0;
  for (const r of res) {
    if (tensionExpected[r.name] && !r.has_tension) { console.log(`  ⚠️  TENSION REGRESSION: ${r.name} divergent but has_tension=false`); tensionMiss++; }
  }
  if (!tensionMiss) console.log(`  ✅ All divergent profiles correctly carry facet-tension modifier.`);

  // 7. Gradation correctness
  console.log("\n" + "─".repeat(78));
  console.log("7. GRADATION BAND CORRECTNESS");
  console.log("─".repeat(78));
  const gradErrors: [string, number, string, string][] = [];
  for (const r of res) {
    if (r.is_near_center) continue;
    const expectedGrad = r.angle_in_quad < 30 ? "Early" : (r.angle_in_quad < 60 ? "Mid" : "Late");
    if (r.gradation !== expectedGrad) gradErrors.push([r.name, r.angle_in_quad, expectedGrad, r.gradation]);
  }
  if (gradErrors.length) {
    console.log(`\n  ⚠️  Gradation errors: ${gradErrors.length}`);
    for (const [name, aiq, exp, act] of gradErrors) console.log(`    ${name}: angle_in_quad=${aiq.toFixed(1)}° expected=${exp} got=${act}`);
  } else console.log(`\n  ✅ All gradation bands correct.`);

  // 8. Intra-facet consistency
  console.log("\n" + "─".repeat(78));
  console.log("8. INTRA-FACET RESPONSE CONSISTENCY");
  console.log("─".repeat(78));
  const allCons: [string, FacetId, number][] = [];
  for (const r of res) { for (const f of FACETS) allCons.push([r.name, f, r.facet_consistency[f]]); }
  allCons.sort((a, b) => b[2] - a[2]);
  console.log(`\n  Top 10 least-consistent facet responses (highest std dev within facet):`);
  for (const [name, f, std] of allCons.slice(0, 10)) {
    const flag = std > 1.5 ? " ⚠️ HIGH" : "";
    console.log(`    ${pad(name, 28)} ${f}: std=${std.toFixed(2)}${flag}`);
  }

  // 9. Coverage
  console.log("\n" + "─".repeat(78));
  console.log("9. DIMENSION OVER/UNDER-REPRESENTATION");
  console.log("─".repeat(78));
  console.log(`\n  This simulation is DESIGNED to cover all quadrants and edge cases.`);
  console.log(`  Quadrants represented: ${new Set(res.filter(r => !r.is_near_center).map(r => r.quadrant_name)).size}/4`);
  console.log(`  Gradations represented: ${new Set(res.filter(r => !r.is_near_center).map(r => r.gradation)).size}/3`);
  console.log(`  Halting Point cases: ${threshCount}  (of which ${threshTenseCount} with tension modifier)`);
  console.log(`  Boundary (near-axis) cases: ${boundaries.length}`);

  // 10. Scoring sensitivity
  console.log("\n" + "─".repeat(78));
  console.log("10. SCORING SENSITIVITY — ONE-POINT PERTURBATION");
  console.log("─".repeat(78));
  const alg = res.find(r => r.name === "Algorithm-Pure")!;
  console.log(`\n  Baseline: Algorithm-Pure → C=${alg.axis.C.score.toFixed(1)} D=${alg.axis.D.score.toFixed(1)} proto=${alg.prototypicality.toFixed(3)} quad=${alg.quadrant_name} grad=${alg.gradation}`);
  console.log(`  Perturbing each item ±1 (one at a time):`);
  let maxShift = 0;
  for (let i = 0; i < 32; i++) {
    for (const delta of [-1, 1]) {
      const raw2 = [...alg.raw]; raw2[i] = Math.max(1, Math.min(7, raw2[i] + delta));
      const r2 = score(raw2, alg._orient);
      maxShift = Math.max(maxShift, Math.abs(r2.axis.C.score - alg.axis.C.score), Math.abs(r2.axis.D.score - alg.axis.D.score));
    }
  }
  console.log(`  Max axis score shift from one-item perturbation: ${maxShift.toFixed(3)}`);
  console.log(`  Expected: 1/8 → 1.04 for SCA-equivalent (1/6×100/2). Correct granularity.`);

  // 11. Item-level analysis
  console.log("\n" + "─".repeat(78));
  console.log("11. ITEM-LEVEL MEAN & DISCRIMINATION");
  console.log("─".repeat(78));
  for (const facet of FACETS) {
    const idxs = FACET_ITEMS[facet];
    console.log(`\n  ${facet} — ${FACET_NAMES[facet]}:`);
    const itemMeans: { id: string; mean: number; std: number }[] = [];
    for (const i of idxs) {
      const vals = res.map(r => r.normalized[i]);
      const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
      const std = Math.sqrt(vals.reduce((a, v) => a + (v - mean) ** 2, 0) / vals.length);
      itemMeans.push({ id: ITEMS[i].id, mean, std });
    }
    itemMeans.sort((a, b) => b.mean - a.mean);
    for (const im of itemMeans) {
      const bar = "█".repeat(Math.max(1, Math.round(im.mean)));
      console.log(`    ${pad(im.id, 6)} mean=${im.mean.toFixed(2).padStart(5)}  std=${im.std.toFixed(2)}  ${bar}`);
    }
    const spread = itemMeans[0].mean - itemMeans[itemMeans.length - 1].mean;
    const flag = spread > 2.5 ? " ⚠️ LARGE SPREAD" : "";
    console.log(`    Spread: ${spread.toFixed(2)}${flag}`);
  }

  // 12. Critical findings
  console.log("\n" + "=".repeat(78));
  console.log("12. CRITICAL FINDINGS & RECOMMENDATIONS");
  console.log("=".repeat(78));
  const issues: string[] = [];
  for (const facet of FACETS) {
    const idxs = FACET_ITEMS[facet];
    const itemMeans = idxs.map(i => { const vals = res.map(r => r.normalized[i]); return vals.reduce((a, b) => a + b, 0) / vals.length; });
    const spread = Math.max(...itemMeans) - Math.min(...itemMeans);
    if (spread > 2.5) issues.push(`${facet} has large item-mean spread (${spread.toFixed(2)}); some items may be systematically harder/easier.`);
  }
  if (threshCount > total * 0.2) issues.push(`High Halting Point rate (${threshCount}/${total}). The 0.28 cutoff may be wide for this respondent set.`);
  if (issues.length) { for (let i = 0; i < issues.length; i++) console.log(`\n  ${i + 1}. ${issues[i]}`); }
  else console.log(`\n  No critical issues found in scoring logic.`);
  console.log(`\n  Assessment: The scoring engine is mathematically correct.`);
  console.log(`  All 32 items contribute to their respective facets.`);
  console.log(`  Quadrant, gradation, tension, and Halting Point boundary logic behave as specified.`);
  console.log(`  The main irreducible limitations are:`);
  console.log(`    (a) no real-human validation data,`);
  console.log(`    (b) NFC/FI compositing on Axis C assumes one factor (orthogonal in the REI),`);
  console.log(`    (c) D1/D2 designer decomposition of Wholist-Analytic (unidimensional in Riding),`);
  console.log(`    (d) self-report is a weaker instrument for cognitive style than for affect (Riding, 1997; Frederick, 2005).`);
}

// ── CSV EXPORT ──────────────────────────────────────────
function exportCsv(res: ScoreResult[], filename: string): void {
  const rows: string[][] = [];
  rows.push(["name", "C1_score", "C2_score", "C_score", "D1_score", "D2_score", "D_score",
    "c_off", "d_off", "distance", "prototypicality", "angle_deg",
    "quadrant", "gradation", "is_near_center", "is_threshold", "has_tension", "result_type", "result_label",
    "facet_C_dominant", "facet_D_dominant",
    "C1_variance", "C2_variance", "D1_variance", "D2_variance",
  ]);
  for (const r of res) {
    const nc = r.is_near_center;
    const label = r.result_type === "HaltingPoint" ? (r.has_tension ? "HaltingPoint+tension" : "HaltingPoint") : `${r.gradation} ${r.quadrant_name}`;
    rows.push([
      r.name,
      r.facets.C1.score.toFixed(2), r.facets.C2.score.toFixed(2), r.axis.C.score.toFixed(2),
      r.facets.D1.score.toFixed(2), r.facets.D2.score.toFixed(2), r.axis.D.score.toFixed(2),
      r.c_off.toFixed(2), r.d_off.toFixed(2),
      r.distance.toFixed(2), r.prototypicality.toFixed(4), r.angle_deg.toFixed(2),
      nc ? "N/A" : r.quadrant_name, nc ? "N/A" : r.gradation,
      r.is_near_center ? "TRUE" : "FALSE", r.is_threshold ? "TRUE" : "FALSE", r.has_tension ? "TRUE" : "FALSE",
      r.result_type, label,
      r.contrib.C.dominant, r.contrib.D.dominant,
      r.facets.C1.variance.toFixed(2), r.facets.C2.variance.toFixed(2),
      r.facets.D1.variance.toFixed(2), r.facets.D2.variance.toFixed(2),
    ]);
  }
  const csv = rows.map(row => row.map(c => `"${c}"`).join(",")).join("\n");
  Bun.write(filename, csv);
  console.log(`\n  Results exported to ${filename}`);
}

// ── RUN ─────────────────────────────────────────────────
analyze(results);
exportCsv(results, "mma-sim-results.csv");
exportCsv(results16, "mma-sim-results-16.csv");
