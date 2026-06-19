#!/usr/bin/env bun
/**
 * PTA Simulation & Analysis Script (TypeScript / Bun)
 *
 * Two structural differences from SSA, both construct-correct (not the easy path):
 *  1. Axis 1 (Temporal Direction) is reverse-keyed: A1=Past (low end), A2=Future (high end).
 *     Axis1 = mean(100 - A1, A2). 0 = Past, 100 = Future.
 *  2. Facet tension is asymmetric by construct:
 *       Axis 1 (A1,A2 opposite poles): "temporal fullness" = both strongly engaged (both >= 50+MARGIN).
 *         Does NOT fire for present-focused (both low); that is the affirming Horizon, not tension.
 *       Axis 2 (B1,B2 same pole, continuous): SSA-style opposite-signs tension.
 */
type FacetId = "A1" | "A2" | "B1" | "B2"; type AxisId = "1" | "2";
interface Item { id: string; facet: FacetId; poleA: string; poleB: string; }
interface FacetResult { norms: number[]; sum: number; mean: number; score: number; variance: number; }
interface FacetContrib { dominant: string; s1: number; s2: number; d1: number; d2: number; label: string; }
interface ScoreResult { name: string; raw: number[]; normalized: number[]; facets: Record<FacetId, FacetResult>; axis: Record<AxisId, { score: number }>; a_off: number; b_off: number; distance: number; prototypicality: number; angle_deg: number; angle_in_quad: number; quadrant: number; quadrant_name: string; gradation: string; is_near_center: boolean; is_horizon: boolean; has_tension: boolean; tension_axis1: boolean; tension_axis2: boolean; result_type: string; contrib: Record<AxisId, FacetContrib>; facet_consistency: Record<FacetId, number>; _orient: number[]; }

