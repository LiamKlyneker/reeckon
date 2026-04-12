import Container from "@/components/container";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <Container className="flex h-[80px] items-center justify-between">
        <Link href="/">
          <picture className="flex items-center gap-2">
            <div className="bg-primary size-6 rounded" />
            <p className="font-mono text-base font-medium">reeckon</p>
          </picture>
        </Link>
      </Container>
    </header>
  );
}
