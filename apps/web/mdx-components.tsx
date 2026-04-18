import type { MDXComponents } from "mdx/types";
import { Children, isValidElement } from "react";
import { CodeBlock } from "@/components/code-block";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => (
      <h1
        className="sec-kicker text-foreground mb-4 text-3xl font-medium tracking-tight"
        {...props}
      />
    ),
    h2: (props) => (
      <h2
        className="text-foreground mt-10 mb-4 text-2xl font-semibold tracking-tight"
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className="text-foreground mt-8 mb-3 text-xl font-semibold tracking-tight"
        {...props}
      />
    ),
    h4: (props) => (
      <h4
        className="text-foreground mt-6 mb-2 text-lg font-semibold tracking-tight"
        {...props}
      />
    ),
    p: (props) => (
      <p
        className="text-foreground mb-4 leading-7 [&:not(:first-child)]:mt-2"
        {...props}
      />
    ),
    a: (props) => (
      <a
        className="text-primary font-medium underline underline-offset-4 hover:opacity-80"
        {...props}
      />
    ),
    ul: (props) => (
      <ul className="my-4 ml-6 list-disc [&>li]:mt-2" {...props} />
    ),
    ol: (props) => (
      <ol className="my-4 ml-6 list-decimal [&>li]:mt-2" {...props} />
    ),
    blockquote: (props) => (
      <blockquote
        className="border-border text-muted-foreground mt-4 border-l-2 pl-6 italic"
        {...props}
      />
    ),
    code: ({ className, ...props }) => {
      if (className?.startsWith("language-")) {
        return <code className={className} {...props} />;
      }
      return (
        <code
          className="bg-muted rounded px-[0.3rem] py-[0.2rem] font-mono text-sm"
          {...props}
        />
      );
    },
    pre: (props) => {
      const child = Children.only(props.children);
      if (isValidElement<{ className?: string; children?: string }>(child)) {
        const className = child.props.className || "";
        const lang = className.replace("language-", "") || "text";
        const code = String(child.props.children || "").replace(/\n$/, "");
        return <CodeBlock code={code} lang={lang} />;
      }
      return (
        <pre
          className="border-border bg-muted my-4 overflow-x-auto rounded-lg border p-4 font-mono text-sm"
          {...props}
        />
      );
    },
    table: (props) => (
      <div className="my-6 w-full overflow-x-auto">
        <table className="w-full text-sm" {...props} />
      </div>
    ),
    thead: (props) => <thead className="border-border border-b" {...props} />,
    th: (props) => (
      <th
        className="text-foreground px-4 py-2 text-left font-semibold"
        {...props}
      />
    ),
    td: (props) => (
      <td
        className="border-border text-foreground border-b px-4 py-2"
        {...props}
      />
    ),
    hr: (props) => <hr className="border-border my-8" {...props} />,
    ...components,
  };
}
