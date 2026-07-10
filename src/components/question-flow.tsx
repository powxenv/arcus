// Shared question-presentation components used by both the single-assessment
// take flow (assessment.$key.take) and the full-arc take flow (arc.take), so
// the two experiences look and behave identically.

import type { Question } from "../data/questions";

// ── Progress ────────────────────────────────────────────────────────────────

export function ProgressBar({ current, total }: { current: number; total: number }) {
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

export function QuestionView({
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

export function choiceOptions(question: Question): { key: string; label: string }[] {
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
      {question.type === "unipolar" ? question.statement : question.prompt}
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

export function NumberScale({
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

export function ChoiceList({
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
