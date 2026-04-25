import { SpellError } from "../errors";
import type { DictEntry } from "./types";
import { DICT_V0 } from "./v0";

/**
 * バージョンごとに辞書を保持し、過去呪文の復号互換性を担保する。
 * 新しい辞書を追加する場合は `DICTIONARIES` に登録し、`LATEST_VERSION` を更新する。
 */
export const DICTIONARIES: ReadonlyMap<number, readonly DictEntry[]> = new Map([
  [0, DICT_V0],
]);

export const LATEST_VERSION = 0;

export type Match = {
  readonly entry: DictEntry;
  /** prefix と (あれば) suffix を取り除いた ID 部分。 */
  readonly idPart: string;
};

const getDict = (version: number): readonly DictEntry[] => {
  const dict = DICTIONARIES.get(version);
  if (!dict) {
    throw new SpellError(
      "unknown-version",
      `この呪文は新しすぎてこのバージョンでは解けません (v${version})`,
    );
  }
  return dict;
};

/**
 * 与えられた URL に最長一致する辞書エントリを探す。
 * prefix の長い順に走査することで `https://` のような汎用プレフィックスが
 * 具体的なエントリより先にヒットする事故を防ぐ。
 */
export const findBestMatch = (url: string, version: number): Match | null => {
  const dict = getDict(version);
  const candidates = [...dict].sort(
    (a, b) => b.prefix.length - a.prefix.length,
  );
  for (const entry of candidates) {
    if (!url.startsWith(entry.prefix)) continue;
    let idPart = url.slice(entry.prefix.length);
    if (entry.suffix && idPart.endsWith(entry.suffix)) {
      idPart = idPart.slice(0, idPart.length - entry.suffix.length);
    }
    return { entry, idPart };
  }
  return null;
};

export const findEntryByToken = (
  token: number,
  version: number,
): DictEntry => {
  const dict = getDict(version);
  const entry = dict.find((e) => e.token === token);
  if (!entry) {
    throw new SpellError(
      "unknown-token",
      `この呪文の辞書エントリが見つかりません (token=0x${token.toString(16).padStart(4, "0")})`,
    );
  }
  return entry;
};

export const listLatestEntries = (): readonly DictEntry[] =>
  getDict(LATEST_VERSION);
