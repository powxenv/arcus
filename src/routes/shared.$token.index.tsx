import { createFileRoute, Link } from "@tanstack/react-router";
import { buttonVariants } from "@heroui/react";
import { getResultByToken } from "../server/results";
import type { PublicSharedResult, StoredResult } from "../server/results";
import { ASSESSMENTS } from "../components/assessment-data";
import { getQuestionSet, type QuestionSet } from "../data/questions";
import type { AssessmentResult } from "../lib/scoring";
import { ResultView } from "../components/result-view";

export const Route = createFileRoute("/shared/$token/")({
  component: SharedResult,
  head: () => ({
    meta: [
      { title: "Shared result — Arcus" },
      {
        name: "description",
        content:
          "A shared personality assessment result from Arcus — a snapshot for reflection, not a clinical label.",
      },
      { property: "og:title", content: "Shared result — Arcus" },
      {
        property: "og:description",
        content:
          "A shared personality assessment result from Arcus.",
      },
    ],
  }),
  loader: async ({ params }) => {
    // Loader runs server-side on first paint; client-side on navigation.
    // Server functions are isomorphic and safe to call from either context.
    const result = await getResultByToken({ data: params.token });
    return { result };
  },
});

function SharedResult() {
  const { result } = Route.useLoaderData();

  if (!result) {
    return (
      <div className="max-w-2xl mx-auto min-h-screen py-28 px-6">
        <div className="text-center flex flex-col items-center gap-4">
          <h1 className="text-3xl font-bold">Result not found</h1>
          <p className="text-default-500">
            This share link is invalid or has been removed.
          </p>
          <Link to="/start" className={buttonVariants({ variant: "outline" })}>
            Take your own assessment
          </Link>
        </div>
      </div>
    );
  }

  const assessment = ASSESSMENTS[result.assessmentKey];
  const questionSet: QuestionSet | undefined = getQuestionSet(result.assessmentKey);
  // The stored result already carries everything ResultView needs; cast through
  // the shared shape. answers are intentionally not stored on the public read
  // path, so the share view passes an empty record (ResultView only uses them
  // when persisting a new share, which the shared view never does).
  const viewResult = result.result as unknown as AssessmentResult;

  return (
    <ResultView
      result={viewResult as AssessmentResult}
      questionSet={
        questionSet ?? {
          assessmentKey: result.assessmentKey,
          title: assessment?.name ?? result.assessmentKey,
          shortName: assessment?.shortName ?? result.assessmentKey,
          duration: assessment?.duration ?? "",
          summary: result.result.summary,
          constructs: [],
          questions: [],
        }
      }
      answers={{}}
      own={false}
      initialAiText={result.aiAnalysis}
    />
  );
}

// Silence unused-import guards for re-exported types used elsewhere.
export type { PublicSharedResult, StoredResult };
