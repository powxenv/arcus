import { createFileRoute, useParams } from "@tanstack/react-router";
import SolarArrowRightLineDuotone from "~icons/solar/arrow-right-line-duotone";
import SolarCheckCircleLineDuotone from "~icons/solar/check-circle-line-duotone";
import { ASSESSMENTS } from "../components/assessment-data";
import { AssessmentStartModal } from "../components/assessment-start-modal";
import {
  ButtonLink,
  CardLink,
  Hero,
  PageCta,
  PageShell,
  PageStack,
  QuietCallout,
  Section,
  Surface,
} from "../components/ui-system";

export const Route = createFileRoute("/assessment/$key/")({
  component: AssessmentDetail,
});

type ResultDetail = {
  meaning: string;
  howToRead: string;
  distinct: string;
};

const RESULT_DETAILS: Record<string, Record<string, ResultDetail>> = {
  solstice: {
    Summer: {
      meaning:
        "Summer describes energy that is both bright and outward-moving. You are likely to feel most yourself when you can act, connect, initiate, and put visible energy into the world.",
      howToRead:
        "Read this as a period of available heat. If your trajectory is waxing, momentum is still building and new commitments may feel natural. If it is waning, the same outward energy may still be present, but your system is beginning to ask for consolidation.",
      distinct:
        "Summer differs from Autumn by moving outward rather than inward, and from Spring by carrying more immediate activation and force.",
    },
    Autumn: {
      meaning:
        "Autumn is high activation turned inward. There is energy here, but it is selective, focused, and often concerned with sorting, finishing, refining, or preparing for a release.",
      howToRead:
        "This result often points to productive intensity without the same appetite for exposure. You may be busy internally: deciding what matters, cutting what does not, or transforming experience into something useful.",
      distinct:
        "Autumn shares Summer's activation, but not its outwardness. It shares Winter's inwardness, but with more charge and movement.",
    },
    Winter: {
      meaning:
        "Winter describes quiet, inward energy. It is not emptiness or failure; it is the part of the cycle where restoration, depth, and private integration become central.",
      howToRead:
        "A Winter result asks you to notice what becomes clearer when you stop pushing. If your trajectory is waxing, energy may be returning slowly. If waning, rest and simplification may be more useful than forcing momentum.",
      distinct:
        "Winter differs from Autumn by being lower in activation, and from Spring by turning inward instead of reaching outward.",
    },
    Spring: {
      meaning:
        "Spring is low activation beginning to move outward. It often feels tentative, fresh, curious, and gently directed toward contact, growth, or new possibility.",
      howToRead:
        "This result is best read as emergence rather than weakness. You may not have Summer's force yet, but you may have the first signs of renewed appetite: small initiatives, social openness, or a desire to begin again.",
      distinct:
        "Spring shares Winter's softer activation, but not its withdrawal. It shares Summer's outwardness, but at an earlier and more delicate stage of the cycle.",
    },
  },
  turing: {
    "The Integrator": {
      meaning:
        "The Integrator uses both deliberate reasoning and intuitive judgment. You are likely to value analysis, but you also treat felt sense and pattern recognition as legitimate information.",
      howToRead:
        "This result does not mean every decision should use both modes equally. It means you have access to both. Your strongest decisions may come from knowing which mode the situation calls for, then letting the other mode check it.",
      distinct:
        "Integrator differs from Logician by trusting intuition more, and from Reader by enjoying effortful reasoning more.",
    },
    "The Logician": {
      meaning:
        "The Logician prefers explicit reasoning, evidence, structure, and careful comparison. You are likely to feel more confident when a conclusion can be explained step by step.",
      howToRead:
        "This can be a strength in complex or high-stakes situations, especially when first impressions are unreliable. The reflection point is whether you sometimes dismiss useful intuition because it cannot yet be fully articulated.",
      distinct:
        "Logician shares Integrator's appetite for thought, but places less trust in gut feeling. It differs from Operator by being more reflective and analysis-oriented.",
    },
    "The Reader": {
      meaning:
        "The Reader is guided by intuition, social signal, pattern, and felt recognition. You may reach accurate conclusions quickly without needing to consciously reconstruct every step.",
      howToRead:
        "This result is strongest where experience has trained your instincts. It asks you to respect fast perception while also noticing when a decision deserves slower verification.",
      distinct:
        "Reader shares Integrator's trust in intuition, but not its same enjoyment of extended analysis. It differs from Operator because intuition, not action alone, is the primary guide.",
    },
    "The Operator": {
      meaning:
        "The Operator is less invested in both abstract analysis and intuitive self-reading. You may prefer to move, test, adjust, and learn through practical contact with the world.",
      howToRead:
        "This is not a lack of intelligence or insight. It often means cognition is most useful to you when it is tied to action. Your reflection point is whether you are skipping a decision mode that a particular situation genuinely needs.",
      distinct:
        "Operator differs from Logician and Reader because neither reasoning nor intuition dominates. It is the most action-first of the four modes.",
    },
  },
  pride: {
    "The Beacon": {
      meaning:
        "The Beacon combines clear self-knowledge with open self-expression. There is relatively little distance between what you know internally and what others are allowed to see.",
      howToRead:
        "This result points to coherence. Your task is not to become more visible at all costs, but to use that coherence responsibly: choosing contexts where your clarity helps rather than overwhelms.",
      distinct:
        "Beacon differs from Prism by being less adaptive in presentation, and from Ember by having a more settled self-concept.",
    },
    "The Prism": {
      meaning:
        "The Prism knows itself clearly but changes presentation across contexts. You may have a stable inner center while still choosing carefully which parts of yourself each situation receives.",
      howToRead:
        "This result can reflect maturity, privacy, strategy, or self-protection. The key question is whether adaptation feels chosen and skillful, or whether it has become a habit of hiding.",
      distinct:
        "Prism shares Beacon's clarity, but not its direct visibility. It differs from Aurora because the inner self is more defined even when the outer expression varies.",
    },
    "The Ember": {
      meaning:
        "The Ember is still forming, but what is expressed tends to be genuine. You may not have a fully settled identity, yet you are willing to show the realness of where you are now.",
      howToRead:
        "This result asks for patience with becoming. Authenticity does not require final certainty. You can be honest about an identity that is still warm, changing, and unfinished.",
      distinct:
        "Ember shares Beacon's openness, but not its same settled clarity. It differs from Aurora by showing more directly, even while exploring.",
    },
    "The Aurora": {
      meaning:
        "The Aurora is fluid both internally and externally. Identity may feel contextual, exploratory, responsive, and hard to reduce to one stable statement.",
      howToRead:
        "This result is not a defect. It can describe a person in transition or someone whose selfhood is genuinely plural. The reflection point is whether flexibility feels alive, or whether it leaves you unanchored.",
      distinct:
        "Aurora differs from Prism because the inner identity is also in motion. It differs from Ember because expression shifts more across contexts.",
    },
  },
  passage: {
    "The Keeper": {
      meaning:
        "The Keeper is anchored by memory, origin, lineage, and what has already shaped you.",
      howToRead:
        "Your past is not merely behind you; it remains an active source of meaning. The question is whether it nourishes the present or keeps asking you to return before you can move.",
      distinct:
        "Keeper differs from Bridge and Hearth because the past stands alone as the dominant engaged zone.",
    },
    "The Witness": {
      meaning:
        "The Witness is most alive in the immediacy of experience: what is happening, felt, noticed, and lived now.",
      howToRead:
        "This result points to presence rather than passivity. It becomes strongest when attention is deep, not merely when planning and remembering are absent.",
      distinct:
        "Witness differs from Flow and Hearth because the present is engaged without a second dominant temporal pull.",
    },
    "The Wayfinder": {
      meaning:
        "The Wayfinder is oriented toward possibility, direction, goals, and the person you are becoming.",
      howToRead:
        "The future gives shape to the present. This can be motivating and clarifying; the reflection point is whether the future also allows room for current life to be fully inhabited.",
      distinct:
        "Wayfinder differs from Bridge and Flow because future engagement stands on its own rather than pairing with past or present.",
    },
    "The Hearth": {
      meaning:
        "The Hearth joins memory with presence. You carry roots, rituals, and continuity into the current moment.",
      howToRead:
        "This result often values belonging, tradition, and lived warmth. The past matters because it makes now feel inhabited, not because now is less important.",
      distinct:
        "Hearth differs from Keeper by being more present-active, and from Witness by carrying stronger continuity with what came before.",
    },
    "The Bridge": {
      meaning:
        "The Bridge links origin and destination. You understand the future through the past, and the past through what it makes possible.",
      howToRead:
        "This result can create a strong narrative sense of life: where you came from, what it cost, and where it points. The missing question to watch is whether the present becomes only a crossing point.",
      distinct:
        "Bridge differs from Hearth by leaning toward future direction, and from Wayfinder by staying rooted in memory.",
    },
    "The Flow": {
      meaning:
        "The Flow combines present engagement with forward movement. You are likely to feel most alive when today's actions are connected to emerging possibility.",
      howToRead:
        "This result is active without being detached from experience. It asks you to keep building while still noticing the life you are inside right now.",
      distinct:
        "Flow differs from Witness by adding future pull, and from Wayfinder by remaining strongly present-centered.",
    },
    Balanced: {
      meaning:
        "Balanced means past, present, and future are all engaged enough to matter. No single temporal zone owns the whole picture.",
      howToRead:
        "This is not a superior type; it is a broad pattern. It may feel integrated, but it can also create competing loyalties between memory, immediacy, and aspiration.",
      distinct:
        "Balanced differs from all paired types because no major temporal zone is left out.",
    },
    "The Wanderer": {
      meaning:
        "The Wanderer has no single dominant temporal anchor. Attention may move lightly, situationally, or unpredictably across time.",
      howToRead:
        "This can feel free, open, and unburdened, or it can feel unmoored. The key is whether lightness gives you room to live or makes it harder to commit to a direction.",
      distinct:
        "Wanderer differs from Balanced because all zones are below the engagement threshold rather than all being strongly engaged.",
    },
  },
};

