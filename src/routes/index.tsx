import { createFileRoute, Link } from "@tanstack/react-router";
import decor1 from "../assets/decoration-1.svg";
import decor2 from "../assets/decoration-2.svg";
import decor3 from "../assets/decoration-3.svg";
import decor4 from "../assets/decoration-4.svg";
import SolarArrowRightLineDuotone from "~icons/solar/arrow-right-line-duotone";
import PhDiceFiveDuotone from "~icons/ph/dice-five-duotone";
import PhHeadCircuitDuotone from "~icons/ph/head-circuit-duotone";
import { buttonVariants } from "@heroui/react";
import { ASSESSMENTS } from "../components/assessment-data";
import { AssessmentStartModal } from "../components/assessment-start-modal";

export const Route = createFileRoute("/")({ component: Home });

const CARDS = [
  {
    key: "solstice",
    decor: decor1,
    rotation: "rotate-6",
    title: "The Solstice Cycle Assessment",
    desc: "Your energy has a natural rhythm. This test shows you where you sit on that cycle right now, and whether you're building toward a peak or settling into rest.",
  },
  {
    key: "turing",
    decor: decor2,
    rotation: "-rotate-4",
    title: "The Modes of Mind Assessment",
    desc: "You might say you think things through carefully, but do your actual choices confirm that? This test compares what you believe about your own thinking with how you really decide.",
  },
  {
    key: "pride",
    decor: decor3,
    rotation: "-rotate-4",
    title: "The Spectrum of Self Assessment",
    desc: "How well do you actually know yourself, and how closely does what you show the world match who you are inside? This test explores the gap between self-knowledge and self-expression.",
  },
  {
    key: "passage",
    decor: decor4,
    rotation: "rotate-6",
    title: "The Passage of Time Assessment",
    desc: "Where does your attention naturally sit? In the past, the present, or the future? This test maps which parts of time you engage with most, and how you feel about time moving forward.",
  },
] as const;

function Home() {
  return (
    <div className="max-w-4xl mx-auto min-h-screen py-28">
      <div className="text-center flex flex-col">
        <h1 className="text-9xl font-black -tracking-widest leading-26">
          See the arc you're on.
        </h1>
        <p className="text-xl max-w-sm mx-auto my-4">
          Find out not just where you stand, but which direction you're heading.
          Four assessments, each revealing a different part of who you are.
        </p>
        <div className="flex gap-1 justify-center">
          <Link
            to="/theory"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            <PhHeadCircuitDuotone />
            How it works
          </Link>
          <Link to="/start" className={buttonVariants({ size: "lg" })}>
            <PhDiceFiveDuotone />
            Take a test
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 mt-8 gap-8">
        {CARDS.map((card) => (
          <div
            key={card.key}
            className={`bg-white p-8 rounded-2xl flex flex-col gap-2 shadow-2xl shadow-black/6 border-[.5px] ${card.rotation}`}
          >
            <img className="size-12" src={card.decor} alt="" />
            <h2 className="text-2xl">{card.title}</h2>
            <p>{card.desc}</p>
            <div className="grid grid-cols-2 gap-2 mt-auto">
              <Link
                to="/assessment/$key"
                params={{ key: card.key }}
                className={buttonVariants({
                  variant: "outline",
                  className: "w-full",
                })}
              >
                Learn more
                <SolarArrowRightLineDuotone />
              </Link>
              <AssessmentStartModal
                assessment={ASSESSMENTS[card.key]}
                triggerLabel="Start"
                triggerClassName="w-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
