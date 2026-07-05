import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Modal, buttonVariants } from "@heroui/react";
import SolarArrowLeftLineDuotone from "~icons/solar/arrow-left-line-duotone";
import SolarArrowRightLineDuotone from "~icons/solar/arrow-right-line-duotone";
import { getQuestionSet, type Question, type QuestionSet } from "../data/questions";
import { computeResult, type AssessmentResult } from "../lib/scoring";
import { saveResult } from "../server/results";
import { ASSESSMENTS } from "../components/assessment-data";
import {
  ProgressBar,
  QuestionView,
  choiceOptions,
} from "../components/question-flow";
import { computeFullArcResult } from "../lib/arc-profile";
import { PageShell } from "../components/ui-system";

// The Full Arc assessment: the four assessments taken in one continuous
// sitting and combined into one result. Behaves like any other assessment —
// no landing view; on completion it redirects to the persistent /shared page.
const SECTION_KEYS = ["solstice", "turing", "pride", "passage"] as const;

export const Route = createFileRoute("/arc/take/")({
  component: ArcTake,
  head: () => ({
    meta: [
      { title: "Full Arc — Arcus" },
      {
        name: "description",
        content:
          "Take all four assessments in one sitting and see your combined arc.",
      },
      { property: "og:title", content: "Full Arc — Arcus" },
      {
        property: "og:description",
        content: "All four assessments in one sitting, combined.",
      },
    ],
  }),
});

type Phase = "questions" | "saving";
type FlatQ = { q: Question; si: number; assessmentKey: string };