const ITEMS: Item[] = [
  { id: "A1.1", facet: "A1", poleA: "I feel a real connection. My roots are part of me.", poleB: "I don't feel it much. I'm more focused on what's ahead." },
  { id: "A1.2", facet: "A1", poleA: "Are a source of warmth and grounding for me.", poleB: "Don't pull at me much. I'm not very sentimental." },
  { id: "A1.3", facet: "A1", poleA: "Carry meaning for me. I want to keep them alive.", poleB: "Aren't a big part of how I live. I prefer what's fresh." },
  { id: "A1.4", facet: "A1", poleA: "I feel gratitude and connection.", poleB: "I feel some distance. I've moved on to other things." },
  { id: "A1.5", facet: "A1", poleA: "I see a clear thread. My history runs through me.", poleB: "I see closed chapters. Where I'm going matters more." },
  { id: "A1.6", facet: "A1", poleA: "I can sit with it easily. It feels like home.", poleB: "I tend to look forward instead. The past is past." },
  { id: "A1.7", facet: "A1", poleA: "Still move me. They're part of who I am.", poleB: "Feel distant from who I am now." },
  { id: "A1.8", facet: "A1", poleA: "A lot. I'm grounded in my history.", poleB: "Not much. I'm shaped more by where I'm headed." },
  { id: "A2.1", facet: "A2", poleA: "I feel pulled toward them. There's so much I want to build.", poleB: "I take them as they come. I'm not chasing a far-off horizon." },
  { id: "A2.2", facet: "A2", poleA: "Are essential to me. I'm always working toward something.", poleB: "Take a back seat. I prefer to live in the present." },
  { id: "A2.3", facet: "A2", poleA: "Feels vivid and motivating. The future pulls me forward.", poleB: "Feels distant. I'd rather be fully here than dwell on what's next." },
  { id: "A2.4", facet: "A2", poleA: "I think a lot about where they'll lead. The future matters.", poleB: "I weigh what's right for now. The distant future isn't my compass." },
  { id: "A2.5", facet: "A2", poleA: "Shape a lot of how I live day to day.", poleB: "Don't drive me much. I'm content with the present." },
  { id: "A2.6", facet: "A2", poleA: "Excites me. I'm building toward them.", poleB: "Doesn't pull me. I find meaning in the present." },
  { id: "A2.7", facet: "A2", poleA: "A great deal. I'm oriented toward the horizon.", poleB: "Very little. My attention is here, now." },
  { id: "A2.8", facet: "A2", poleA: "I can talk about it for hours. The future is alive for me.", poleB: "I'm not sure what to say. I live more by the day." },
  { id: "B1.1", facet: "B1", poleA: "Feel like the same core self, grown.", poleB: "Feel like quite different people." },
  { id: "B1.2", facet: "B1", poleA: "I feel a strong connection to that future self.", poleB: "They feel distant, almost like a stranger." },
  { id: "B1.3", facet: "B1", poleA: "Deeply. They're me, continuing.", poleB: "It feels abstract. I focus on who I am now." },
  { id: "B1.4", facet: "B1", poleA: "Still feel like mine. I see the throughline.", poleB: "Feel like someone else's choices. I've moved on." },
  { id: "B1.5", facet: "B1", poleA: "I weigh how my future self will feel about it.", poleB: "I trust whoever I become to handle things their own way." },
  { id: "B1.6", facet: "B1", poleA: "Is unmistakably still here. I've always been me.", poleB: "Has faded. I feel rebuilt across the years." },
  { id: "B1.7", facet: "B1", poleA: "Holds steady. There's a clear thread.", poleB: "Shifts a lot. I become different people over time." },
  { id: "B1.8", facet: "B1", poleA: "A real kinship. I know them.", poleB: "Like meeting someone I once knew but no longer am." },
  { id: "B2.1", facet: "B2", poleA: "Has a clear shape. I can see how it all fits.", poleB: "Is more a series of chapters than one plot." },
  { id: "B2.2", facet: "B2", poleA: "There's a thread I can trace from beginning to now.", poleB: "It's a collection of turns. I don't see one storyline." },
  { id: "B2.3", facet: "B2", poleA: "Fit into a larger meaning I can name.", poleB: "Stand on their own. I don't force them into a story." },
  { id: "B2.4", facet: "B2", poleA: "Comes naturally. I see what ties them together.", poleB: "Feels artificial. Each time was its own thing." },
  { id: "B2.5", facet: "B2", poleA: "It eventually wove into a larger meaning in my life.", poleB: "It lived as its own moment. Not every chapter has to resolve." },
  { id: "B2.6", facet: "B2", poleA: "Forms a coherent arc I can describe.", poleB: "Is open. I let each season be what it is." },
  { id: "B2.7", facet: "B2", poleA: "It's the next chapter of an ongoing story I know well.", poleB: "It's an open page. The next season may take any shape." },
  { id: "B2.8", facet: "B2", poleA: "They form one continuous, intelligible narrative.", poleB: "They're distinct seasons, each whole in itself." },
];

const FACETS: FacetId[] = ["A1", "A2", "B1", "B2"];
const FACET_NAMES: Record<FacetId, string> = { A1: "Past Engagement", A2: "Future Engagement", B1: "Self-Continuity", B2: "Narrative Coherence" };
const AXIS_OF: Record<FacetId, AxisId> = { A1: "1", A2: "1", B1: "2", B2: "2" };
const AXIS_NAMES: Record<AxisId, string> = { "1": "Temporal Direction", "2": "Temporal Mode" };
const QUADRANT_NAMES = ["Navigator", "Pioneer", "Storyteller", "Archivist"]; // 0=future+cont, 1=future+fluid, 2=past+fluid, 3=past+cont
const TENSION_MARGIN = 20;
const FACET_ITEMS: Record<FacetId, number[]> = {} as any; for (const f of FACETS) FACET_ITEMS[f] = []; ITEMS.forEach((item, i) => FACET_ITEMS[item.facet].push(i));
const PTA16_IDS = new Set(["A1.1", "A1.2", "A1.5", "A1.8", "A2.1", "A2.2", "A2.4", "A2.7", "B1.1", "B1.2", "B1.3", "B1.7", "B2.1", "B2.2", "B2.5", "B2.8"]);
const PTA16_INDICES = ITEMS.map((it, i) => PTA16_IDS.has(it.id) ? i : -1).filter(i => i >= 0);
const FACET_ITEMS_16: Record<FacetId, number[]> = {} as any; for (const f of FACETS) FACET_ITEMS_16[f] = FACET_ITEMS[f].filter(i => PTA16_IDS.has(ITEMS[i].id));

