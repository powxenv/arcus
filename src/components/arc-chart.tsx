import { useMemo } from "react";
import type { AssessmentResult } from "../lib/scoring";

// Arcus result visualization. Two faithful chart modes share one visual
// language (thin neutral axes, a single accent mark, soft accent fill):
//
//  • Circumplex tests (Solstice, Pride) plot the real two-axis position from
//    geometry.angleDeg + prototypicality, with a rotational sweep showing the
//    trajectory/commitment direction — the cycle you sit in and how it's turning.
//  • Dimensional tests (Turing, Passage) draw a radar polygon whose silhouette
//    IS "the shape they make together", with a directional lean from the
//    stance/strategy modifier.
//
// The data is taken straight from scoring.ts; nothing here is invented. If a
// result lacks the data a mode needs, the chart stays out of the way.

const ACCENT = "var(--accent)";
const ACCENT_SOFT = "var(--accent)";
const AXIS = "var(--default-200)";
const AXIS_STRONG = "var(--default-300)";
const LABEL = "var(--default-400)";
const LABEL_STRONG = "var(--default-500)";

// Plot box: a 280×280 viewBox with a 30px margin so end-labels never clip.
const VB = 280;
const M = 30;
const P0 = M; // plot origin
const P1 = VB - M; // plot far edge
const C = VB / 2; // center (140)
const HALF = (P1 - P0) / 2; // half plot width (110)

// Map an axis value (0–100) to a plot coordinate.
const xOf = (v: number) => P0 + (v / 100) * (P1 - P0);
// Screen y is inverted: a high B value sits at the top.
const yOf = (v: number) => P1 - (v / 100) * (P1 - P0);

// A rotational direction for the circumplex sweep, derived from the modifier.
// positive = clockwise (gathering / waxing / committed), negative = winding
// down, 0 = steady / open.
function sweepSign(result: AssessmentResult): number {
  const v = result.modifier?.value;
  switch (result.assessmentKey) {
    case "solstice":
      return v === "waxing" ? 1 : v === "waning" ? -1 : 0;
    case "pride":
      return v === "committed" ? 1 : v === "exploring" ? -1 : 0;
    default:
      return 0;
  }
}

const POLAR = (deg: number, r: number) => {
  const rad = (deg * Math.PI) / 180;
  return { x: C + r * Math.cos(rad), y: C + r * Math.sin(rad) };
};

// ---------------------------------------------------------------------------
// Circumplex field — Solstice & Pride
// ---------------------------------------------------------------------------

type Quad = {
  // position in the 2×2 grid, normalized -1..1 on each axis, used to anchor
  // the corner label.
  ax: 1 | -1;
  ay: 1 | -1;
  name: string;
};

const CIRCUMPLEX: Record<
  string,
  { axisA: string; axisB: string; quads: Quad[] }
> = {
  solstice: {
    axisA: "Solar Height",
    axisB: "Tidal Direction",
    quads: [
      { ax: 1, ay: 1, name: "Summer" },
      { ax: 1, ay: -1, name: "Autumn" },
      { ax: -1, ay: -1, name: "Winter" },
      { ax: -1, ay: 1, name: "Spring" },
    ],
  },
  pride: {
    axisA: "Identity Clarity",
    axisB: "Self-Alignment",
    quads: [
      { ax: 1, ay: 1, name: "The Beacon" },
      { ax: 1, ay: -1, name: "The Prism" },
      { ax: -1, ay: -1, name: "The Aurora" },
      { ax: -1, ay: 1, name: "The Ember" },
    ],
  },
};

