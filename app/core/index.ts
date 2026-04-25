export {
  decodeSpellToUrl,
  encodeUrlToSpell,
  type EncodeResult,
} from "./spell";
export { SpellError, isSpellError, type SpellErrorKind } from "./errors";
export { formatSpell, sanitizeSpell } from "./format";
export { listLatestEntries, LATEST_VERSION } from "./dictionary/registry";
export { RAW_URL_TOKEN } from "./dictionary/types";
export type { DictEntry } from "./dictionary/types";
