import { createFileRoute, Link } from "@tanstack/react-router";
import { Tabs, buttonVariants } from "@heroui/react";
import SolarPlayLineDuotone from "~icons/solar/play-line-duotone";
import decor1 from "../assets/decoration-1.svg";
import decor2 from "../assets/decoration-2.svg";
import decor3 from "../assets/decoration-3.svg";
import decor4 from "../assets/decoration-4.svg";
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

export const Route = createFileRoute("/theory/")({
  component: Theory,
  head: () => ({
    meta: [
      { title: "How Arcus works — Theory" },
      {
        name: "description",
        content:
          "Each assessment draws from published psychology research. Learn why Arcus measures four different parts of a person, and how the assessments work together.",
      },
      { property: "og:title", content: "How Arcus works — Theory" },
      {
        property: "og:description",
        content:
          "Each assessment draws from published psychology research. Learn how Arcus works.",
      },
    ],
  }),
});

type Theme = {
  key: string;
  name: string;
  icon: string;
  domain: string;
  question: string;
  why: string;
  theory: string;
  measures: string[];
};

const THEMES: Theme[] = [
  {
    key: "solstice",
    name: "Solstice",
    icon: decor1,
    domain: "Affect & Energy",
    question: "How do you burn, and which direction is your energy turning?",
    why: "The solstice marks the turning point of a cycle. Light peaks, then reverses. Your energy works the same way: it rises, peaks, and settles. Solstice doesn't just ask how energetic you are. It asks which direction your energy is heading.",
    theory:
      "Built on Russell's circumplex model of affect, which maps emotions onto a circle defined by activation and valence. The test uses two axes from this tradition: how activated you feel, and whether your energy moves toward or away from the world. The direction component draws on self-regulation research, which shows that people naturally sense whether they're moving toward or away from their goals.",
    measures: [
      "Your baseline energy level: bright and activated, or quiet and still",
      "Your motivational direction: outward toward people and action, or inward toward reflection",
      "The direction your energy is heading: gathering, settling, or steady",
    ],
  },
  {
    key: "turing",
    name: "Turing",
    icon: decor2,
    domain: "Cognition & Thinking",
    question: "Does what you say about your mind match what your choices show?",
    why: "Alan Turing asked whether a hidden mind could be identified from its outputs. Arcus applies the same logic to your own thinking. You might say you're a careful, deliberate thinker, but your actual decisions might tell a different story.",
    theory:
      "Built on research showing that rational thinking and intuitive thinking are two independent dimensions. You can be high in both, low in both, or anywhere in between. The test also draws on decision-making research: people have stable preferences for how they make choices, and those preferences can differ from what they say about themselves.",
    measures: [
      "How much you genuinely enjoy effortful thinking",
      "How much you trust your gut and intuition",
      "Whether you prefer to decide on one strong reason or weigh many factors",
    ],
  },
  {
    key: "pride",
    name: "Pride",
    icon: decor3,
    domain: "Identity & Self",
    question: "How well do you know yourself, and how honestly do you show it?",
    why: "Pride, in its healthiest sense, is the courage to be who you are openly. It has four parts: knowing yourself clearly, expressing yourself honestly, claiming your identity with confidence, and being seen accurately by others.",
    theory:
      "Built on Self-Concept Clarity research, authenticity models, and identity commitment research. The visibility component draws on the idea that others sometimes see us more accurately than we see ourselves, especially when outward behavior reveals patterns we have stopped noticing.",
    measures: [
      "How clearly and confidently you know your own values and identity",
      "How closely your outward behavior matches your inner self",
      "Whether your identity feels claimed and settled, or provisional and exploring",
    ],
  },
  {
    key: "passage",
    name: "Passage",
    icon: decor4,
    domain: "Time & Temporality",
    question: "Where does your attention sit, and how do you feel about time passing?",
    why: "Time is the one medium every life moves through. People relate to it very differently. Some are rooted in the past, some live fully in the present, some are always reaching toward the future. Passage asks where your attention sits and how you feel about time moving forward.",
    theory:
      "Built on Time Perspective research, which identifies distinct ways people relate to past, present, and future. Arcus uses those as independent scores rather than collapsing them into one axis. The stance component draws on research showing that perceived time horizons shape motivation and priorities.",
    measures: [
      "How warmly and meaningfully you connect with your past",
      "How fully and actively you engage with the present moment",
      "How strongly you're pulled toward future goals and possibilities",
      "Your stance toward time itself: resource, weight, gift, or mystery",
    ],
  },
];

