import { createFileRoute, Link } from "@tanstack/react-router";
import { buttonVariants } from "@heroui/react";
import SolarArrowRightLineDuotone from "~icons/solar/arrow-right-line-duotone";
import { ASSESSMENTS } from "../components/assessment-data";
import { Hero, PageShell, PageStack, QuietCallout } from "../components/ui-system";

export const Route = createFileRoute("/start/complete/")({
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
          <Link to="/start" className={buttonVariants({ variant: "outline" })}>
            Choose individual assessments
          </Link>
          <Link
            to="/assessment/$key/take"
            params={{ key: "solstice" }}
            className={buttonVariants()}
          >
            Start with Solstice
            <SolarArrowRightLineDuotone />
          </Link>
        </div>
      </PageStack>
    </PageShell>
  );
}
