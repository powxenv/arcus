// Result-pipeline server functions (same-origin RPC for the app UI).
//
// This file is imported by client code (result-view, the take page, the shared
// route). It contains ONLY `createServerFn` exports and type re-exports so
// TanStack Start can extract them for the client without dragging in
// `cloudflare:workers` (which lives in the server-only ./results-service.ts).
// See cloudflare/workers-sdk#10254.

import { createServerFn } from "@tanstack/react-start";
import {
  fetchPublicResult,
  saveResultRow,
  setAIAnalysis,
  validateSaveInput,
  validateToken,
  validateUpdateAIInput,
} from "./results-service";

export type {
  PublicSharedResult,
  SaveResultInput,
  SaveResultOutput,
  StoredDetail,
  StoredGeometry,
  StoredResult,
  StoredScore,
} from "./results-service";

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
