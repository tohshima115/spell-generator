/**
 * デコード時に起こりうる失敗を判別可能なタグ付きエラーで表現する。
 * UI 層は `error.kind` を見て和文メッセージへ翻訳する。
 */
export type SpellErrorKind =
  | "invalid-chars"
  | "unknown-version"
  | "unknown-token"
  | "malformed"
  | "checksum"
  | "length"
  | "payload";

export class SpellError extends Error {
  readonly kind: SpellErrorKind;

  constructor(kind: SpellErrorKind, message: string) {
    super(message);
    this.kind = kind;
    this.name = "SpellError";
  }
}

export const isSpellError = (e: unknown): e is SpellError =>
  e instanceof SpellError;
