import { SpellError } from "./errors";
import { decodeStringPayload, encodeStringPayload } from "./string-codec";

/**
 * 辞書エントリの ID 部分をバイト列に詰める/戻す。
 *
 * - `'str'`: 共通部分文字列テーブル (バイト 0x01〜0x1F をマーカー化) を適用しつつ
 *           UTF-8 バイト列にする。`https://`, `.com`, `hentai`, `video` などが
 *           1 バイトに圧縮される。テーブルはバージョンごとに固定。
 * - `'num'`: 数字のみの文字列を BigInt 化し、最小バイト数のビッグエンディアンで詰める。
 *           先頭 1 バイトに後続バイト長 (1〜16) を書き、復元時にその長さだけ読む。
 *           注意: 先頭ゼロ (例 `0000123`) を含む ID には使えない (整数化で消える)。
 */
export type IdType = "str" | "num";

const MAX_NUM_BYTES = 16; // 128bit。Snowflake ID (~64bit) でも余裕

export const encodePayload = (
  idType: IdType,
  id: string,
  version: number,
): Uint8Array => {
  if (idType === "str") return encodeStringPayload(id, version);
  return encodeNumPayload(id);
};

export const decodePayload = (
  idType: IdType,
  bytes: Uint8Array,
  version: number,
): string => {
  if (idType === "str") return decodeStringPayload(bytes, version);
  return decodeNumPayload(bytes);
};

const encodeNumPayload = (id: string): Uint8Array => {
  if (!/^\d+$/.test(id)) {
    throw new SpellError("payload", `'num' に渡せるのは数字のみの文字列です: ${id}`);
  }
  const big = BigInt(id);
  const intBytes = bigIntToBeBytes(big);
  if (intBytes.length > MAX_NUM_BYTES) {
    throw new SpellError(
      "payload",
      `数字 ID が大きすぎます (${intBytes.length} > ${MAX_NUM_BYTES} バイト)`,
    );
  }
  const out = new Uint8Array(1 + intBytes.length);
  out[0] = intBytes.length;
  out.set(intBytes, 1);
  return out;
};

const decodeNumPayload = (bytes: Uint8Array): string => {
  if (bytes.length < 1) {
    throw new SpellError("malformed", "num ペイロードが空です");
  }
  const len = bytes[0]!;
  if (len < 1 || len > MAX_NUM_BYTES || bytes.length !== 1 + len) {
    throw new SpellError("malformed", "num ペイロードの長さが不正です");
  }
  return beBytesToBigInt(bytes.subarray(1)).toString(10);
};

/** BigInt → ビッグエンディアン最小バイト列 (0n は 1 バイト [0])。 */
const bigIntToBeBytes = (n: bigint): Uint8Array => {
  if (n < 0n) throw new SpellError("payload", "負の整数は扱えません");
  if (n === 0n) return new Uint8Array([0]);
  const bytes: number[] = [];
  let x = n;
  while (x > 0n) {
    bytes.unshift(Number(x & 0xffn));
    x >>= 8n;
  }
  return Uint8Array.from(bytes);
};

const beBytesToBigInt = (bytes: Uint8Array): bigint => {
  let n = 0n;
  for (const b of bytes) n = (n << 8n) | BigInt(b);
  return n;
};
