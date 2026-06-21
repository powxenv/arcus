import { createFileRoute, useParams } from "@tanstack/react-router";
import SolarArrowRightLineDuotone from "~icons/solar/arrow-right-line-duotone";
import { ASSESSMENTS } from "../components/assessment-data";
import { ButtonLink, Hero, PageShell, PageStack, QuietCallout } from "../components/ui-system";

export const Route = createFileRoute("/assessment/$key/take")({
  component: AssessmentTake,
});

function AssessmentTake() {
  const { key } = useParams({ from: "/assessment/$key/take" });
  const assessment = ASSESSMENTS[key];

  if (!assessment) {
    return (
      <PageShell size="sm">
        <div className="text-center flex flex-col items-center gap-4">
          <h1 className="text-3xl font-bold">Assessment not found</h1>
          <ButtonLink to="/start" variant="outline">Back to start</ButtonLink>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PageStack>
        <Hero
          eyebrow="Assessment"
          icon={assessment.icon}
          title={`Begin ${assessment.shortName}`}
          meta={`${assessment.duration} · ${assessment.questionCount}`}
        >
          This is where the {assessment.shortName} assessment flow begins.
        </Hero>

        <QuietCallout>
          <p className="text-lg font-semibold">{assessment.question}</p>
          <p className="text-default-600 leading-relaxed mt-3">
            The questionnaire interface is not wired into this page yet. The
            start confirmation now routes here so the assessment flow has a
            dedicated entry point.
          </p>
        </QuietCallout>

        <div className="flex flex-wrap gap-2">
          <ButtonLink to="/assessment/$key" params={{ key }} variant="outline">
            Review assessment details
          </ButtonLink>
          <ButtonLink to="/start">
            Choose another path
            <SolarArrowRightLineDuotone />
          </ButtonLink>
        </div>
      </PageStack>
    </PageShell>
  );
}