function Theory() {
  return (
    <PageShell>
      <PageStack>
        <Hero eyebrow="Theory" title="Why Arcus works the way it does.">
          Four assessments, each grounded in a different area of psychology. The
          system shows position and direction. Where you stand, and which way
          the pattern is moving.
        </Hero>

        <Section title="The framework" intro="Arcus measures four parts of a person: energy, thinking, identity, and time. Each assessment stays narrow so each domain stays sharp and the four together don't blur.">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {THEMES.map((t) => (
              <CardLink
                key={t.key}
                to="/assessment/$key/take"
                params={{ key: t.key }}
                className="flex flex-col gap-2"
              >
                <img className="size-8" src={t.icon} alt="" />
                <span className="font-bold">{t.name}</span>
                <span className="text-xs text-default-400">{t.domain}</span>
              </CardLink>
            ))}
          </div>
        </Section>

        <Section title="Inside each assessment" intro="Each assessment has a central question, a theme that anchors the idea, and research-backed dimensions that do the measuring.">
          <Tabs defaultSelectedKey={THEMES[0].key} className="w-full">
            <Tabs.ListContainer>
              <Tabs.List aria-label="Assessments">
                {THEMES.map((t) => (
                  <Tabs.Tab key={t.key} id={t.key} className="flex items-center gap-2 whitespace-nowrap">
                    <img className="size-4" src={t.icon} alt="" />
                    {t.name}
                    <Tabs.Indicator />
                  </Tabs.Tab>
                ))}
              </Tabs.List>
            </Tabs.ListContainer>

            {THEMES.map((t) => (
              <Tabs.Panel key={t.key} id={t.key} className="flex flex-col gap-6 pt-4">
                <QuietCallout>
                  <p className="text-lg font-semibold">{t.question}</p>
                </QuietCallout>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <h3 className="font-bold mb-2">Why this theme</h3>
                    <p className="text-default-600 leading-relaxed">{t.why}</p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">The research</h3>
                    <p className="text-default-600 leading-relaxed">{t.theory}</p>
                  </div>
                </div>

                <Surface>
                  <h3 className="font-bold mb-3 text-sm">What it measures</h3>
                  <ul className="flex flex-col gap-2">
                    {t.measures.map((m, i) => (
                      <li key={i} className="text-sm text-default-600 flex gap-2">
                        <span className="text-orange-600 font-bold">+</span>
                        {m}
                      </li>
                    ))}
                  </ul>
                </Surface>

                <Link
                  to="/start"
                  className={buttonVariants({ variant: "outline", className: "self-start" })}
                >
                  Start an assessment
                </Link>
              </Tabs.Panel>
            ))}
          </Tabs>
        </Section>

        <Section title="How they work together" intro="The assessments are separate. The patterns can speak to each other. Looking across them helps you notice where different parts of life reinforce one another or pull in different directions.">
          <div className="flex flex-col gap-3">
            {[
              { icon1: decor1, icon2: decor2, title: "Solstice + Turing", desc: "Energy changes how thinking feels: whether reflection feels exciting, effortful, calm, or overstimulating." },
              { icon1: decor3, icon2: decor4, title: "Pride + Passage", desc: "Identity is shaped by time: memory, present experience, and future possibility all influence the self you can name." },
              { icon1: decor1, icon2: decor3, title: "Solstice + Pride", desc: "Energy affects visibility. Some seasons make self-expression easier; others make private integration more important." },
            ].map(({ icon1, icon2, title, desc }) => (
              <Surface key={title} className="flex gap-4">
                <div className="flex gap-1 shrink-0 items-center">
                  <img className="size-5" src={icon1} alt="" />
                  <span className="text-default-300 font-bold text-lg">+</span>
                  <img className="size-5" src={icon2} alt="" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">{title}</h3>
                  <p className="text-sm text-default-500 mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </Surface>
            ))}
          </div>
        </Section>

        <PageCta
          title="Ready to explore your own arcs?"
          action={
            <Link to="/start" className={buttonVariants({ size: "lg" })}>
              <SolarPlayLineDuotone />
              Take a test
            </Link>
          }
        >
          Each test takes 8 to 10 minutes. Start with whichever feels most
          useful.
        </PageCta>
      </PageStack>
    </PageShell>
  );
}
