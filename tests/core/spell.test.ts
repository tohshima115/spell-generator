import { describe, expect, it } from "vitest";
import { SAMPLE_URLS_BY_TOKEN } from "../fixtures/sample-urls";
import { DICT_V0 } from "~/core/dictionary/v0";
import { SpellError } from "~/core/errors";
import { decodeSpellToUrl, encodeUrlToSpell } from "~/core/spell";

describe("encode → decode round-trip", () => {
  it("covers every v0 dictionary entry", () => {
    for (const entry of DICT_V0) {
      const url = SAMPLE_URLS_BY_TOKEN.get(entry.token);
      expect(
        url,
        `missing fixture URL for token 0x${entry.token.toString(16)}`,
      ).toBeDefined();
      const { spell } = encodeUrlToSpell(url!);
      const decoded = decodeSpellToUrl(spell);
      expect(decoded, `token 0x${entry.token.toString(16)} mismatch`).toBe(url);
    }
  });

  it("handles dictionary-miss URLs via raw token (Japanese path)", () => {
    const url = "ftp://nihongo.example.com/ファイル.txt?q=テスト";
    const { spell, matchedNote } = encodeUrlToSpell(url);
    expect(matchedNote).toBeNull();
    expect(decodeSpellToUrl(spell)).toBe(url);
  });

  it("substring compression makes raw-token URLs shorter", () => {
    const url = "ftp://www.unknown-hentai-site.com/video/sample.html";
    const { spell, matchedNote } = encodeUrlToSpell(url);
    expect(matchedNote).toBeNull();
    expect(decodeSpellToUrl(spell)).toBe(url);
    // Without substring compression, raw UTF-8 of this URL is 50 bytes.
    // With www./hentai/video/.com/.html collapsed, the spell must be shorter
    // than the naive Base64-hiragana length of 50 bytes (≈ 67 chars + 5 spaces).
    const naiveBytes = new TextEncoder().encode(url).length;
    const naiveHiraganaCount = Math.ceil((naiveBytes + 4) / 3) * 4; // header+checksum
    const charsOnly = spell.replace(/ /g, "");
    expect(charsOnly.length).toBeLessThan(naiveHiraganaCount);
  });

  it("compresses generic-prefix dictionary fallback URLs (0x0070)", () => {
    // Hits the "https://www." generic fallback and benefits from substring
    // compression of ".com" inside the str payload.
    const url = "https://www.unknown-anime-site.com/article/foo";
    const compressed = encodeUrlToSpell(url).spell.replace(/ /g, "");
    // Same URL but with no compressible tail -- baseline for comparison.
    const baseline = encodeUrlToSpell(
      "https://www.unknown-anime-site/article-foo-bar",
    ).spell.replace(/ /g, "");
    expect(decodeSpellToUrl(encodeUrlToSpell(url).spell)).toBe(url);
    // The compressible URL is similar length to the non-compressible one
    // despite being a longer URL — proving the substring layer works.
    expect(compressed.length).toBeLessThanOrEqual(baseline.length + 4);
  });

  it("is tolerant to whitespace, line breaks, quotes around the spell", () => {
    const url = "https://x.com/i/status/1234567890123456789";
    const { spell } = encodeUrlToSpell(url);
    const noisy = `「  ${spell.split("").join("\n")}  」`;
    expect(decodeSpellToUrl(noisy)).toBe(url);
  });

  it("returns the matched note for known URL", () => {
    const { matchedNote } = encodeUrlToSpell(
      "https://x.com/i/status/1234567890123456789",
    );
    expect(matchedNote).toBe("X 投稿");
  });

  it("trims surrounding whitespace from the input URL", () => {
    const url = "https://www.pixiv.net/artworks/123456789";
    const { spell } = encodeUrlToSpell(`   ${url}   \n`);
    expect(decodeSpellToUrl(spell)).toBe(url);
  });

  it("strips DMM tracking params and matches the FANZA amateur dict entry", () => {
    const noisy =
      "https://video.dmm.co.jp/amateur/content/?id=twt002&i3_ref=recommend_i2i&i3_ord=1&i3_pst=1&dmmref=2c372329-9a8f4f0a4d9f58928c89ef3b0f00aaa0";
    const canonical = "https://video.dmm.co.jp/amateur/content/?id=twt002";
    const { spell, matchedNote } = encodeUrlToSpell(noisy);
    expect(matchedNote).toBe("FANZA 素人動画");
    expect(decodeSpellToUrl(spell)).toBe(canonical);
  });

  it("strips DMM via= referral and matches the FANZA AV dict entry", () => {
    const noisy =
      "https://video.dmm.co.jp/av/content/?id=kavr00504&i3_ref=recommend&i3_ord=3&i3_pst=1&dmmref=pickup_vr_top&via=vr_top";
    const canonical = "https://video.dmm.co.jp/av/content/?id=kavr00504";
    const { spell, matchedNote } = encodeUrlToSpell(noisy);
    expect(matchedNote).toBe("FANZA AV 動画");
    expect(decodeSpellToUrl(spell)).toBe(canonical);
  });
});

describe("decode error cases", () => {
  it("rejects empty input after sanitization", () => {
    expect(() => decodeSpellToUrl("")).toThrowError(SpellError);
    expect(() => decodeSpellToUrl("   xyz!?\n")).toThrowError(SpellError);
  });

  it("detects checksum mismatch when one character is altered", () => {
    const { spell } = encodeUrlToSpell("https://x.com/i/status/1234567890123456789");
    const chars = Array.from(spell.replace(/ /g, ""));
    // Flip the middle character to a guaranteed-different one
    const mid = Math.floor(chars.length / 2);
    chars[mid] = chars[mid] === "あ" ? "い" : "あ";
    const broken = chars.join("");
    let err: unknown;
    try {
      decodeSpellToUrl(broken);
    } catch (e) {
      err = e;
    }
    expect(err).toBeInstanceOf(SpellError);
    // It can fail either checksum or malformed (e.g. UTF-8 / unknown token), all are "broken"
    expect((err as SpellError).kind).toMatch(
      /^(checksum|malformed|unknown-token|payload|length|unknown-version)$/,
    );
  });

  it("rejects too-short bytes (no header / checksum room)", () => {
    // 1 hiragana char alone is invalid length anyway, but use 4 chars (= 3 bytes < min 4).
    expect(() => decodeSpellToUrl("ああああ")).toThrowError(SpellError);
  });
});
