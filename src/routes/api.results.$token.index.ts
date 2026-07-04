// GET /api/results/$token — read the public snapshot of a shared result.
// Returns only the derived result snapshot (never raw answers), matching the
// `getResultByToken` server function. 404 when the token does not resolve.

import { createFileRoute } from "@tanstack/react-router";
import { fetchPublicResult } from "../server/results";

export const Route = createFileRoute("/api/results/$token/")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const result = await fetchPublicResult(params.token);
        if (!result) {
          return Response.json({ error: "Result not found" }, { status: 404 });
        }
        return Response.json(result);
      },
    },
  },
});
