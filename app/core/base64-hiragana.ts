import { SpellError } from "./errors";
import { HIRAGANA_64, hiraganaAt, indexOfHiragana } from "./hiragana";

/**
 * 標準 Base64 と同じく 3 バイト → 4 文字の変換を行うが、
 * アルファベット 64 種をひらがな 64 種に置き換えたもの。
 * パディング (`=`) は使わず、末尾は半端な文字数で終わる。
 */

export const encodeBytesToHiragana = (bytes: Uint8Array): string => {
  let out = "";
  let i = 0;
  // 3 バイト分まとまって取れるあいだ通常処理
  while (i + 3 <= bytes.length) {
    const n = (bytes[i]! << 16) | (bytes[i + 1]! << 8) | bytes[i + 2]!;
    out += hiraganaAt((n >> 18) & 0x3f);
    out += hiraganaAt((n >> 12) & 0x3f);
    out += hiraganaAt((n >> 6) & 0x3f);
    out += hiraganaAt(n & 0x3f);
    i += 3;
  }
  const rest = bytes.length - i;
  if (rest === 1) {
    // 1 バイト = 8 bit → ひらがな 2 文字 (上位 6bit + 残り 2bit を上位に詰める)
    const n = bytes[i]! << 16;
    out += hiraganaAt((n >> 18) & 0x3f);
    out += hiraganaAt((n >> 12) & 0x3f);
  } else if (rest === 2) {
    // 2 バイト = 16 bit → ひらがな 3 文字 (6+6+4)
    const n = (bytes[i]! << 16) | (bytes[i + 1]! << 8);
    out += hiraganaAt((n >> 18) & 0x3f);
    out += hiraganaAt((n >> 12) & 0x3f);
    out += hiraganaAt((n >> 6) & 0x3f);
  }
  return out;
};

export const decodeHiraganaToBytes = (chars: string): Uint8Array => {
  // サニタイズ済み前提だが防御的に検証する
  const indices: number[] = [];
  for (const ch of chars) {
    const idx = indexOfHiragana(ch);
    if (idx < 0) {
      throw new SpellError(
        "invalid-chars",
        `64 ひらがなセット外の文字が含まれています: ${ch}`,
      );
    }
    indices.push(idx);
  }

  const len = indices.length;
  // 4 文字単位で 3 バイト。残り 1 文字 (= 6bit のみ) は復元不能
  const remainder = len % 4;
  if (remainder === 1) {
    throw new SpellError(
      "length",
      `呪文の長さが不正です (${len} 文字)`,
    );
  }

  const fullChunks = Math.floor(len / 4);
  const tailChars = remainder; // 0, 2, or 3
  const tailBytes = tailChars === 0 ? 0 : tailChars - 1; // 2→1, 3→2
  const out = new Uint8Array(fullChunks * 3 + tailBytes);

  let bi = 0;
  for (let c = 0; c + 4 <= len; c += 4) {
    const n =
      (indices[c]! << 18) |
      (indices[c + 1]! << 12) |
      (indices[c + 2]! << 6) |
      indices[c + 3]!;
    out[bi++] = (n >> 16) & 0xff;
    out[bi++] = (n >> 8) & 0xff;
    out[bi++] = n & 0xff;
  }
  if (tailChars === 2) {
    const n = (indices[len - 2]! << 18) | (indices[len - 1]! << 12);
    out[bi++] = (n >> 16) & 0xff;
  } else if (tailChars === 3) {
    const n =
      (indices[len - 3]! << 18) |
      (indices[len - 2]! << 12) |
      (indices[len - 1]! << 6);
    out[bi++] = (n >> 16) & 0xff;
    out[bi++] = (n >> 8) & 0xff;
  }
  return out;
};

export { HIRAGANA_64 };
