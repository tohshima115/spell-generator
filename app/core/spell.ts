import {
  decodeHiraganaToBytes,
  encodeBytesToHiragana,
} from "./base64-hiragana";
import { sum8 } from "./checksum";
import {
  LATEST_VERSION,
  findBestMatch,
  findEntryByToken,
} from "./dictionary/registry";
import { RAW_URL_TOKEN } from "./dictionary/types";
import { SpellError } from "./errors";
import { formatSpell, sanitizeSpell } from "./format";
import { decodePayload, encodePayload } from "./payload";
import { decodeStringPayload, encodeStringPayload } from "./string-codec";
import { normalizeUrl } from "./url-normalize";

/**
 * 呪文 1 つを構成するバイト列の構造:
 *
 *   [Version 1B] [Token Hi 1B] [Token Lo 1B] [...Payload] [Checksum 1B]
 *
 * Checksum は Version + Token + Payload の 8bit 合計 (mod 256)。
 *
 * Payload は idType と token に応じて:
 *   - 辞書 + 'str' / 辞書外 (0xFFFF) → 共通部分文字列圧縮 + UTF-8
 *   - 辞書 + 'num' → 可変長バイト整数 (string-codec を経由しない)
 */

const HEADER_LEN = 3; // version + token (2)
const CHECKSUM_LEN = 1;
const MIN_BYTE_LEN = HEADER_LEN + CHECKSUM_LEN;

export type EncodeResult = {
  /** 3-3-4 リズムでスペース区切り済みの呪文。 */
  readonly spell: string;
  /** ヒットした辞書エントリの note。辞書外なら null。 */
  readonly matchedNote: string | null;
};

export const encodeUrlToSpell = (rawUrl: string): EncodeResult => {
  const trimmed = rawUrl.trim();
  if (trimmed.length === 0) {
    throw new SpellError("payload", "URL が空です");
  }
  const url = normalizeUrl(trimmed);

  const match = findBestMatch(url, LATEST_VERSION);
  const { token, payload, matchedNote } = match
    ? {
        token: match.entry.token,
        payload: encodePayload(match.entry.idType, match.idPart, LATEST_VERSION),
        matchedNote: match.entry.note ?? null,
      }
    : {
        token: RAW_URL_TOKEN,
        payload: encodeStringPayload(url, LATEST_VERSION),
        matchedNote: null,
      };

  const body = new Uint8Array(HEADER_LEN + payload.length);
  body[0] = LATEST_VERSION & 0xff;
  body[1] = (token >> 8) & 0xff;
  body[2] = token & 0xff;
  body.set(payload, HEADER_LEN);

  const all = new Uint8Array(body.length + CHECKSUM_LEN);
  all.set(body, 0);
  all[body.length] = sum8(body);

  return {
    spell: formatSpell(encodeBytesToHiragana(all)),
    matchedNote,
  };
};

export const decodeSpellToUrl = (rawSpell: string): string => {
  const cleaned = sanitizeSpell(rawSpell);
  if (cleaned.length === 0) {
    throw new SpellError("invalid-chars", "呪文に有効なひらがなが含まれていません");
  }

  const bytes = decodeHiraganaToBytes(cleaned);
  if (bytes.length < MIN_BYTE_LEN) {
    throw new SpellError("malformed", "呪文が短すぎます");
  }

  const body = bytes.subarray(0, bytes.length - CHECKSUM_LEN);
  const expected = bytes[bytes.length - 1]!;
  if (sum8(body) !== expected) {
    throw new SpellError("checksum", "呪文に書き間違いがあります");
  }

  const version = body[0]!;
  const token = (body[1]! << 8) | body[2]!;
  const payload = body.subarray(HEADER_LEN);

  if (token === RAW_URL_TOKEN) {
    return decodeStringPayload(payload, version);
  }

  const entry = findEntryByToken(token, version);
  const id = decodePayload(entry.idType, payload, version);
  return entry.prefix + id + (entry.suffix ?? "");
};
