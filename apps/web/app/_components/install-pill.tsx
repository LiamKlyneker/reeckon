"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

const COMMAND = "npm create reeckon@latest";

export default function InstallPill() {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(COMMAND);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable; no-op
    }
  };

  return (
    <div
      className="bg-accent flex h-11 items-center gap-2.5 rounded-[var(--radius)] border py-0 pr-2 pl-4 font-mono text-[13px]"
      style={{
        borderColor:
          "color-mix(in oklab, var(--secondary-accent) 35%, transparent)",
      }}
    >
      <span style={{ color: "var(--secondary-accent-text)" }}>$</span>
      <span>{COMMAND}</span>
      <button
        type="button"
        onClick={onCopy}
        aria-label="Copy install command"
        className="text-muted-foreground hover:bg-border hover:text-foreground inline-flex size-[30px] items-center justify-center rounded-[5px] transition-colors"
      >
        {copied ? <Check size={13} /> : <Copy size={13} />}
      </button>
    </div>
  );
}
