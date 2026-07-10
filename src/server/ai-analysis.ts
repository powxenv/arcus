// AI analysis — service layer + server function.
// Proxies NVIDIA's hosted inference for Gemma 4 31B. The API key stays
// server-side — the client / REST caller never sees it.
//
// `generateAIAnalysis` is a plain exported function so both the TanStack Start
// server function (app UI) and the REST route (src/routes/api/results/$token/
// analysis) share one implementation.

import { createServerFn } from "@tanstack/react-start";

type QuestionEntry = {
  id: string;
  text: string;
  construct: string;
};

type AnalysisContext = {
  assessmentSummary: string;
  resultMeaning?: string;
  resultEveryday?: string;
  resultHowToRead?: string;
  dimensions: {
    key: string;
    label: string;
    plain: string;
    high: string;
    low: string;
  }[];
};

export type AnalysisInput = {
  assessmentKey: string;
  context: AnalysisContext;
  questions: QuestionEntry[];
  answers: Record<string, number | string>;
  result: {
    type: string;
    scores: { key: string; label: string; value: number }[];
    modifier?: string;
    secondaryModifier?: string;
  };
};

export function validateInput(raw: unknown): AnalysisInput {
  if (typeof raw !== "object" || raw === null)
    throw new Error("Invalid payload");
  const r = raw as Record<string, unknown>;
  if (typeof r.assessmentKey !== "string")
    throw new Error("assessmentKey required");
  if (typeof r.context !== "object" || r.context === null)
    throw new Error("context required");
  if (!Array.isArray(r.questions)) throw new Error("questions required");
  if (typeof r.answers !== "object" || r.answers === null)
    throw new Error("answers required");
  if (typeof r.result !== "object" || r.result === null)
    throw new Error("result required");
  return r as AnalysisInput;
}

// The real inference call. Returns a plain-text interpretation clearly labelled
// as AI-generated on the client side.
export async function generateAIAnalysis(data: AnalysisInput): Promise<string> {
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) {
    return "AI analysis is not configured for this instance.";
  }

  const ctx = data.context;

  const systemPrompt =
    "You are a warm, insightful interpreter of personality assessment results. " +
    "You see what the assessment measures, the person's result type and scores, " +
    "the deterministic interpretation of that result, and every individual " +
    "question response that produced it. " +
    "Write 3-4 short paragraphs. " +
    "First paragraph: what this result suggests about the person in plain, " +
    "human language — go deeper than the deterministic label and describe " +
    "the pattern they may recognise in themselves. " +
    "Second paragraph: how the different scores and responses work together, " +
    "referencing specific question patterns you noticed (e.g. responses that " +
    "stand out from the general pattern). " +
    "Third paragraph: one or two practical reflections the person might take " +
    "away — something to notice, a question to sit with, or a strength to " +
    "lean into. " +
    "Avoid clichés, fortune-cookie language, and diagnostic claims. " +
    "Do not simply repeat the result label or the dimension explanations " +
    "back to the user — they can already see those. " +
    "Your job is to connect the dots between their individual responses and " +
    "the overall result. " +
    "Be specific. Sign with '— AI' on its own line at the end.";

  const parts: string[] = [
    `Assessment: ${data.assessmentKey}`,
    `What this measures: ${ctx.assessmentSummary}`,
  ];

  if (ctx.dimensions.length > 0) {
    parts.push(
      "Dimensions:\n" +
        ctx.dimensions.map((d) => `  ${d.label}: ${d.plain}`).join("\n"),
    );
  }

  parts.push(`Result: ${data.result.type}`);
  if (data.result.modifier) parts.push(`Modifier: ${data.result.modifier}`);
  if (data.result.secondaryModifier)
    parts.push(`Secondary: ${data.result.secondaryModifier}`);

  parts.push(
    "Scores:\n" +
      data.result.scores.map((s) => `  ${s.label}: ${s.value}/100`).join("\n"),
  );

  if (ctx.resultMeaning)
    parts.push(`Deterministic meaning: ${ctx.resultMeaning}`);
  if (ctx.resultEveryday) parts.push(`Everyday pattern: ${ctx.resultEveryday}`);
  if (ctx.resultHowToRead)
    parts.push(`How to read it: ${ctx.resultHowToRead}`);

  const responses = data.questions
    .map((q) => {
      const a = data.answers[q.id];
      if (a === undefined || a === null) return null;
      return `  [${q.construct}] ${q.text} → ${a}`;
    })
    .filter((line): line is string => line !== null);
  parts.push("Individual responses:\n" + responses.join("\n"));

  const userMessage = parts.join("\n\n");

  try {
    const response = await fetch(
      "https://integrate.api.nvidia.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemma-4-31b-it",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userMessage },
          ],
          max_tokens: 600,
          temperature: 0.7,
          top_p: 0.95,
        }),
      },
    );

    if (!response.ok) {
      const errorBody = await response.text().catch(() => "unknown error");
      console.error("NVIDIA API error:", response.status, errorBody);
      return "The AI analysis service is temporarily unavailable. Please try again later.";
    }

    const body = (await response.json()) as {
      choices: { message: { content: string } }[];
    };
    return body.choices?.[0]?.message?.content ?? "No analysis returned.";
  } catch (err) {
    console.error("AI analysis fetch error:", err);
    return "Unable to reach the analysis service right now.";
  }
}

export const getAIAnalysis = createServerFn({ method: "POST" })
  .validator((raw: unknown) => validateInput(raw))
  .handler(async ({ data }) => generateAIAnalysis(data));
