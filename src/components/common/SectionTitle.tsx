// src/components/common/SectionTitle.tsx
import React from "react";
import clsx from "clsx";

type Props = {
  /** Small line above the title (now can be string or JSX) */
  kicker?: React.ReactNode;
  /** Main title (string or JSX) */
  title: React.ReactNode;
  /** Optional subtitle (string or JSX) */
  subtitle?: React.ReactNode;
  centered?: boolean;
  className?: string;
};

export default function SectionTitle({
  kicker,
  title,
  subtitle,
  centered = false,
  className,
}: Props) {
  return (
    <header
      className={clsx(
        "mb-8 md:mb-10",
        centered ? "text-center" : "text-left",
        className
      )}
    >
      {kicker ? (
        typeof kicker === "string" ? (
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand-700">
            {kicker}
          </p>
        ) : (
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand-700">
            {kicker}
          </div>
        )
      ) : null}

      <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">{title}</h2>

      {subtitle ? (
        <p className={clsx("mt-2 text-stone-600", centered && "mx-auto max-w-2xl")}>
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}
