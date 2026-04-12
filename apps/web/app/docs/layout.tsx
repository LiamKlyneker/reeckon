import { DocsSidebar } from "@/app/docs/_components/docs-sidebar";
import Container from "@/components/container";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container className="flex gap-10 pt-8 pb-40">
      {/* <div className="mx-auto flex max-w-[1280px] gap-10 px-6 py-10 pb-40"> */}
      <DocsSidebar />
      <article className="max-w-2xl min-w-0 flex-1">{children}</article>
    </Container>
  );
}
