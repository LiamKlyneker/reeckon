import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function Cta() {
  return (
    <Container className="mb-40 py-40">
      <div className="text-center">
        <h2 className="mb-4 text-3xl font-semibold">
          Start building your skills library
        </h2>
        <p className="text-muted-foreground mx-auto mb-10 max-w-[460px]">
          Standardize your team&apos;s AI skills in minutes. Write once, share
          everywhere.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/docs/quick-start">
              Get Started <ArrowRightIcon />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/docs">Read the Docs</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
