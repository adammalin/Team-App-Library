"use client";

import { Check, Copy } from "@phosphor-icons/react";
import { useState } from "react";

export function CodeBlock({
  code,
  label,
}: {
  code: string;
  label: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="code-block">
      <div className="code-block__header">
        <span>{label}</span>
        <button type="button" onClick={copyCode} aria-live="polite">
          {copied ? <Check weight="bold" /> : <Copy />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}
