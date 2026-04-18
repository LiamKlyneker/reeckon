"use client";

import { cn } from "@/lib/utils";
import { useReveal } from "../_lib/use-reveal";

type SectionTitleProps = {
  kicker: string;
  title: string;
  sub?: string;
  className?: string;
};

export default function SectionTitle({
  kicker,
  title,
  sub,
  className,
}: SectionTitleProps) {
  const { ref, revealed } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(
        "reveal mb-16 text-center",
        revealed && "reveal-on",
        className
      )}
    >
      <span
        className="sec-kicker text-muted-foreground mb-4 inline-block font-mono text-[11px] tracking-[0.08em] uppercase"
        aria-label={kicker}
      >
        {kicker}
      </span>
      <h2 className="font-mono text-3xl font-medium tracking-tight md:text-4xl">
        {title}
      </h2>
      {sub && (
        <p className="text-muted-foreground mx-auto mt-3 max-w-[520px]">
          {sub}
        </p>
      )}
    </div>
  );
}
