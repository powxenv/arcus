import { createFileRoute, Link } from "@tanstack/react-router";
import { buttonVariants } from "@heroui/react";
import SolarArrowRightLineDuotone from "~icons/solar/arrow-right-line-duotone";
import { ASSESSMENTS } from "../components/assessment-data";
import { RESULT_DETAILS } from "../data/result-details";
import { AssessmentStartModal } from "../components/assessment-start-modal";
import {
  Hero,
  PageShell,
  PageStack,
  QuietCallout,
  Section,
  Surface,
} from "../components/ui-system";

export const Route = createFileRoute("/assessment/$key/")({
  component: AssessmentDetail,
  head: ({ params }) => {
    const data = ASSESSMENTS[params.key];
    const name = data?.name ?? params.key;
    return {
      meta: [
        { title: `${name} — Arcus` },
        {
          name: "description",
          content: data?.overview ?? `Learn about the ${name} assessment.`,
        },
        { property: "og:title", content: `${name} — Arcus` },
        { property: "og:description", content: data?.overview ?? "" },
      ],
    };
  },
  notFoundComponent: () => (
    <PageShell size="sm">
      <div className="text-center flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold">Assessment not found</h1>
        <Link to="/" className={buttonVariants({ variant: "outline" })}>
          Back to home
        </Link>
      </div>
    </PageShell>
  ),
});

function AssessmentDetail() {
  const { key } = Route.useParams();
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
            <p className="text-base font-semibold">{data.question}</p>
          </QuietCallout>
        </Section>

        <Section title="Why it matters" intro={data.whyItMatters}>
          <p className="text-base text-default-600 leading-relaxed text-pretty">
            {data.theme}
          </p>
        </Section>

        <Section
          title="Measured dimensions"
          intro="Each assessment is built from smaller dimensions that together produce the final result."
        >
          <Surface className="flex flex-col gap-3">
            {data.constructs.map((c) => (
              <div key={c.name}>
                <h3 className="font-semibold text-default-800">{c.name}</h3>
                <p className="text-sm text-default-600 leading-relaxed mt-1">
                  {c.description}
                </p>
              </div>
            ))}
          </Surface>
        </Section>

        <Section
          title="Theoretical foundations"
          intro="Each dimension draws from published, peer-reviewed psychology research."
        >
          <Surface className="flex flex-col gap-2">
            {data.theory.map((t) => (
              <div key={t.name} className="text-sm text-default-600 leading-relaxed">
                <span className="font-semibold text-default-800">{t.name}</span>
                <p className="text-default-500">{t.use}</p>
              </div>
            ))}
          </Surface>
        </Section>

        <Section title="How the assessment works">
          <Surface className="flex flex-col gap-3">
            {data.howItWorks.map((step, i) => (
              <div key={i} className="flex gap-4 text-sm text-default-600 leading-relaxed">
                <span className="font-bold text-default-300 shrink-0 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{step}</span>
              </div>
            ))}
          </Surface>
        </Section>

        <Section title="How results are generated">
          <Surface className="flex flex-col gap-2">
            {data.scoring.map((s, i) => (
              <p key={i} className="text-sm text-default-600 leading-relaxed flex gap-2">
                <span className="text-orange-600 font-bold shrink-0">+</span>
                {s}
              </p>
            ))}
          </Surface>
        </Section>

        <Section
          title="Result outcomes"
          intro="Each result has a detailed explanation of what the label means and how to interpret it."
        >
          <div className="flex flex-col gap-4">
            {data.resultTypes.map((rt) => {
              const detail = RESULT_DETAILS[data.key]?.[rt.name];
              return (
                <Surface key={rt.name} className="flex gap-4">
                  <span className="text-3xl shrink-0" aria-hidden>
                    {rt.emoji}
                  </span>
                  <div className="flex flex-col gap-2">
                    <div>
                      <h3 className="font-bold">{rt.name}</h3>
                      <p className="text-sm text-default-500 leading-relaxed">
                        {rt.description}
                      </p>
                    </div>
                    {detail ? (
                      <div className="flex flex-col gap-1 text-sm text-default-600 leading-relaxed">
                        <p>{detail.meaning}</p>
                        <p>
                          <strong className="text-default-800">
                            How to read it.{" "}
                          </strong>
                          {detail.howToRead}
                        </p>
                        <p>
                          <strong className="text-default-800">
                            What makes it different.{" "}
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

        <Section title="How to interpret your result" intro={data.interpretation}>
          <Surface className="flex flex-col gap-2">
            <h3 className="font-semibold text-sm">Tips for reflection</h3>
            <ul className="flex flex-col gap-1.5">
              {data.interpretationTips.map((tip, i) => (
                <li
                  key={i}
                  className="text-sm text-default-600 flex gap-2 leading-relaxed"
                >
                  <span className="text-orange-600 font-bold shrink-0">+</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </Surface>
        </Section>

        <div className="flex flex-col gap-8 pt-2">
          <div className="text-center flex flex-col items-center gap-4">
            <h2 className="text-2xl font-bold leading-tight">
              Ready to take {data.shortName}?
            </h2>
            <p className="text-base text-default-500">
              {data.duration} · {data.questionCount}
            </p>
            <AssessmentStartModal
              assessment={data}
              triggerLabel="Start assessment"
            />
          </div>

          <div className="border-t-[.5px] border-default-200 pt-8">
            <h3 className="text-xs font-bold text-default-500 mb-4 uppercase tracking-wide">
              Explore other assessments
            </h3>
            <div className="flex flex-col gap-2">
              {data.next.map((n) => (
                <Link
                  key={n.key}
                  to="/assessment/$key"
                  params={{ key: n.key }}
                  className="bg-white p-4 rounded-xl border-[.5px] border-default-200 flex items-center gap-3 transition-colors hover:bg-default-50"
                >
                  <img className="size-8" src={n.icon} alt="" />
                  <span className="font-semibold text-sm flex-1">
                    {n.name}
                  </span>
                  <SolarArrowRightLineDuotone className="size-4 text-default-400 shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </PageStack>
    </PageShell>
  );
}
