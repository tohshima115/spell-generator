import { describe, expect, it } from "vitest";
import { LATEST_VERSION } from "~/core/dictionary/registry";
import { SpellError } from "~/core/errors";
import { decodePayload, encodePayload } from "~/core/payload";

const V = LATEST_VERSION;

describe("payload encoding", () => {
  describe("str", () => {
    it("round-trips ASCII", () => {
      const id = "abc-123_XYZ";
      expect(decodePayload("str", encodePayload("str", id, V), V)).toBe(id);
    });

    it("round-trips multibyte UTF-8", () => {
      const id = "あいう㍼🐉";
      expect(decodePayload("str", encodePayload("str", id, V), V)).toBe(id);
    });

    it("rejects malformed UTF-8 with malformed error", () => {
      // 0xff alone is invalid UTF-8 leading byte
      expect(() => decodePayload("str", Uint8Array.from([0xff]), V)).toThrowError(
        SpellError,
      );
    });
  });

  describe("num", () => {
    const cases = [
      "0",
      "7",
      "12345",
      "123456789",
      "1234567890123456789", // X Snowflake
      "9".repeat(20),
    ];
    for (const id of cases) {
      it(`round-trips ${id}`, () => {
        expect(decodePayload("num", encodePayload("num", id, V), V)).toBe(id);
      });
    }

    it("rejects non-digit input", () => {
      expect(() => encodePayload("num", "12a", V)).toThrowError(SpellError);
    });

    it("rejects empty input", () => {
      expect(() => encodePayload("num", "", V)).toThrowError(SpellError);
    });

    it("rejects malformed length byte on decode", () => {
      expect(() => decodePayload("num", Uint8Array.from([0]), V)).toThrowError(
        SpellError,
      );
      expect(() =>
        decodePayload("num", Uint8Array.from([5, 1, 2]), V),
      ).toThrowError(SpellError);
    });

    it("uses fewer bytes than str for typical IDs", () => {
      const id = "1234567890123456789";
      expect(encodePayload("num", id, V).length).toBeLessThan(
        encodePayload("str", id, V).length,
      );
    });
  });
});
