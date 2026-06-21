import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { buttonVariants } from "@heroui/react";
import SolarArrowRightLineDuotone from "~icons/solar/arrow-right-line-duotone";
import SolarShareLineDuotone from "~icons/solar/share-line-duotone";
import type { AssessmentResult } from "../lib/scoring";
import type { QuestionSet } from "../data/questions";
import { DIMENSION_EXPLANATIONS } from "../data/dimension-explanations";
import { RESULT_DETAILS } from "../data/result-details";
import { ASSESSMENTS } from "./assessment-data";
import { saveResult } from "../server/results";
import { getAIAnalysis } from "../server/ai-analysis";
import {
  Hero,
  PageShell,
  PageStack,
  QuietCallout,
  Section,
  Surface,
} from "./ui-system";

type Props = {
  result: AssessmentResult;
  questionSet: QuestionSet;
  answers: Record<string, number | string>;
  // When true, this is the owner's own freshly-computed result; show save/share
  // and retake. When false (shared view), show only the read-only result.
  own?: boolean;
  onRetake?: () => void;
};

export function ResultView({
  result,
  questionSet,
  answers,
  own = true,
  onRetake,
}: Props) {
  const assessment = ASSESSMENTS[result.assessmentKey];
  const dimensionExplanations =
    DIMENSION_EXPLANATIONS[result.assessmentKey] ?? [];

  const [shareToken, setShareToken] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const [aiText, setAiText] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiConsentShown, setAiConsentShown] = useState(true);

  const constructLabel = useMemo(() => {
    const map = new Map(questionSet.constructs.map((c) => [c.key, c.label]));
    return (key: string) => map.get(key) ?? key;
  }, [questionSet]);

  const modifierLine = useMemo(() => modifierNarrative(result), [result]);
  const geometryNotes = useMemo(() => geometryNarrative(result), [result]);

  async function handleShare() {
    setSaving(true);
    setSaveError(null);
    try {
      const out = await saveResult({
        data: {
          assessmentKey: result.assessmentKey,
          resultType: result.type,
          answers,
          result: result as never,
        },
      });
      setShareToken(out.shareToken);
    } catch {
      setSaveError(
        "Could not create a share link right now. Your result is still visible below.",
      );
    } finally {
      setSaving(false);
    }
  }

  function copyLink() {
    if (typeof window === "undefined" || !shareToken) return;
    const url = `${window.location.origin}/shared/${shareToken}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    });
  }

  async function handleGenerateAI() {
    setAiLoading(true);
    setAiError(null);
    try {
      const assessment = ASSESSMENTS[result.assessmentKey];
      const dims = DIMENSION_EXPLANATIONS[result.assessmentKey] ?? [];
      const detailKey = result.detail
        ? result.type
        : null;
      const det = detailKey
        ? RESULT_DETAILS[result.assessmentKey]?.[detailKey]
        : null;

      const qs = questionSet.questions
        .filter((q) => answers[q.id] !== undefined && answers[q.id] !== null)
        .map((q) => {
          let text: string;
          if (q.type === "bipolar") text = q.stem ?? q.id;
          else if (q.type === "unipolar") text = q.statement;
          else if (q.type === "heuristic") text = q.scenario;
          else text = q.prompt;
          return { id: q.id, text, construct: q.construct };
        });

      const text = await getAIAnalysis({
        data: {
          assessmentKey: result.assessmentKey,
          context: {
            assessmentSummary: assessment?.overview ?? result.summary,
            resultMeaning: det?.meaning,
            resultEveryday: det?.everyday,
            resultHowToRead: det?.howToRead,
            dimensions: dims.map((d) => ({
              key: d.key,
              label: d.plain,
              plain: d.plain,
              high: d.high,
              low: d.low,
            })),
          },
          questions: qs,
          answers,
          result: {
            type: result.type,
            scores: result.scores.map((s) => ({
              key: s.key,
              label: s.label,
              value: s.value,
            })),
            modifier: result.modifier?.value,
            secondaryModifier: result.secondaryModifier?.value,
          },
        },
      });
      setAiText(text);
    } catch {
      setAiError("Could not generate analysis. Try again later.");
    } finally {
      setAiLoading(false);
    }
  }

  const shareUrl =
    typeof window !== "undefined" && shareToken
      ? `${window.location.origin}/shared/${shareToken}`
      : null;

  return (
    <PageShell>
      <PageStack gap="sm">
        {/* Headline */}
        <Hero
          eyebrow="Your result"
          icon={assessment?.icon}
          title={`${result.emoji}  ${result.type}`}
          meta={assessment ? assessment.name : undefined}
        >
          {result.summary}
        </Hero>

        {/* What this means for you */}
        {result.detail ? (
          <Section title="What this means for you">
            <Surface className="flex flex-col gap-3">
              <p className="text-base text-default-700 leading-relaxed text-pretty">
                {result.detail.meaning}
              </p>
              {result.detail.everyday ? (
                <p className="text-base text-default-600 leading-relaxed text-pretty">
                  {result.detail.everyday}
                </p>
              ) : null}
              <p className="text-base text-default-600 leading-relaxed text-pretty">
                {result.detail.howToRead}
              </p>
            </Surface>
          </Section>
        ) : null}

        {/* How this shows up */}
        {modifierLine ? (
          <QuietCallout>
            <p className="text-base text-default-800 leading-relaxed text-pretty">
              {modifierLine}
            </p>
          </QuietCallout>
        ) : null}

        {/* Your dimensions */}
        {result.scores.length > 0 ? (
          <Section
            title="What this measures in you"
            intro="Each bar is a separate side of the result. A higher bar isn't better. What matters is the shape they make together."
          >
            <Surface className="flex flex-col gap-5">
              {result.scores.map((score) => {
                const expl = dimensionExplanations.find(
                  (e) => e.key === score.key,
                );
                return (
                  <div key={score.key} className="flex flex-col gap-1.5">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-medium text-default-800">
                        {constructLabel(score.key) || score.label}
                      </span>
                      <span className="text-sm text-default-400 tabular-nums">
                        {score.value}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-default-200 overflow-hidden">
                      <div
                        className="h-full bg-orange-600 rounded-full"
                        style={{ width: `${score.value}%` }}
                      />
                    </div>
                    {expl ? (
                      <p className="text-sm text-default-500 leading-relaxed">
                        {expl.plain}{" "}
                        <span className="text-default-400">
                          {score.value >= 50 ? expl.high : expl.low}
                        </span>
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </Surface>
          </Section>
        ) : null}

        {/* Insights from your position */}
        {geometryNotes ? (
          <QuietCallout>
            <p className="text-sm text-default-700 leading-relaxed text-pretty">
              {geometryNotes}
            </p>
          </QuietCallout>
        ) : null}

        {/* Between-types note */}
        {result.notes && result.notes.length > 0 ? (
          <QuietCallout>
            {result.notes.map((note, i) => (
              <p
                key={i}
                className="text-sm text-default-700 leading-relaxed text-pretty"
              >
                {note}
              </p>
            ))}
          </QuietCallout>
        ) : null}

        {/* Personalized analysis (AI, opt-in) */}
        {own && aiConsentShown && !aiText ? (
          <Section title="Personalized analysis">
            <Surface className="flex flex-col gap-3">
              <p className="text-sm text-default-600 leading-relaxed">
                Send your scores to an AI model for a richer, narrative
                interpretation. Your responses stay anonymous and are only used
                for this one request. This step is optional.
              </p>
              {aiError ? (
                <p className="text-sm text-red-600">{aiError}</p>
              ) : null}
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className={buttonVariants()}
                  onClick={handleGenerateAI}
                  disabled={aiLoading}
                >
                  {aiLoading ? "Generating..." : "Generate personal analysis"}
                </button>
                <button
                  type="button"
                  className={buttonVariants({ variant: "ghost" })}
                  onClick={() => setAiConsentShown(false)}
                  disabled={aiLoading}
                >
                  Skip
                </button>
              </div>
            </Surface>
          </Section>
        ) : null}

        {aiText ? (
          <Section title="Personalized analysis">
            <Surface className="flex flex-col gap-3">
              <p className="text-sm text-default-700 leading-relaxed text-pretty whitespace-pre-wrap">
                {aiText}
              </p>
              <p className="text-sm text-default-500">
                This interpretation was generated by AI and is not part of the
                validated assessment framework. It is provided as additional
                perspective, not as clinical guidance.
              </p>
            </Surface>
          </Section>
        ) : null}

        {/* Save & share */}
        {own ? (
          <Section title="Save and share">
            <Surface className="flex flex-col gap-3">
              <p className="text-sm text-default-600 leading-relaxed">
                Save your result to get a link you can share. Shared results are
                anonymous. They only show the result, never your individual
                answers.
              </p>
              {shareUrl ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-stretch gap-2">
                    <input
                      readOnly
                      value={shareUrl}
                      className="flex-1 h-10 rounded-xl border-[.5px] border-default-200 bg-default-50 px-3 text-sm text-default-700"
                    />
                    <button
                      type="button"
                      className={buttonVariants({ variant: "outline" })}
                      onClick={copyLink}
                    >
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      to="/shared/$token"
                      params={{ token: shareToken! }}
                      className={buttonVariants()}
                    >
                      <SolarShareLineDuotone />
                      Open share page
                    </Link>
                    {onRetake ? (
                      <button
                        type="button"
                        className={buttonVariants({ variant: "ghost" })}
                        onClick={onRetake}
                      >
                        Retake
                      </button>
                    ) : null}
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className={buttonVariants()}
                    onClick={handleShare}
                    disabled={saving}
                  >
                    {saving ? (
                      "Saving…"
                    ) : (
                      <>
                        <SolarShareLineDuotone />
                        Create share link
                      </>
                    )}
                  </button>
                  {onRetake ? (
                    <button
                      type="button"
                      className={buttonVariants({ variant: "ghost" })}
                      onClick={onRetake}
                    >
                      Retake
                    </button>
                  ) : null}
                </div>
              )}
              {saveError ? (
                <p className="text-sm text-red-600">{saveError}</p>
              ) : null}
            </Surface>
          </Section>
        ) : null}

        <div className="flex flex-wrap gap-2">
          <Link to="/start" className={buttonVariants({ variant: "ghost" })}>
            {own ? "Try another assessment" : "Take your own assessment"}
            <SolarArrowRightLineDuotone />
          </Link>
        </div>

        <p className="text-sm text-default-400">
          Arcus is for self-discovery and reflection. It isn't a clinical
          assessment and doesn't diagnose anything.
        </p>
      </PageStack>
    </PageShell>
  );
}

// A single warm line about the direction or stance layer, if there is one.
function modifierNarrative(result: AssessmentResult): string | null {
  if (!result.modifier) return null;
  const value = result.modifier.value;

  switch (result.assessmentKey) {
    case "solstice":
      if (value === "waxing")
        return "Right now, your energy feels like it's still gathering. Climbing toward a peak. That's momentum you can spend.";
      if (value === "waning")
        return "Right now, your energy feels like it's settling. Turning toward rest. That's a natural moment to consolidate before the cycle turns again.";
      return "Right now, your energy feels level. Neither clearly rising nor falling.";
    case "pride": {
      if (value === "committed")
        return "Your identity feels claimed. 'This is who I am.' That settledness can be a real strength, and occasionally a rigidity worth noticing.";
      if (value === "exploring")
        return "Your identity still feels in progress. 'I'm becoming.' That openness isn't uncertainty to fix; it's part of how you move.";
      return "Your identity reads as neither strongly settled nor strongly in flux. More situational than fixed either way.";
    }
    case "passage": {
      const map: Record<string, string> = {
        resource:
          "You relate to time as something to spend well. Worth watching whether that tips into measuring it instead of living in it.",
        weight:
          "You carry time as something heavy. If that weight feels sustained rather than passing, it may be worth paying attention to.",
        gift: "You receive time as something given. This stance tends to come with gratitude and presence.",
        mystery:
          "You dwell in time as something to sit with rather than use. Less about productivity, more about being inside it.",
      };
      return map[value] ?? null;
    }
    case "turing": {
      const strat = value;
      const gap = result.secondaryModifier?.value;
      const stratText =
        strat === "take-the-best"
          ? "When it's time to decide, you lean on one strong reason rather than weighing many."
          : strat === "tallying"
            ? "When it's time to decide, you weigh many reasons together rather than betting on a single one."
            : "When it's time to decide, you shift between one strong reason and many reasons, depending on the case.";
      const gapText =
        gap === "divergent"
          ? " What you say about your thinking and what your choices show point in different directions. That gap is itself worth noticing."
          : gap === "congruent"
            ? " What you say about your thinking lines up with how your choices play out."
            : "";
      return stratText + gapText;
    }
    default:
      return null;
  }
}

// A plain-language note about the geometry of the result — how clearly the
// person sits in their type, where they are within it, and whether facet
// tension makes the axis score a compromise rather than a signal.
function geometryNarrative(result: AssessmentResult): string | null {
  const g = result.geometry;
  if (!g) return null;

  const parts: string[] = [];

  // Prototypicality
  if (g.isBoundary) {
    parts.push(
      "You sit near the boundary between types rather than squarely in one. The position is a soft fit, and the scores below tell a clearer story than the label alone.",
    );
  } else if (g.prototypicality > 0.6) {
    parts.push("This type is a strong fit for you.");
  } else if (g.prototypicality > 0.4) {
    parts.push("This type is a clear fit for you.");
  } else {
    parts.push(
      "This type fits, but not sharply. You sit closer to the boundary.",
    );
  }

  // Gradation (only for two-axis tests with defined seasons)
  if (g.gradation) {
    parts.push(
      `You are in the ${g.gradation.toLowerCase()} phase of this type.`,
    );
  }

  // Facet tension
  const tenseAxes = g.facetTension?.filter((t) => t.tense).map((t) => t.axis);
  if (tenseAxes && tenseAxes.length > 0) {
    const label =
      result.assessmentKey === "solstice"
        ? tenseAxes.includes("A")
          ? "energy"
          : "direction"
        : tenseAxes.includes("A")
          ? "clarity"
          : "alignment";
    parts.push(
      `On ${label}, two separate sides pull in opposite directions and both are strong. ` +
        `Your score lands in the middle because they cancel each other, not because you are moderate. ` +
        `The individual scores above give a fuller picture.`,
    );
  }

  return parts.length > 0 ? parts.join(" ") : null;
}
