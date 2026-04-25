import type { IdType } from "../payload";

export type DictEntry = {
  /** 0x0000〜0xFFFE。0xFFFF は予約 (辞書外フォールバック)。 */
  readonly token: number;
  /** URL の先頭にマッチする文字列。 */
  readonly prefix: string;
  /** マッチしたら除去する末尾文字列 (例: 末尾の `/`)。 */
  readonly suffix?: string;
  /** ID 部分の文字種ヒント。 */
  readonly idType: IdType;
  /** 辞書一覧表示用のメモ。 */
  readonly note?: string;
};

/** 辞書外 URL を示す予約トークン。 */
export const RAW_URL_TOKEN = 0xffff;
