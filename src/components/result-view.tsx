import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Modal, buttonVariants } from "@heroui/react";
import SolarArrowRightLineDuotone from "~icons/solar/arrow-right-line-duotone";
import SolarShareLineDuotone from "~icons/solar/share-line-duotone";
import type { AssessmentResult } from "../lib/scoring";
import type { QuestionSet } from "../data/questions";
import { DIMENSION_EXPLANATIONS } from "../data/dimension-explanations";
import { RESULT_DETAILS } from "../data/result-details";
import { ASSESSMENTS } from "./assessment-data";
import { updateAIAnalysis } from "../server/results";
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
  initialAiText?: string | null;
  initialShareToken?: string | null;
};

export function ResultView({
  result,
  questionSet,
  answers,
  own = true,
  onRetake,
  initialAiText,
  initialShareToken,
}: Props) {
  const assessment = ASSESSMENTS[result.assessmentKey];
  const dimensionExplanations =
    DIMENSION_EXPLANATIONS[result.assessmentKey] ?? [];

  const [shareToken, setShareToken] = useState<string | null>(
    initialShareToken ?? null,
  );

  // Sync share token from the take route's auto-save when it arrives.
  useEffect(() => {
    if (initialShareToken) setShareToken(initialShareToken);
  }, [initialShareToken]);
  const [copied, setCopied] = useState(false);
  const [showResultModal, setShowResultModal] = useState(own);

  const [aiText, setAiText] = useState<string | null>(initialAiText ?? null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiConsentShown, setAiConsentShown] = useState(true);

  const constructLabel = useMemo(() => {
    const map = new Map(questionSet.constructs.map((c) => [c.key, c.label]));
    return (key: string) => map.get(key) ?? key;
  }, [questionSet]);

  const modifierLine = useMemo(() => modifierNarrative(result), [result]);
  const geometryNotes = useMemo(() => geometryNarrative(result), [result]);


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
      // Persist the AI analysis to the shared result so the shared page
      // matches what the owner sees.
      if (shareToken) {
        updateAIAnalysis({ data: { shareToken, aiAnalysis: text } });
      }
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
                        className="h-full bg-accent rounded-full"
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
            <Surface className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-sm text-default-500">
                <span>Powered by</span>
                <NvidiaLogo />
                <span className="text-default-300">+</span>
                <GoogleLogo />
              </div>
              <p className="text-sm text-default-600 leading-relaxed">
                Your scores and responses can be sent to{' '}
                <strong>
                  Google Gemma 4 31B
                </strong> hosted on{' '}
                <strong>NVIDIA</strong> for a richer, narrative interpretation.
                No personal data is stored. The analysis is generated from
                this session only and then discarded. This step is optional.
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
            <Surface className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-sm text-default-500">
                <NvidiaLogo />
                <span className="text-default-300">+</span>
                <GoogleLogo />
                <span className="text-default-400">
                  Generated by <strong>Google Gemma 4 31B</strong> via{' '}
                  <strong>NVIDIA</strong>
                </span>
              </div>
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

        {/* Share */}
        {own && shareToken ? (
          <Section title="Share">
            <Surface className="flex flex-col gap-3">
              <p className="text-sm text-default-600 leading-relaxed">
                Share this link to let others see your result. Shared results
                are anonymous — they show only the result, never your
                individual answers.
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex items-stretch gap-2">
                  <input
                    readOnly
                    value={shareUrl ?? ""}
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

      {showResultModal ? (
        <Modal
          isOpen
          onOpenChange={(open) => !open && setShowResultModal(false)}
        >
          <Modal.Backdrop>
            <Modal.Container size="md" placement="center">
              <Modal.Dialog>
                <Modal.Body>
                  <div className="flex flex-col items-center text-center gap-5 py-8">
                    <span className="text-5xl sm:text-6xl leading-none select-none">
                      {result.emoji}
                    </span>

                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-medium text-default-500 tracking-wider uppercase">
                        Your result
                      </p>
                      <Modal.Heading className="text-2xl sm:text-3xl font-bold">
                        {result.type}
                      </Modal.Heading>
                    </div>

                    <p className="text-base text-default-600 leading-relaxed max-w-sm">
                      {result.detail?.meaning ?? result.summary}
                    </p>

                    <button
                      type="button"
                      className={buttonVariants()}
                      onClick={() => setShowResultModal(false)}
                    >
                      See your full result
                    </button>
                  </div>
                </Modal.Body>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      ) : null}
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

// A plain-language note about the geometry of the result. How clearly the
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

function NvidiaLogo() {
  return (
    <svg
      viewBox="30 30 260 210"
      className="h-5 w-auto shrink-0"
      fill="none"
      aria-label="NVIDIA"
    >
      <path
        d="M82.211,102.414c0,0,22.504-33.203,67.437-36.638V53.73
	c-49.769,3.997-92.867,46.149-92.867,46.149s24.41,70.565,92.867,77.026v-12.804C99.411,157.781,82.211,102.414,82.211,102.414z
	 M149.648,138.637v11.726c-37.968-6.769-48.507-46.237-48.507-46.237s18.23-20.195,48.507-23.47v12.867
	c-0.023,0-0.039-0.007-0.058-0.007c-15.891-1.907-28.305,12.938-28.305,12.938S128.243,131.445,149.648,138.637 M149.648,31.512
	V53.73c1.461-0.112,2.922-0.207,4.391-0.257c56.582-1.907,93.449,46.406,93.449,46.406s-42.343,51.488-86.457,51.488
	c-4.043,0-7.828-0.375-11.383-1.005v13.739c3.04,0.386,6.192,0.613,9.481,0.613c41.051,0,70.738-20.965,99.484-45.778
	c4.766,3.817,24.278,13.103,28.289,17.168c-27.332,22.883-91.031,41.329-127.144,41.329c-3.481,0-6.824-0.211-10.11-0.528v19.306
	h156.032V31.512H149.648z M149.648,80.656V65.777c1.446-0.101,2.903-0.179,4.391-0.226c40.688-1.278,67.382,34.965,67.382,34.965
	s-28.832,40.043-59.746,40.043c-4.449,0-8.438-0.715-12.028-1.922V93.523c15.84,1.914,19.028,8.911,28.551,24.786l21.18-17.859
	c0,0-15.461-20.277-41.524-20.277C155.021,80.172,152.31,80.371,149.648,80.656"
        fill="#76B900"
      />
    </svg>
  );
}

function GoogleLogo() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-auto shrink-0"
      fill="none"
      aria-label="Google"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62Z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z"
        fill="#EA4335"
      />
    </svg>
  );
}
