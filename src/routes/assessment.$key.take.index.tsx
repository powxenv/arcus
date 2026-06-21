import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Modal, buttonVariants } from "@heroui/react";
import SolarArrowLeftLineDuotone from "~icons/solar/arrow-left-line-duotone";
import SolarArrowRightLineDuotone from "~icons/solar/arrow-right-line-duotone";
import { getQuestionSet } from "../data/questions";
import type { Question } from "../data/questions";
import {
  clearProgress,
  loadProgress,
  saveProgress,
  type AssessmentProgress,
} from "../lib/assessment-progress";
import { computeResult, type AssessmentResult } from "../lib/scoring";
import { ResultView } from "../components/result-view";
import { PageShell } from "../components/ui-system";

export const Route = createFileRoute("/assessment/$key/take/")({
  component: AssessmentTake,
  head: ({ params }) => {
    const set = getQuestionSet(params.key);
    const name = set?.shortName ?? params.key;
    const desc =
      set?.summary ??
      "Take this personality assessment and discover where you stand.";
    return {
      meta: [
        { title: `${name} — Arcus` },
        { name: "description", content: desc },
        { property: "og:title", content: `${name} — Arcus` },
        { property: "og:description", content: desc },
      ],
    };
  },
});

type Phase = "loading" | "questions" | "results";
type Answers = Record<string, number | string>;

