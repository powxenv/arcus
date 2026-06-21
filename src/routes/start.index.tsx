import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ASSESSMENTS } from "../components/assessment-data";
import { AssessmentStartModal } from "../components/assessment-start-modal";
import { ResumeModal } from "../components/resume-modal";
import {
  clearProgress,
  loadProgress,
  type AssessmentProgress,
} from "../lib/assessment-progress";
import { Hero, PageShell, PageStack, Section, Surface } from "../components/ui-system";

export const Route = createFileRoute("/start/")({
  component: Start,
  head: () => ({
    meta: [
      { title: "Take an assessment — Arcus" },
      {
        name: "description",
        content:
          "Four assessments. Take any of them first, in any order, at your own pace. Explore your energy, thinking, identity, and relationship with time.",
      },
      { property: "og:title", content: "Take an assessment — Arcus" },
      {
        property: "og:description",
        content:
          "Four assessments. Take any of them first, in any order.",
      },
    ],
  }),
});

const assessments = Object.values(ASSESSMENTS);

function Start() {
  const navigate = useNavigate();
  const [resumeProgress, setResumeProgress] =
    useState<AssessmentProgress | null>(null);
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
        <Hero eyebrow="Start" title="Pick an assessment to start with.">
          Four assessments. Take any of them first, in any order, at your own
          pace.
        </Hero>

        <Section title="Assessments">
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
                  {assessment.tagline}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  <AssessmentStartModal
                    assessment={assessment}
                    triggerLabel="Learn more"
                    triggerClassName="h-8 px-3 text-sm"
                  />
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
