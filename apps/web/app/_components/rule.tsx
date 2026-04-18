"use client";

import { cn } from "@/lib/utils";
import { useReveal } from "../_lib/use-reveal";

type RuleProps = {
  label: string;
  variant?: "thick" | "thin";
  labelPosition?: "left" | "right";
};

export default function Rule({
  label,
  variant = "thick",
  labelPosition = "left",
}: RuleProps) {
  const { ref, revealed } = useReveal<HTMLDivElement>(0.1);

  return (
    <div className="rule-wrap">
      <div
        ref={ref}
        className={cn(
          "rule",
          variant === "thin" && "rule-thin",
          revealed && "rule-on"
        )}
      >
        <span
          className="rule-label"
          style={
            labelPosition === "right" ? { left: "auto", right: 32 } : undefined
          }
        >
          <span className="dot" />
          {label}
        </span>
      </div>
    </div>
  );
}
