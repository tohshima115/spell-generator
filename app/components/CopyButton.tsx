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
      bg="#08111e"
      textColor="#dec292"
      shadow="#0a0820"
      borderColor="#52423a"
      className={[
        "!m-0 inline-flex w-full max-w-[180px] flex-1 basis-0 items-center justify-center gap-2 px-1 text-sm font-pixel tracking-wider disabled:cursor-not-allowed disabled:opacity-40 sm:px-3",
        className ?? "",
      ].join(" ")}
    >
      <i className="pixelart-icons-font-copy text-base" aria-hidden />
      {copied ? "コピー完了" : label}
    </Button>
  );
}
