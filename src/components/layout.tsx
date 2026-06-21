import { Link, useRouterState } from "@tanstack/react-router";

import logo from "../assets/logo.svg";
import SolarArrowRightLineDuotone from "~icons/solar/arrow-right-line-duotone";
import { buttonVariants } from "@heroui/react";

export function Header() {
  const { location } = useRouterState();
  const current = location.pathname;

  return (
    <header className="h-12 fixed top-4 left-1/2 rounded-full -translate-x-1/2 bg-white flex items-center pl-2 pr-1.5 shadow-2xl shadow-black/6 border-[.5px] z-50">
      <div className="flex items-center gap-10">
        <Link to="/" className="flex items-center gap-2">
          <img className="size-8" src={logo} alt="Arcus logo" />
          <span className="font-bold text-lg">Arcus</span>
        </Link>
        <nav className="flex">
          <Link
            to="/"
            className={buttonVariants({
              variant: current === "/" ? "secondary" : "ghost",
            })}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={buttonVariants({
              variant: current === "/about" ? "secondary" : "ghost",
            })}
          >
            About
          </Link>
          <Link
            to="/theory"
            className={buttonVariants({
              variant: current === "/theory" ? "secondary" : "ghost",
            })}
          >
            Theory
          </Link>
          <Link to="/start" className={buttonVariants()}>
            Begin Your Arc
            <SolarArrowRightLineDuotone />
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t-[.5px] border-default-200 mt-20">
      <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <img className="size-6" src={logo} alt="Arcus logo" />
          <span className="font-bold">Arcus</span>
        </div>
        <p className="text-sm text-default-400">
          For self-discovery and reflection. Not a clinical assessment.
        </p>
        <nav className="flex gap-4 text-sm text-default-500">
          <Link
            to="/"
            className="hover:text-default-foreground transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hover:text-default-foreground transition-colors"
          >
            About
          </Link>
          <Link
            to="/theory"
            className="hover:text-default-foreground transition-colors"
          >
            Theory
          </Link>
        </nav>
      </div>
    </footer>
  );
}
