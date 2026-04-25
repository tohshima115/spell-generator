import { is64Hiragana } from "./hiragana";

/**
 * DQ2 のリズム (3-3-4 文字を半角スペース区切り) で整形する。
 * 行間に改行は入れず 1 行で繋げる (モバイル/コピペ前提)。
 */
const PATTERN = [3, 3, 4] as const;

export const formatSpell = (spell: string): string => {
  const chars = Array.from(spell);
  const parts: string[] = [];
  let i = 0;
  let p = 0;
  while (i < chars.length) {
    const len = PATTERN[p % PATTERN.length]!;
    parts.push(chars.slice(i, i + len).join(""));
    i += len;
    p++;
  }
  return parts.join(" ");
};

/**
 * 入力から 64 ひらがな以外を全部除去する。
 * 全角スペース・改行・引用符・読点・「ぢ/づ/ん/を」のような対象外ひらがな
 * すべてに寛容。
 */
export const sanitizeSpell = (input: string): string => {
  let out = "";
  for (const ch of input) {
    if (is64Hiragana(ch)) out += ch;
  }
  return out;
};
