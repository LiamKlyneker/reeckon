"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/components/container";
import WindowFrame from "./window-frame";
import SectionTitle from "./section-title";

const STEPS = [
  {
    number: "01",
    title: "Create",
    description: "Scaffold a skills project in seconds.",
    command: "pnpm create reeckon my-skills",
  },
  {
    number: "02",
    title: "Develop",
    description: "Preview skills in a local dashboard.",
    command: "pnpm dev",
  },
  {
    number: "03",
    title: "Share",
    description: "Anyone can install your skills.",
    command: "npx reeckon add your-org/my-skills",
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Container className="mb-40 py-32">
      <SectionTitle
        kicker="how it works"
        title="From zero to shared skills in three commands."
      />

      <div ref={ref} className="relative">
        {/* Connector line (desktop only) */}
        <div className="border-border absolute top-[42px] right-[16.67%] left-[16.67%] hidden border-t border-dashed lg:block" />

        <div className="grid gap-8 lg:grid-cols-3 lg:gap-6">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className="transition-all duration-500"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transitionDelay: `${i * 150}ms`,
              }}
            >
              <div className="step-bubble-ring bg-primary text-primary-foreground relative z-10 mx-auto mb-5 flex size-11 items-center justify-center rounded-full font-mono text-sm font-medium">
                {step.number}
              </div>
              <h3 className="mb-2 text-center font-mono text-lg font-medium">
                {step.title}
              </h3>
              <p className="text-muted-foreground mb-5 text-center text-sm">
                {step.description}
              </p>
              <WindowFrame variant="terminal">
                <div className="p-4 text-sm">
                  <span className="text-muted-foreground">$ </span>
                  {step.command}
                </div>
              </WindowFrame>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
