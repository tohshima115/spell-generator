/**
 * 単純 8bit 合計 (mod 256)。本家 DQ の伝統に倣う。
 */
export const sum8 = (bytes: Uint8Array): number => {
  let s = 0;
  for (const b of bytes) s = (s + b) & 0xff;
  return s;
};
