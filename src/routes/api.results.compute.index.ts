// POST /api/results/compute — score a set of answers without persisting.
//
// A dry-run of the scoring pipeline: given an assessmentKey and raw answers,
// return the derived AssessmentResult (type, scores, geometry, modifier). This
// is the same `computeResult` the take page runs before saving, exposed so a
// client can preview a result (and the test suite can verify scoring) with no
// database write. Full Arc is not supported here — it has no question set of
// its own; use POST /api/arc/compute for the composite.

import { createFileRoute } from "@tanstack/react-router";
import { computeResult } from "../lib/scoring";
import { getQuestionSet } from "../data/questions";
import { errorResponse, parseJsonBody, withValidation } from "../server/http";

export const Route = createFileRoute("/api/results/compute/")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await parseJsonBody(request);
        if (!body.ok) return errorResponse(body.error);

        const data = body.data as {
          assessmentKey?: unknown;
          answers?: unknown;
        };

        if (typeof data.assessmentKey !== "string" || !data.assessmentKey) {
          return errorResponse("assessmentKey required");
        }
        if (
          data.answers === null ||
          typeof data.answers !== "object" ||
          Array.isArray(data.answers)
        ) {
          return errorResponse("answers must be an object of id → number|string");
        }

        const set = getQuestionSet(data.assessmentKey);
        if (!set) {
          return errorResponse(`Unknown assessmentKey: ${data.assessmentKey}`, 404);
        }

        const result = await withValidation(() =>
          computeResult(
            set,
            data.answers as Record<string, number | string>,
          ),
        );

        if (result instanceof Response) return result;
        return Response.json({ assessmentKey: data.assessmentKey, result });
      },
    },
  },
});
