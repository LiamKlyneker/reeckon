import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, Copy } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <Container className="pt-24 pb-28">
      <h1 className="mb-5 max-w-[690px] text-5xl font-semibold">
        A single place for your team's skills
      </h1>
      <p className="mb-10 max-w-[620px]">
        <span className="text-primary font-semibold">reeckon</span> is a library
        where you can create skills once and distributed to your team for all
        the ai tools available out there, claude, cursor, codex, antigravity and
        many more.
      </p>
      <div className="flex gap-4">
        <Button size="lg" asChild>
          <Link href="/docs">
            Get started <ArrowRightIcon />
          </Link>
        </Button>
        <div className="bg-accent flex items-center gap-4 rounded pr-2 pl-4">
          <p>npm create reeckon@latest</p>
          <Button size="icon-sm" variant="ghost">
            <Copy />
          </Button>
        </div>
      </div>
    </Container>
  );
}