function AssessmentDetail() {
  const { key } = useParams({ from: "/assessment/$key/" });
  const data = ASSESSMENTS[key];

  if (!data) {
    return (
      <PageShell size="sm">
        <div className="text-center flex flex-col items-center gap-4">
          <h1 className="text-3xl font-bold">Assessment not found</h1>
          <ButtonLink to="/" variant="outline">
            Back to home
          </ButtonLink>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PageStack>
        <Hero
          eyebrow={data.domain}
          icon={data.icon}
          title={data.name}
          meta={`${data.duration} · ${data.questionCount}`}
        >
          {data.tagline}
        </Hero>

        <Section title="What it measures" intro={data.overview}>
          <QuietCallout>
            <p className="text-lg font-semibold">{data.question}</p>
          </QuietCallout>
        </Section>

        <Section title="Why it matters" intro={data.whyItMatters}>
          <p className="text-lg text-default-600 leading-relaxed text-pretty">
            {data.theme}
          </p>
        </Section>

        <Section
          title="Measured dimensions"
          intro="Each assessment is made from smaller constructs, so the result can explain not only your broad type but the pattern underneath it."
        >
          <div className="grid sm:grid-cols-2 gap-3">
            {data.constructs.map((c) => (
              <Surface key={c.name}>
                <h3 className="font-bold mb-1">{c.name}</h3>
                <p className="text-sm text-default-600 leading-relaxed">
                  {c.description}
                </p>
              </Surface>
            ))}
          </div>
        </Section>

        <Section
          title="Theoretical foundations"
          intro="Arcus is designed for reflection, not diagnosis, but each assessment is grounded in established psychological research."
        >
          <div className="flex flex-col gap-2">
            {data.theory.map((t) => (
              <Surface key={t.name} className="p-4 rounded-xl">
                <h3 className="font-semibold text-sm">{t.name}</h3>
                <p className="text-sm text-default-500 mt-1 leading-relaxed">
                  {t.use}
                </p>
              </Surface>
            ))}
          </div>
        </Section>

        <Section
          title="How the assessment works"
          intro="The assessment combines direct self-report with scoring rules that preserve independent dimensions instead of forcing everything onto one line."
        >
          <div className="flex flex-col gap-3">
            {data.howItWorks.map((step, i) => (
              <div key={i} className="flex gap-4">
                <span className="text-default-300 font-black text-lg shrink-0 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-default-600 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section
          title="How results are generated"
          intro="Your outcome is not chosen by one answer. It comes from the pattern formed by your dimension scores and, where relevant, a direction modifier."
        >
          <div className="flex flex-col gap-2">
            {data.scoring.map((s, i) => (
              <div key={i} className="flex gap-2">
                <SolarCheckCircleLineDuotone className="size-5 text-orange-600 shrink-0 mt-0.5" />
                <p className="text-default-600 text-sm leading-relaxed">{s}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section
          title="Result outcomes"
          intro="Each outcome names a distinct pattern. The label is shorthand for a relationship between scores, not a fixed identity or a ranking."
        >
          <div className="flex flex-col gap-4">
            {data.resultTypes.map((rt) => {
              const detail = RESULT_DETAILS[data.key]?.[rt.name];
              return (
                <Surface key={rt.name} className="flex gap-4">
                  <span className="text-3xl shrink-0" aria-hidden>
                    {rt.emoji}
                  </span>
                  <div className="flex flex-col gap-3">
                    <div>
                      <h3 className="text-lg font-bold">{rt.name}</h3>
                      <p className="text-sm text-default-500 leading-relaxed">
                        {rt.description}
                      </p>
                    </div>
                    {detail ? (
                      <div className="grid gap-3 text-sm text-default-600 leading-relaxed">
                        <p>{detail.meaning}</p>
                        <p>
                          <strong className="text-default-800">
                            How to interpret it:{" "}
                          </strong>
                          {detail.howToRead}
                        </p>
                        <p>
                          <strong className="text-default-800">
                            What makes it different:{" "}
                          </strong>
                          {detail.distinct}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </Surface>
              );
            })}
          </div>
        </Section>

        <Section
          title="How to interpret your result"
          intro={data.interpretation}
        >
          <QuietCallout>
            <h3 className="font-bold mb-3 text-sm">Tips for reflection</h3>
            <ul className="flex flex-col gap-2">
              {data.interpretationTips.map((tip, i) => (
                <li
                  key={i}
                  className="text-sm text-default-600 flex gap-2 leading-relaxed"
                >
                  <span className="text-orange-600 font-bold">+</span>
                  {tip}
                </li>
              ))}
            </ul>
          </QuietCallout>
        </Section>

        <div className="flex flex-col gap-8 pt-2">
          <PageCta
            title={`Ready to take ${data.shortName}?`}
            action={
              <AssessmentStartModal
                assessment={data}
                triggerLabel="Start assessment"
              />
            }
          >
            {data.duration} · {data.questionCount}
          </PageCta>

          <div className="border-t-[.5px] border-default-200 pt-8">
            <h3 className="text-sm font-bold text-default-500 mb-4">
              Explore other assessments
            </h3>
            <div className="flex flex-col gap-2">
              {data.next.map((n) => (
                <CardLink
                  key={n.key}
                  to="/assessment/$key"
                  params={{ key: n.key }}
                  className="p-4 rounded-xl flex items-center gap-3"
                >
                  <img className="size-8" src={n.icon} alt="" />
                  <span className="font-semibold text-sm flex-1">{n.name}</span>
                  <SolarArrowRightLineDuotone className="size-4 text-default-400" />
                </CardLink>
              ))}
            </div>
          </div>
        </div>
      </PageStack>
    </PageShell>
  );
}
