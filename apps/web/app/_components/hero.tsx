import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import ConstellationGraphic from "./constellation-graphic";
import InstallPill from "./install-pill";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-28">
      <ConstellationGraphic />
      <Container className="relative z-[1]">
        <span className="bg-background/80 text-muted-foreground mb-7 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-xs">
          <span
            className="size-1.5 rounded-full"
            style={{
              background: "var(--primary)",
              boxShadow:
                "0 0 0 3px color-mix(in oklab, var(--primary) 12%, transparent), 0 0 0 6px var(--secondary-accent-soft)",
            }}
          />
          v0.4 — now with 12+ adapters
        </span>
        <h1 className="mb-6 max-w-[880px] font-mono text-5xl leading-[1.05] font-medium tracking-tight md:text-6xl lg:text-[68px]">
          A single place for your team&apos;s{" "}
          <span className="hero-accent">skills</span>.
        </h1>
        <p className="text-muted-foreground mb-9 max-w-[560px] text-[17px] leading-[1.55]">
          <span className="text-primary font-mono font-medium">reeckon</span> is
          a library where you create skills once and distribute them to your
          team across every AI tool — Claude Code, Cursor, Codex, Antigravity
          and more.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="lg" asChild>
            <Link href="/docs/quick-start">
              Get started <ArrowRightIcon />
            </Link>
          </Button>
          <InstallPill />
        </div>
      </Container>
    </section>
  );
}
