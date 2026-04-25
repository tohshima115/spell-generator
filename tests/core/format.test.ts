import { describe, expect, it } from "vitest";
import { formatSpell, sanitizeSpell } from "~/core/format";

describe("formatSpell", () => {
  it("inserts 3-3-4 spaces", () => {
    expect(formatSpell("ぱとざはみべひのぞご")).toBe("ぱとざ はみべ ひのぞご");
  });

  it("repeats the pattern", () => {
    expect(formatSpell("ぱとざはみべひのぞごるかがろずぴばそぱろ")).toBe(
      "ぱとざ はみべ ひのぞご るかが ろずぴ ばそぱろ",
    );
  });

  it("leaves a partial trailing chunk", () => {
    expect(formatSpell("ぱとざはみ")).toBe("ぱとざ はみ");
    expect(formatSpell("ぱとざはみべひ")).toBe("ぱとざ はみべ ひ");
  });

  it("returns empty for empty input", () => {
    expect(formatSpell("")).toBe("");
  });
});

describe("sanitizeSpell", () => {
  it("strips half-width spaces", () => {
    expect(sanitizeSpell("ぱとざ はみべ")).toBe("ぱとざはみべ");
  });

  it("strips full-width spaces, newlines, punctuation, quotes", () => {
    expect(sanitizeSpell("「ぱとざ\nはみべ　ひのぞご」")).toBe(
      "ぱとざはみべひのぞご",
    );
  });

  it("strips out-of-set hiragana (ん, を, ぢ, づ, small kana)", () => {
    expect(sanitizeSpell("ぱとんざをぢづ")).toBe("ぱとざ");
  });
});
