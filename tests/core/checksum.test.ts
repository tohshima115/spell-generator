import { describe, expect, it } from "vitest";
import { sum8 } from "~/core/checksum";

describe("sum8", () => {
  it("returns 0 for empty input", () => {
    expect(sum8(new Uint8Array())).toBe(0);
  });

  it("computes simple sum", () => {
    expect(sum8(Uint8Array.from([1, 2, 3, 4]))).toBe(10);
  });

  it("wraps modulo 256", () => {
    expect(sum8(Uint8Array.from([0xff, 0x02]))).toBe(0x01);
    expect(sum8(Uint8Array.from(new Array(10).fill(0xff)))).toBe(0xf6); // 2550 mod 256
  });
});
