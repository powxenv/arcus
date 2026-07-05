// POST /api/results — create an anonymous result, return its share token.
// Public REST mirror of the `saveResult` server function, so external callers
// (e.g. integration tests) can exercise the real save path over plain JSON.

import { createFileRoute } from "@tanstack/react-router";
import { saveResultRow, validateSaveInput } from "../server/results-service";

export const Route = createFileRoute("/api/results/")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON body" }, { status: 400 });
        }

        let data;
        try {
          data = validateSaveInput(body);
        } catch (err) {
          return Response.json(
            { error: err instanceof Error ? err.message : "Invalid payload" },
            { status: 400 },
          );
        }

        const out = await saveResultRow(data);
        return Response.json(out, { status: 201 });
      },
    },
  },
});