function AssessmentTake() {
  const { key } = Route.useParams();
  const set = getQuestionSet(key);

  const [phase, setPhase] = useState<Phase>("loading");
  const [answers, setAnswers] = useState<Answers>({});
  const [index, setIndex] = useState(0);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [pendingFinish, setPendingFinish] = useState<Answers | null>(null);

  const total = set?.questions.length ?? 0;
  const current = set?.questions[index];

  useEffect(() => {
    if (!set) {
      setPhase("questions");
      return;
    }
    let cancelled = false;
    loadProgress().then((progress) => {
      if (cancelled) return;
      if (!progress || progress.assessmentKey !== set.assessmentKey) {
        setPhase("questions");
        return;
      }
      setAnswers(progress.answers);
      setIndex(Math.min(progress.currentIndex, total));
      setPhase("questions");
    });
    return () => {
      cancelled = true;
    };
  }, [set, total]);

  useEffect(() => {
    if (phase !== "questions" || !set) return;
    const progress: AssessmentProgress = {
      assessmentKey: set.assessmentKey,
      answers,
      currentIndex: index,
      total,
      startedAt: Date.now(),
      updatedAt: Date.now(),
    };
    saveProgress(progress);
  }, [answers, index, phase, set, total]);

  const finish = useCallback(
    (finalAnswers: Answers) => {
      if (!set) return;
      setResult(computeResult(set, finalAnswers));
      clearProgress();
      setPhase("results");
    },
    [set],
  );

  const advance = useCallback(() => {
    const nextIdx = index + 1;
    if (nextIdx >= total) {
      setPendingFinish(answers);
    } else {
      setIndex(nextIdx);
    }
  }, [index, total, answers]);

  const goBack = useCallback(() => {
    if (index > 0) setIndex(index - 1);
  }, [index]);

  const answer = useCallback(
    (value: number | string) => {
      if (!set || !current) return;
      const nextAnswers = { ...answers, [current.id]: value };
      setAnswers(nextAnswers);
      const nextIdx = index + 1;
      if (nextIdx >= total) {
        setPendingFinish(nextAnswers);
      } else {
        setIndex(nextIdx);
      }
    },
    [current, set, index, total, answers],
  );

  const currentAnswer = current ? answers[current.id] : undefined;
  const hasAnswer = currentAnswer !== undefined && currentAnswer !== null;

  // Keyboard shortcuts
  useEffect(() => {
    if (phase !== "questions" || !current) return;

    const onKey = (e: KeyboardEvent) => {
      // Never intercept when typing into an input.
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      // ArrowRight / Enter → next (when answered).
      if ((e.key === "ArrowRight" || e.key === "Enter") && hasAnswer) {
        e.preventDefault();
        advance();
        return;
      }
      // ArrowLeft / Backspace → previous.
      if ((e.key === "ArrowLeft" || e.key === "Backspace") && index > 0) {
        e.preventDefault();
        goBack();
        return;
      }

      // Number keys → select answer.
      const n = Number(e.key);
      if (!Number.isNaN(n) && n >= 1) {
        if (current.type === "bipolar" || current.type === "unipolar") {
          const max = current.scale;
          if (n <= max) {
            e.preventDefault();
            answer(n);
          }
        } else if (
          current.type === "crt" ||
          current.type === "heuristic" ||
          current.type === "stance"
        ) {
          const options = choiceOptions(current);
          if (n <= options.length) {
            e.preventDefault();
            answer(options[n - 1].key);
          }
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, current, hasAnswer, advance, goBack, answer, index]);

  const confirmFinish = useCallback(() => {
    if (!pendingFinish) return;
    finish(pendingFinish);
    setPendingFinish(null);
  }, [pendingFinish, finish]);

  const startFresh = useCallback(() => {
    setAnswers({});
    setIndex(0);
    clearProgress();
    setPhase("questions");
  }, []);

  if (!set) {
    return (
      <PageShell size="sm">
        <div className="text-center flex flex-col items-center gap-4">
          <h1 className="text-3xl font-bold">Assessment not found</h1>
          <Link to="/start" className={buttonVariants({ variant: "outline" })}>
            Back to start
          </Link>
        </div>
      </PageShell>
    );
  }

  if (phase === "loading") return <PageShell size="sm" />;

  if (phase === "results" && result) {
    return (
      <ResultView
        result={result}
        questionSet={set}
        answers={answers}
        own
        onRetake={startFresh}
      />
    );
  }

  return (
    <>
      <PageShell size="sm">
        <div className="flex flex-col gap-8">
          <ProgressBar current={index + 1} total={total} />

          <nav className="flex items-center justify-between gap-2 min-h-10">
            <div>
              {index > 0 ? (
                <button
                  type="button"
                  className={buttonVariants({ variant: "ghost", size: "sm" })}
                  onClick={goBack}
                >
                  <SolarArrowLeftLineDuotone />
                  Back
                </button>
              ) : null}
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
              question={current}
              selected={currentAnswer}
              onPick={answer}
            />
          ) : null}
        </div>
      </PageShell>

      {pendingFinish ? (
        <Modal
          isOpen
          onOpenChange={(open) => !open && setPendingFinish(null)}
        >
          <Modal.Backdrop>
            <Modal.Container size="sm" placement="center">
              <Modal.Dialog>
                <Modal.Header>
                  <Modal.Heading>End of assessment</Modal.Heading>
                </Modal.Header>
                <Modal.Body>
                  <p className="text-default-600 leading-relaxed">
                    You have answered all {total} questions. Ready to see your
                    results?
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <button
                    type="button"
                    className={buttonVariants({ variant: "ghost" })}
                    onClick={() => setPendingFinish(null)}
                  >
                    Review answers
                  </button>
                  <button
                    type="button"
                    className={buttonVariants()}
                    onClick={confirmFinish}
                  >
                    See results
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

// ── Progress ─────────────────────────────────────────────────────────────────

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;
  return (
    <div className="flex flex-col gap-2">
      <p className="flex items-baseline gap-1 text-sm text-default-500">
        <span className="tabular-nums font-semibold text-default-700">
          {Math.min(current, total)}
        </span>
        <span>of {total}</span>
      </p>
      <div className="h-1.5 rounded-full bg-default-200 overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// ── Question + Input ────────────────────────────────────────────────────────

function QuestionView({
  question,
  selected,
  onPick,
}: {
  question: Question;
  selected?: number | string;
  onPick: (value: number | string) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <Prompt question={question} />

      {question.type === "bipolar" || question.type === "unipolar" ? (
        <NumberScale
          count={question.type === "bipolar" ? 7 : 5}
          selected={typeof selected === "number" ? selected : undefined}
          onSelect={onPick}
          labels={
            question.type === "bipolar"
              ? [question.poleB, question.poleA]
              : ["Strongly disagree", "Strongly agree"]
          }
        />
      ) : (
        <ChoiceList
          options={choiceOptions(question)}
          selected={typeof selected === "string" ? selected : undefined}
          onSelect={onPick}
        />
      )}
    </div>
  );
}

function choiceOptions(question: Question): { key: string; label: string }[] {
  if (question.type === "crt") {
    return [
      { key: "correct", label: question.correctAnswer },
      { key: "intuitive", label: question.intuitiveAnswer },
    ];
  }
  if (question.type === "heuristic") {
    return [
      { key: "A", label: question.optionA },
      { key: "B", label: question.optionB },
    ];
  }
  if (question.type === "stance") {
    return question.options.map((o) => ({ key: o.value, label: o.label }));
  }
  return [];
}

function Prompt({ question }: { question: Question }) {
  if (question.type === "bipolar") {
    return (
      <h1 className="text-2xl sm:text-3xl font-bold leading-snug text-balance">
        {question.stem}
      </h1>
    );
  }
  if (question.type === "heuristic") {
    return (
      <div className="flex flex-col gap-2">
        <span className="text-sm text-default-400">Which would you choose?</span>
        <h1 className="text-2xl sm:text-3xl font-bold leading-snug text-balance">
          {question.scenario}
        </h1>
      </div>
    );
  }
  return (
    <h1 className="text-2xl sm:text-3xl font-bold leading-snug text-balance">
      {question.type === "unipolar"
        ? question.statement
        : question.prompt}
    </h1>
  );
}

// ── Unified answer components ───────────────────────────────────────────────

type Option = { key: string; label: string };

function OptionCard({
  prefix,
  label,
  active,
  onSelect,
}: {
  prefix?: number;
  label?: string;
  active: boolean;
  onSelect: () => void;
}) {
  const base =
    "flex items-center gap-3 w-full text-left rounded-2xl border-[.5px] p-4 transition-colors";
  const activeCls = active
    ? "bg-accent-soft text-accent-soft-foreground border-accent"
    : "bg-white text-default-800 border-default-200 hover:border-accent hover:bg-accent-soft";

  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onSelect}
      className={`${base} ${activeCls}`}
    >
      {prefix !== undefined ? (
        <span
          className={
            active
              ? "w-8 shrink-0 text-center tabular-nums text-lg font-bold"
              : "w-8 shrink-0 text-center tabular-nums text-lg font-semibold text-default-400"
          }
        >
          {prefix}
        </span>
      ) : null}
      {label ? <span className="flex-1 font-medium">{label}</span> : null}
    </button>
  );
}

function NumberScale({
  count,
  selected,
  onSelect,
  labels,
}: {
  count: number;
  selected?: number;
  onSelect: (value: number) => void;
  labels: [string, string];
}) {
  return (
    <div className="flex flex-col gap-3">
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: count }, (_, i) => i + 1).map((value) => (
          <OptionCard
            key={value}
            prefix={value}
            active={selected === value}
            onSelect={() => onSelect(value)}
          />
        ))}
      </div>
      <div className="flex items-center justify-between text-sm text-default-500 font-medium px-1">
        <span>{labels[0]}</span>
        <span>{labels[1]}</span>
      </div>
    </div>
  );
}

function ChoiceList({
  options,
  selected,
  onSelect,
}: {
  options: Option[];
  selected?: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {options.map((option) => (
        <OptionCard
          key={option.key}
          label={option.label}
          active={selected === option.key}
          onSelect={() => onSelect(option.key)}
        />
      ))}
    </div>
  );
}
