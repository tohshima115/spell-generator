import type { SpellErrorKind } from "~/core";

/**
 * FC版ドラクエ1/2では、復活の呪文の入力が誤っているとき、原因によらず
 * 画面中央の小さな白枠（紺背景・白文字）に「じゅもんが ちがいます」とのみ表示される。
 * decode 時はこの挙動を忠実に再現する。
 * encode (URL→呪文) 時は原作に対応する場面がないため、DQ風口調で別文を出す。
 */
const DECODE_MESSAGE = "じゅもんが　ちがいます";
const ENCODE_MESSAGE = "そのURLでは　じゅもんを　つくれぬ";

export type ErrorContext = "decode" | "encode";

export const messageFor = (
  _kind: SpellErrorKind,
  context: ErrorContext = "decode",
): string => (context === "encode" ? ENCODE_MESSAGE : DECODE_MESSAGE);

export function ErrorBanner({
  kind,
  context = "decode",
}: {
  kind: SpellErrorKind | null;
  context?: ErrorContext;
}) {
  if (kind === null) return null;
  return (
    <div className="mt-4 flex justify-center" role="alert" aria-live="polite">
      <p className="font-pixel border-2 border-cream bg-[#0a1454] px-5 py-3 text-center text-base tracking-[0.18em] text-cream shadow-[0_4px_0_0_rgba(0,0,0,0.55)]">
        {messageFor(kind, context)}
      </p>
    </div>
  );
}
