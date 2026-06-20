#!/usr/bin/env bun
/**
 * SSA Simulation & Analysis Script (TypeScript / Bun)
 */
type FacetId = "A1" | "A2" | "B1" | "B2"; type AxisId = "A" | "B";
interface Item { id: string; facet: FacetId; poleA: string; poleB: string; }
interface FacetResult { norms: number[]; sum: number; mean: number; score: number; variance: number; }
interface AxisResult { score: number; }
interface FacetContrib { dominant: string; s1: number; s2: number; d1: number; d2: number; }
interface ScoreResult { name: string; raw: number[]; normalized: number[]; facets: Record<FacetId, FacetResult>; axis: Record<AxisId, AxisResult>; a_off: number; b_off: number; distance: number; prototypicality: number; angle_deg: number; angle_in_quad: number; quadrant: number; quadrant_name: string; gradation: string; is_near_center: boolean; is_threshold: boolean; has_tension: boolean; result_type: string; contrib: Record<AxisId, FacetContrib>; facet_consistency: Record<FacetId, number>; commitment_score: number; commitment_label: string; _orient: number[]; }

const ITEMS: Item[] = [
  { id: "A1.1", facet: "A1", poleA: "Can give a clear and confident answer.", poleB: "Struggle to find the right words: I'm still figuring it out." },
  { id: "A1.2", facet: "A1", poleA: "Something I've thought about a lot and know well.", poleB: "Something I haven't fully sorted out yet." },
  { id: "A1.3", facet: "A1", poleA: "You know what those values are and what they call for.", poleB: "You're not always sure what you actually believe." },
  { id: "A1.4", facet: "A1", poleA: "It feels like familiar territory. I can navigate it.", poleB: "It feels like unfamiliar territory: I'm still mapping it." },
  { id: "A1.5", facet: "A1", poleA: "I can name them without hesitation.", poleB: "I'm still figuring out what I'm drawn to." },
  { id: "A1.6", facet: "A1", poleA: "I have a pretty clear picture.", poleB: "I'm still discovering them." },
  { id: "A1.7", facet: "A1", poleA: "I have a clear sense of where I am and where I'm headed.", poleB: "It raises more questions than answers: I'm still finding my way." },
  { id: "A1.8", facet: "A1", poleA: "Well-defined. I know myself.", poleB: "In progress. I'm still becoming." },
  { id: "A2.1", facet: "A2", poleA: "Is pretty stable from day to day.", poleB: "Changes depending on what's happening." },
  { id: "A2.2", facet: "A2", poleA: "Feel like they belong together.", poleB: "Don't always feel like they fit into one person." },
  { id: "A2.3", facet: "A2", poleA: "I still see the same core person.", poleB: "I almost feel like a different person." },
  { id: "A2.4", facet: "A2", poleA: "My view of myself stays solid: I know what I think.", poleB: "I start to question whether I really know myself." },
  { id: "A2.5", facet: "A2", poleA: "Tend to stay consistent over time.", poleB: "Change more often than you'd expect." },
  { id: "A2.6", facet: "A2", poleA: "They feel like different versions of the same person.", poleB: "They almost feel like two different people." },
  { id: "A2.7", facet: "A2", poleA: "There's a pretty close match.", poleB: "There's often a gap." },
  { id: "A2.8", facet: "A2", poleA: "Is clear and doesn't waver much.", poleB: "Can shift depending on my mood or situation." },
  { id: "B1.1", facet: "B1", poleA: "Act the same way you feel inside.", poleB: "Adjust your behavior to fit what the situation seems to call for." },
  { id: "B1.2", facet: "B1", poleA: "The same as who I am in private.", poleB: "A version of me, not the whole picture." },
  { id: "B1.3", facet: "B1", poleA: "You stay true to what matters to you.", poleB: "You adapt to what the situation requires." },
  { id: "B1.4", facet: "B1", poleA: "Feels right: I'd rather stand by what I believe.", poleB: "Is a real tension: belonging matters too." },
  { id: "B1.5", facet: "B1", poleA: "I'm fundamentally the same person with all of them.", poleB: "Different sides of me show up in each one." },
  { id: "B1.6", facet: "B1", poleA: "Accurately reflects what I'm feeling on the inside.", poleB: "Is often different from what I'm actually feeling." },
  { id: "B1.7", facet: "B1", poleA: "Is something I do rarely: I prefer to follow my own path.", poleB: "Is something I do often: it keeps things smooth." },
  { id: "B1.8", facet: "B1", poleA: "Comes naturally to me.", poleB: "Takes effort: there's a cost to standing out." },
  { id: "B2.1", facet: "B2", poleA: "Share your real thoughts and feelings openly.", poleB: "Hold some things back to avoid conflict or judgment." },
  { id: "B2.2", facet: "B2", poleA: "What you see is what you get.", poleB: "There's more to me than most people see." },
  { id: "B2.3", facet: "B2", poleA: "Comes naturally to me.", poleB: "Feels risky: I'm selective about what I share." },
  { id: "B2.4", facet: "B2", poleA: "Express what you truly think, even if it might upset them.", poleB: "Tend to say what will keep the peace." },
  { id: "B2.5", facet: "B2", poleA: "People see more of who I really am: I gradually open up.", poleB: "I tend to show myself the same way from the start." },
  { id: "B2.6", facet: "B2", poleA: "Let them in and show your real self.", poleB: "Keep some distance: it's safer that way." },
  { id: "B2.7", facet: "B2", poleA: "I lean into it: deeper honesty is part of closeness.", poleB: "I move carefully: there are some things I keep to myself." },
  { id: "B2.8", facet: "B2", poleA: "Be fully known, even if it's messy.", poleB: "Keep certain parts of yourself private." },
  { id: "C1", facet: "C", poleA: "I know, and I've claimed it.", poleB: "I'm still figuring it out." },
  { id: "C2", facet: "C", poleA: "Settled. I've arrived.", poleB: "Open. I'm still becoming." },
  { id: "C3", facet: "C", poleA: "I can answer without hesitation.", poleB: "I hesitate." },
  { id: "C4", facet: "C", poleA: "Fully committed.", poleB: "Not yet committed." },
];

