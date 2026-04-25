import { describe, expect, it } from "vitest";
import {
  HIRAGANA_64,
  hiraganaAt,
  indexOfHiragana,
  is64Hiragana,
} from "~/core/hiragana";

describe("hiragana table", () => {
  it("has exactly 64 unique characters", () => {
    expect(HIRAGANA_64).toHaveLength(64);
    expect(new Set(HIRAGANA_64).size).toBe(64);
  });

  it("is bijective between index and character", () => {
    for (let i = 0; i < 64; i++) {
      expect(indexOfHiragana(hiraganaAt(i))).toBe(i);
    }
  });

  it("excludes DQ2-style absent characters", () => {
    for (const ch of ["を", "ん", "ぢ", "づ", "ゔ", "ゐ", "ゑ", "ぁ"]) {
      expect(is64Hiragana(ch)).toBe(false);
    }
  });

  it("returns -1 for unknown char", () => {
    expect(indexOfHiragana("X")).toBe(-1);
  });

  it("throws on out-of-range index", () => {
    expect(() => hiraganaAt(64)).toThrow(RangeError);
    expect(() => hiraganaAt(-1)).toThrow(RangeError);
  });
});
