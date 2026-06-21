// Server functions for anonymous assessment results, per TanStack Start's
// createServerFn pattern. All DB access and mutations live here. uthe client
// never imports drizzle or the D1 binding directly.
//
// Each function declares its method (GET for reads, POST for mutations) and a
// validator that shapes and narrows the client payload before the handler runs.
// The handler receives `data` (already validated) and returns a serializable
// value. Return values are JSON-serializable plain objects so they hydrate
// cleanly on the client.

import { createServerFn } from "@tanstack/react-start";
import { and, eq, isNotNull } from "drizzle-orm";
import { db } from "../db";
import { results } from "../db/schema";
import { generateShareToken } from "./share-token";

export type StoredScore = { key: string; label: string; value: number; role: string };
export type StoredGeometry = {
  prototypicality: number;
  angleDeg: number;
  gradation: string | null;
  isBoundary: boolean;
  boundaryName?: string;
  facetTension?: { axis: string; tense: boolean }[];
};
export type StoredDetail = { meaning: string; howToRead: string; distinct: string };

export type StoredResult = {
  assessmentKey: string;
  type: string;
  emoji: string;
  archetype?: string;
  summary: string;
  modifier?: { label: string; value: string };
  secondaryModifier?: { label: string; value: string };
  scores: StoredScore[];
  geometry?: StoredGeometry;
  detail?: StoredDetail;
  notes?: string[];
};

export type SaveResultInput = {
  assessmentKey: string;
  resultType: string;
  answers: Record<string, number | string>;
  result: StoredResult;
  nickname?: string;
};

export type SaveResultOutput = {
  shareToken: string;
};

export type PublicSharedResult = {
  shareToken: string;
  assessmentKey: string;
  resultType: string;
  result: StoredResult;
  nickname: string | null;
  createdAt: number;
};

function isStringRecord(v: unknown): v is Record<string, number | string> {
  if (typeof v !== "object" || v === null) return false;
  for (const value of Object.values(v as Record<string, unknown>)) {
    if (typeof value !== "number" && typeof value !== "string") return false;
  }
  return true;
}

function validateSaveInput(raw: unknown): SaveResultInput {
  if (typeof raw !== "object" || raw === null) throw new Error("Invalid payload");
  const r = raw as Record<string, unknown>;
  if (typeof r.assessmentKey !== "string" || !r.assessmentKey) throw new Error("assessmentKey required");
  if (typeof r.resultType !== "string" || !r.resultType) throw new Error("resultType required");
  if (!isStringRecord(r.answers)) throw new Error("answers must be a record of number|string");
  if (typeof r.result !== "object" || r.result === null) throw new Error("result required");
  if (r.nickname !== undefined && typeof r.nickname !== "string") throw new Error("nickname must be a string");
  return {
    assessmentKey: r.assessmentKey,
    resultType: r.resultType,
    answers: r.answers,
    result: r.result as StoredResult,
    nickname: r.nickname as string | undefined,
  };
}

// ── Save (mutation, POST) ───────────────────────────────────────────────────
// Generates the share token server-side, persists the raw answers (for future
// re-analysis) and a derived-result snapshot (for deterministic sharing), and
// returns only the token.
export const saveResult = createServerFn({ method: "POST" })
  .validator((raw: unknown) => validateSaveInput(raw))
  .handler(async ({ data }) => {
    const now = Date.now();
    const shareToken = generateShareToken();
    await db.insert(results).values({
      shareToken,
      assessmentKey: data.assessmentKey,
      resultType: data.resultType,
      answers: JSON.stringify(data.answers),
      result: JSON.stringify(data.result),
      nickname: data.nickname ?? null,
      createdAt: now,
      completedAt: now,
    });
    return { shareToken } satisfies SaveResultOutput;
  });

// ── Fetch by token (read, GET) ──────────────────────────────────────────────
// Returns only completed, shareable results. Raw answers are intentionally NOT
// returned over the public read path. uthe shared page shows the derived result
// snapshot only, preserving the respondent's per-question privacy.
export const getResultByToken = createServerFn({ method: "GET" })
  .validator((token: unknown) => {
    if (typeof token !== "string" || token.length < 16 || token.length > 64) {
      throw new Error("Invalid token");
    }
    return token;
  })
  .handler(async ({ data }) => {
    let rows;
    try {
      rows = await db
        .select()
        .from(results)
        .where(
          and(eq(results.shareToken, data), isNotNull(results.completedAt)),
        )
        .limit(1);
    } catch {
      // Treat any storage error as "not found" on the public read path so the
      // share page renders gracefully instead of 500ing.
      return null;
    }
    const row = rows[0];
    if (!row) return null;
    return {
      shareToken: row.shareToken,
      assessmentKey: row.assessmentKey,
      resultType: row.resultType,
      result: JSON.parse(row.result) as StoredResult,
      nickname: row.nickname ?? null,
      createdAt: row.createdAt,
    } satisfies PublicSharedResult;
  });
