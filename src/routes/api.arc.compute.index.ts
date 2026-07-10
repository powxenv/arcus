// POST /api/arc/compute — score the Full Arc from four assessments' answers.
//
// The Full Arc has no question set of its own; it composes the four individual
// assessments. This endpoint takes an answers object keyed by assessment
// (solstice / turing / pride / passage) and returns:
//   - components: each individual AssessmentResult
//   - fullArc: the composite result (self-congruence synthesis)
//   - profile: the headline ArcProfile (ordering, completeness, pairings)
//   - connections: the internal-gap / congruence analysis across the four arcs
//
// All four assessment scores run through the real computeResult +
// computeFullArcResult + computeArcProfile + computeConnections pipeline, with
// no database write.

import { createFileRoute } from "@tanstack/react-router";
import { computeResult } from "../lib/scoring";
import { getQuestionSet } from "../data/questions";
import {
  assessmentResultToArc,
  computeArcProfile,
  computeConnections,
  computeFullArcResult,
} from "../lib/arc-profile";
import { errorResponse, parseJsonBody } from "../server/http";

const ARC_KEYS = ["solstice", "turing", "pride", "passage"] as const;

export const Route = createFileRoute("/api/arc/compute/")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await parseJsonBody(request);
        if (!body.ok) return errorResponse(body.error);

        const answersByAssessment = body.data as Record<
          string,
          Record<string, number | string> | undefined
        >;

        if (
          answersByAssessment === null ||
          typeof answersByAssessment !== "object" ||
          Array.isArray(answersByAssessment)
        ) {
          return errorResponse(
            "answers must be an object keyed by assessment (solstice, turing, pride, passage)",
          );
        }

        const missing = ARC_KEYS.filter(
          (k) => !answersByAssessment[k],
        );
        if (missing.length > 0) {
          return errorResponse(
            `Missing answers for: ${missing.join(", ")}`,
          );
        }

        const components = ARC_KEYS.map((key) => {
          const set = getQuestionSet(key)!;
          return computeResult(set, answersByAssessment[key]!);
        });

        const fullArc = computeFullArcResult(components);
        const arcs = components.map(assessmentResultToArc);
        const profile = computeArcProfile(arcs);
        const connections = computeConnections(arcs);

        return Response.json({ components, fullArc, profile, connections });
      },
    },
  },
});
