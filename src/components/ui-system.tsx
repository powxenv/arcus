import type { ReactNode } from "react";
import { Link, type LinkProps } from "@tanstack/react-router";
import { Chip } from "@heroui/react";

export function PageShell({
  children,
  size = "md",
}: {
  children?: ReactNode;
  size?: "sm" | "md" | "lg";
}) {
  const max =
    size === "lg" ? "max-w-4xl" : size === "sm" ? "max-w-2xl" : "max-w-3xl";

  return (
    <main className={`${max} mx-auto min-h-screen py-28 px-6`}>{children}</main>
  );
}

export function PageStack({
  children,
  gap = "md",
}: {
  children: ReactNode;
  gap?: "sm" | "md" | "lg";
}) {
  const cls = gap === "lg" ? "gap-18" : gap === "sm" ? "gap-10" : "gap-12";
  return <div className={`flex flex-col ${cls}`}>{children}</div>;
}

export function Hero({
  eyebrow,
  icon,
  title,
  children,
  meta,
  align = "left",
}: {
  eyebrow?: string;
  icon?: string;
  title: ReactNode;
  children: ReactNode;
  meta?: ReactNode;
  align?: "left" | "center";
}) {
  const isCentered = align === "center";

  return (
    <header
      className={`flex flex-col gap-3 ${
        isCentered ? "items-center text-center" : "items-start"
      }`}
    >
      {eyebrow ? (
        <Chip size="lg" variant="soft" className="self-auto">
          {eyebrow}
        </Chip>
      ) : null}
      {icon ? <img className="size-14" src={icon} alt="" /> : null}
      <h1 className="text-4xl sm:text-5xl font-black leading-[1] text-balance">
        {title}
      </h1>
      <p className="text-lg text-default-500 max-w-2xl leading-relaxed text-pretty">
        {children}
      </p>
      {meta ? <p className="text-sm text-default-400">{meta}</p> : null}
    </header>
  );
}

export function Section({
  title,
  children,
  intro,
}: {
  title: ReactNode;
  children: ReactNode;
  intro?: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-2xl font-bold leading-tight text-balance">
          {title}
        </h2>
        {intro ? (
          <p className="text-base text-default-600 leading-relaxed max-w-2xl text-pretty">
            {intro}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

export function TextBlock({ children }: { children: ReactNode }) {
  return (
    <p className="flex flex-col gap-4 text-lg text-default-600 leading-relaxed text-pretty">
      {children}
    </p>
  );
}

export function Surface({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white rounded-2xl border-[.5px] border-default-200 p-5 ${className}`}
    >
      {children}
    </div>
  );
}

export function CardLink(
  props: LinkProps & { children: ReactNode; className?: string },
) {
  const { children, className, ...linkProps } = props;

  return (
    <Link
      {...linkProps}
      className={`bg-white rounded-2xl border-[.5px] border-default-200 p-5 transition-colors hover:bg-default-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 ${
        className ?? ""
      }`}
    >
      {children}
    </Link>
  );
}

export function QuietCallout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-default-50 rounded-2xl border-[.5px] border-default-200 p-5 text-default-800">
      {children}
    </div>
  );
}

export function PageCta({
  title,
  children,
  action,
}: {
  title: ReactNode;
  children: ReactNode;
  action: ReactNode;
}) {
  return (
    <section className="text-center flex flex-col items-center gap-4 pt-2">
      <h2 className="text-3xl font-bold leading-tight text-balance">{title}</h2>
      <div className="text-lg text-default-500 max-w-md leading-relaxed text-pretty">
        {children}
      </div>
      {action}
    </section>
  );
}
