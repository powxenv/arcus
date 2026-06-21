import { Link, useRouterState } from "@tanstack/react-router";

import logo from "../assets/logo.svg";
import SolarArrowRightLineDuotone from "~icons/solar/arrow-right-line-duotone";
import { Button } from "@heroui/react";

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
          <Link to="/">
            <Button variant={current === "/" ? "primary" : "ghost"}>
              Home
            </Button>
          </Link>
          <Link to="/about">
            <Button variant={current === "/about" ? "primary" : "ghost"}>
              About
            </Button>
          </Link>
          <Button variant="ghost">Methodology</Button>
          <Link to="/">
            <Button>
              Begin Your Arc
              <SolarArrowRightLineDuotone />
            </Button>
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
          <Link to="/" className="hover:text-default-foreground transition-colors">
            Home
          </Link>
          <Link to="/about" className="hover:text-default-foreground transition-colors">
            About
          </Link>
          <span className="hover:text-default-foreground transition-colors cursor-pointer">
            Methodology
          </span>
        </nav>
      </div>
    </footer>
  );
}
