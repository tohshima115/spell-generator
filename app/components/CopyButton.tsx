import { useState } from "react";
import { Button } from "pixel-retroui";

export function CopyButton({
  text,
  label = "コピー",
  className,
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const onClick = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // クリップボード API が不可の環境では無音で諦める
    }
  };

  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={!text}
      bg="#383695"
      textColor="#f3ead0"
      shadow="#0a0820"
      borderColor="#5a5cb8"
      className={[
        "!m-0 inline-flex items-center gap-1 text-xs font-sans disabled:cursor-not-allowed disabled:opacity-40",
        className ?? "",
      ].join(" ")}
    >
      <i className="pixelart-icons-font-copy text-base" aria-hidden />
      {copied ? "コピーしました" : label}
    </Button>
  );
}
