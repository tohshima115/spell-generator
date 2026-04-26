import { useState } from "react";
import { Button, Input, TextArea } from "pixel-retroui";
import { CopyButton } from "~/components/CopyButton";
import { ShareXButton } from "~/components/ShareXButton";
import { ErrorBanner } from "~/components/ErrorBanner";
import { SectionCard } from "~/components/SectionCard";
import { ParchmentCard } from "~/components/ParchmentCard";
import {
  encodeUrlToSpell,
  isSpellError,
  type EncodeResult,
  type SpellErrorKind,
} from "~/core";

export function EncodePanel() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<EncodeResult | null>(null);
  const [errorKind, setErrorKind] = useState<SpellErrorKind | null>(null);

  const onCast = () => {
    setErrorKind(null);
    setResult(null);
    try {
      setResult(encodeUrlToSpell(url));
    } catch (e) {
      if (isSpellError(e)) setErrorKind(e.kind);
      else setErrorKind("malformed");
    }
  };

  return (
    <div className="space-y-5">
      <ParchmentCard title="URLを呪文に変換する">
        <label className="block">
          <span className="text-ink mb-1.5 flex items-center gap-1 text-sm font-bold">
            <i className="pixelart-icons-font-edit text-lg" aria-hidden />
            URLを入力してください
          </span>
          <Input
            placeholder="https://example.com/..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            autoComplete="off"
            spellCheck={false}
            bg="#fcfaf5"
            textColor="#4a3520"
            borderColor="#d4c6a8"
            className="!m-0 w-full"
          />
        </label>
        <p className="text-ink/80 mt-2 text-xs flex items-center gap-1 font-medium">
          <i className="pixelart-icons-font-lock text-sm" aria-hidden />
          入力されたURLはブラウザ内でのみ処理され、サーバーに送信されることはありません。
        </p>
        <div className="mt-6 flex justify-center">
          <Button
            type="button"
            onClick={onCast}
            disabled={!url.trim()}
            bg="#112664"
            textColor="#f3ead0"
            shadow="#0a0820"
            borderColor="#2b2327"
            style={{ backgroundImage: "linear-gradient(180deg, #163283 0%, #112664 100%)" }}
            className="!m-0 inline-flex items-center gap-4 font-pixel text-base tracking-[0.2em] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <i className="pixelart-icons-font-moon-stars text-gold text-xl" aria-hidden />
            <span className="relative top-[-2px]">呪文を生成する</span>
            <i className="pixelart-icons-font-moon-stars text-gold text-xl" aria-hidden />
          </Button>
        </div>
        <ErrorBanner kind={errorKind} context="encode" />
      </ParchmentCard>

      {result && (
        <SectionCard
          title="生成された呪文"
          icon="pixelart-icons-font-book-open"
        >
          <TextArea
            value={result.spell}
            readOnly
            rows={5}
            autoComplete="off"
            bg="#020509"
            textColor="#f3ead0"
            borderColor="#52423a"
            className="!m-0 w-full font-pixel text-lg tracking-[0.2em]"
            style={{ resize: "none" }}
          />
          <div className="mt-4 flex flex-row items-center justify-center gap-5 sm:gap-8">
            <ShareXButton spell={result.spell} />
            <CopyButton text={result.spell} label="コピー" />
          </div>
        </SectionCard>
      )}
    </div>
  );
}
