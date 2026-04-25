import { useState } from "react";
import { Button, Input, TextArea } from "pixel-retroui";
import { CopyButton } from "~/components/CopyButton";
import { ErrorBanner } from "~/components/ErrorBanner";
import { ParchmentCard } from "~/components/ParchmentCard";
import { SectionCard } from "~/components/SectionCard";
import {
  decodeSpellToUrl,
  isSpellError,
  type SpellErrorKind,
} from "~/core";

export function DecodePanel() {
  const [spell, setSpell] = useState("");
  const [url, setUrl] = useState<string | null>(null);
  const [errorKind, setErrorKind] = useState<SpellErrorKind | null>(null);

  const onUnseal = () => {
    setErrorKind(null);
    setUrl(null);
    try {
      setUrl(decodeSpellToUrl(spell));
    } catch (e) {
      if (isSpellError(e)) setErrorKind(e.kind);
      else setErrorKind("malformed");
    }
  };

  return (
    <div className="space-y-5">
      <ParchmentCard
        title="呪文をURLに戻す"
        ribbonColor="purple"
      >
        <label className="block">
          <span className="text-ink mb-1.5 flex items-center gap-1 text-sm font-bold">
            <i className="pixelart-icons-font-edit text-lg" aria-hidden />
            呪文を入力してください
          </span>
          <Input
            placeholder="ここに呪文を入力...（ひらがなで入力してください）"
            value={spell}
            onChange={(e) => setSpell(e.target.value)}
            bg="#fcfaf5"
            textColor="#4a3520"
            borderColor="#d4c6a8"
            className="!m-0 w-full"
          />
        </label>
        <div className="mt-6 flex justify-center">
          <Button
            type="button"
            onClick={onUnseal}
            disabled={!spell.trim()}
            bg="#4a2e6b"
            textColor="#f3ead0"
            shadow="#0a0820"
            borderColor="#f0c860"
            className="!m-0 inline-flex items-center gap-4 font-pixel text-base tracking-[0.2em] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <i className="pixelart-icons-font-key text-gold text-xl" aria-hidden />
            呪文を解読する
          </Button>
        </div>
        <ErrorBanner kind={errorKind} />
      </ParchmentCard>

      {url && (
        <SectionCard
          title="復元されたURL"
          icon="pixelart-icons-font-link"
          trailing={
            <div className="flex items-center gap-2">
              <a
                href={url}
                target="_blank"
                rel="noreferrer noopener"
                className="border-border bg-panel-3 text-cream hover:bg-panel-2 inline-flex items-center gap-1 rounded border-2 px-3 py-1 text-xs transition-colors"
              >
                <i
                  className="pixelart-icons-font-external-link text-base"
                  aria-hidden
                />
                開く
              </a>
              <CopyButton text={url} label="コピー" />
            </div>
          }
        >
          <TextArea
            value={url}
            readOnly
            rows={2}
            bg="#1c1a52"
            textColor="#f3ead0"
            borderColor="#5a5cb8"
            className="!m-0 w-full"
          />
        </SectionCard>
      )}
    </div>
  );
}
