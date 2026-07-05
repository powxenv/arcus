// POST /api/results/$token/analysis — generate (real NVIDIA/Gemma) and persist
// the personalized analysis for an existing result. Mirrors what the result
// page does client-side (result-view.tsx handleGenerateAI), but server-side
// from the stored answers + result snapshot.

import { createFileRoute } from "@tanstack/react-router";
import { buildAnalysisInputForToken } from "../server/ai-context";
import { generateAIAnalysis } from "../server/ai-analysis";
import { setAIAnalysis } from "../server/results-service";

export const Route = createFileRoute("/api/results/$token/analysis")({
  server: {
    handlers: {
      POST: async ({ params }) => {
        const input = await buildAnalysisInputForToken(params.token);
        if (!input) {
          return Response.json({ error: "Result not found" }, { status: 404 });
        }

        const text = await generateAIAnalysis(input);
        await setAIAnalysis(params.token, text);
        return Response.json({ aiAnalysis: text });
      },
    },
  },
});
