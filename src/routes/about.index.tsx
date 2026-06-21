import { createFileRoute, Link } from "@tanstack/react-router";
import { buttonVariants } from "@heroui/react";
import SolarArrowRightLineDuotone from "~icons/solar/arrow-right-line-duotone";
import SolarPlayLineDuotone from "~icons/solar/play-line-duotone";
import {
  Hero,
  PageCta,
  PageShell,
  PageStack,
  Section,
  TextBlock,
} from "../components/ui-system";

export const Route = createFileRoute("/about/")({ component: About });

function About() {
  return (
    <PageShell>
      <PageStack>
        <Hero eyebrow="About" title="Personality is a trajectory, not a type.">
          Arcus shows where you stand right now and which direction you're
          heading across energy, thinking, identity, and time.
        </Hero>

        <Section title="What Arcus is">
          <TextBlock>
            <p>
              Arcus is a personality platform built around one idea: you are not
              a fixed type. You are always in motion, always becoming. The four
              assessments each trace a different part of that motion.
            </p>
            <p>
              The name comes from the Latin word for arc. An arc has a shape, a
              direction, and a span. It connects where you were to where you're
              going. That's what Arcus tries to show you.
            </p>
          </TextBlock>
        </Section>

        <Section title="Why we built it">
          <TextBlock>
            <p>
              Personality tests are everywhere, but many take a snapshot and
              treat it like the whole picture. You answer a batch of questions,
              get sorted into a category, and the result becomes a label.
            </p>
            <p>
              Arcus was built to capture direction, not just position. Your
              energy rises and falls. Your sense of self sharpens or softens.
              The way you relate to time shifts as life changes. That movement
              is the arc.
            </p>
          </TextBlock>
        </Section>

        <Section
          title="What you get"
          intro="Four short assessments, each measuring a different part of who you are. You can take one or take all four."
        >
          <ul className="flex flex-col gap-3 text-lg text-default-600">
            {[
              ["Where you stand.", "A clear position on each dimension, not a binary label."],
              ["Which direction you're heading.", "A sense of whether a pattern is building, settling, opening, or consolidating."],
              ["The fuller picture.", "When you take more than one assessment, you can see how different parts of your life interact."],
            ].map(([title, body], i) => (
              <li key={title} className="flex gap-3">
                <span className="text-default-300 font-black tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <strong className="text-default-800">{title}</strong> {body}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="What to keep in mind">
          <TextBlock>
            <p>
              Arcus is for self-discovery and reflection. It is not a clinical
              assessment, and it does not diagnose anything.
            </p>
            <p>
              Every assessment is grounded in published psychology, but Arcus
              itself is not a validated clinical instrument. We state that
              openly because a test that claims more certainty than it has is
              not helpful.
            </p>
          </TextBlock>
          <Link
            to="/theory"
            className={buttonVariants({ variant: "outline", className: "self-start mt-2" })}
          >
            Read the methodology
            <SolarArrowRightLineDuotone />
          </Link>
        </Section>

        <PageCta
          title="Ready to see your arc?"
          action={
            <Link to="/start" className={buttonVariants({ size: "lg" })}>
              <SolarPlayLineDuotone />
              Take a test
            </Link>
          }
        >
          Start with whichever dimension interests you most. Each test takes 6
          to 8 minutes.
        </PageCta>
      </PageStack>
    </PageShell>
  );
}
