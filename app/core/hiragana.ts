/**
 * DQ2 の復活の呪文に倣った 64 ひらがなテーブル。
 *
 * 順序は仕様書 (docs/spec.md §3.3) に固定されており、
 * インデックスは過去呪文の互換性のため絶対に変更しない。
 */
export const HIRAGANA_64 = [
  // 0-9
  "あ", "い", "う", "え", "お", "か", "き", "く", "け", "こ",
  // 10-19
  "さ", "し", "す", "せ", "そ", "た", "ち", "つ", "て", "と",
  // 20-29
  "な", "に", "ぬ", "ね", "の", "は", "ひ", "ふ", "へ", "ほ",
  // 30-39
  "ま", "み", "む", "め", "も", "や", "ゆ", "よ", "ら", "り",
  // 40-43
  "る", "れ", "ろ", "わ",
  // 44-48 (が行)
  "が", "ぎ", "ぐ", "げ", "ご",
  // 49-53 (ざ行)
  "ざ", "じ", "ず", "ぜ", "ぞ",
  // 54-58 (ぱ行)
  "ぱ", "ぴ", "ぷ", "ぺ", "ぽ",
  // 59-63 (ば行)
  "ば", "び", "ぶ", "べ", "ぼ",
] as const;

if (HIRAGANA_64.length !== 64) {
  throw new Error("HIRAGANA_64 table must be exactly 64 characters");
}

const CHAR_TO_INDEX: ReadonlyMap<string, number> = new Map(
  HIRAGANA_64.map((ch, i) => [ch, i] as const),
);

if (CHAR_TO_INDEX.size !== 64) {
  throw new Error("HIRAGANA_64 table contains duplicates");
}

export const indexOfHiragana = (ch: string): number =>
  CHAR_TO_INDEX.get(ch) ?? -1;

export const hiraganaAt = (index: number): string => {
  const ch = HIRAGANA_64[index];
  if (ch === undefined) {
    throw new RangeError(`hiragana index out of range: ${index}`);
  }
  return ch;
};

export const is64Hiragana = (ch: string): boolean => CHAR_TO_INDEX.has(ch);