function ArcTake() {
  const navigate = useNavigate();
  const sections = useMemo(
    () =>
      SECTION_KEYS.map((k) => getQuestionSet(k)).filter(
        (s): s is QuestionSet => !!s,
      ),
    [],
  );
  const flat = useMemo<FlatQ[]>(
    () =>
      sections.flatMap((s, si) =>
        s.questions.map((q) => ({ q, si, assessmentKey: s.assessmentKey })),
      ),
    [sections],
  );
  const total = flat.length;

  const [phase, setPhase] = useState<Phase>("questions");
  const [answers, setAnswers] = useState<Record<string, number | string>>({});
  const [idx, setIdx] = useState(0);
  const [pendingFinish, setPendingFinish] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const current = flat[idx];
  const sectionIndex = current?.si ?? 0;
  const section = sections[sectionIndex];
  const keyFor = (si: number, qid: string) => `${si}:${qid}`;
  const currentAnswer = current
    ? answers[keyFor(sectionIndex, current.q.id)]
    : undefined;
  const hasAnswer = currentAnswer !== undefined && currentAnswer !== null;

  const goBack = useCallback(() => setIdx((i) => Math.max(0, i - 1)), []);

  const answer = useCallback(
    (value: number | string) => {
      if (!current) return;
      const k = keyFor(sectionIndex, current.q.id);
      setAnswers((a) => ({ ...a, [k]: value }));
      setIdx((i) => {
        const n = i + 1;
        if (n >= total) {
          setPendingFinish(true);
          return i;
        }
        return n;
      });
    },
    [current, sectionIndex, total],
  );

  const advance = useCallback(() => {
    setIdx((i) => {
      const n = i + 1;
      if (n >= total) {
        setPendingFinish(true);
        return i;
      }
      return n;
    });
  }, [total]);

  // Keyboard shortcuts — same as a single assessment.
  useEffect(() => {
    if (phase !== "questions" || !current) return;
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if ((e.key === "ArrowRight" || e.key === "Enter") && hasAnswer) {
        e.preventDefault();
        advance();
        return;
      }
      if ((e.key === "ArrowLeft" || e.key === "Backspace") && idx > 0) {
        e.preventDefault();
        goBack();
        return;
      }
      const n = Number(e.key);
      if (!Number.isNaN(n) && n >= 1) {
        const q = current.q;
        if (q.type === "bipolar" || q.type === "unipolar") {
          if (n <= q.scale) {
            e.preventDefault();
            answer(n);
          }
        } else if (
          q.type === "crt" ||
          q.type === "heuristic" ||
          q.type === "stance"
        ) {
          const options = choiceOptions(q);
          if (n <= options.length) {
            e.preventDefault();
            answer(options[n - 1].key);
          }
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, current, hasAnswer, advance, goBack, answer, idx]);

  // Combine the four into one composite result, persist it, and go to the
  // persistent result page (survives refresh).
  const finish = useCallback(async () => {
    setPendingFinish(false);
    setPhase("saving");
    setError(null);
    try {
      const components: AssessmentResult[] = [];
      for (let si = 0; si < sections.length; si += 1) {
        const s = sections[si];
        const sectionAnswers: Record<string, number | string> = {};
        for (const q of s.questions) {
          const v = answers[keyFor(si, q.id)];
          if (v !== undefined && v !== null) sectionAnswers[q.id] = v;
        }
        components.push(computeResult(s, sectionAnswers));
      }
      const result = computeFullArcResult(components);
      const saved = await saveResult({
        data: {
          assessmentKey: "full-arc",
          resultType: result.type,
          answers: {},
          result: result as never,
          aiAnalysis: null,
        },
      });
      navigate({ to: "/shared/$token", params: { token: saved.shareToken } });
    } catch {
      setError("Something went wrong saving your result. Please try again.");
      setPhase("questions");
    }
  }, [sections, answers, navigate]);

  // ── Saving ───────────────────────────────────────────────────────────────
  if (phase === "saving") {
    return (
      <PageShell size="sm">
        <div className="text-center py-20 text-default-500">
          Combining your four arcs…
        </div>
      </PageShell>
    );
  }

  // ── Questions (continuous) ───────────────────────────────────────────────
  const sectionMeta = ASSESSMENTS[section?.assessmentKey ?? ""];
  return (
    <>
      <PageShell size="sm">
        <div className="flex flex-col gap-8">
          <ProgressBar current={idx + 1} total={total} />

          {section ? (
            <div className="flex items-center gap-2 text-sm text-default-500">
              {sectionMeta ? (
                <img
                  className="size-5 shrink-0"
                  src={sectionMeta.icon}
                  alt=""
                />
              ) : null}
              <span className="font-semibold text-default-700">
                Section {sectionIndex + 1} of {sections.length}
              </span>
              <span>
                · {section.shortName} — {section.title}
              </span>
            </div>
          ) : null}

          <nav className="flex items-center justify-between gap-2 min-h-10">
            <div>
              {idx > 0 ? (
                <button
                  type="button"
                  className={buttonVariants({ variant: "ghost", size: "sm" })}
                  onClick={goBack}
                >
                  <SolarArrowLeftLineDuotone />
                  Back
                </button>
              ) : (
                <Link
                  to="/start"
                  className={buttonVariants({ variant: "ghost", size: "sm" })}
                >
                  <SolarArrowLeftLineDuotone />
                  Exit
                </Link>
              )}
            </div>
            {hasAnswer ? (
              <button
                type="button"
                className={buttonVariants({ size: "sm" })}
                onClick={advance}
              >
                Next
                <SolarArrowRightLineDuotone />
              </button>
            ) : null}
          </nav>

          {current ? (
            <QuestionView
              question={current.q}
              selected={currentAnswer}
              onPick={answer}
            />
          ) : null}

          {error ? <p className="text-sm text-red-600">{error}</p> : null}
        </div>
      </PageShell>

      {pendingFinish ? (
        <Modal
          isOpen
          onOpenChange={(open) => !open && setPendingFinish(false)}
        >
          <Modal.Backdrop>
            <Modal.Container size="sm" placement="center">
              <Modal.Dialog>
                <Modal.Header>
                  <Modal.Heading>End of the Full Arc</Modal.Heading>
                </Modal.Header>
                <Modal.Body>
                  <p className="text-default-600 leading-relaxed">
                    You've answered all {total} questions across the four
                    assessments. Ready to see your combined arc?
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <button
                    type="button"
                    className={buttonVariants({ variant: "ghost" })}
                    onClick={() => setPendingFinish(false)}
                  >
                    Review answers
                  </button>
                  <button
                    type="button"
                    className={buttonVariants()}
                    onClick={finish}
                  >
                    See your full arc
                  </button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      ) : null}
    </>
  );
}
