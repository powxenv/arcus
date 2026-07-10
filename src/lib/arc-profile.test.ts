import { describe, it, expect } from "vitest";
import {
  computeArcProfile,
  computeConnections,
  computeFullArcResult,
  type ArcResult,
} from "./arc-profile";
import type { AssessmentResult } from "./scoring";

const res = (
  assessmentKey: string,
  type: string,
  opts?: {
    modifier?: string;
    secondary?: string;
    scores?: { key: string; label: string; value: number }[];
  },
): AssessmentResult => ({
  assessmentKey,
  type,
  emoji: "•",
  summary: "s",
  modifier: opts?.modifier ? { label: "m", value: opts.modifier } : undefined,
  secondaryModifier: opts?.secondary
    ? { label: "s", value: opts.secondary }
    : undefined,
  scores: (opts?.scores ?? []).map((s) => ({ ...s, role: "facet" })),
});

const arc = (
  assessmentKey: string,
  type: string,
  direction?: string,
  opts?: {
    secondaryDirection?: string;
    scores?: { key: string; label: string; value: number }[];
  },
): ArcResult => ({
  assessmentKey,
  type,
  emoji: "•",
  summary: "summary",
  direction,
  secondaryDirection: opts?.secondaryDirection,
  scores: opts?.scores ?? [],
});

describe("computeArcProfile", () => {
  it("returns zero arcs and no observations for empty input", () => {
    const p = computeArcProfile([]);
    expect(p.completedCount).toBe(0);
    expect(p.total).toBe(4);
    expect(p.isComplete).toBe(false);
    expect(p.arcs).toEqual([]);
    expect(p.observations).toEqual([]);
    expect(p.headline).toBe("No arcs mapped yet");
  });

  it("orders arcs canonically and ignores unknown assessment keys", () => {
    const p = computeArcProfile([
      arc("passage", "The Wayfinder", "resource"),
      arc("solstice", "Summer", "waxing"),
      arc("bogus", "Whatever"),
    ]);
    expect(p.arcs.map((a) => a.assessmentKey)).toEqual(["solstice", "passage"]);
    expect(p.completedCount).toBe(2);
    expect(p.headline).toBe("2 of 4 arcs mapped");
  });

  it("deduplicates when the same key appears twice (last wins)", () => {
    const p = computeArcProfile([
      arc("solstice", "Summer", "waxing"),
      arc("solstice", "Winter", "steady"),
    ]);
    expect(p.arcs).toHaveLength(1);
    expect(p.arcs[0].type).toBe("Winter");
  });

  it("emits the Energy × Thinking pairing only when both are present", () => {
    const p = computeArcProfile([
      arc("solstice", "Summer", "waxing"),
      arc("turing", "The Logician", "tallying"),
    ]);
    expect(p.observations).toHaveLength(1);
    expect(p.observations[0]).toContain("Energy × Thinking");
    expect(p.observations[0]).toContain("Summer");
    expect(p.observations[0]).toContain("The Logician");
  });

  it("emits all three pairings for a complete profile", () => {
    const p = computeArcProfile([
      arc("solstice", "Summer", "waxing"),
      arc("turing", "The Logician", "tallying"),
      arc("pride", "The Beacon", "committed"),
      arc("passage", "The Wayfinder", "resource"),
    ]);
    expect(p.isComplete).toBe(true);
    expect(p.completedCount).toBe(4);
    expect(p.observations).toHaveLength(3);
    const labels = p.observations.map((o) => o.split(" — ")[0]);
    expect(labels).toEqual([
      "Energy × Thinking",
      "Identity × Time",
      "Energy × Identity",
    ]);
  });

  it("only emits a pairing when both of its assessments are present", () => {
    // solstice + pride present (energy×identity), but no turing/passage
    const p = computeArcProfile([
      arc("solstice", "Autumn", "waning"),
      arc("pride", "The Ember", "exploring"),
    ]);
    expect(p.observations).toHaveLength(1);
    expect(p.observations[0]).toContain("Energy × Identity");
  });
});

