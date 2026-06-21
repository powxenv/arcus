import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { buttonVariants } from "@heroui/react";
import SolarArrowRightLineDuotone from "~icons/solar/arrow-right-line-duotone";
import SolarCheckCircleLineDuotone from "~icons/solar/check-circle-line-duotone";
import { ASSESSMENTS } from "../components/assessment-data";
import { AssessmentStartModal } from "../components/assessment-start-modal";
import { RESULT_DETAILS } from "../data/result-details";
import {
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

function AssessmentDetail() {
  const { key } = useParams({ from: "/assessment/$key/" });
  const data = ASSESSMENTS[key];

  if (!data) {
    return (
      <PageShell size="sm">
        <div className="text-center flex flex-col items-center gap-4">
          <h1 className="text-3xl font-bold">Assessment not found</h1>
          <Link to="/" className={buttonVariants({ variant: "outline" })}>
            Back to home
          </Link>
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
