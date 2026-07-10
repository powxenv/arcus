// GET /api/results/$token/context — the AI analysis input for a stored result.
//
// Rebuilds exactly what POST /api/results/$token/analysis sends to the model:
// the assessment context, the answered questions, and the derived result
// scores — but without calling the provider. Exposed so a client (and the test
// suite) can inspect the analysis input shape for an already-saved result.
// 404 when the token does not resolve.

import { createFileRoute } from "@tanstack/react-router";
import { buildAnalysisInputForToken } from "../server/ai-context";

export const Route = createFileRoute("/api/results/$token/context/")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const input = await buildAnalysisInputForToken(params.token);
        if (!input) {
          return Response.json({ error: "Result not found" }, { status: 404 });
        }
        return Response.json(input);
      },
    },
  },
});
