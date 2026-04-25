/**
 * payload (str / raw URL) を縮めるための共通部分文字列テーブル。
 *
 * 仕組み:
 * - バイト 0x01〜0x1F (制御文字領域、URL に生で現れない 31 個) をマーカーとして予約
 * - エンコード時に最長一致でマッチした部分文字列を 1 バイトに置換
 * - デコード時は同じテーブルを引いて元に戻す
 *
 * 規律:
 * - 既存エントリの「位置 (= マッピング先のバイト値)」は絶対に変更しない (互換性破壊)
 * - 既存エントリの内容も変更しない
 * - 中身を変える必要がある場合は新しい辞書バージョンに新テーブルを足す
 *
 * バイト 0x00 は将来のためのリザーブ。範囲外バイトはそのまま UTF-8 として通す。
 */

/** マーカーに使うバイト値の下端。バイト 0x01 ↔ index 0。 */
export const SUBSTRING_BASE_BYTE = 0x01;
/** マーカーに使うバイト値の上端 (含む)。最大 31 エントリ。 */
export const SUBSTRING_LIMIT_BYTE = 0x1f;
export const MAX_SUBSTRINGS = SUBSTRING_LIMIT_BYTE - SUBSTRING_BASE_BYTE + 1;

export const SUBSTRINGS_V0: readonly string[] = [
  // ---- スキーム / ホスト系 ----
  "https://www.", // 0x01
  "https://", // 0x02
  "http://", // 0x03
  "www.", // 0x04
  ".co.jp", // 0x05
  ".com", // 0x06
  ".net", // 0x07
  ".org", // 0x08
  ".jp", // 0x09
  ".tv", // 0x0a
  // ---- 拡張子・末尾 ----
  ".html", // 0x0b
  ".php", // 0x0c
  // ---- 共通パスセグメント ----
  "/video", // 0x0d
  "/watch", // 0x0e
  "/posts/", // 0x0f
  "/users/", // 0x10
  "/detail/", // 0x11
  "/product/", // 0x12
  "/article/", // 0x13
  "/category/", // 0x14
  "/blog/", // 0x15
  "/tag/", // 0x16
  // ---- 共通クエリ ----
  "?id=", // 0x17
  "&page=", // 0x18
  // ---- ジャンル語彙 ----
  "hentai", // 0x19
  "video", // 0x1a
  "manga", // 0x1b
  "anime", // 0x1c
  "porn", // 0x1d
  "channel", // 0x1e
  "japanese", // 0x1f
];

if (SUBSTRINGS_V0.length > MAX_SUBSTRINGS) {
  throw new Error(
    `SUBSTRINGS_V0 は ${MAX_SUBSTRINGS} 個までしか入りません (現在 ${SUBSTRINGS_V0.length})`,
  );
}

/**
 * バージョンごとの共通部分文字列テーブル。新バージョン追加時はここに追記する。
 * 古いバージョンの呪文を復号するため、既存テーブルは決して書き換えない。
 */
export const SUBSTRINGS_BY_VERSION: ReadonlyMap<number, readonly string[]> =
  new Map([[0, SUBSTRINGS_V0]]);

/** バージョン未対応時は空テーブルにフォールバック (= 単純 UTF-8 互換)。 */
export const getSubstrings = (version: number): readonly string[] =>
  SUBSTRINGS_BY_VERSION.get(version) ?? [];