function CircumplexField({
  result,
  compact = false,
}: {
  result: AssessmentResult;
  compact?: boolean;
}) {
  const spec = CIRCUMPLEX[result.assessmentKey];
  const g = result.geometry;
  const aScore = result.scores.find((s) => s.role === "axis" && s.key === "A");
  const bScore = result.scores.find((s) => s.role === "axis" && s.key === "B");
  // Fall back to geometry-derived position if axis scores are absent.
  const aVal = aScore?.value ?? 50;
  const bVal = bScore?.value ?? 50;

  const px = xOf(aVal);
  const py = yOf(bVal);

  // Boundary ring: the prototypicality threshold below which a result sits
  // "between types". MAX_DIST in scoring maps to the half-diagonal of the plot.
  const halfDiag = HALF * Math.SQRT2;
  const boundaryR = 0.28 * halfDiag;

  // Directional sweep: an arc segment of the circle through the point, centred
  // on the field origin. Its rotation encodes the modifier; its length scales
  // with how clearly the type fits (prototypicality).
  const sign = sweepSign(result);
  const radial = Math.hypot(px - C, py - C);
  const baseAngle = Math.atan2(py - C, px - C);
  const span = (0.5 + 0.5 * (g?.prototypicality ?? 0.5)) * 0.9; // radians, 0.45–0.9
  const sweep = useMemo(() => {
    if (sign === 0 || radial < 6) return null;
    const a0 = baseAngle - (sign > 0 ? 0 : span);
    const a1 = a0 + span;
    const s = POLAR((a0 * 180) / Math.PI, radial);
    const e = POLAR((a1 * 180) / Math.PI, radial);
    // sweep-flag: sign>0 draws clockwise in screen space.
    const largeArc = span > Math.PI ? 1 : 0;
    return { d: `M ${s.x} ${s.y} A ${radial} ${radial} 0 ${largeArc} ${sign > 0 ? 1 : 0} ${e.x} ${e.y}`, end: e, sign };
  }, [sign, radial, baseAngle, span]);

  const r = compact ? 3.5 : 5;

  return (
    <svg viewBox={`0 0 ${VB} ${VB}`} className="h-auto w-full" role="img" aria-label={`${result.assessmentKey} position chart`}>
      {/* boundary ring */}
      <circle cx={C} cy={C} r={boundaryR} fill="none" stroke={AXIS} strokeWidth={1} strokeDasharray="3 5" opacity={0.7} />

      {/* axes */}
      <line x1={P0} y1={C} x2={P1} y2={C} stroke={AXIS} strokeWidth={1} />
      <line x1={C} y1={P0} x2={C} y2={P1} stroke={AXIS} strokeWidth={1} />
      {/* subtle origin tick */}
      <circle cx={C} cy={C} r={1.5} fill={AXIS_STRONG} />

      {!compact ? (
        <>
          {/* axis end-labels */}
          <text x={P1 + 2} y={C + 4} textAnchor="start" fontSize={9} fill={LABEL_STRONG} className="font-medium">
            {spec.axisA} →
          </text>
          <text x={C} y={P0 - 6} textAnchor="middle" fontSize={9} fill={LABEL_STRONG} className="font-medium">
            {spec.axisB} ↑
          </text>
          {/* quadrant corner labels */}
          {spec.quads.map((q) => {
            const qx = C + q.ax * (HALF * 0.62);
            const qy = C - q.ay * (HALF * 0.62);
            return (
              <text key={q.name} x={qx} y={qy} textAnchor="middle" fontSize={8.5} fill={LABEL} className="font-medium">
                {q.name}
              </text>
            );
          })}
        </>
      ) : null}

      {/* soft halo behind the point */}
      <circle cx={px} cy={py} r={r * 3.4} fill={ACCENT_SOFT} fillOpacity={0.12} />
      <circle cx={px} cy={py} r={r * 2} fill={ACCENT_SOFT} fillOpacity={0.18} />

      {/* directional sweep */}
      {sweep ? (
        <>
          <path d={sweep.d} fill="none" stroke={ACCENT} strokeWidth={2} strokeLinecap="round" opacity={0.85} />
          {/* arrowhead */}
          <ArrowHead at={sweep.end} sign={sweep.sign} baseAngle={baseAngle + (sweep.sign > 0 ? span : 0)} />
        </>
      ) : null}

      {/* the position point */}
      <circle cx={px} cy={py} r={r} fill={ACCENT} />
      <circle cx={px} cy={py} r={r} fill="none" stroke="var(--background)" strokeWidth={1.5} />
    </svg>
  );
}

function ArrowHead({
  at,
  sign,
  baseAngle,
}: {
  at: { x: number; y: number };
  sign: number;
  baseAngle: number;
}) {
  // tangent direction at the arc end
  const tangentDeg = ((baseAngle + (sign > 0 ? Math.PI / 2 : -Math.PI / 2)) * 180) / Math.PI;
  const tip = POLAR(tangentDeg, 5.5);
  const left = POLAR(tangentDeg + 150, 4.5);
  const right = POLAR(tangentDeg - 150, 4.5);
  return (
    <polygon
      points={`${at.x + tip.x - C},${at.y + tip.y - C} ${at.x + left.x - C},${at.y + left.y - C} ${at.x + right.x - C},${at.y + right.y - C}`}
      fill={ACCENT}
    />
  );
}

