import { createFileRoute, Link } from "@tanstack/react-router";
import { Button, Tabs, Chip } from "@heroui/react";
import SolarPlayLineDuotone from "~icons/solar/play-line-duotone";
import PhLightbulbDuotone from "~icons/ph/lightbulb-duotone";
import PhSparkleDuotone from "~icons/ph/sparkle-duotone";
import PhHeartDuotone from "~icons/ph/heart-duotone";
import PhClockDuotone from "~icons/ph/clock-duotone";

export const Route = createFileRoute("/theory")({ component: Theory });

type Theme = {
  key: string;
  name: string;
  icon: React.ReactNode;
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
    icon: <PhSparkleDuotone className="size-5" />,
    domain: "Affect & Energy",
    question: "How do you burn, and which direction is your energy turning?",
    why: "The solstice marks the turning point of a cycle. Light peaks, then reverses. Your energy works the same way: it rises, peaks, and settles. Solstice doesn't just ask how energetic you are. It asks which direction your energy is heading.",
    theory:
      "Built on Russell's circumplex model of affect, which maps emotions onto a circle defined by activation and valence. The test uses two axes from this tradition: how activated you feel, and whether your energy moves toward or away from the world (from Carver and White's BIS/BAS research). The direction component draws on Carver and Scheier's self-regulation theory, which shows that people naturally sense whether they're moving toward or away from their goals.",
    measures: [
      "Your baseline energy level: bright and activated, or quiet and still",
      "Your motivational direction: outward toward people and action, or inward toward reflection",
      "The direction your energy is heading: gathering (waxing) or settling (waning)",
    ],
  },
  {
    key: "turing",
    name: "Turing",
    icon: <PhLightbulbDuotone className="size-5" />,
    domain: "Cognition & Thinking",
    question: "Does what you say about your mind match what your choices show?",
    why: "Alan Turing asked whether a hidden mind could be identified from its outputs. Can you tell what something is by what it does? Arcus applies the same logic to your own thinking. You might say you're a careful, deliberate thinker, but your actual decisions might tell a different story.",
    theory:
      "Built on Epstein's Rational-Experiential Inventory, which found that rational thinking and intuitive thinking are two completely independent dimensions. You can be high in both, low in both, or anywhere in between. The test also draws on Gigerenzer's research on decision-making heuristics: people have stable preferences for how they make choices, and those preferences can differ from what they say about themselves.",
    measures: [
      "How much you genuinely enjoy effortful thinking",
      "How much you trust your gut and intuition",
      "Whether you prefer to decide on one strong reason or weigh many factors",
    ],
  },
  {
    key: "pride",
    name: "Pride",
    icon: <PhHeartDuotone className="size-5" />,
    domain: "Identity & Self",
    question: "How well do you know yourself, and how honestly do you show it?",
    why: "Pride, in its healthiest sense, is the courage to be who you are openly. It has four parts: knowing yourself clearly, expressing yourself honestly, claiming your identity with confidence, and being seen accurately by others.",
    theory:
      "Built on Campbell's Self-Concept Clarity research, which measures how stable and confident your sense of self is. Combined with Kernis and Goldman's authenticity model and Marcia's identity commitment dimension (have you claimed who you are, or are you still exploring?). The visibility component draws on Vazire's Self-Other Knowledge Asymmetry model, which shows that others sometimes see us more accurately than we see ourselves.",
    measures: [
      "How clearly and confidently you know your own values and identity",
      "How closely your outward behavior matches your inner self",
      "Whether your identity feels claimed and settled, or provisional and exploring",
    ],
  },
  {
    key: "passage",
    name: "Passage",
    icon: <PhClockDuotone className="size-5" />,
    domain: "Time & Temporality",
    question:
      "Where does your attention sit, and how do you feel about time passing?",
    why: "Time is the one medium every life moves through. You can't opt out of it. But people relate to it very differently. Some are rooted in the past, some live fully in the present, some are always reaching toward the future. And beyond where your attention sits, there's a deeper question: how do you feel about the fact that time is passing at all?",
    theory:
      "Built on Zimbardo's Time Perspective Inventory, validated across 24 countries, which identified five distinct factors in how people relate to past, present, and future. Arcus uses three of those as independent scores, rather than collapsing them into a single axis. The stance component draws on Carstensen's Socioemotional Selectivity Theory, which shows that how you perceive your time horizons shapes your motivation and priorities.",
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
    <div className="max-w-3xl mx-auto min-h-screen py-28 px-6">
      <div className="flex flex-col gap-20">
        {/* ─── Hero ─── */}
        <div className="flex flex-col gap-4">
          <Chip size="lg" variant="soft" className="self-start">
            Theory
          </Chip>
          <h1 className="text-5xl font-black -tracking-widest leading-tight">
            Why Arcus works the way it does.
          </h1>
          <p className="text-xl text-default-500 max-w-xl">
            Four assessments, each grounded in a different area of psychology.
            Here's the reasoning behind the system, without the academic jargon.
          </p>
        </div>

        {/* ─── Section 1: The Framework ─── */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-black text-default-300">01</span>
            <h2 className="text-3xl font-bold">The framework</h2>
          </div>

          <p className="text-lg text-default-600 leading-relaxed">
            Arcus measures four different things, each in a different way, and
            shows you the direction you're heading in each. Personality isn't a
            fixed point. It's a set of trajectories. Every result has two parts:
            where you stand right now, and which way you're moving.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
            {THEMES.map((t) => (
              <a
                key={t.key}
                href="#deep-dive"
                className="bg-white p-4 rounded-2xl border-[.5px] shadow-lg shadow-black/4 flex flex-col gap-2 text-left transition-all hover:shadow-xl hover:shadow-black/8"
              >
                <span className="text-orange-600">{t.icon}</span>
                <span className="font-bold">{t.name}</span>
                <span className="text-xs text-default-400">{t.domain}</span>
              </a>
            ))}
          </div>
        </section>

        {/* ─── Section 2: Deep Dive ─── */}
        <section id="deep-dive" className="flex flex-col gap-6 scroll-mt-28">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-black text-default-300">02</span>
            <h2 className="text-3xl font-bold">Inside each assessment</h2>
          </div>

          <p className="text-lg text-default-600 leading-relaxed">
            Each assessment draws from published research in psychology. Here's
            what each one measures and the theory behind it.
          </p>

          <Tabs defaultSelectedKey={THEMES[0].key} className="w-full">
            <Tabs.ListContainer>
              <Tabs.List aria-label="Assessments">
                {THEMES.map((t) => (
                  <Tabs.Tab
                    key={t.key}
                    id={t.key}
                    className="flex items-center gap-2 whitespace-nowrap"
                  >
                    {t.icon}
                    {t.name}
                    <Tabs.Indicator />
                  </Tabs.Tab>
                ))}
              </Tabs.List>
            </Tabs.ListContainer>

            {THEMES.map((t) => (
              <Tabs.Panel
                key={t.key}
                id={t.key}
                className="flex flex-col gap-6 pt-4"
              >
                <div className="bg-default-50 p-5 rounded-2xl border-[.5px] border-default-200">
                  <p className="text-lg font-semibold text-default-800">
                    {t.question}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold mb-2">Why this theme</h4>
                  <p className="text-default-600 leading-relaxed">{t.why}</p>
                </div>

                <div>
                  <h4 className="font-bold mb-2">The research</h4>
                  <p className="text-default-600 leading-relaxed">{t.theory}</p>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-lg shadow-black/4 border-[.5px]">
                  <h4 className="font-bold mb-3 text-sm">What it measures</h4>
                  <ul className="flex flex-col gap-2">
                    {t.measures.map((m, i) => (
                      <li
                        key={i}
                        className="text-sm text-default-600 flex gap-2"
                      >
                        <span className="text-orange-600 font-bold">+</span>
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </Tabs.Panel>
            ))}
          </Tabs>
        </section>

        {/* ─── Section 3: How they work together ─── */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-black text-default-300">03</span>
            <h2 className="text-3xl font-bold">How they work together</h2>
          </div>

          <p className="text-lg text-default-600 leading-relaxed">
            Each assessment measures something the others don't, but they're not
            completely independent. Some share underlying traits, and that
            overlap is part of the picture.
          </p>

          <div className="flex flex-col gap-3">
            {[
              {
                icon: (
                  <>
                    <PhSparkleDuotone className="size-5" />
                    <span className="text-default-300 font-bold text-lg">
                      +
                    </span>
                    <PhLightbulbDuotone className="size-5" />
                  </>
                ),
                title: "Solstice + Turing",
                desc: "Your energy level shapes how you think. High activation pairs with engaged thinking. Low activation pairs with reflective or intuitive modes.",
              },
              {
                icon: (
                  <>
                    <PhHeartDuotone className="size-5" />
                    <span className="text-default-300 font-bold text-lg">
                      +
                    </span>
                    <PhClockDuotone className="size-5" />
                  </>
                ),
                title: "Pride + Passage",
                desc: "Your sense of identity is shaped by how you relate to time. People rooted in the past often have clearer self-concepts. Future-oriented people often have stronger goal-driven identities.",
              },
              {
                icon: (
                  <>
                    <PhSparkleDuotone className="size-5" />
                    <span className="text-default-300 font-bold text-lg">
                      +
                    </span>
                    <PhHeartDuotone className="size-5" />
                  </>
                ),
                title: "Solstice + Pride",
                desc: "Your energy affects how you show up socially. High-activation, outward-moving energy pairs with more visible self-expression. Lower activation pairs with more interior identity work.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-white p-5 rounded-2xl shadow-lg shadow-black/4 border-[.5px] flex gap-4"
              >
                <div className="flex gap-1 shrink-0 items-center text-default-400">
                  {icon}
                </div>
                <div>
                  <h4 className="font-bold text-sm">{title}</h4>
                  <p className="text-sm text-default-500 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── CTA ─── */}
        <div className="text-center flex flex-col items-center gap-4 pt-4">
          <h2 className="text-3xl font-bold">
            Ready to explore your own arcs?
          </h2>
          <p className="text-lg text-default-500 max-w-md">
            Each test takes 6 to 8 minutes. Start with whichever dimension
            interests you most.
          </p>
          <Link to="/">
            <Button size="lg">
              <SolarPlayLineDuotone />
              Take a test
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
