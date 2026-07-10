// Rebuilds the AI analysis input for a stored result. The result page builds
// this context on the client (result-view.tsx handleGenerateAI); this is the
// server-side equivalent so the REST analysis route can generate an analysis
// for an already-saved result without a browser.

import { fetchStoredResultRow, type StoredResult } from "./results-service";
import { getQuestionSet } from "../data/questions";
import { DIMENSION_EXPLANATIONS } from "../data/dimension-explanations";
import { RESULT_DETAILS } from "../data/result-details";
import type { AnalysisInput } from "./ai-analysis";

export async function buildAnalysisInputForToken(
  token: string,
): Promise<AnalysisInput | null> {
  const row = await fetchStoredResultRow(token);
  if (!row) return null;

  const result = JSON.parse(row.result) as StoredResult;
  const answers = JSON.parse(row.answers) as Record<string, number | string>;
  const assessmentKey = row.assessmentKey;

  // The Full Arc composite has no raw question responses — build the AI
  // context from the synthesis itself so the analysis is meaningful.
  if (assessmentKey === "full-arc") {
    const notes = result.notes ?? [];
    return {
      assessmentKey,
      context: {
        assessmentSummary:
          result.summary + (notes.length ? "\n\n" + notes.join("\n") : ""),
        resultMeaning: result.detail?.meaning,
        resultEveryday: result.detail?.distinct,
        resultHowToRead: result.detail?.howToRead,
        dimensions: (result.scores ?? []).map((s) => ({
          key: s.key,
          label: s.label,
          plain: s.label,
          high: "high / aligned",
          low: "low / divergent",
        })),
      },
      questions: [],
      answers: {},
      result: {
        type: result.type,
        scores: (result.scores ?? []).map((s) => ({
          key: s.key,
          label: s.label,
          value: s.value,
        })),
        modifier: result.modifier?.value,
        secondaryModifier: result.secondaryModifier?.value,
      },
    };
  }

  const dims = DIMENSION_EXPLANATIONS[assessmentKey] ?? [];
  const detail = result.detail
    ? RESULT_DETAILS[assessmentKey]?.[result.type]
    : null;

  const set = getQuestionSet(assessmentKey);
  const questions = (set?.questions ?? [])
    .filter((q) => answers[q.id] !== undefined && answers[q.id] !== null)
    .map((q) => {
      let text: string;
      if (q.type === "bipolar") text = q.stem ?? q.id;
      else if (q.type === "unipolar") text = q.statement;
      else if (q.type === "heuristic") text = q.scenario;
      else text = q.prompt;
      return { id: q.id, text, construct: q.construct };
    });

  return {
    assessmentKey,
    context: {
      // result.summary is the server-stored equivalent of assessment.overview.
      assessmentSummary: result.summary,
      resultMeaning: detail?.meaning,
      resultEveryday: detail?.everyday,
      resultHowToRead: detail?.howToRead,
      dimensions: dims.map((d) => ({
        key: d.key,
        label: d.plain,
        plain: d.plain,
        high: d.high,
        low: d.low,
      })),
    },
    questions,
    answers,
    result: {
      type: result.type,
      scores: result.scores.map((s) => ({
        key: s.key,
        label: s.label,
        value: s.value,
      })),
      modifier: result.modifier?.value,
      secondaryModifier: result.secondaryModifier?.value,
    },
  };
}
