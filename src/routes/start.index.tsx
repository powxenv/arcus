import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Modal, buttonVariants } from "@heroui/react";
import SolarArrowRightLineDuotone from "~icons/solar/arrow-right-line-duotone";
import SolarPlayLineDuotone from "~icons/solar/play-line-duotone";
import { ASSESSMENTS } from "../components/assessment-data";
import { AssessmentStartModal } from "../components/assessment-start-modal";
import { ResumeModal } from "../components/resume-modal";
import {
  clearProgress,
  loadProgress,
  type AssessmentProgress,
} from "../lib/assessment-progress";
import {
  Hero,
  PageShell,
  PageStack,
  Section,
  Surface,
} from "../components/ui-system";

export const Route = createFileRoute("/start/")({ component: Start });

const assessments = Object.values(ASSESSMENTS);
const totalQuestions = assessments.reduce((sum, item) => {
  const count = Number.parseInt(item.questionCount, 10);
  return sum + (Number.isNaN(count) ? 0 : count);
}, 0);

function Start() {
  const navigate = useNavigate();
  const [resumeProgress, setResumeProgress] = useState<AssessmentProgress | null>(
    null,
  );
  const [resumeOpen, setResumeOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadProgress().then((progress) => {
      if (cancelled || !progress) return;
      setResumeProgress(progress);
      setResumeOpen(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const continueAssessment = () => {
    const key = resumeProgress?.assessmentKey;
    setResumeOpen(false);
    if (key) navigate({ to: "/assessment/$key/take", params: { key } });
  };

  const startOver = () => {
    clearProgress();
    setResumeProgress(null);
    setResumeOpen(false);
  };

  return (
    <PageShell>
      <PageStack>
        <Hero eyebrow="Start" title="Choose how you want to begin.">
          Take the complete Arcus experience in one sitting, or start with a
          single assessment and come back for the others later.
        </Hero>

        <Section
          title="Complete Arcus experience"
          intro="Best if you want the full picture across energy, thinking, identity, and time. You can still pause between assessments."
        >
          <Surface className="flex flex-col gap-5">
            <div className="grid sm:grid-cols-3 gap-3">
              <StatTile label="Assessments" value="4 assessments" />
              <StatTile label="Questions" value={`${totalQuestions} questions`} />
              <StatTile label="Time" value="~30 min" />
            </div>
            <p className="text-default-600 leading-relaxed">
              The complete flow combines all four assessments so your final
              profile can show how your arcs interact, reinforce each other, or
              pull in different directions.
            </p>
            <CompleteStartModal />
          </Surface>
        </Section>

        <Section
          title="Individual assessments"
          intro="Choose one area to explore now. Each assessment has its own confirmation step before it begins."
        >
          <div className="grid sm:grid-cols-2 gap-3">
            {assessments.map((assessment) => (
              <Surface key={assessment.key} className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <img className="size-10" src={assessment.icon} alt="" />
                  <div>
                    <h3 className="font-bold leading-tight">
                      {assessment.shortName}
                    </h3>
                    <p className="text-xs text-default-400 mt-1">
                      {assessment.duration} · {assessment.questionCount}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-default-600 leading-relaxed">
                  {assessment.tagline}. {assessment.overview}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  <Link
                    to="/assessment/$key"
                    params={{ key: assessment.key }}
                    className={buttonVariants({
                      variant: "outline",
                      className: "h-8 px-3 text-sm",
                    })}
                  >
                    Learn more
                    <SolarArrowRightLineDuotone />
                  </Link>
                  <AssessmentStartModal
                    assessment={assessment}
                    triggerLabel="Start"
                    triggerClassName="h-8 px-3 text-sm"
                  />
                </div>
              </Surface>
            ))}
          </div>
        </Section>
      </PageStack>

      <ResumeModal
        progress={resumeProgress}
        open={resumeOpen}
        onContinue={continueAssessment}
        onStartOver={startOver}
      />
    </PageShell>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-default-50 rounded-xl border-[.5px] border-default-200 p-4">
      <p className="text-xs text-default-400">{label}</p>
      <p className="font-bold mt-1">{value}</p>
    </div>
  );
}

function CompleteStartModal() {
  return (
    <Modal>
      <Modal.Trigger className={buttonVariants({ className: "self-start" })}>
        <SolarPlayLineDuotone />
        Start complete experience
      </Modal.Trigger>
      <Modal.Backdrop>
        <Modal.Container size="lg" placement="center">
          <Modal.Dialog>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Start the complete Arcus experience</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <div className="flex flex-col gap-5">
                <p className="text-default-600 leading-relaxed">
                  You'll move through Solstice, Turing, Pride, and Passage in a
                  single guided flow. Together they map your energy, thinking,
                  identity, and relationship with time.
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <StatTile label="Assessments" value="4" />
                  <StatTile label="Questions" value={`${totalQuestions}`} />
                  <StatTile label="Time" value="~30 min" />
                </div>
                <p className="text-sm text-default-500">
                  The full combined questionnaire is still being built. You can
                  begin with Solstice now and take the rest individually.
                </p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Modal.CloseTrigger
                className={buttonVariants({ variant: "ghost" })}
              >
                Not yet
              </Modal.CloseTrigger>
              <Link
                to="/assessment/$key/take"
                params={{ key: "solstice" }}
                className={buttonVariants()}
              >
                Begin with Solstice
                <SolarArrowRightLineDuotone />
              </Link>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
