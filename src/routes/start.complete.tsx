import { createFileRoute } from "@tanstack/react-router";
import SolarArrowRightLineDuotone from "~icons/solar/arrow-right-line-duotone";
import { ASSESSMENTS } from "../components/assessment-data";
import { ButtonLink, Hero, PageShell, PageStack, QuietCallout } from "../components/ui-system";

export const Route = createFileRoute("/start/complete")({
  component: CompleteExperience,
});

const totalQuestions = Object.values(ASSESSMENTS).reduce((sum, item) => {
  const count = Number.parseInt(item.questionCount, 10);
  return sum + (Number.isNaN(count) ? 0 : count);
}, 0);

function CompleteExperience() {
  return (
    <PageShell>
      <PageStack>
        <Hero
          eyebrow="Complete experience"
          title="Begin the complete Arcus experience."
          meta={`4 assessments · ${totalQuestions} questions · ~30 min`}
        >
          This is the entry point for taking Solstice, Turing, Pride, and
          Passage together as one guided experience.
        </Hero>

        <QuietCallout>
          <p className="text-lg font-semibold">
            Your full profile will combine energy, thinking, identity, and time.
          </p>
          <p className="text-default-600 leading-relaxed mt-3">
            The combined questionnaire interface is not wired into this page
            yet. The confirmation flow now routes here so the complete
            experience has a dedicated entry point.
          </p>
        </QuietCallout>

        <div className="flex flex-wrap gap-2">
          <ButtonLink to="/start" variant="outline">
            Choose individual assessments
          </ButtonLink>
          <ButtonLink to="/assessment/$key/take" params={{ key: "solstice" }}>
            Start with Solstice
            <SolarArrowRightLineDuotone />
          </ButtonLink>
        </div>
      </PageStack>
    </PageShell>
  );
}
