import {
  SUBSTRING_BASE_BYTE,
  SUBSTRING_LIMIT_BYTE,
  getSubstrings,
} from "./dictionary/substrings";
import { SpellError } from "./errors";

/**
 * 文字列ペイロード (str idType / 辞書外 URL) を、共通部分文字列を 1 バイトの
 * マーカーに置換しつつ UTF-8 バイト列にする。
 *
 * - URL に生で現れることのない制御文字領域 (0x01〜0x1F) をマーカーに使うため、
 *   通常のテキストとマーカーが衝突しない。
 * - 範囲外文字 (≥ 0x20) はそのまま UTF-8 で出力する。
 * - 互換性: テーブル側 (substrings.ts) を増やさなければ、古い v0 呪文の str/raw
 *   ペイロードはマーカー無しの純 UTF-8 として解釈でき、ラウンドトリップが保たれる。
 */

const TEXT_ENCODER = new TextEncoder();
const TEXT_DECODER_FATAL = new TextDecoder("utf-8", { fatal: true });

/** 入力文字列に制御文字 (0x00〜0x1F) が混入しているとマーカーと衝突する。 */
const containsReservedControlChars = (text: string): boolean => {
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    if (code <= SUBSTRING_LIMIT_BYTE) return true;
  }
  return false;
};

export const encodeStringPayload = (text: string, version: number): Uint8Array => {
  if (containsReservedControlChars(text)) {
    throw new SpellError(
      "payload",
      "URL や ID に制御文字 (0x00〜0x1F) は使えません",
    );
  }

  const subs = getSubstrings(version);
  // 最長一致を使うため、長い順に並べたインデックス配列を 1 度作る。
  const orderByLength = subs
    .map((_, i) => i)
    .sort((a, b) => subs[b]!.length - subs[a]!.length);

  const chunks: Uint8Array[] = [];
  let literalStart = 0;
  let i = 0;
  while (i < text.length) {
    let hitIdx = -1;
    let hitLen = 0;
    for (const idx of orderByLength) {
      const sub = subs[idx]!;
      if (sub.length <= hitLen) break; // 長い順、これ以降短い物しか出てこない
      if (text.startsWith(sub, i)) {
        hitIdx = idx;
        hitLen = sub.length;
        break;
      }
    }
    if (hitIdx >= 0) {
      if (literalStart < i) {
        chunks.push(TEXT_ENCODER.encode(text.slice(literalStart, i)));
      }
      chunks.push(Uint8Array.of(SUBSTRING_BASE_BYTE + hitIdx));
      i += hitLen;
      literalStart = i;
    } else {
      // 1 コードポイント進める (サロゲートペア対応)。
      const code = text.charCodeAt(i);
      i += code >= 0xd800 && code <= 0xdbff ? 2 : 1;
    }
  }
  if (literalStart < text.length) {
    chunks.push(TEXT_ENCODER.encode(text.slice(literalStart)));
  }

  let total = 0;
  for (const c of chunks) total += c.length;
  const out = new Uint8Array(total);
  let off = 0;
  for (const c of chunks) {
    out.set(c, off);
    off += c.length;
  }
  return out;
};

export const decodeStringPayload = (
  bytes: Uint8Array,
  version: number,
): string => {
  const subs = getSubstrings(version);
  let result = "";
  let bufStart = 0;

  const flush = (endExclusive: number) => {
    if (bufStart >= endExclusive) return;
    try {
      result += TEXT_DECODER_FATAL.decode(bytes.subarray(bufStart, endExclusive));
    } catch {
      throw new SpellError("malformed", "呪文が壊れているようです (UTF-8 デコード失敗)");
    }
  };

  for (let i = 0; i < bytes.length; i++) {
    const b = bytes[i]!;
    if (b >= SUBSTRING_BASE_BYTE && b <= SUBSTRING_LIMIT_BYTE) {
      const idx = b - SUBSTRING_BASE_BYTE;
      const sub = subs[idx];
      if (sub === undefined) {
        throw new SpellError(
          "malformed",
          `この呪文の共通部分文字列が見つかりません (byte=0x${b.toString(16).padStart(2, "0")})`,
        );
      }
      flush(i);
      result += sub;
      bufStart = i + 1;
    }
  }
  flush(bytes.length);
  return result;
};
