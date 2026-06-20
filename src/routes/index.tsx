import { createFileRoute } from "@tanstack/react-router";
import logo from "../assets/logo.svg";
import decor1 from "../assets/decoration-1.svg";
import decor2 from "../assets/decoration-2.svg";
import decor3 from "../assets/decoration-3.svg";
import decor4 from "../assets/decoration-4.svg";
import SolarArrowRightLineDuotone from "~icons/solar/arrow-right-line-duotone";
import PhDiceFiveDuotone from "~icons/ph/dice-five-duotone";
import SolarPlayLineDuotone from "~icons/solar/play-line-duotone";
import PhHeadCircuitDuotone from "~icons/ph/head-circuit-duotone";
import { Button } from "@heroui/react";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <>
      <header className="h-12 fixed top-4 left-1/2 rounded-full -translate-x-1/2 bg-white flex items-center pl-2 pr-1.5 shadow-2xl shadow-black/6 border-[.5px]">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <img className="size-8" src={logo} alt="Logo" />
            <span className="font-bold text-lg">Arcus</span>
          </div>
          <nav className="flex">
            <Button variant="ghost">Home</Button>
            <Button variant="ghost">About</Button>
            <Button variant="ghost">Methodology</Button>
            <Button>
              Begin Your Arc
              <SolarArrowRightLineDuotone />
            </Button>
          </nav>
        </div>
      </header>
      <div className="max-w-4xl mx-auto min-h-screen py-28">
        <div className="text-center flex flex-col">
          <h1 className="text-9xl font-black -tracking-widest leading-26">
            See the arc you're on.
          </h1>
          <p className="text-xl max-w-sm mx-auto my-4">
            Find out not just where you stand, but which direction you're
            heading. Four assessments, each revealing a different part of who
            you are.
          </p>
          <div className="flex gap-1 justify-center">
            <Button variant="outline" size="lg">
              <PhHeadCircuitDuotone />
              How it works
            </Button>
            <Button size="lg">
              <PhDiceFiveDuotone />
              Take a test
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 mt-8 gap-8">
          <div className="bg-white p-8 rounded-2xl flex flex-col gap-2 shadow-2xl shadow-black/6 border-[.5px] rotate-6">
            <img className="size-12" src={decor1} alt="Logo" />
            <h2 className="text-2xl">The Solstice Cycle Assessment</h2>
            <p>
              Your energy has a natural rhythm. This test shows you where you
              sit on that cycle right now, and whether you're building toward a
              peak or settling into rest.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Button className="w-full" variant="outline">
                Learn more
                <SolarArrowRightLineDuotone />
              </Button>
              <Button className="w-full" variant="outline">
                <SolarPlayLineDuotone />
                Start
              </Button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl flex flex-col gap-2 shadow-2xl shadow-black/6 border-[.5px] -rotate-4">
            <img className="size-12" src={decor2} alt="Logo" />
            <h2 className="text-2xl">The Modes of Mind Assessment</h2>
            <p>
              You might say you think things through carefully, but do your
              actual choices confirm that? This test compares what you believe
              about your own thinking with how you really decide.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Button className="w-full" variant="outline">
                Learn more
                <SolarArrowRightLineDuotone />
              </Button>
              <Button className="w-full" variant="outline">
                <SolarPlayLineDuotone />
                Start
              </Button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl flex flex-col gap-2 shadow-2xl shadow-black/6 border-[.5px] -rotate-4">
            <img className="size-12" src={decor3} alt="Logo" />
            <h2 className="text-2xl">The Spectrum of Self Assessment</h2>
            <p>
              How well do you actually know yourself, and how closely does what
              you show the world match who you are inside? This test explores
              the gap between self-knowledge and self-expression.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Button className="w-full" variant="outline">
                Learn more
                <SolarArrowRightLineDuotone />
              </Button>
              <Button className="w-full" variant="outline">
                <SolarPlayLineDuotone />
                Start
              </Button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl flex flex-col gap-2 shadow-2xl shadow-black/6 border-[.5px] rotate-6">
            <img className="size-12" src={decor4} alt="Logo" />
            <h2 className="text-2xl">The Passage of Time Assessment</h2>
            <p>
              Where does your attention naturally sit? In the past, the present,
              or the future? This test maps which parts of time you engage with
              most, and how you feel about time moving forward.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Button className="w-full" variant="outline">
                Learn more
                <SolarArrowRightLineDuotone />
              </Button>
              <Button className="w-full" variant="outline">
                <SolarPlayLineDuotone />
                Start
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
