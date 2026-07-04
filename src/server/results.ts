// Anonymous assessment results — service layer + server functions.
//
// The DB access and validation live here as plain exported functions so both
// the TanStack Start server functions (same-origin RPC for the app UI) and the
// plain-JSON REST routes in src/routes/api/results/* (for external callers such
// as integration tests) share one implementation. Neither the client nor the
// REST routes import drizzle or the D1 binding directly beyond this module.

import { createServerFn } from "@tanstack/react-start";
import { and, eq, isNotNull } from "drizzle-orm";
import { db } from "../db";
import { results, type ResultRow } from "../db/schema";
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
  aiAnalysis?: string | null;
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
  aiAnalysis: string | null;
};

function isStringRecord(v: unknown): v is Record<string, number | string> {
  if (typeof v !== "object" || v === null) return false;
  for (const value of Object.values(v as Record<string, unknown>)) {
    if (typeof value !== "number" && typeof value !== "string") return false;
  }
  return true;
}

export function validateSaveInput(raw: unknown): SaveResultInput {
  if (typeof raw !== "object" || raw === null) throw new Error("Invalid payload");
  const r = raw as Record<string, unknown>;
  if (typeof r.assessmentKey !== "string" || !r.assessmentKey)
    throw new Error("assessmentKey required");
  if (typeof r.resultType !== "string" || !r.resultType)
    throw new Error("resultType required");
  if (!isStringRecord(r.answers))
    throw new Error("answers must be a record of number|string");
  if (typeof r.result !== "object" || r.result === null)
    throw new Error("result required");
  if (r.nickname !== undefined && typeof r.nickname !== "string")
    throw new Error("nickname must be a string");
  return {
    assessmentKey: r.assessmentKey,
    resultType: r.resultType,
    answers: r.answers,
    result: r.result as StoredResult,
    nickname: r.nickname as string | undefined,
  };
}

export function validateToken(token: unknown): string {
  if (typeof token !== "string" || token.length < 16 || token.length > 64) {
    throw new Error("Invalid token");
  }
  return token;
}

function validateUpdateAIInput(raw: unknown): {
  shareToken: string;
  aiAnalysis: string | null;
} {
  if (typeof raw !== "object" || raw === null) throw new Error("Invalid payload");
  const r = raw as Record<string, unknown>;
  if (typeof r.shareToken !== "string" || !r.shareToken)
    throw new Error("shareToken required");
  if (r.aiAnalysis !== undefined && typeof r.aiAnalysis !== "string")
    throw new Error("aiAnalysis must be a string");
  return {
    shareToken: r.shareToken,
    aiAnalysis: (r.aiAnalysis as string) ?? null,
  };
}

// ── Service functions (shared by server fns and REST routes) ────────────────

// Generates the share token server-side, persists the raw answers (for future
// re-analysis) and a derived-result snapshot (for deterministic sharing), and
// returns only the token.
export async function saveResultRow(
  data: SaveResultInput,
): Promise<SaveResultOutput> {
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
    aiAnalysis: data.aiAnalysis ?? null,
  });
  return { shareToken };
}

// Returns only completed, shareable results. Raw answers are intentionally NOT
// returned on the public read path — the shared page shows the derived result
// snapshot only, preserving the respondent's per-question privacy.
export async function fetchPublicResult(
  token: string,
): Promise<PublicSharedResult | null> {
  let rows;
  try {
    rows = await db
      .select()
      .from(results)
      .where(and(eq(results.shareToken, token), isNotNull(results.completedAt)))
      .limit(1);
  } catch {
    // Treat any storage error as "not found" so the share page renders
    // gracefully instead of 500ing.
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
    aiAnalysis: row.aiAnalysis,
  };
}

// Full row including the raw answers. Used to rebuild the AI analysis context
// server-side. Not exposed on the public read path.
export async function fetchStoredResultRow(token: string): Promise<ResultRow | null> {
  let rows;
  try {
    rows = await db
      .select()
      .from(results)
      .where(eq(results.shareToken, token))
      .limit(1);
  } catch {
    return null;
  }
  return rows[0] ?? null;
}

// Called after AI analysis is generated so the shared snapshot stays consistent
// with what the owner sees.
export async function setAIAnalysis(
  shareToken: string,
  aiAnalysis: string | null,
): Promise<void> {
  try {
    await db
      .update(results)
      .set({ aiAnalysis })
      .where(eq(results.shareToken, shareToken));
  } catch {
    // Silently ignore update failures so the results page never breaks.
  }
}

// ── Server functions (same-origin RPC for the app UI) ───────────────────────
// Same logic as the REST routes below — they delegate to the service layer.

export const saveResult = createServerFn({ method: "POST" })
  .validator((raw: unknown) => validateSaveInput(raw))
  .handler(async ({ data }) => saveResultRow(data));

export const getResultByToken = createServerFn({ method: "GET" })
  .validator((token: unknown) => validateToken(token))
  .handler(async ({ data }) => fetchPublicResult(data));

export const updateAIAnalysis = createServerFn({ method: "POST" })
  .validator((raw: unknown) => validateUpdateAIInput(raw))
  .handler(async ({ data }) => {
    await setAIAnalysis(data.shareToken, data.aiAnalysis);
    return { ok: true };
  });
