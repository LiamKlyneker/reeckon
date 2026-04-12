import Container from "@/components/container";

export default function Header() {
  return (
    <header>
      <Container className="flex h-[80px] items-center justify-between">
        <picture className="flex items-center gap-2">
          <div className="bg-primary size-6 rounded" />
          <p className="font-mono text-base font-medium">reeckon</p>
        </picture>
      </Container>
    </header>
  );
}
