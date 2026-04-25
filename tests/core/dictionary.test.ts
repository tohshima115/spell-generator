import { describe, expect, it } from "vitest";
import { DICT_V0 } from "~/core/dictionary/v0";
import {
  LATEST_VERSION,
  findBestMatch,
  findEntryByToken,
} from "~/core/dictionary/registry";
import { RAW_URL_TOKEN } from "~/core/dictionary/types";
import { SpellError } from "~/core/errors";

describe("dictionary v0", () => {
  it("has unique token values", () => {
    const tokens = DICT_V0.map((e) => e.token);
    expect(new Set(tokens).size).toBe(tokens.length);
  });

  it("does not use the reserved RAW_URL_TOKEN", () => {
    expect(DICT_V0.some((e) => e.token === RAW_URL_TOKEN)).toBe(false);
  });

  it("keeps token in valid 16bit range", () => {
    for (const e of DICT_V0) {
      expect(e.token).toBeGreaterThanOrEqual(0);
      expect(e.token).toBeLessThan(0xffff);
    }
  });
});

describe("findBestMatch", () => {
  it("prefers longer prefix over shorter", () => {
    // `https://x.com/i/status/...` should match 0x0061, not the generic `https://`
    const m = findBestMatch(
      "https://x.com/i/status/1234567890123456789",
      LATEST_VERSION,
    );
    expect(m?.entry.token).toBe(0x0061);
    expect(m?.idPart).toBe("1234567890123456789");
  });

  it("strips the suffix from idPart", () => {
    const m = findBestMatch(
      "https://www.dlsite.com/maniax/work/=/product_id/RJ01234567.html",
      LATEST_VERSION,
    );
    expect(m?.entry.token).toBe(0x0020);
    expect(m?.idPart).toBe("RJ01234567");
  });

  it("returns null for unmatched URL (no http(s) prefix)", () => {
    expect(findBestMatch("ftp://example.com/file", LATEST_VERSION)).toBeNull();
  });

  it("falls back to generic https for unknown host", () => {
    const m = findBestMatch("https://example.com/random", LATEST_VERSION);
    expect(m?.entry.token).toBe(0x0071);
  });
});

describe("findEntryByToken", () => {
  it("throws SpellError for unknown token", () => {
    expect(() => findEntryByToken(0x9999, LATEST_VERSION)).toThrowError(
      SpellError,
    );
  });

  it("throws SpellError for unknown version", () => {
    expect(() => findEntryByToken(0x0001, 99)).toThrowError(SpellError);
  });
});