describe("computeConnections", () => {
  it("emits one internal gap per present assessment", () => {
    const c = computeConnections([
      arc("solstice", "Summer", "waxing"),
      arc("turing", "The Logician", "tallying", { secondaryDirection: "congruent" }),
    ]);
    expect(c.gaps).toHaveLength(2);
    expect(c.gaps.map((g) => g.assessmentKey)).toEqual(["solstice", "turing"]);
  });

  it("all-small gaps → self-congruent", () => {
    const c = computeConnections([
      arc("solstice", "Summer", "waxing"), // bright + waxing = small
      arc("turing", "The Logician", "tallying", { secondaryDirection: "congruent" }),
      arc("pride", "The Beacon", "committed", {
        scores: [
          { key: "c", label: "Identity Clarity", value: 80 },
          { key: "a", label: "Self-Alignment", value: 78 },
        ],
      }),
      arc("passage", "The Wayfinder", "resource", {
        scores: [
          { key: "f", label: "Future", value: 70 },
          { key: "p", label: "Past", value: 30 },
          { key: "pr", label: "Present", value: 30 },
        ],
      }),
    ]);
    expect(c.gaps.every((g) => g.magnitude === "small")).toBe(true);
    expect(c.congruence.verdict).toBe("self-congruent");
    expect(c.congruence.score).toBeGreaterThanOrEqual(70);
  });

  it("a divergent Turing gap lowers congruence", () => {
    const c = computeConnections([
      arc("turing", "The Logician", "tallying", { secondaryDirection: "divergent" }),
    ]);
    const g = c.gaps.find((x) => x.assessmentKey === "turing")!;
    expect(g.magnitude).toBe("large");
    expect(c.congruence.score).toBeLessThan(70);
  });

  it("the Pride gap scales with the clarity/alignment difference", () => {
    const small = computeConnections([
      arc("pride", "The Beacon", "committed", {
        scores: [
          { key: "c", label: "Identity Clarity", value: 60 },
          { key: "a", label: "Self-Alignment", value: 58 },
        ],
      }),
    ]);
    const large = computeConnections([
      arc("pride", "The Aurora", "exploring", {
        scores: [
          { key: "c", label: "Identity Clarity", value: 85 },
          { key: "a", label: "Self-Alignment", value: 30 },
        ],
      }),
    ]);
    expect(small.gaps[0].magnitude).toBe("small");
    expect(large.gaps[0].magnitude).toBe("large");
  });

  it("produces grounded shared-variance notes", () => {
    const c = computeConnections([
      arc("solstice", "Summer", "waxing"),
      arc("turing", "The Logician", "tallying"),
      arc("pride", "The Beacon", "committed"),
      arc("passage", "The Wayfinder", "resource"),
    ]);
    expect(c.sharedVariance.length).toBeGreaterThan(0);
    expect(c.sharedVariance.some((n) => /Conscientiousness/.test(n))).toBe(true);
  });
});

describe("computeFullArcResult", () => {
  it("combines the four into one composite result", () => {
    const r = computeFullArcResult([
      res("solstice", "Summer", { modifier: "waxing" }),
      res("turing", "The Logician", { secondary: "congruent" }),
      res("pride", "The Beacon", {
        scores: [
          { key: "c", label: "Identity Clarity", value: 80 },
          { key: "a", label: "Self-Alignment", value: 78 },
        ],
      }),
      res("passage", "The Wayfinder", {
        modifier: "resource",
        scores: [
          { key: "f", label: "Future", value: 70 },
          { key: "p", label: "Past", value: 30 },
          { key: "pr", label: "Present", value: 30 },
        ],
      }),
    ]);
    expect(r.assessmentKey).toBe("full-arc");
    expect(r.type).toBe("The Congruent Arc"); // all-small gaps
    // one congruence axis + one alignment per assessment
    expect(r.scores).toHaveLength(5);
    expect(r.scores[0].key).toBe("congruence");
    expect(r.notes?.[0]).toContain("Summer");
    expect(r.detail?.meaning).toBeTruthy();
  });

  it("archetype tracks the congruence verdict", () => {
    const divergent = computeFullArcResult([
      res("turing", "The Logician", { secondary: "divergent" }),
    ]);
    expect(divergent.type).toBe("The Divergent Arc");
  });
});
