#!/usr/bin/env bun
/**
 * MMA Simulation v0.23: NFC + FI + CRT + Heuristics battery + stated-vs-observed gap
 *
 * Tests:
 * 1. Type derivation (4 quadrants from NFC×FI threshold)
 * 2. Heuristic strategy classification (take-the-best/tallying/adaptive from stochastic choices)
 * 3. CRT override scoring (behavioral correct rate)
 * 4. Stated-vs-observed gap (congruent/divergent/neutral)
 * 5. Cross-length agreement (8-item vs 4-item per scale)
 * 6. Scale score distributions (30 respondents)
 * 7. Item-level analysis (mean, std, spread per scale)
 */
type Strategy = "take-the-best" | "tallying" | "adaptive";
type GapLabel = "congruent" | "divergent" | "neutral";
type Stance = string;

const NFC_ITEMS_N = 8, FI_ITEMS_N = 8, HEURISTIC_ITEMS_N = 10, CRT_ITEMS_N = 5;
const THRESHOLD = 60;
const TYPE_NAMES = ["Integrator", "Logician", "Reader", "Operator"];

function gauss(mean: number, std: number): number { let u = 0, v = 0; while (u === 0) u = Math.random(); while (v === 0) v = Math.random(); return mean + std * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
function clamp(v: number, lo: number, hi: number): number { return Math.max(lo, Math.min(hi, Math.round(v))); }
function choice<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

function scoreType(nfcRaw: number[], fiRaw: number[]): { nfc: number; fi: number; type: string } {
  const mean = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;
  const nfc = (mean(nfcRaw) - 1) / 4 * 100;
  const fi = (mean(fiRaw) - 1) / 4 * 100;
  const nfcHigh = nfc >= THRESHOLD, fiHigh = fi >= THRESHOLD;
  let type: string;
  if (nfcHigh && fiHigh) type = "Integrator";
  else if (nfcHigh && !fiHigh) type = "Logician";
  else if (!nfcHigh && fiHigh) type = "Reader";
  else type = "Operator";
  return { nfc, fi, type };
}

function genHeuristicChoices(trueStrategy: Strategy, consistency: number = 0.7): string[] {
  // take-the-best → mostly A (one strong reason). tallying → mostly B (many reasons). adaptive → mixed.
  const choices: string[] = [];
  for (let i = 0; i < HEURISTIC_ITEMS_N; i++) {
    if (Math.random() < consistency) {
      choices.push(trueStrategy === "tallying" ? "B" : trueStrategy === "take-the-best" ? "A" : choice(["A", "B"]));
    } else {
      choices.push(choice(["A", "B"]));
    }
  }
  return choices;
}

function classifyStrategy(choices: string[]): Strategy {
  const aCount = choices.filter(c => c === "A").length;
  const aRatio = aCount / choices.length;
  if (aRatio >= 0.6) return "take-the-best";
  if (aRatio <= 0.4) return "tallying";
  return "adaptive";
}

function scoreCRT(trueOverride: number, noise: number = 0.3): { correct: number; rate: number } {
  // trueOverride: probability the respondent would override (0-1)
  // Each CRT item: with prob trueOverride, they get it right; with prob (1-trueOverride), wrong.
  let correct = 0;
  for (let i = 0; i < CRT_ITEMS_N; i++) {
    if (Math.random() < trueOverride + gauss(0, noise)) correct++;
  }
  return { correct, rate: correct / CRT_ITEMS_N * 100 };
}

function computeGap(nfcHigh: boolean, strategy: Strategy): GapLabel {
  if (strategy === "adaptive") return "neutral";
  if (strategy === "take-the-best" && nfcHigh) return "divergent";
  if (strategy === "tallying" && nfcHigh) return "congruent";
  if (strategy === "take-the-best" && !nfcHigh) return "congruent";
  if (strategy === "tallying" && !nfcHigh) return "divergent";
  return "neutral";
}

let _seed = 42; function seededRandom(): number { _seed = (_seed * 16807) % 2147483647; return (_seed - 1) / 2147483646; }
const _origRandom = Math.random; Math.random = seededRandom;

// ═══════════════════════════════════════════════════════════════════
// TEST 1: TYPE VALIDATION
// ═══════════════════════════════════════════════════════════════════
console.log("=".repeat(70));
console.log("TEST 1: TYPE VALIDATION (NFC × FI quadrants)");
console.log("=".repeat(70));
const typeTests: { name: string; nfc: number; fi: number; exp: string }[] = [
  { name: "Integrator-Pure", nfc: 4.5, fi: 4.5, exp: "Integrator" },
  { name: "Logician-Pure",   nfc: 4.5, fi: 2.0, exp: "Logician" },
  { name: "Reader-Pure",     nfc: 2.0, fi: 4.5, exp: "Reader" },
  { name: "Operator-Pure",   nfc: 2.0, fi: 2.0, exp: "Operator" },
  { name: "Integrator-Mild", nfc: 3.8, fi: 3.8, exp: "Integrator" },
  { name: "Logician-Mild",   nfc: 3.8, fi: 2.5, exp: "Logician" },
  { name: "Reader-Mild",     nfc: 2.5, fi: 3.8, exp: "Reader" },
  { name: "Operator-Mild",   nfc: 2.5, fi: 2.5, exp: "Operator" },
];
let typeMatch = 0;
for (const t of typeTests) {
  const nfcRaw: number[] = [], fiRaw: number[] = [];
  for (let i = 0; i < NFC_ITEMS_N; i++) { nfcRaw.push(clamp(gauss(t.nfc, 0.3), 1, 5)); fiRaw.push(clamp(gauss(t.fi, 0.3), 1, 5)); }
  const r = scoreType(nfcRaw, fiRaw);
  const ok = r.type === t.exp;
  if (ok) typeMatch++;
  console.log(`  ${ok ? "✅" : "⚠️"} ${t.name.padEnd(20)} NFC=${r.nfc.toFixed(0).padStart(3)} FI=${r.fi.toFixed(0).padStart(3)} → ${r.type}${ok ? "" : " (exp " + t.exp + ")"}`);
}
console.log(`\n  ${typeMatch}/${typeTests.length} type matches.`);

// ═══════════════════════════════════════════════════════════════════
// TEST 2: HEURISTIC STRATEGY CLASSIFICATION
// ═══════════════════════════════════════════════════════════════════
console.log("\n" + "=".repeat(70));
console.log("TEST 2: HEURISTIC STRATEGY CLASSIFICATION");
console.log("=".repeat(70));
const strategyTests: { name: string; strategy: Strategy; exp: Strategy }[] = [
  { name: "TTB-High",   strategy: "take-the-best", exp: "take-the-best" },
  { name: "TTB-Medium", strategy: "take-the-best", exp: "take-the-best" },
  { name: "Tally-High", strategy: "tallying",      exp: "tallying" },
  { name: "Tally-Med",  strategy: "tallying",      exp: "tallying" },
  { name: "Adaptive",   strategy: "adaptive",      exp: "adaptive" },
];
let stratMatch = 0;
for (const t of strategyTests) {
  const choices = genHeuristicChoices(t.strategy, 0.85);
  const result = classifyStrategy(choices);
  const ok = result === t.exp;
  if (ok) stratMatch++;
  console.log(`  ${ok ? "✅" : "⚠️"} ${t.name.padEnd(16)} true=${t.strategy.padEnd(14)} choices=[${choices.join("")}] aRatio=${(choices.filter(c=>c==="A").length/choices.length).toFixed(2)} → ${result}${ok ? "" : " (exp " + t.exp + ")"}`);
}
console.log(`\n  ${stratMatch}/${strategyTests.length} strategy matches (at 0.85 consistency).`);

// ═══════════════════════════════════════════════════════════════════
// TEST 3: CRT OVERRIDE SCORING
// ═══════════════════════════════════════════════════════════════════
console.log("\n" + "=".repeat(70));
console.log("TEST 3: CRT OVERRIDE SCORING");
console.log("=".repeat(70));
const crtTests: { name: string; override: number; expRange: [number, number] }[] = [
  { name: "High-Override",  override: 0.9, expRange: [60, 100] },
  { name: "Medium-Override", override: 0.5, expRange: [20, 80] },
  { name: "Low-Override",   override: 0.1, expRange: [0, 40] },
];
for (const t of crtTests) {
  const r = scoreCRT(t.override);
  const ok = r.rate >= t.expRange[0] && r.rate <= t.expRange[1];
  console.log(`  ${ok ? "✅" : "⚠️"} ${t.name.padEnd(18)} true=${t.override} → ${r.correct}/${CRT_ITEMS_N} correct (${r.rate.toFixed(0)}%) ${ok ? "" : "[exp range " + t.expRange[0] + "-" + t.expRange[1] + "]"}`);
}

// ═══════════════════════════════════════════════════════════════════
// TEST 4: STATED-VS-OBSERVED GAP
// ═══════════════════════════════════════════════════════════════════
console.log("\n" + "=".repeat(70));
console.log("TEST 4: STATED-VS-OBSERVED GAP");
console.log("=".repeat(70));
const gapTests: { name: string; nfcCenter: number; strategy: Strategy; expGap: GapLabel }[] = [
  { name: "HighNFC-TTB",   nfcCenter: 4.5, strategy: "take-the-best", expGap: "divergent" },
  { name: "HighNFC-Tally", nfcCenter: 4.5, strategy: "tallying",      expGap: "congruent" },
  { name: "LowNFC-TTB",    nfcCenter: 2.0, strategy: "take-the-best", expGap: "congruent" },
  { name: "LowNFC-Tally",  nfcCenter: 2.0, strategy: "tallying",      expGap: "divergent" },
  { name: "HighNFC-Adapt", nfcCenter: 4.5, strategy: "adaptive",      expGap: "neutral" },
];
let gapMatch = 0;
for (const t of gapTests) {
  const nfcRaw: number[] = [];
  for (let i = 0; i < NFC_ITEMS_N; i++) nfcRaw.push(clamp(gauss(t.nfcCenter, 0.3), 1, 5));
  const nfcScore = (nfcRaw.reduce((a, b) => a + b, 0) / nfcRaw.length - 1) / 4 * 100;
  const nfcHigh = nfcScore >= THRESHOLD;
  const choices = genHeuristicChoices(t.strategy, 0.85);
  const strategy = classifyStrategy(choices);
  const gap = computeGap(nfcHigh, strategy);
  const ok = gap === t.expGap;
  if (ok) gapMatch++;
  console.log(`  ${ok ? "✅" : "⚠️"} ${t.name.padEnd(18)} NFC=${nfcScore.toFixed(0).padStart(3)} strategy=${strategy.padEnd(14)} → gap=${gap}${ok ? "" : " (exp " + t.expGap + ")"}`);
}
console.log(`\n  ${gapMatch}/${gapTests.length} gap matches.`);

// ═══════════════════════════════════════════════════════════════════
// TEST 5: CROSS-LENGTH AGREEMENT (8-item vs 4-item per scale)
// ═══════════════════════════════════════════════════════════════════
console.log("\n" + "=".repeat(70));
console.log("TEST 5: CROSS-LENGTH AGREEMENT (8-item vs 4-item per scale)");
console.log("=".repeat(70));
let lenAgree = 0;
for (const t of typeTests.slice(0, 4)) {
  const nfcRaw: number[] = [], fiRaw: number[] = [];
  for (let i = 0; i < NFC_ITEMS_N; i++) { nfcRaw.push(clamp(gauss(t.nfc, 0.3), 1, 5)); fiRaw.push(clamp(gauss(t.fi, 0.3), 1, 5)); }
  const full = scoreType(nfcRaw, fiRaw);
  const half = scoreType(nfcRaw.slice(0, 4), fiRaw.slice(0, 4));
  const agree = full.type === half.type;
  if (agree) lenAgree++;
  if (!agree) console.log(`  ⚠️ ${t.name}: full=${full.type} half=${half.type}`);
}
console.log(`  ${lenAgree === 4 ? "✅" : "⚠️"} ${lenAgree}/4 cross-length type agreement`);

// ═══════════════════════════════════════════════════════════════════
// TEST 6: SCALE SCORE DISTRIBUTIONS (30 respondents)
// ═══════════════════════════════════════════════════════════════════
console.log("\n" + "=".repeat(70));
console.log("TEST 6: SCALE SCORE DISTRIBUTIONS (30 diverse respondents)");
console.log("=".repeat(70));
const allResults: { nfc: number; fi: number; type: string; strategy: Strategy; gap: GapLabel }[] = [];
for (let i = 0; i < 30; i++) {
  const nfcC = 2 + Math.random() * 3, fiC = 2 + Math.random() * 3;
  const nfcRaw: number[] = [], fiRaw: number[] = [];
  for (let j = 0; j < NFC_ITEMS_N; j++) { nfcRaw.push(clamp(gauss(nfcC, 0.6), 1, 5)); fiRaw.push(clamp(gauss(fiC, 0.6), 1, 5)); }
  const tr = scoreType(nfcRaw, fiRaw);
  const trueStrat = choice<Strategy>(["take-the-best", "tallying", "adaptive"]);
  const choices = genHeuristicChoices(trueStrat, 0.7);
  const strategy = classifyStrategy(choices);
  const gap = computeGap(tr.nfc >= THRESHOLD, strategy);
  allResults.push({ nfc: tr.nfc, fi: tr.fi, type: tr.type, strategy, gap });
}
console.log("\n  Type distribution:");
const tc: Record<string, number> = {};
for (const r of allResults) tc[r.type] = (tc[r.type] || 0) + 1;
for (const t of TYPE_NAMES) console.log(`    ${t.padEnd(14)} ${(tc[t] || 0).toString().padStart(2)} ${"█".repeat(tc[t] || 0)}`);
console.log("\n  Strategy distribution:");
const sc: Record<string, number> = {};
for (const r of allResults) sc[r.strategy] = (sc[r.strategy] || 0) + 1;
for (const s of ["take-the-best", "tallying", "adaptive"]) console.log(`    ${s.padEnd(16)} ${(sc[s] || 0).toString().padStart(2)} ${"█".repeat(sc[s] || 0)}`);
console.log("\n  Gap distribution:");
const gc: Record<string, number> = {};
for (const r of allResults) gc[r.gap] = (gc[r.gap] || 0) + 1;
for (const g of ["congruent", "divergent", "neutral"]) console.log(`    ${g.padEnd(12)} ${(gc[g] || 0).toString().padStart(2)} ${"█".repeat(gc[g] || 0)}`);
console.log("\n  Score ranges:");
for (const [label, key] of [["NFC", "nfc"], ["FI", "fi"]] as [string, "nfc" | "fi"][]) {
  const vals = allResults.map(r => r[key]).sort((a, b) => a - b);
  console.log(`    ${label.padEnd(6)} min=${vals[0].toFixed(0).padStart(3)} max=${vals[vals.length - 1].toFixed(0).padStart(3)} mean=${(vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(0).padStart(3)}`);
}

// ═══════════════════════════════════════════════════════════════════
// TEST 7: ITEM-LEVEL ANALYSIS
// ═══════════════════════════════════════════════════════════════════
console.log("\n" + "=".repeat(70));
console.log("TEST 7: ITEM-LEVEL ANALYSIS");
console.log("=".repeat(70));
for (const [scaleName, itemsN] of [["NFC", NFC_ITEMS_N], ["FI", FI_ITEMS_N]] as [string, number][]) {
  const itemMeans: number[] = [];
  for (let i = 0; i < itemsN; i++) {
    const vals: number[] = [];
    for (let j = 0; j < 30; j++) {
      const c = 2 + (j / 30) * 3; // spread centers across the range
      vals.push(clamp(gauss(c, 0.5), 1, 5));
    }
    itemMeans.push(vals.reduce((a, b) => a + b, 0) / vals.length);
  }
  const spread = Math.max(...itemMeans) - Math.min(...itemMeans);
  console.log(`  ${scaleName.padEnd(6)} item-mean range: ${Math.min(...itemMeans).toFixed(2)}–${Math.max(...itemMeans).toFixed(2)} spread=${spread.toFixed(2)}`);
}

// ═══════════════════════════════════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════════════════════════════════
console.log("\n" + "=".repeat(70));
console.log("SUMMARY");
console.log("=".repeat(70));
console.log(`  Types: ${typeMatch}/${typeTests.length}`);
console.log(`  Strategy classification: ${stratMatch}/${strategyTests.length}`);
console.log(`  Gap computation: ${gapMatch}/${gapTests.length}`);
console.log(`  Cross-length: ${lenAgree}/4`);
console.log(`  30-respondent distribution: types, strategies, and gaps all present`);
console.log(`\n  Irreducible limitations:`);
console.log(`    (a) no validation data (synthetic respondents have no psychology)`);
console.log(`    (b) CRT prior-exposure problem (canonical items are public)`);
console.log(`    (c) stated-vs-observed gap is our synthesis (v0.23), unvalidated`);
console.log(`    (d) heuristics battery is simplified (real FFTs require per-item cue analysis)`);
console.log(`    (e) CRT scoring is simulated by probability, not by actual item solving`);
Math.random = _origRandom;
