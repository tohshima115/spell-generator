import { useState } from "react";
import { Button, Input, TextArea } from "pixel-retroui";
import { CopyButton } from "~/components/CopyButton";
import { DictionaryList } from "~/components/DictionaryList";
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
      <ParchmentCard
        title="URLを呪文に変換する"
        ribbonColor="blue"
      >
        <label className="block">
          <span className="text-ink mb-1.5 flex items-center gap-1 text-sm font-bold">
            <i className="pixelart-icons-font-edit text-lg" aria-hidden />
            URLを入力してください
          </span>
          <Input
            placeholder="https://example.com/..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
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
            bg="#1c2a5c"
            textColor="#f3ead0"
            shadow="#0a0820"
            borderColor="#f0c860"
            className="!m-0 inline-flex items-center gap-4 font-pixel text-base tracking-[0.2em] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <i className="pixelart-icons-font-magic text-gold text-xl" aria-hidden />
            呪文を生成する
            <i className="pixelart-icons-font-magic text-gold text-xl" aria-hidden />
          </Button>
        </div>
        <ErrorBanner kind={errorKind} />
      </ParchmentCard>

      <SectionCard
        title="生成された呪文"
        icon="pixelart-icons-font-book-open"
        trailing={
          result ? <CopyButton text={result.spell} label="コピー" /> : null
        }
      >
        {result ? (
          <>
            <TextArea
              value={result.spell}
              readOnly
              rows={5}
              bg="#1c1a52"
              textColor="#f3ead0"
              borderColor="#5a5cb8"
              className="!m-0 w-full font-pixel text-lg tracking-[0.2em]"
            />
            <p className="text-cream-dim mt-2 text-[11px]">
              {result.matchedNote
                ? `辞書パターン: ${result.matchedNote}`
                : "辞書外URL（生のまま埋め込みました）"}
            </p>
          </>
        ) : (
          <TextArea
            placeholder="ここに呪文が表示されます"
            readOnly
            rows={5}
            bg="#1c1a52"
            textColor="#f3ead0"
            borderColor="#5a5cb8"
            className="!m-0 w-full font-pixel text-sm tracking-[0.2em]"
          />
        )}
        
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-gold/30 pt-4">
          <button
            type="button"
            className="text-amber hover:text-amber-2 flex items-center gap-2 text-sm font-pixel tracking-wider transition-colors"
          >
            <i className="pixelart-icons-font-box text-lg" aria-hidden />
            別の呪文パターンで生成する
          </button>
          <Button
            type="button"
            bg="#383695"
            textColor="#f3ead0"
            shadow="#0a0820"
            borderColor="#5a5cb8"
            className="!m-0 inline-flex items-center gap-2 text-sm font-pixel tracking-wider"
          >
            <i className="pixelart-icons-font-bookmark text-lg" aria-hidden />
            呪文を保存する
          </Button>
        </div>
        {/* <DictionaryList /> */}
      </SectionCard>
    </div>
  );
}
