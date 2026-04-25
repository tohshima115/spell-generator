import { describe, expect, it } from "vitest";
import { LATEST_VERSION } from "~/core/dictionary/registry";
import { SUBSTRINGS_V0 } from "~/core/dictionary/substrings";
import { SpellError } from "~/core/errors";
import {
  decodeStringPayload,
  encodeStringPayload,
} from "~/core/string-codec";

const V = LATEST_VERSION;

describe("string-codec (substring substitution)", () => {
  it("round-trips plain ASCII without substitutions", () => {
    const text = "abc-XYZ_999";
    const bytes = encodeStringPayload(text, V);
    expect(decodeStringPayload(bytes, V)).toBe(text);
  });

  it("round-trips multibyte UTF-8", () => {
    const text = "あいう㍼🐉/foo";
    const bytes = encodeStringPayload(text, V);
    expect(decodeStringPayload(bytes, V)).toBe(text);
  });

  it("compresses every defined substring to a single byte each", () => {
    for (let i = 0; i < SUBSTRINGS_V0.length; i++) {
      const sub = SUBSTRINGS_V0[i]!;
      const bytes = encodeStringPayload(sub, V);
      expect(bytes.length, `${sub} should compress to 1 byte`).toBe(1);
      expect(decodeStringPayload(bytes, V)).toBe(sub);
    }
  });

  it("prefers the longest matching substring", () => {
    // "https://www." (12) should win over "https://" (8) and "www." (4).
    const bytes = encodeStringPayload("https://www.example", V);
    // 1 marker byte + "example" (7 bytes) = 8 bytes, vs raw 19 bytes.
    expect(bytes.length).toBe(8);
    expect(decodeStringPayload(bytes, V)).toBe("https://www.example");
  });

  it("compresses real-world raw URL containing keywords", () => {
    const url =
      "https://www.some-hentai-site.com/video/12345?id=abc&page=2";
    const compressed = encodeStringPayload(url, V);
    const raw = new TextEncoder().encode(url);
    expect(compressed.length).toBeLessThan(raw.length);
    expect(decodeStringPayload(compressed, V)).toBe(url);
  });

  it("rejects input containing reserved control bytes", () => {
    expect(() => encodeStringPayload("ab\x05cd", V)).toThrowError(SpellError);
  });

  it("decode raises on out-of-range marker bytes", () => {
    // 0x1F is the upper marker, but if SUBSTRINGS_V0 is shorter than 31 entries
    // a 0x1F byte means an unknown marker. Pick a clearly-out-of-range value.
    const bogus = SUBSTRINGS_V0.length + 0x01; // first unused marker byte
    if (bogus <= 0x1f) {
      expect(() => decodeStringPayload(Uint8Array.of(bogus), V)).toThrowError(
        SpellError,
      );
    }
  });

  it("treats bytes ≥ 0x20 as plain UTF-8 (no marker collision)", () => {
    // Pure ASCII payload that has bytes only in 0x20-0x7E range.
    const text = "no-marker-here.example";
    const bytes = encodeStringPayload(text, V);
    for (const b of bytes) {
      // For this input no substrings match so all bytes should be in printable ASCII.
      expect(b).toBeGreaterThanOrEqual(0x20);
    }
    expect(decodeStringPayload(bytes, V)).toBe(text);
  });
});