const FACETS: FacetId[] = ["A1", "A2", "B1", "B2"];
const FACET_NAMES: Record<FacetId, string> = { A1: "Self-Knowledge", A2: "Self-Consistency", B1: "Authentic Living", B2: "Relational Authenticity" };
const AXIS_OF: Record<FacetId, AxisId> = { A1: "A", A2: "A", B1: "B", B2: "B" };
const AXIS_NAMES: Record<AxisId, string> = { A: "Identity Clarity", B: "Self-Alignment" };
const QUADRANT_NAMES = ["Beacon", "Prism", "Aurora", "Ember"];
const TENSION_MARGIN = 20;
const FACET_ITEMS: Record<FacetId, number[]> = {} as any; for (const f of FACETS) FACET_ITEMS[f] = []; ITEMS.forEach((item, i) => { if (FACET_ITEMS[item.facet]) FACET_ITEMS[item.facet].push(i); });
const SSA16_IDS = new Set(["A1.1", "A1.2", "A1.4", "A1.8", "A2.1", "A2.3", "A2.5", "A2.8", "B1.1", "B1.2", "B1.3", "B1.6", "B2.1", "B2.3", "B2.6", "B2.8"]);
const SSA16_INDICES = ITEMS.map((it, i) => SSA16_IDS.has(it.id) ? i : -1).filter(i => i >= 0);
const FACET_ITEMS_16: Record<FacetId, number[]> = {} as any; for (const f of FACETS) FACET_ITEMS_16[f] = FACET_ITEMS[f].filter(i => SSA16_IDS.has(ITEMS[i].id));

