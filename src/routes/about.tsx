import { createFileRoute, Link } from "@tanstack/react-router";
import SolarArrowRightLineDuotone from "~icons/solar/arrow-right-line-duotone";
import SolarPlayLineDuotone from "~icons/solar/play-line-duotone";
import { Button } from "@heroui/react";

export const Route = createFileRoute("/about")({ component: About });

function About() {
  return (
    <div className="max-w-2xl mx-auto min-h-screen py-28 px-6">
      <div className="flex flex-col gap-16">
        {/* Hero */}
        <div className="flex flex-col gap-4">
          <h1 className="text-6xl font-black -tracking-widest leading-tight">
            Personality is a trajectory, not a type.
          </h1>
          <p className="text-xl text-default-500 max-w-lg">
            Most personality tests freeze you in place and hand back a label.
            Arcus does something different: it shows you where you stand right
            now, and which direction you're heading.
          </p>
        </div>

        {/* What Arcus is */}
        <section className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold">What is Arcus?</h2>
          <p className="text-lg text-default-600 leading-relaxed">
            Arcus is a personality platform built around one idea: you are not
            a fixed type. You are always in motion, always becoming. The four
            assessments in Arcus each trace a different part of that motion:
            your energy, your thinking, your identity, and your relationship
            with time.
          </p>
          <p className="text-lg text-default-600 leading-relaxed">
            The name comes from the Latin word for arc. An arc has a shape, a
            direction, and a span. It connects where you were to where you're
            going. That's what Arcus tries to show you.
          </p>
        </section>

        {/* Why we built it */}
        <section className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold">Why we built it</h2>
          <p className="text-lg text-default-600 leading-relaxed">
            Personality tests are everywhere, but most of them share the same
            flaw: they take a snapshot and call it the whole picture. You answer
            a batch of questions, get sorted into a category, and that's it.
            You're an introvert. You're a thinker. You're a type four.
          </p>
          <p className="text-lg text-default-600 leading-relaxed">
            But personality doesn't hold still. Your energy rises and falls.
            Your sense of self sharpens or softens. The way you relate to time
            shifts as life changes. A snapshot can't capture any of that.
          </p>
          <p className="text-lg text-default-600 leading-relaxed">
            Arcus was built to capture direction, not just position. Every
            result tells you where you are and which way you're heading. That
            direction is the arc.
          </p>
        </section>

        {/* What you get */}
        <section className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold">What you get</h2>
          <p className="text-lg text-default-600 leading-relaxed">
            Four assessments, each measuring a different part of who you are.
            You can take one or take all four. Each takes about 6 to 8 minutes.
          </p>
          <ul className="flex flex-col gap-3 text-lg text-default-600">
            <li className="flex gap-3">
              <span className="text-default-300 font-bold">01</span>
              <span>
                <strong>Where you stand.</strong> A clear position on each
                dimension, not a binary label. You're not an introvert or an
                extrovert. You're somewhere on a continuum, and that somewhere
                is specific.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-default-300 font-bold">02</span>
              <span>
                <strong>Which direction you're heading.</strong> Is your energy
                building or settling? Is your identity claimed or still
                exploring? Do you carry time as a burden or receive it as a
                gift? That direction is what makes the result feel alive.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-default-300 font-bold">03</span>
              <span>
                <strong>The full picture.</strong> Take all four and you see
                how the different parts of you interact. Where they agree,
                where they pull in different directions, and what that means
                for you right now.
              </span>
            </li>
          </ul>
        </section>

        {/* What it's not */}
        <section className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold">What Arcus isn't</h2>
          <ul className="flex flex-col gap-3 text-lg text-default-600">
            <li className="flex gap-3">
              <span className="text-default-300 font-bold">—</span>
              <span>
                <strong>Not a clinical tool.</strong> Arcus is for
                self-discovery and reflection. It can't diagnose anything, and
                it doesn't try to.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-default-300 font-bold">—</span>
              <span>
                <strong>Not a fixed identity.</strong> Your results are a
                snapshot of right now. Arcs move. Come back in six months and
                the picture may be different.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-default-300 font-bold">—</span>
              <span>
                <strong>Not a box.</strong> No binary types, no 16 categories,
                no "you are an X." Every result is a point on a continuum with
                a direction attached.
              </span>
            </li>
          </ul>
        </section>

        {/* Honesty */}
        <section className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold">Our commitment to honesty</h2>
          <p className="text-lg text-default-600 leading-relaxed">
            Every assessment in Arcus is grounded in published, peer-reviewed
            psychology. But Arcus itself is not a validated clinical instrument.
            It's theory-informed, built on real research, designed for
            reflection rather than diagnosis.
          </p>
          <p className="text-lg text-default-600 leading-relaxed">
            We state that openly because it matters. A test that claims more
            certainty than it has isn't helpful. We'd rather be honest about
            what Arcus can and can't tell you.
          </p>
          <Link to="/" className="mt-2">
            <Button variant="outline">
              Read the methodology
              <SolarArrowRightLineDuotone />
            </Button>
          </Link>
        </section>

        {/* CTA */}
        <div className="text-center flex flex-col items-center gap-4 pt-4">
          <h2 className="text-3xl font-bold">Ready to see your arc?</h2>
          <p className="text-lg text-default-500 max-w-md">
            Start with whichever dimension interests you most. Each test takes
            6 to 8 minutes.
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
