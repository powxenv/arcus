// Server function that proxies NVIDIA's hosted inference for Gemma 4 31B.
// The API key stays server-side — the client never sees it.
//
// Usage:
//   const text = await getAIAnalysis({
//     data: { assessmentKey, context, questions, answers, result }
//   })
//
// The response is a plain-text interpretation clearly labeled as AI-generated
// on the client side.

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

type AnalysisInput = {
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

function validateInput(raw: unknown): AnalysisInput {
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

export const getAIAnalysis = createServerFn({ method: "POST" })
  .validator((raw: unknown) => validateInput(raw))
  .handler(async ({ data }) => {
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

    // Assessment summary
    const parts: string[] = [
      `Assessment: ${data.assessmentKey}`,
      `What this measures: ${ctx.assessmentSummary}`,
    ];

    // Dimension meanings
    if (ctx.dimensions.length > 0) {
      parts.push(
        "Dimensions:\n" +
          ctx.dimensions.map((d) => `  ${d.label}: ${d.plain}`).join("\n"),
      );
    }

    // Result interpretation
    parts.push(`Result: ${data.result.type}`);
    if (data.result.modifier) parts.push(`Modifier: ${data.result.modifier}`);
    if (data.result.secondaryModifier)
      parts.push(`Secondary: ${data.result.secondaryModifier}`);

    // Scores
    parts.push(
      "Scores:\n" +
        data.result.scores
          .map((s) => `  ${s.label}: ${s.value}/100`)
          .join("\n"),
    );

    // Deterministic interpretation (already computed, so AI can build on it)
    if (ctx.resultMeaning)
      parts.push(`Deterministic meaning: ${ctx.resultMeaning}`);
    if (ctx.resultEveryday)
      parts.push(`Everyday pattern: ${ctx.resultEveryday}`);
    if (ctx.resultHowToRead)
      parts.push(`How to read it: ${ctx.resultHowToRead}`);

    // Individual responses
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
  });
