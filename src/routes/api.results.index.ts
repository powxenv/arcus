// POST /api/results — create an anonymous result, return its share token.
// Public REST mirror of the `saveResult` server function, so external callers
// (e.g. integration tests) can exercise the real save path over plain JSON.

import { createFileRoute } from "@tanstack/react-router";
import {
  saveResultRow,
  validateSaveInput,
} from "../server/results-service";
import { errorResponse, okResponse, parseJsonBody } from "../server/http";

export const Route = createFileRoute("/api/results/")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await parseJsonBody(request);
        if (!body.ok) return errorResponse(body.error);

        let data;
        try {
          data = validateSaveInput(body.data);
        } catch (err) {
          return errorResponse(
            err instanceof Error ? err.message : "Invalid payload",
          );
        }

        const out = await saveResultRow(data);
        return okResponse(out, 201);
      },
    },
  },
});
