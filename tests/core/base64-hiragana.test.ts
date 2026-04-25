import { describe, expect, it } from "vitest";
import {
  decodeHiraganaToBytes,
  encodeBytesToHiragana,
} from "~/core/base64-hiragana";
import { SpellError } from "~/core/errors";

const roundTrip = (bytes: number[]): void => {
  const u8 = Uint8Array.from(bytes);
  const decoded = decodeHiraganaToBytes(encodeBytesToHiragana(u8));
  expect(Array.from(decoded)).toEqual(bytes);
};

describe("base64-hiragana", () => {
  it("round-trips empty input", () => {
    roundTrip([]);
  });

  it("round-trips 1, 2, 3 byte tails", () => {
    roundTrip([0x12]);
    roundTrip([0x12, 0x34]);
    roundTrip([0x12, 0x34, 0x56]);
  });

  it("round-trips longer inputs", () => {
    const arr = Array.from({ length: 50 }, (_, i) => (i * 7 + 3) & 0xff);
    roundTrip(arr);
  });

  it("encodes 3 bytes to exactly 4 hiragana", () => {
    // 0x000000 = 6bit 0,0,0,0 = あ,あ,あ,あ
    expect(encodeBytesToHiragana(Uint8Array.from([0, 0, 0]))).toBe("ああああ");
    // 0xffffff = 6bit 63,63,63,63 = ぼ,ぼ,ぼ,ぼ
    expect(encodeBytesToHiragana(Uint8Array.from([0xff, 0xff, 0xff]))).toBe("ぼぼぼぼ");
  });

  it("rejects 1-character remainder (impossible 6bit)", () => {
    expect(() => decodeHiraganaToBytes("あ")).toThrowError(SpellError);
  });

  it("rejects unknown character via decode", () => {
    expect(() => decodeHiraganaToBytes("あいうX")).toThrowError(SpellError);
  });

  it("matches manual bit math for known input", () => {
    // bytes 0x41 0x42 0x43 = 'ABC'
    // binary 01000001 01000010 01000011
    // 6bit grouped: 010000 010100 001001 000011 = 16, 20, 9, 3
    // index 16=ち, 20=な, 9=こ, 3=え
    expect(encodeBytesToHiragana(Uint8Array.from([0x41, 0x42, 0x43]))).toBe(
      "ちなこえ",
    );
  });
});