// ---------------------------------------------------------------------------
// Dimension radar — Turing & Passage
// ---------------------------------------------------------------------------

function DimensionRadar({
  result,
  compact = false,
}: {
  result: AssessmentResult;
  compact?: boolean;
}) {
  const dims = result.scores;
  const n = dims.length;
  const R = HALF;
  const angles = dims.map((_, i) => -90 + (i * 360) / n);

  const ringLevels = [0.25, 0.5, 0.75, 1];

  // polygon vertices
  const verts = dims.map((d, i) => POLAR(angles[i], (d.value / 100) * R));
  const polyPath = verts.map((v, i) => `${i === 0 ? "M" : "L"} ${v.x} ${v.y}`).join(" ") + " Z";

  // directional lean: a faint ghost of a "balanced" reference so the shape's
  // asymmetry is legible. (kept very quiet)
  const stance = result.modifier?.value;
  const stanceLabel =
    result.assessmentKey === "passage"
      ? stance === "gift"
        ? "receives time"
        : stance === "resource"
          ? "spends time"
          : stance === "weight"
            ? "carries time"
            : "dwells in time"
      : result.assessmentKey === "turing"
        ? stance === "take-the-best"
          ? "one strong reason"
          : stance === "tallying"
            ? "weighs many reasons"
            : "shifts between"
        : null;

  return (
    <svg viewBox={`0 0 ${VB} ${VB}`} className="h-auto w-full" role="img" aria-label={`${result.assessmentKey} dimension chart`}>
      {/* reference rings */}
      {ringLevels.map((lv) => {
        const pts = angles
          .map((a) => {
            const p = POLAR(a, lv * R);
            return `${p.x},${p.y}`;
          })
          .join(" ");
        return (
          <polygon key={lv} points={pts} fill="none" stroke={AXIS} strokeWidth={1} opacity={lv === 0.5 ? 0.9 : 0.6} />
        );
      })}

      {/* axis spokes */}
      {angles.map((a, i) => {
        const tip = POLAR(a, R);
        return <line key={i} x1={C} y1={C} x2={tip.x} y2={tip.y} stroke={AXIS} strokeWidth={1} />;
      })}

      {/* the shape they make together */}
      <path d={polyPath} fill={ACCENT_SOFT} fillOpacity={0.14} stroke={ACCENT} strokeWidth={2} strokeLinejoin="round" />

      {/* vertices */}
      {verts.map((v, i) => (
        <circle key={i} cx={v.x} cy={v.y} r={compact ? 2.5 : 3.5} fill={ACCENT} />
      ))}

      {!compact ? (
        <>
          {/* axis labels */}
          {dims.map((d, i) => {
            const p = POLAR(angles[i], R + 14);
            const anchor = Math.abs(p.x - C) < 8 ? "middle" : p.x > C ? "start" : "end";
            return (
              <text key={d.key} x={p.x} y={p.y + 3} textAnchor={anchor} fontSize={9} fill={LABEL_STRONG} className="font-medium">
                {shortLabel(d.label)}
              </text>
            );
          })}
          {stanceLabel ? (
            <text x={C} y={VB - 4} textAnchor="middle" fontSize={8.5} fill={LABEL}>
              {stanceLabel}
            </text>
          ) : null}
        </>
      ) : null}
    </svg>
  );
}

function shortLabel(label: string): string {
  return label.replace("Need for Cognition", "Cognition").replace("Faith in Intuition", "Intuition");
}

// ---------------------------------------------------------------------------
// Dispatcher
// ---------------------------------------------------------------------------

export function ArcChart({
  result,
  compact = false,
}: {
  result: AssessmentResult;
  compact?: boolean;
}) {
  if (result.assessmentKey === "solstice" || result.assessmentKey === "pride") {
    return <CircumplexField result={result} compact={compact} />;
  }
  if (result.scores.length >= 3) {
    return <DimensionRadar result={result} compact={compact} />;
  }
  return null;
}

// Full Arc: four mini charts in a grid.
export function ArcChartGrid({ result }: { result: AssessmentResult }) {
  const comps = result.components;
  if (!comps || comps.length === 0) return <ArcChart result={result} />;
  return (
    <div className="grid grid-cols-2 gap-3">
      {comps.map((c) => (
        <div key={c.assessmentKey} className="flex flex-col items-center gap-1">
          <ArcChart result={c} compact />
          <span className="text-xs text-default-500 font-medium">
            {c.emoji} {c.type}
          </span>
        </div>
      ))}
    </div>
  );
}
