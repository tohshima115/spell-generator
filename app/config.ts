/**
 * サイト固有の設定値。
 *
 * このリポジトリを fork して自分の環境にデプロイする場合は、
 * 以下の値を自分のドメイン・連絡先に書き換えてください。
 */

/** 公開サイトの URL (末尾スラッシュなし)。OGP の絶対 URL 生成にも使用。 */
export const SITE_URL = "https://spell-generator.toyoshima.dev";

/** ページタイトル / OG title / サイト名。 */
export const SITE_TITLE = "復活の呪文ジェネレーター";

/** description / OG description / Twitter description。 */
export const SITE_DESCRIPTION =
  "URL を 64 ひらがなの呪文に可逆変換するツール。あなただけの「復活の呪文」を生成して、大切な冒険の記録を守りましょう。";

/** OGP 画像の絶対 URL。`public/OGP.png` を参照。 */
export const OGP_IMAGE = `${SITE_URL}/OGP.png`;

/** 問い合わせメールアドレス。フッターの mailto リンクに使用。 */
export const SUPPORT_EMAIL = "support@toyoshima.dev";

/** 開発者の X (Twitter) ハンドル (先頭 @ なし)。 */
export const X_HANDLE = "toyoshima_dev";

/** 開発者 X プロフィールへの URL。 */
export const X_PROFILE_URL = `https://x.com/${X_HANDLE}`;

/** X シェア時に末尾に付与するハッシュタグ群。 */
export const SHARE_HASHTAGS = "#復活の呪文ジェネレーター #ふっかつのじゅもん";

/** X シェア本文の冒頭バリエーション。クリック時にランダム選択される。 */
export const SHARE_PREFIXES = [
  "私の復活の呪文を授けよう…",
  "復活の呪文を聞くがよい…",
  "これぞ我が大事な呪文…",
];

/**
 * Cloudflare Web Analytics のサイトトークン。
 * Cloudflare Dashboard → Web Analytics → Add a site で計測対象ホスト名
 * (例: spell-generator.example.com) を登録すると発行されます。
 * 空文字にするとビーコンタグは出力されません。fork して使う場合は
 * 自身のトークンに書き換えるか空文字にしてください。
 */
export const CF_WEB_ANALYTICS_TOKEN = "50840bbcd6e74de18f15554e01f0bcab";
