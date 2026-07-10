// POST /api/results/$token/analysis — generate (real NVIDIA/Gemma) and persist
// the personalized analysis for an existing result. Mirrors what the result
// page does client-side (result-view.tsx handleGenerateAI), but server-side
// from the stored answers + result snapshot.

import { createFileRoute } from "@tanstack/react-router";
import { buildAnalysisInputForToken } from "../server/ai-context";
import { generateAIAnalysis } from "../server/ai-analysis";
import {
  setAIAnalysis,
  validateUpdateAIInput,
} from "../server/results-service";
import { errorResponse, parseJsonBody } from "../server/http";

export const Route = createFileRoute("/api/results/$token/analysis/")({
  server: {
    handlers: {
      // POST — generate (real NVIDIA/Gemma) and persist the personalized
      // analysis for an existing result. Mirrors what the result page does
      // client-side (result-view.tsx handleGenerateAI), but server-side from
      // the stored answers + result snapshot.
      POST: async ({ params }) => {
        const input = await buildAnalysisInputForToken(params.token);
        if (!input) {
          return Response.json({ error: "Result not found" }, { status: 404 });
        }

        const text = await generateAIAnalysis(input);
        await setAIAnalysis(params.token, text);
        return Response.json({ aiAnalysis: text });
      },

      // PATCH — replace the stored analysis text directly, without regenerating.
      // The token is authoritative from the URL; the body supplies the text.
      // Exercises validateUpdateAIInput + setAIAnalysis in isolation.
      PATCH: async ({ params, request }) => {
        const body = await parseJsonBody(request);
        if (!body.ok) return errorResponse(body.error);

        let validated;
        try {
          validated = validateUpdateAIInput({
            shareToken: params.token,
            aiAnalysis: (body.data as { aiAnalysis?: unknown }).aiAnalysis,
          });
        } catch (err) {
          return errorResponse(
            err instanceof Error ? err.message : "Invalid payload",
          );
        }

        await setAIAnalysis(validated.shareToken, validated.aiAnalysis);
        return Response.json({
          ok: true,
          shareToken: validated.shareToken,
          aiAnalysis: validated.aiAnalysis,
        });
      },
    },
  },
});
