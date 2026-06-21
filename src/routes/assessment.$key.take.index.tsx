import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { buttonVariants } from "@heroui/react";
import SolarArrowLeftLineDuotone from "~icons/solar/arrow-left-line-duotone";
import SolarArrowRightLineDuotone from "~icons/solar/arrow-right-line-duotone";
import SolarCheckCircleLineDuotone from "~icons/solar/check-circle-line-duotone";
import { getQuestionSet } from "../data/questions";
import type {
  BipolarQuestion,
  CrtQuestion,
  HeuristicQuestion,
  Question,
  StanceQuestion,
  UnipolarQuestion,
} from "../data/questions";
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
    const desc = set?.summary ?? "Take this personality assessment and discover where you stand.";
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

  const total = set?.questions.length ?? 0;

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

  const current = set?.questions[index];

  const advance = useCallback(
    (nextAnswers: Answers) => {
      const nextIndex = index + 1;
      setIndex(nextIndex);
      if (nextIndex >= total) finish(nextAnswers);
    },
    [finish, index, total],
  );

  const answer = useCallback(
    (question: Question, value: number | string) => {
      if (!set) return;
      const nextAnswers = { ...answers, [question.id]: value };
      setAnswers(nextAnswers);
      // CRT and heuristics need an explicit Continue (free-text / no default
      // selection). Others auto-advance on pick for flow.
      if (question.type === "crt" || question.type === "heuristic") return;
      advance(nextAnswers);
    },
    [advance, answers, set],
  );

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

  // phase === "questions"
  return (
    <PageShell size="sm">
      <div className="flex flex-col gap-10">
        <ProgressBar current={index + 1} total={total} />

        {current ? (
          <QuestionView
            question={current}
            answers={answers}
            onPick={(value) => answer(current, value)}
            onContinue={() => advance(answers)}
            onBack={index > 0 ? () => setIndex(index - 1) : undefined}
          />
        ) : null}
      </div>
    </PageShell>
  );
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct =
    total > 0 ? Math.min(100, Math.round((current / total) * 100)) : 0;
  return (
    <div className="flex flex-col gap-1.5">
      <p className="flex items-center justify-between text-sm text-default-400">
        <span>
          Question {Math.min(current, total)} of {total}
        </span>
        <span className="tabular-nums">{pct}%</span>
      </p>
      <div className="h-1 rounded-full bg-default-200 overflow-hidden">
        <div
          className="h-full bg-orange-600 rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function QuestionView({
  question,
  answers,
  onPick,
  onContinue,
  onBack,
}: {
  question: Question;
  answers: Answers;
  onPick: (value: number | string) => void;
  onContinue: () => void;
  onBack?: () => void;
}) {
  const selected = answers[question.id];
  const needsContinue = question.type === "crt" || question.type === "heuristic";

  return (
    <div className="flex flex-col gap-8">
      <Prompt question={question} />

      {question.type === "bipolar" ? (
        <BipolarInput
          question={question}
          selected={typeof selected === "number" ? selected : undefined}
          onSelect={onPick}
        />
      ) : question.type === "unipolar" ? (
        <UnipolarInput
          question={question}
          selected={typeof selected === "number" ? selected : undefined}
          onSelect={onPick}
        />
      ) : question.type === "crt" ? (
        <CrtInput
          question={question}
          selected={typeof selected === "string" ? selected : undefined}
          onSelect={onPick}
        />
      ) : question.type === "heuristic" ? (
        <HeuristicInput
          question={question}
          selected={selected === "A" || selected === "B" ? selected : undefined}
          onSelect={onPick}
        />
      ) : (
        <StanceInput
          question={question}
          selected={typeof selected === "string" ? selected : undefined}
          onSelect={onPick}
        />
      )}

      <div className="flex items-center justify-between pt-2">
        {onBack ? (
          <button
            type="button"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
            onClick={onBack}
          >
            <SolarArrowLeftLineDuotone />
            Back
          </button>
        ) : (
          <span />
        )}
        {needsContinue ? (
          <button
            type="button"
            className={buttonVariants({ size: "sm" })}
            onClick={onContinue}
          >
            Continue
            <SolarArrowRightLineDuotone />
          </button>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}

function Prompt({ question }: { question: Question }) {
  // The question itself is always the largest, most prominent element on the
  // screen. Helper text ("which would you choose", the pole anchors) stays
  // quiet so it never competes with the thing the user is actually answering.
  if (question.type === "bipolar") {
    // The stem sets up a sentence the two poles finish. So the stem *is* the
    // question, and it owns the focal heading.
    return (
      <h1 className="text-2xl sm:text-3xl font-bold leading-snug text-balance">
        {question.stem}
      </h1>
    );
  }
  if (question.type === "unipolar") {
    return (
      <h1 className="text-2xl sm:text-3xl font-bold leading-snug text-balance">
        {question.statement}
      </h1>
    );
  }
  if (question.type === "crt") {
    return (
      <h1 className="text-2xl sm:text-3xl font-bold leading-snug text-balance">
        {question.prompt}
      </h1>
    );
  }
  if (question.type === "heuristic") {
    // The scenario is the question. The "which would you choose" label is a
    // small cue, not a competing headline.
    return (
      <div className="flex flex-col gap-2">
        <span className="text-sm text-default-400 uppercase tracking-wide">
          Which would you choose?
        </span>
        <h1 className="text-xl sm:text-2xl font-semibold leading-snug text-default-800 text-pretty">
          {question.scenario}
        </h1>
      </div>
    );
  }
  // stance
  return (
    <h1 className="text-2xl sm:text-3xl font-bold leading-snug text-balance">
      {question.prompt}
    </h1>
  );
}

function Segmented({
  count,
  selected,
  onSelect,
  labels,
}: {
  count: number;
  selected?: number;
  onSelect: (value: number) => void;
  labels: string[];
}) {
  return (
    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}>
      {[1, 2, 3, 4, 5, 6, 7].slice(0, count).map((value) => {
        const active = selected === value;
        return (
          <button
            key={value}
            type="button"
            aria-pressed={active}
            onClick={() => onSelect(value)}
            className={
              active
                ? "h-14 rounded-xl bg-orange-600 text-white font-bold border-[.5px] border-orange-600 transition-colors"
                : "h-14 rounded-xl bg-white text-default-700 font-semibold border-[.5px] border-default-200 hover:border-orange-400 hover:bg-default-50 transition-colors"
            }
          >
            {value}
          </button>
        );
      })}
      <div className="col-span-full flex items-center justify-between text-base font-medium text-default-700 px-1">
        <span>{labels[0]}</span>
        <span>{labels[1]}</span>
      </div>
    </div>
  );
}

function BipolarInput({
  question,
  selected,
  onSelect,
}: {
  question: BipolarQuestion;
  selected?: number;
  onSelect: (value: number) => void;
}) {
  return (
    <Segmented
      count={7}
      selected={selected}
      onSelect={onSelect}
      labels={[question.poleB, question.poleA]}
    />
  );
}

const UNIPOLAR_LABELS = ["Strongly disagree", "Strongly agree"];

function UnipolarInput({
  selected,
  onSelect,
}: {
  question: UnipolarQuestion;
  selected?: number;
  onSelect: (value: number) => void;
}) {
  return (
    <Segmented count={5} selected={selected} onSelect={onSelect} labels={UNIPOLAR_LABELS} />
  );
}

function CrtInput({
  question,
  selected,
  onSelect,
}: {
  question: CrtQuestion;
  selected?: string;
  onSelect: (value: string) => void;
}) {
  const options: { key: string; label: string }[] = [
    { key: "correct", label: question.correctAnswer },
    { key: "intuitive", label: question.intuitiveAnswer },
  ];
  return (
    <div className="flex flex-col gap-2">
      {options.map((option) => {
        const active = selected === option.key;
        return (
          <button
            key={option.key}
            type="button"
            aria-pressed={active}
            onClick={() => onSelect(option.key)}
            className={
              active
                ? "flex items-center gap-3 p-4 rounded-2xl bg-orange-600 text-white border-[.5px] border-orange-600 text-left transition-colors"
                : "flex items-center gap-3 p-4 rounded-2xl bg-white text-default-800 border-[.5px] border-default-200 hover:border-orange-400 hover:bg-default-50 text-left transition-colors"
            }
          >
            <span className="flex-1 font-medium">{option.label}</span>
            {active ? (
              <SolarCheckCircleLineDuotone className="size-5 shrink-0" />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

function HeuristicInput({
  question,
  selected,
  onSelect,
}: {
  question: HeuristicQuestion;
  selected?: "A" | "B";
  onSelect: (value: "A" | "B") => void;
}) {
  const options: { key: "A" | "B"; label: string }[] = [
    { key: "A", label: question.optionA },
    { key: "B", label: question.optionB },
  ];
  return (
    <div className="flex flex-col gap-2">
      {options.map((option) => {
        const active = selected === option.key;
        return (
          <button
            key={option.key}
            type="button"
            aria-pressed={active}
            onClick={() => onSelect(option.key)}
            className={
              active
                ? "flex items-center gap-3 p-4 rounded-2xl bg-orange-600 text-white border-[.5px] border-orange-600 text-left transition-colors"
                : "flex items-center gap-3 p-4 rounded-2xl bg-white text-default-800 border-[.5px] border-default-200 hover:border-orange-400 hover:bg-default-50 text-left transition-colors"
            }
          >
            <span className="flex-1 font-medium">{option.label}</span>
            {active ? (
              <SolarCheckCircleLineDuotone className="size-5 shrink-0" />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

function StanceInput({
  question,
  selected,
  onSelect,
}: {
  question: StanceQuestion;
  selected?: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {question.options.map((option) => {
        const active = selected === option.value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onSelect(option.value)}
            className={
              active
                ? "flex items-center gap-3 p-4 rounded-2xl bg-orange-600 text-white border-[.5px] border-orange-600 text-left transition-colors"
                : "flex items-center gap-3 p-4 rounded-2xl bg-white text-default-800 border-[.5px] border-default-200 hover:border-orange-400 hover:bg-default-50 text-left transition-colors"
            }
          >
            <span className="flex-1 font-medium">{option.label}</span>
            {active ? (
              <SolarCheckCircleLineDuotone className="size-5 shrink-0" />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

