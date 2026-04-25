/**
 * 辞書マッチ前に URL を正規化する。
 *
 * 主目的: リソース識別に無関係なトラッキング系クエリを取り除き、
 * 辞書ヒット率を上げ、呪文を短くする。
 *
 * 設計方針:
 * - URL として解釈できないものは触らずそのまま返す (フラグメントだけ等の異常入力対策)
 * - 削除対象は明示リストのみ。意味のあるパラメータを誤って消さない。
 */

const TRACKING_PARAM_EXACT = new Set<string>([
  // 共通
  "gclid",
  "fbclid",
  "msclkid",
  "yclid",
  "ref",
  "ref_src",
  "ref_url",
  // DMM / FANZA 推薦・参照系
  "dmmref",
  "i3_ref",
  "i3_ord",
  "i3_pst",
  "i3_erefer",
  "via",
]);

const TRACKING_PARAM_PREFIXES: readonly string[] = [
  "utm_", // Google Analytics 系
];

const isTrackingParam = (key: string): boolean => {
  if (TRACKING_PARAM_EXACT.has(key)) return true;
  return TRACKING_PARAM_PREFIXES.some((p) => key.startsWith(p));
};

export const normalizeUrl = (raw: string): string => {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return raw;
  }

  if (!url.search) return raw;

  const filtered = new URLSearchParams();
  for (const [k, v] of url.searchParams) {
    if (isTrackingParam(k)) continue;
    filtered.append(k, v);
  }

  const newSearch = filtered.toString();
  // search が変わっていないなら元の文字列を尊重 (URL コンストラクタによる微妙な再エンコードを避ける)
  if (newSearch === url.searchParams.toString()) return raw;

  url.search = newSearch ? `?${newSearch}` : "";
  return url.toString();
};
