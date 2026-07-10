// GET /api/health — system diagnostics.
//
// Reports the dependencies a request actually needs: D1 connectivity, whether
// the AI provider is configured, the loaded assessment catalog, and a live
// share-token sample. Returns 503 when the database is unreachable so probes
// and the test suite can distinguish "degraded" from "ok" by status code alone.

import { createFileRoute } from "@tanstack/react-router";
import { db } from "../db";
import { results } from "../db/schema";
import { ASSESSMENT_KEYS, getQuestionSet } from "../data/questions";
import { generateShareToken } from "../server/share-token";

export const Route = createFileRoute("/api/health/")({
  server: {
    handlers: {
      GET: async () => {
        let dbOk = false;
        let dbError: string | null = null;
        try {
          await db.select().from(results).limit(1);
          dbOk = true;
        } catch (err) {
          dbError = err instanceof Error ? err.message : "unknown";
        }

        // A live token sample proves the Web-Crypto entropy path works in the
        // current runtime without touching the database.
        const tokenSample = generateShareToken();

        const body = {
          status: dbOk ? "ok" : "degraded",
          timestamp: Date.now(),
          db: { ok: dbOk, error: dbError },
          ai: { configured: !!process.env.NVIDIA_API_KEY },
          token: {
            sample: tokenSample,
            length: tokenSample.length,
            charsetOk: /^[A-Za-z0-9]+$/.test(tokenSample),
          },
          assessments: ASSESSMENT_KEYS.map((key) => ({
            key,
            questions: getQuestionSet(key)?.questions.length ?? 0,
          })),
        };

        return Response.json(body, { status: dbOk ? 200 : 503 });
      },
    },
  },
});
