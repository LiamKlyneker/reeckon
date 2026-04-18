import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import SectionTitle from "./section-title";

export default function Cta() {
  return (
    <Container className="mb-40 py-32">
      <SectionTitle
        kicker="get started"
        title="Start building your skills library."
        sub="Standardize your team's AI skills in minutes. Write once, share everywhere."
      />
      <div className="flex items-center justify-center gap-3">
        <Button size="lg" asChild>
          <Link href="/docs/quick-start">
            Get Started <ArrowRightIcon />
          </Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="/docs">Read the Docs</Link>
        </Button>
      </div>
    </Container>
  );
}
