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
      <ParchmentCard title="呪文をURLに戻す">
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
            bg="#112664"
            textColor="#f3ead0"
            shadow="#0a0820"
            borderColor="#2b2327"
            style={{ backgroundImage: "linear-gradient(180deg, #163283 0%, #112664 100%)" }}
            className="!m-0 inline-flex items-center gap-4 font-pixel text-base tracking-[0.2em] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <i className="pixelart-icons-font-lock-open text-gold text-xl" aria-hidden />
            <span className="relative top-[-2px]">呪文を解読する</span>
            <i className="pixelart-icons-font-lock-open text-gold text-xl" aria-hidden />
          </Button>
        </div>
        <ErrorBanner kind={errorKind} />
      </ParchmentCard>

      {url && (
        <SectionCard
          title="復元されたURL"
          icon="pixelart-icons-font-link"
        >
          <TextArea
            value={url}
            readOnly
            rows={2}
            bg="#020509"
            textColor="#f3ead0"
            borderColor="#52423a"
            className="!m-0 w-full"
          />
          <div className="mt-4 flex flex-row items-center justify-center gap-5 sm:gap-8">
            <Button
              type="button"
              onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
              bg="#08111e"
              textColor="#dec292"
              shadow="#0a0820"
              borderColor="#52423a"
              className="!m-0 inline-flex w-full max-w-[180px] flex-1 basis-0 items-center justify-center gap-2 px-1 text-sm font-pixel tracking-wider sm:px-3"
            >
              <i
                className="pixelart-icons-font-external-link text-base"
                aria-hidden
              />
              開く
            </Button>
            <CopyButton text={url} label="コピー" />
          </div>
        </SectionCard>
      )}
    </div>
  );
}
