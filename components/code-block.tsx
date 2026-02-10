import { codeToHtml } from "shiki";

export async function CodeBlock({
  code,
  lang,
}: {
  code: string;
  lang: string;
}) {
  const html = await codeToHtml(code, {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
  });

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      className="[&_pre]:border-border my-4 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:p-4 [&_pre]:text-sm"
    />
  );
}