function clamp(v: number, lo: number, hi: number): number { return Math.max(lo, Math.min(hi, Math.round(v))); }
function gauss(mean: number, std: number): number { let u = 0, v = 0; while (u === 0) u = Math.random(); while (v === 0) v = Math.random(); return mean + std * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
function choice<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

// Per-axis facet tension. See header comment.
function axisTense(axis: AxisId, s1: number, s2: number): boolean {
  if (axis === "1") return s1 >= 50 + TENSION_MARGIN && s2 >= 50 + TENSION_MARGIN; // temporal fullness (both engaged)
  const o1 = s1 - 50, o2 = s2 - 50; // Axis 2: same pole, opposite-signs
  return (o1 * o2 < 0) && Math.abs(o1) >= TENSION_MARGIN && Math.abs(o2) >= TENSION_MARGIN;
}

function score(rawResponses: number[], orientations?: number[], activeIdxs?: number[]): ScoreResult {
  const ori = orientations ?? new Array(32).fill(1);
  const normalized: number[] = []; for (let i = 0; i < 32; i++) normalized.push(ori[i] === 1 ? rawResponses[i] : 8 - rawResponses[i]);
  const localFacetMap: Record<FacetId, number[]> = {} as any; for (const f of FACETS) localFacetMap[f] = (activeIdxs ? FACET_ITEMS_16 : FACET_ITEMS)[f];
  const facets = {} as Record<FacetId, FacetResult>;
  for (const facet of FACETS) { const fIdxs = localFacetMap[facet], norms = fIdxs.map(i => normalized[i]), sum = norms.reduce((a, b) => a + b, 0), n = fIdxs.length, mean = sum / n, scoreVal = (mean - 1) / 6 * 100, variance = norms.reduce((a, x) => a + (x - mean) ** 2, 0) / n; facets[facet] = { norms, sum, mean, score: scoreVal, variance }; }
  // Axis 1: A1 reverse-keyed. Axis 2: B1,B2 same pole.
  const axis = { "1": { score: ((100 - facets.A1.score) + facets.A2.score) / 2 }, "2": { score: (facets.B1.score + facets.B2.score) / 2 } } as Record<AxisId, { score: number }>;
  const a_off = axis["1"].score - 50, b_off = axis["2"].score - 50, MAX_DIST = Math.sqrt(50 * 50 + 50 * 50), distance = Math.sqrt(a_off * a_off + b_off * b_off), prototypicality = distance / MAX_DIST;
  const angle_rad = Math.atan2(b_off, a_off); let angle_deg = angle_rad * 180 / Math.PI; if (angle_deg < 0) angle_deg += 360;
  let quadrant: number; if (a_off >= 0 && b_off >= 0) quadrant = 0; else if (a_off >= 0 && b_off < 0) quadrant = 1; else if (a_off < 0 && b_off < 0) quadrant = 2; else quadrant = 3;
  const QUAD_ENTRY_EDGE = [90, 0, 270, 180], entry_edge = QUAD_ENTRY_EDGE[quadrant], progress = (entry_edge - angle_deg + 360) % 360;
  if (progress > 90) throw new Error(`Gradation error: ${QUADRANT_NAMES[quadrant]} angle ${angle_deg.toFixed(2)}° → progress ${progress.toFixed(2)}°`);
  const angle_in_quad = progress; let gradation: string; if (progress < 30) gradation = "Early"; else if (progress < 60) gradation = "Mid"; else gradation = "Late";
  const is_near_center = prototypicality < 0.28;
  const tension_axis1 = axisTense("1", facets.A1.score, facets.A2.score);
  const tension_axis2 = axisTense("2", facets.B1.score, facets.B2.score);
  const has_tension = tension_axis1 || tension_axis2, is_horizon = is_near_center, result_type: string = is_horizon ? "Horizon" : QUADRANT_NAMES[quadrant];
  const contrib = {} as Record<AxisId, FacetContrib>;
  { // Axis 1 driver
    const s1 = facets.A1.score, s2 = facets.A2.score, d1 = Math.abs(s1 - 50), d2 = Math.abs(s2 - 50); let dom: string, label: string;
    if (tension_axis1) { dom = "tense"; label = "temporal fullness (strong past AND future)"; }
    else if (Math.abs(d1 - d2) < 0.5) { dom = "equal"; label = d1 < 5 && d2 < 5 ? "no strong driver" : "balanced past and future"; }
    else if (d1 > d2) { dom = "A1"; label = a_off < 0 ? "driven by strong past engagement (A1)" : "future-leaning via low past pull (A1)"; }
    else { dom = "A2"; label = a_off > 0 ? "driven by strong future engagement (A2)" : "past-leaning via low future pull (A2)"; }
    contrib["1"] = { dominant: dom, s1, s2, d1, d2, label };
  }
  { // Axis 2 driver
    const s1 = facets.B1.score, s2 = facets.B2.score, d1 = Math.abs(s1 - 50), d2 = Math.abs(s2 - 50); let dom: string, label: string;
    if (tension_axis2) { dom = "tense"; label = "pulled opposite (continuity vs fluidity)"; }
    else if (Math.abs(d1 - d2) < 0.5) { dom = "equal"; label = d1 < 5 && d2 < 5 ? "no strong driver" : "balanced contribution"; }
    else { dom = d1 > d2 ? "B1" : "B2"; label = "driven more by " + FACET_NAMES[dom as FacetId]; }
    contrib["2"] = { dominant: dom, s1, s2, d1, d2, label };
  }
  const facet_consistency = {} as Record<FacetId, number>; for (const f of FACETS) facet_consistency[f] = Math.sqrt(facets[f].variance);
  return { name: "", raw: rawResponses, normalized, facets, axis, a_off, b_off, distance, prototypicality, angle_deg, angle_in_quad, quadrant, quadrant_name: QUADRANT_NAMES[quadrant], gradation, is_near_center, is_horizon, has_tension, tension_axis1, tension_axis2, result_type, contrib, facet_consistency, _orient: ori };
}

// gen takes per-facet centers. For Axis 1, a1_c high = past-engaged, a2_c high = future-engaged (opposite poles by design).
function gen(name: string, a1_c: number, a2_c: number, b1_c: number, b2_c: number, noise = 1.0): [string, number[], number[]] {
  const orient = new Array(32).fill(0).map(() => choice([1, -1])); const raw: number[] = []; const centers: Record<FacetId, number> = { A1: a1_c, A2: a2_c, B1: b1_c, B2: b2_c };
  for (let i = 0; i < ITEMS.length; i++) { const c = centers[ITEMS[i].facet], trait = clamp(gauss(c, noise), 1, 7); raw.push(orient[i] === 1 ? trait : (8 - trait)); }
  return [name, raw, orient];
}
function genNoisy(name: string, a1_c: number, a2_c: number, b1_c: number, b2_c: number, noise = 2.0): [string, number[], number[]] { return gen(name, a1_c, a2_c, b1_c, b2_c, noise); }

export { score, ITEMS, FACETS, axisTense, gen };

if (import.meta.main) {
let _seed = 42; function seededRandom(): number { _seed = (_seed * 16807) % 2147483647; return (_seed - 1) / 2147483646; } const _origRandom = Math.random; Math.random = seededRandom;
const respondents: [string, number[], number[]][] = [];
// Pure quadrants. A1=past, A2=future, B1/B2=continuous. So past-quadrants set A1 hi & A2 lo; future set A1 lo & A2 hi.
respondents.push(gen("Archivist-Pure", 6.5, 1.5, 6.5, 6.5, 0.4)); respondents.push(gen("Navigator-Pure", 1.5, 6.5, 6.5, 6.5, 0.4));
respondents.push(gen("Storyteller-Pure", 6.5, 1.5, 1.5, 1.5, 0.4)); respondents.push(gen("Pioneer-Pure", 1.5, 6.5, 1.5, 1.5, 0.4));
respondents.push(gen("Archivist-Mild", 5.5, 2.5, 5.5, 5.5, 0.6)); respondents.push(gen("Navigator-Mild", 2.5, 5.5, 5.5, 5.5, 0.6));
respondents.push(gen("Storyteller-Mild", 5.5, 2.5, 2.5, 2.5, 0.6)); respondents.push(gen("Pioneer-Mild", 2.5, 5.5, 2.5, 2.5, 0.6));
respondents.push(gen("Archivist-Early", 5.8, 2.4, 5.7, 5.3, 0.5)); respondents.push(gen("Archivist-Mid", 5.6, 2.6, 5.5, 5.5, 0.5)); respondents.push(gen("Archivist-Late", 5.4, 2.8, 5.3, 5.7, 0.5));
// Balanced & present-focused (low both A1,A2 = present). Present must NOT flag tension.
respondents.push(gen("Balanced-Center", 4.0, 4.0, 4.0, 4.0, 0.3)); respondents.push(gen("Balanced-Near", 4.2, 4.0, 4.1, 3.8, 0.4));
respondents.push(gen("Present-Focused", 1.5, 1.5, 4.0, 4.0, 0.4)); respondents.push(gen("Present-Mild", 2.5, 2.5, 4.0, 4.0, 0.4));
// Axis 1 temporal fullness: both A1 and A2 high → mid-axis from fullness → must be Horizon + tension.
respondents.push(gen("Fullness-A-BothHi", 6.5, 6.5, 4.0, 4.0, 0.4)); respondents.push(gen("Fullness-A-Mild", 5.7, 5.7, 4.0, 4.0, 0.4));
// Axis 2 tension: B1/B2 opposite, both strong → torn → Horizon + tension.
respondents.push(gen("Tension-B-HiLo", 4.0, 4.0, 6.5, 1.5, 0.4)); respondents.push(gen("Tension-B-LoHi", 4.0, 4.0, 1.5, 6.5, 0.4));
respondents.push(gen("Mixed-Navi-B2low", 1.5, 6.5, 6.5, 3.0, 0.5)); respondents.push(gen("Mixed-Arch-B1low", 6.5, 1.5, 3.0, 6.5, 0.5));
respondents.push(gen("Boundary-FutureSide", 1.5, 6.5, 4.0, 4.0, 0.3)); respondents.push(gen("Boundary-PastSide", 6.5, 1.5, 4.0, 4.0, 0.3));
respondents.push(gen("Boundary-ContinuousSide", 4.0, 4.0, 6.5, 6.5, 0.3)); respondents.push(gen("Boundary-FluidSide", 4.0, 4.0, 1.5, 1.5, 0.3));
respondents.push(genNoisy("Noisy-HighVar", 4.0, 4.0, 4.0, 4.0, 2.5)); respondents.push(genNoisy("Noisy-VeryHighVar", 4.5, 4.5, 4.5, 4.5, 3.0));
respondents.push(gen("Corner-Archivist", 7.0, 1.0, 7.0, 7.0, 0.1)); respondents.push(gen("Corner-Navigator", 1.0, 7.0, 7.0, 7.0, 0.1));
respondents.push(gen("Corner-Storyteller", 7.0, 1.0, 1.0, 1.0, 0.1)); respondents.push(gen("Corner-Pioneer", 1.0, 7.0, 1.0, 1.0, 0.1));
Math.random = _origRandom;

const results: ScoreResult[] = [], results16: ScoreResult[] = [];
for (const [name, raw, orient] of respondents) { const s = score(raw, orient); s.name = name; results.push(s); const s16 = score(raw, orient, PTA16_INDICES); s16.name = name; results16.push(s16); }

function crossLengthAnalysis(r32: ScoreResult[], r16: ScoreResult[]): void {
  console.log("=".repeat(78)); console.log("CROSS-LENGTH AGREEMENT: PTA-32 vs PTA-16"); console.log("=".repeat(78));
  let modeAgree = 0, tensionAgree = 0, ax1DomAgree = 0, ax2DomAgree = 0; const axisAbsDiff: number[] = []; const n = r32.length;
  for (let i = 0; i < n; i++) { const a = r32[i], b = r16[i]; if (a.result_type === b.result_type) modeAgree++; if (!!a.has_tension === !!b.has_tension) tensionAgree++; if (a.contrib["1"].dominant === b.contrib["1"].dominant) ax1DomAgree++; if (a.contrib["2"].dominant === b.contrib["2"].dominant) ax2DomAgree++; axisAbsDiff.push(Math.abs(a.axis["1"].score - b.axis["1"].score), Math.abs(a.axis["2"].score - b.axis["2"].score)); }
  const pct = (x: number) => (x / n * 100).toFixed(1) + "%", mean = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;
  console.log(`\n  Result-type (mode or Horizon): ${modeAgree}/${n} (${pct(modeAgree)})`);
  console.log(`  Tension modifier: ${tensionAgree}/${n} (${pct(tensionAgree)})`);
  console.log(`  Dominant facet Axis1: ${ax1DomAgree}/${n} (${pct(ax1DomAgree)})  Axis2: ${ax2DomAgree}/${n} (${pct(ax2DomAgree)})`);
  console.log(`  Axis shift |Δ| mean: ${mean(axisAbsDiff).toFixed(2)}  max: ${Math.max(...axisAbsDiff).toFixed(2)}`);
}
crossLengthAnalysis(results, results16); console.log();

function pad(s: string, n: number): string { return s.padEnd(n); }
function analyze(res: ScoreResult[]): void {
  console.log("=".repeat(78)); console.log("PTA SIMULATION ANALYSIS: 30+ RESPONDENTS (PTA-32)"); console.log("=".repeat(78));
  const quadCounts = new Map<string, number>(); let horizonCount = 0, horizonTenseCount = 0; const total = res.length;
  for (const r of res) { if (r.is_horizon) { horizonCount++; if (r.has_tension) horizonTenseCount++; } else quadCounts.set(r.quadrant_name, (quadCounts.get(r.quadrant_name) ?? 0) + 1); }
  console.log(`\n  Total: ${total}  |  Modes: ${total - horizonCount} (${((total - horizonCount) / total * 100).toFixed(1)}%)  |  Horizon: ${horizonCount} (${(horizonCount / total * 100).toFixed(1)}%, ${horizonTenseCount} tense)`);
  for (const q of QUADRANT_NAMES) console.log(`    ${pad(q, 12)}: ${(quadCounts.get(q) ?? 0).toString().padStart(2)}`);
  for (const ax of ["1", "2"] as AxisId[]) { const scores = res.map(r => r.axis[ax].score); scores.sort((a, b) => a - b); console.log(`  ${AXIS_NAMES[ax]}: min=${scores[0].toFixed(1)} max=${scores[scores.length - 1].toFixed(1)} mean=${(scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)}`); }
  for (const f of FACETS) { const scores = res.map(r => r.facets[f].score); console.log(`  ${f}: ${Math.min(...scores).toFixed(0)}–${Math.max(...scores).toFixed(0)}  mean=${(scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(0)}`); }
  const nearCenter = res.filter(r => r.is_near_center); console.log(`\n  Near-center (proto<0.28): ${nearCenter.length}`); for (const r of nearCenter) console.log(`    ${pad(r.name, 22)} Dir=${r.axis["1"].score.toFixed(0).padStart(3)} Mode=${r.axis["2"].score.toFixed(0).padStart(3)} → ${r.has_tension ? "Horizon+tension" : "Horizon"}${r.tension_axis1 ? " A1-fullness" : ""}${r.tension_axis2 ? " A2-torn" : ""}`);
  const expectedMap: Record<string, string | null> = {
    "Archivist-Pure": "Archivist", "Navigator-Pure": "Navigator", "Storyteller-Pure": "Storyteller", "Pioneer-Pure": "Pioneer",
    "Archivist-Mild": "Archivist", "Navigator-Mild": "Navigator", "Storyteller-Mild": "Storyteller", "Pioneer-Mild": "Pioneer",
    "Archivist-Early": "Archivist", "Archivist-Mid": "Archivist", "Archivist-Late": "Archivist",
    "Balanced-Center": "Horizon", "Balanced-Near": "Horizon", "Present-Focused": "Horizon", "Present-Mild": "Horizon",
    "Corner-Archivist": "Archivist", "Corner-Navigator": "Navigator", "Corner-Storyteller": "Storyteller", "Corner-Pioneer": "Pioneer",
    "Fullness-A-BothHi": "Horizon", "Fullness-A-Mild": "Horizon", "Tension-B-HiLo": "Horizon", "Tension-B-LoHi": "Horizon",
  };
  const mismatches: string[] = []; for (const r of res) { const exp = expectedMap[r.name]; if (exp !== undefined && exp !== null && exp !== r.result_type) mismatches.push(`  ${pad(r.name, 22)} expected ${exp} got ${r.result_type} (Dir=${r.axis["1"].score.toFixed(0)} Mode=${r.axis["2"].score.toFixed(0)})`); }
  console.log(mismatches.length ? `\n  ⚠️ Mismatches: ${mismatches.length}\n` + mismatches.join("\n") : `\n  ✅ All expected matches correct.`);
  // Tension guards: fullness and torn cases MUST fire; present-focused MUST NOT.
  const mustTense = ["Fullness-A-BothHi", "Fullness-A-Mild", "Tension-B-HiLo", "Tension-B-LoHi"]; let tMiss = 0; for (const r of res) { if (mustTense.includes(r.name) && !r.has_tension) { console.log(`  ⚠️ TENSION REGRESSION (should be tense): ${r.name}`); tMiss++; } } 
  const mustNotTense = ["Present-Focused", "Present-Mild", "Balanced-Center", "Balanced-Near"]; let tFalse = 0; for (const r of res) { if (mustNotTense.includes(r.name) && r.has_tension) { console.log(`  ⚠️ FALSE TENSION (present/balanced flagged): ${r.name}`); tFalse++; } }
  if (!tMiss && !tFalse) console.log(`  ✅ Tension guards pass (fullness & torn fire; present/balanced do not).`);
  if (horizonCount > total * 0.25) console.log(`  ⚠️ High Horizon rate: ${horizonCount}/${total}.`);
  console.log(`\n  Irreducible: (a) no validation data, (b) A1/A2 composite of opposite poles, (c) negative-valence past unmeasured, (d) B2 narrative-coherence is a designer facet, (e) self-report ceiling.`);
}
analyze(results); exportCsv(results, "ptoa-sim-results.csv"); exportCsv(results16, "ptoa-sim-results-16.csv");
}
function exportCsv(res: ScoreResult[], filename: string): void { const rows: string[][] = [["name", "A1_past", "A2_future", "Direction", "B1_continuity", "B2_coherence", "Mode", "dir_off", "mode_off", "distance", "prototypicality", "angle_deg", "quadrant", "gradation", "is_near_center", "tension_ax1", "tension_ax2", "has_tension", "result_type", "result_label", "facet_1_dominant", "facet_2_dominant"]]; for (const r of res) { const nc = r.is_near_center, label = r.result_type === "Horizon" ? (r.has_tension ? "Horizon+tension" : "Horizon") : `${r.gradation} ${r.quadrant_name}`; rows.push([r.name, r.facets.A1.score.toFixed(2), r.facets.A2.score.toFixed(2), r.axis["1"].score.toFixed(2), r.facets.B1.score.toFixed(2), r.facets.B2.score.toFixed(2), r.axis["2"].score.toFixed(2), r.a_off.toFixed(2), r.b_off.toFixed(2), r.distance.toFixed(2), r.prototypicality.toFixed(4), r.angle_deg.toFixed(2), nc ? "N/A" : r.quadrant_name, nc ? "N/A" : r.gradation, r.is_near_center ? "TRUE" : "FALSE", r.tension_axis1 ? "TRUE" : "FALSE", r.tension_axis2 ? "TRUE" : "FALSE", r.has_tension ? "TRUE" : "FALSE", r.result_type, label, r.contrib["1"].dominant, r.contrib["2"].dominant]); } const csv = rows.map(row => row.map(c => `"${c}"`).join(",")).join("\n"); Bun.write(filename, csv); console.log(`\n  Exported: ${filename}`); }