function clamp(v: number, lo: number, hi: number): number { return Math.max(lo, Math.min(hi, Math.round(v))); }
function gauss(mean: number, std: number): number { let u = 0, v = 0; while (u === 0) u = Math.random(); while (v === 0) v = Math.random(); return mean + std * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
function choice<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

function score(rawResponses: number[], orientations?: number[], activeIdxs?: number[]): ScoreResult {
  const ori = orientations ?? new Array(ITEMS.length).fill(1);
  const normalized: number[] = []; for (let i = 0; i < ITEMS.length; i++) normalized.push(ori[i] === 1 ? rawResponses[i] : 8 - rawResponses[i]);
  const localFacetMap: Record<FacetId, number[]> = {} as any; for (const f of FACETS) localFacetMap[f] = (activeIdxs ? FACET_ITEMS_16 : FACET_ITEMS)[f];
  const facets = {} as Record<FacetId, FacetResult>;
  for (const facet of FACETS) { const fIdxs = localFacetMap[facet], norms = fIdxs.map(i => normalized[i]), sum = norms.reduce((a, b) => a + b, 0), n = fIdxs.length, mean = sum / n, scoreVal = (mean - 1) / 6 * 100, variance = norms.reduce((a, x) => a + (x - mean) ** 2, 0) / n; facets[facet] = { norms, sum, mean, score: scoreVal, variance }; }
  const axis = { A: { score: (facets.A1.score + facets.A2.score) / 2 }, B: { score: (facets.B1.score + facets.B2.score) / 2 } };
  const a_off = axis.A.score - 50, b_off = axis.B.score - 50, MAX_DIST = Math.sqrt(50 * 50 + 50 * 50), distance = Math.sqrt(a_off * a_off + b_off * b_off), prototypicality = distance / MAX_DIST;
  const angle_rad = Math.atan2(b_off, a_off); let angle_deg = angle_rad * 180 / Math.PI; if (angle_deg < 0) angle_deg += 360;
  let quadrant: number; if (a_off >= 0 && b_off >= 0) quadrant = 0; else if (a_off >= 0 && b_off < 0) quadrant = 1; else if (a_off < 0 && b_off < 0) quadrant = 2; else quadrant = 3;
  const QUAD_ENTRY_EDGE = [90, 0, 270, 180], entry_edge = QUAD_ENTRY_EDGE[quadrant], progress = (entry_edge - angle_deg + 360) % 360;
  if (progress > 90) throw new Error(`Gradation error: ${QUADRANT_NAMES[quadrant]} angle ${angle_deg.toFixed(2)}° → progress ${progress.toFixed(2)}°`);
  const angle_in_quad = progress; let gradation: string; if (progress < 30) gradation = "Early"; else if (progress < 60) gradation = "Mid"; else gradation = "Late";
  const is_near_center = prototypicality < 0.28;
  const tension = {} as Record<AxisId, { s1: number; s2: number; tense: boolean }>;
  (["A", "B"] as AxisId[]).forEach(ax => { const [f1, f2] = (ax === "A" ? ["A1", "A2"] : ["B1", "B2"]) as [FacetId, FacetId], s1 = facets[f1].score, s2 = facets[f2].score, o1 = s1 - 50, o2 = s2 - 50; tension[ax] = { s1, s2, tense: (o1 * o2 < 0) && Math.abs(o1) >= TENSION_MARGIN && Math.abs(o2) >= TENSION_MARGIN }; });
  const has_tension = tension.A.tense || tension.B.tense, is_threshold = is_near_center, result_type: string = is_threshold ? "Reflection" : QUADRANT_NAMES[quadrant];
  const contrib: Record<AxisId, FacetContrib> = {} as any;
  for (const [ax, [f1, f2]] of [["A", ["A1", "A2"]] as [AxisId, [FacetId, FacetId]], ["B", ["B1", "B2"]] as [AxisId, [FacetId, FacetId]]]) { const s1 = facets[f1].score, s2 = facets[f2].score, d1 = Math.abs(s1 - 50), d2 = Math.abs(s2 - 50); let dom: string; if (tension[ax].tense) dom = "tense"; else if (Math.abs(s1 - s2) < 0.01) dom = "equal"; else dom = d1 > d2 ? f1 : f2; contrib[ax] = { dominant: dom, s1, s2, d1, d2 }; }
  const facet_consistency = {} as Record<FacetId, number>; for (const f of FACETS) facet_consistency[f] = Math.sqrt(facets[f].variance);
  // v0.23 commitment scoring (Marcia)
  const cNorms = ITEMS.map((it, i) => it.facet === "C" ? normalized[i] : null).filter((x: number | null): x is number => x !== null);
  const cScore = cNorms.length > 0 ? (cNorms.reduce((a, b) => a + b, 0) / cNorms.length - 1) / 6 * 100 : 50;
  const commitment_label = cScore >= 60 ? "committed" : cScore >= 40 ? "exploring" : "open";

  return { name: "", raw: rawResponses, normalized, facets, axis, a_off, b_off, distance, prototypicality, angle_deg, angle_in_quad, quadrant, quadrant_name: QUADRANT_NAMES[quadrant], gradation, is_near_center, is_threshold, has_tension, result_type, contrib, facet_consistency, commitment_score: cScore, commitment_label, _orient: ori };
}

function gen(name: string, a1_c: number, a2_c: number, b1_c: number, b2_c: number, noise = 1.0): [string, number[], number[]] { const orient = new Array(ITEMS.length).fill(0).map(() => choice([1, -1])); const raw: number[] = []; const centers: Record<string, number> = { A1: a1_c, A2: a2_c, B1: b1_c, B2: b2_c, C: 4 }; for (let i = 0; i < ITEMS.length; i++) { const c = centers[ITEMS[i].facet] ?? 4, trait = clamp(gauss(c, noise), 1, 7); raw.push(orient[i] === 1 ? trait : (8 - trait)); } return [name, raw, orient]; }
function genExtreme(name: string, a_center: number, b_center: number): [string, number[], number[]] { return gen(name, a_center, a_center, b_center, b_center, 0.4); }
function genMixed(name: string, a1_c: number, a2_c: number, b1_c: number, b2_c: number, noise = 0.6): [string, number[], number[]] { return gen(name, a1_c, a2_c, b1_c, b2_c, noise); }
function genNoisy(name: string, a1_c: number, a2_c: number, b1_c: number, b2_c: number, noise = 2.0): [string, number[], number[]] { return gen(name, a1_c, a2_c, b1_c, b2_c, noise); }

let _seed = 42; function seededRandom(): number { _seed = (_seed * 16807) % 2147483647; return (_seed - 1) / 2147483646; } const _origRandom = Math.random; Math.random = seededRandom;
const respondents: [string, number[], number[]][] = [];
respondents.push(genExtreme("Beacon-Pure", 6.5, 6.5)); respondents.push(genExtreme("Prism-Pure", 6.5, 1.5));
respondents.push(genExtreme("Aurora-Pure", 1.5, 1.5)); respondents.push(genExtreme("Ember-Pure", 1.5, 6.5));
respondents.push(genExtreme("Beacon-Mild", 5.5, 5.5)); respondents.push(genExtreme("Prism-Mild", 5.5, 2.5));
respondents.push(genExtreme("Aurora-Mild", 2.5, 2.5)); respondents.push(genExtreme("Ember-Mild", 2.5, 5.5));
respondents.push(genExtreme("Beacon-Early", 5.8, 5.2)); respondents.push(genExtreme("Beacon-Mid", 5.5, 5.5)); respondents.push(genExtreme("Beacon-Late", 5.2, 5.8));
respondents.push(gen("Balanced-Center", 4.0, 4.0, 4.0, 4.0, 0.3)); respondents.push(gen("Balanced-Near", 4.2, 4.0, 4.1, 3.8, 0.4));
respondents.push(genMixed("Mixed-HiA1_LoA2", 6.2, 3.0, 4.0, 4.0)); respondents.push(genMixed("Mixed-LoA1_HiA2", 3.0, 6.2, 4.0, 4.0));
respondents.push(genMixed("Mixed-HiB1_LoB2", 4.0, 4.0, 6.2, 3.0)); respondents.push(genMixed("Mixed-LoB1_HiB2", 4.0, 4.0, 3.0, 6.2));
respondents.push(genMixed("Diverge-A1hiA2lo", 6.0, 2.0, 4.0, 4.0)); respondents.push(genMixed("Diverge-A1loA2hi", 2.0, 6.0, 4.0, 4.0));
respondents.push(genMixed("Diverge-B1hiB2lo", 4.0, 4.0, 6.0, 2.0)); respondents.push(genMixed("Diverge-B1loB2hi", 4.0, 4.0, 2.0, 6.0));
respondents.push(gen("Boundary-A-ClearSide", 5.5, 5.5, 4.0, 4.0, 0.3)); respondents.push(gen("Boundary-B-AlignedSide", 4.0, 4.0, 5.5, 5.5, 0.3));
respondents.push(gen("Boundary-A-DiffSide", 2.5, 2.5, 4.0, 4.0, 0.3)); respondents.push(gen("Boundary-B-OtherSide", 4.0, 4.0, 2.5, 2.5, 0.3));
respondents.push(genNoisy("Noisy-HighVar", 5.0, 5.0, 5.0, 5.0, 2.5)); respondents.push(genNoisy("Noisy-VeryHighVar", 4.0, 4.0, 4.0, 4.0, 3.0));
respondents.push(gen("Corner-Beacon", 7.0, 7.0, 7.0, 7.0, 0.1)); respondents.push(gen("Corner-Prism", 7.0, 7.0, 1.0, 1.0, 0.1));
respondents.push(gen("Corner-Aurora", 1.0, 1.0, 1.0, 1.0, 0.1)); respondents.push(gen("Corner-Ember", 1.0, 1.0, 7.0, 7.0, 0.1));
respondents.push(gen("Split-A-Boundary", 4.0, 4.0, 6.0, 6.0, 0.15)); respondents.push(gen("Split-B-Boundary", 6.0, 6.0, 4.0, 4.0, 0.15));
Math.random = _origRandom;

const results: ScoreResult[] = [], results16: ScoreResult[] = [];
for (const [name, raw, orient] of respondents) { const s = score(raw, orient); s.name = name; results.push(s); const s16 = score(raw, orient, SSA16_INDICES); s16.name = name; results16.push(s16); }

function crossLengthAnalysis(r32: ScoreResult[], r16: ScoreResult[]): void {
  console.log("=".repeat(78)); console.log("CROSS-LENGTH AGREEMENT: SSA-32 vs SSA-16"); console.log("=".repeat(78));
  let seasonAgree = 0, tensionAgree = 0, aDomAgree = 0, bDomAgree = 0; const axisAbsDiff: number[] = []; const n = r32.length;
  for (let i = 0; i < n; i++) { const a = r32[i], b = r16[i]; if (a.result_type === b.result_type) seasonAgree++; if (!!a.has_tension === !!b.has_tension) tensionAgree++; if (a.contrib.A.dominant === b.contrib.A.dominant) aDomAgree++; if (a.contrib.B.dominant === b.contrib.B.dominant) bDomAgree++; axisAbsDiff.push(Math.abs(a.axis.A.score - b.axis.A.score), Math.abs(a.axis.B.score - b.axis.B.score)); }
  const pct = (x: number) => (x / n * 100).toFixed(1) + "%", mean = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;
  console.log(`\n  Result-type (mode or Reflection): ${seasonAgree}/${n} (${pct(seasonAgree)})`);
  console.log(`  Tension modifier: ${tensionAgree}/${n} (${pct(tensionAgree)})`);
  console.log(`  Dominant facet A: ${aDomAgree}/${n} (${pct(aDomAgree)})  B: ${bDomAgree}/${n} (${pct(bDomAgree)})`);
  console.log(`  Axis shift |Δ| mean: ${mean(axisAbsDiff).toFixed(2)}  max: ${Math.max(...axisAbsDiff).toFixed(2)}`);
}
crossLengthAnalysis(results, results16); console.log();

function pad(s: string, n: number): string { return s.padEnd(n); }
function analyze(res: ScoreResult[]): void {
  console.log("=".repeat(78)); console.log("SSA SIMULATION ANALYSIS: 30+ RESPONDENTS (SSA-32)"); console.log("=".repeat(78));
  const quadCounts = new Map<string, number>(); let threshCount = 0, threshTenseCount = 0; const total = res.length;
  for (const r of res) { if (r.is_threshold) { threshCount++; if (r.has_tension) threshTenseCount++; } else quadCounts.set(r.quadrant_name, (quadCounts.get(r.quadrant_name) ?? 0) + 1); }
  console.log(`\n  Total: ${total}  |  Types: ${total - threshCount} (${((total - threshCount) / total * 100).toFixed(1)}%)  |  Reflection: ${threshCount} (${(threshCount / total * 100).toFixed(1)}%: ${threshTenseCount} tense)`);
  for (const q of QUADRANT_NAMES) console.log(`    ${pad(q, 10)}: ${(quadCounts.get(q) ?? 0).toString().padStart(2)}`);
  for (const ax of ["A", "B"] as AxisId[]) { const scores = res.map(r => r.axis[ax].score); scores.sort((a, b) => a - b); console.log(`  ${AXIS_NAMES[ax]}: min=${scores[0].toFixed(1)} max=${scores[scores.length - 1].toFixed(1)} mean=${(scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)}`); }
  for (const f of FACETS) { const scores = res.map(r => r.facets[f].score); console.log(`  ${f}: ${Math.min(...scores).toFixed(0)}–${Math.max(...scores).toFixed(0)}  mean=${(scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(0)}`); }
  const nearCenter = res.filter(r => r.is_near_center); console.log(`\n  Near-center (proto<0.28): ${nearCenter.length}`); for (const r of nearCenter) console.log(`    ${pad(r.name, 24)} A=${r.axis.A.score.toFixed(0).padStart(3)} B=${r.axis.B.score.toFixed(0).padStart(3)} → ${r.has_tension ? 'Reflection+tension' : 'Reflection'}${r.contrib.A.dominant==='tense'?' A-tense':''}${r.contrib.B.dominant==='tense'?' B-tense':''}`);
  const expectedMap: Record<string, string | null> = { "Beacon-Pure": "Beacon", "Prism-Pure": "Prism", "Aurora-Pure": "Aurora", "Ember-Pure": "Ember", "Beacon-Mild": "Beacon", "Prism-Mild": "Prism", "Aurora-Mild": "Aurora", "Ember-Mild": "Ember", "Beacon-Early": "Beacon", "Beacon-Mid": "Beacon", "Beacon-Late": "Beacon", "Balanced-Center": "Reflection", "Balanced-Near": "Reflection", "Corner-Beacon": "Beacon", "Corner-Prism": "Prism", "Corner-Aurora": "Aurora", "Corner-Ember": "Ember", "Diverge-A1hiA2lo": "Reflection", "Diverge-A1loA2hi": "Reflection", "Diverge-B1hiB2lo": "Reflection", "Diverge-B1loB2hi": "Reflection" };
  const mismatches: string[] = []; for (const r of res) { const exp = expectedMap[r.name]; if (exp !== undefined && exp !== null && exp !== r.result_type) mismatches.push(`  ${pad(r.name, 24)} expected ${exp} got ${r.result_type} (A=${r.axis.A.score.toFixed(0)} B=${r.axis.B.score.toFixed(0)})`); }
  console.log(mismatches.length ? `\n  ⚠️ Mismatches: ${mismatches.length}\n` + mismatches.join('\n') : `\n  ✅ All expected matches correct.`);
  const tensionExpected = ["Diverge-A1hiA2lo", "Diverge-A1loA2hi", "Diverge-B1hiB2lo", "Diverge-B1loB2hi"]; let tMiss = 0; for (const r of res) { if (tensionExpected.includes(r.name) && !r.has_tension) { console.log(`  ⚠️ TENSION REGRESSION: ${r.name}`); tMiss++; } } if (!tMiss) console.log(`  ✅ Tension guard passes.`);
  if (threshCount > total * 0.2) console.log(`  ⚠️ High Reflection rate: ${threshCount}/${total}.`);
  // v0.23 commitment analysis
  const commitCounts = { committed: 0, exploring: 0, open: 0 };
  for (const r of res) { if (r.commitment_label in commitCounts) commitCounts[r.commitment_label as keyof typeof commitCounts]++; }
  console.log(`\n  v0.23 Commitment distribution: committed=${commitCounts.committed} exploring=${commitCounts.exploring} open=${commitCounts.open}`);
  console.log(`  Note: existing respondents have commitment center=4 (neutral → "exploring"). Targeted tests below.`);

  // v0.23 TARGETED COMMITMENT VALIDATION
  console.log(`\n  v0.23 COMMITMENT VALIDATION (targeted non-neutral commitment):`);
  const commitTests: { name: string; c: number; exp: string }[] = [
    { name: "High-Commitment", c: 6, exp: "committed" },
    { name: "Low-Commitment",  c: 2, exp: "open" },
    { name: "Medium",           c: 4, exp: "exploring" },
    { name: "Borderline-Hi",   c: 5, exp: "committed" },
    { name: "Borderline-Lo",   c: 3, exp: "open" },
  ];
  for (const t of commitTests) {
    const orient = new Array(ITEMS.length).fill(0).map(() => choice([1, -1]));
    const raw: number[] = [];
    for (let i = 0; i < ITEMS.length; i++) {
      const c = ITEMS[i].facet === "C" ? t.c : 4;
      const trait = clamp(gauss(c, 0.3), 1, 7);
      raw.push(orient[i] === 1 ? trait : (8 - trait));
    }
    const r = score(raw, orient);
    r.name = t.name;
    const ok = r.commitment_label === t.exp;
    console.log(`    ${ok ? "✅" : "⚠️"} ${t.name.padEnd(18)} c=${t.c} → commitment=${r.commitment_score.toFixed(0)} (${r.commitment_label})${ok ? "" : " (expected " + t.exp + ")"}`);
  }

  console.log(`\n  Irreducible: (a) no validation data, (b) A1/A2 split unvalidated, (c) Unbiased Processing not captured, (d) self-report ceiling, (e) v0.23 commitment is our synthesis (Marcia grounded).`);
}
analyze(results); exportCsv(results, "ssa-sim-results.csv"); exportCsv(results16, "ssa-sim-results-16.csv");
function exportCsv(res: ScoreResult[], filename: string): void { const rows: string[][] = [["name", "A1_score", "A2_score", "A_score", "B1_score", "B2_score", "B_score", "a_off", "b_off", "distance", "prototypicality", "angle_deg", "quadrant", "gradation", "is_near_center", "has_tension", "result_type", "result_label", "facet_A_dominant", "facet_B_dominant"]]; for (const r of res) { const nc = r.is_near_center, label = r.result_type === "Reflection" ? (r.has_tension ? "Reflection+tension" : "Reflection") : `${r.gradation} ${r.quadrant_name}`; rows.push([r.name, r.facets.A1.score.toFixed(2), r.facets.A2.score.toFixed(2), r.axis.A.score.toFixed(2), r.facets.B1.score.toFixed(2), r.facets.B2.score.toFixed(2), r.axis.B.score.toFixed(2), r.a_off.toFixed(2), r.b_off.toFixed(2), r.distance.toFixed(2), r.prototypicality.toFixed(4), r.angle_deg.toFixed(2), nc ? "N/A" : r.quadrant_name, nc ? "N/A" : r.gradation, r.is_near_center ? "TRUE" : "FALSE", r.has_tension ? "TRUE" : "FALSE", r.result_type, label, r.contrib.A.dominant, r.contrib.B.dominant]); } const csv = rows.map(row => row.map(c => `"${c}"`).join(",")).join("\n"); Bun.write(filename, csv); console.log(`\n  Exported: ${filename}`); }
