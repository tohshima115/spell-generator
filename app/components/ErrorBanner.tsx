import type { SpellErrorKind } from "~/core";

const MESSAGES: Record<SpellErrorKind, string> = {
  "invalid-chars": "呪文に使えない文字が含まれています",
  "unknown-version": "この呪文は新しすぎてこのバージョンでは解けません",
  "unknown-token": "この呪文の辞書エントリが見つかりません",
  malformed: "呪文が壊れているようです",
  checksum: "呪文に書き間違いがあります",
  length: "呪文の長さが不正です",
  payload: "ペイロードを処理できませんでした",
};

export const messageFor = (kind: SpellErrorKind): string => MESSAGES[kind];

export function ErrorBanner({ kind }: { kind: SpellErrorKind | null }) {
  if (kind === null) return null;
  return (
    <p
      role="alert"
      className="border-shu bg-shu/15 text-cream mt-2 flex items-center gap-2 rounded border-2 px-3 py-2 text-sm"
    >
      <i
        className="pixelart-icons-font-alert text-shu text-lg"
        aria-hidden
      />
      {messageFor(kind)}
    </p>
  );
}
