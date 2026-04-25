import type { DictEntry } from "./types";

/**
 * v0 辞書 (docs/spec.md §4.2)。
 *
 * 規律:
 * - 既存エントリの token は絶対に変更しない (互換性破壊)
 * - 既存エントリの prefix/suffix/idType も変更しない
 * - 中身を変える必要がある場合は新しい辞書バージョンを作って追記する
 */
export const DICT_V0: readonly DictEntry[] = [
  // ---- エロ動画系 ----
  { token: 0x0001, prefix: "https://www.fanza.co.jp/digital/videoa/-/detail/=/cid=", suffix: "/", idType: "str", note: "Fanza 動画" },
  { token: 0x0002, prefix: "https://www.dmm.co.jp/digital/videoa/-/detail/=/cid=", suffix: "/", idType: "str", note: "DMM 動画" },
  { token: 0x0003, prefix: "https://www.fanza.co.jp/mono/dvd/-/detail/=/cid=", suffix: "/", idType: "str", note: "Fanza DVD" },
  { token: 0x0004, prefix: "https://www.pornhub.com/view_video.php?viewkey=", idType: "str", note: "Pornhub" },
  { token: 0x0005, prefix: "https://jp.pornhub.com/view_video.php?viewkey=", idType: "str", note: "Pornhub JP" },
  { token: 0x0006, prefix: "https://xhamster.com/videos/", idType: "str", note: "xHamster" },
  { token: 0x0007, prefix: "https://www.xvideos.com/video.", suffix: "/", idType: "str", note: "XVideos" },
  { token: 0x0008, prefix: "https://missav.com/ja/", idType: "str", note: "MissAV" },
  { token: 0x0009, prefix: "https://missav.com/", idType: "str", note: "MissAV (英語)" },
  { token: 0x000a, prefix: "https://javmost.com/", suffix: "/", idType: "str", note: "JavMost" },
  { token: 0x000b, prefix: "https://jav.guru/", suffix: "/", idType: "str", note: "Jav Guru" },
  { token: 0x000c, prefix: "https://www.eporner.com/video-", suffix: "/", idType: "str", note: "Eporner" },
  { token: 0x000d, prefix: "https://spankbang.com/", suffix: "/", idType: "str", note: "SpankBang" },
  { token: 0x000e, prefix: "https://hanime.tv/videos/hentai/", idType: "str", note: "Hanime.tv" },
  { token: 0x000f, prefix: "https://hentaihaven.xxx/?p=", idType: "num", note: "HentaiHaven" },
  { token: 0x0010, prefix: "https://www3.javmost.com/", suffix: "/", idType: "str", note: "JavMost 別ドメイン" },
  { token: 0x0011, prefix: "https://video.dmm.co.jp/amateur/content/?id=", idType: "str", note: "FANZA 素人動画" },
  { token: 0x0012, prefix: "https://video.dmm.co.jp/av/content/?id=", idType: "str", note: "FANZA AV 動画" },

  // ---- エロ同人・商品系 ----
  { token: 0x0020, prefix: "https://www.dlsite.com/maniax/work/=/product_id/", suffix: ".html", idType: "str", note: "DLsite 男性向け" },
  { token: 0x0021, prefix: "https://www.dlsite.com/girls/work/=/product_id/", suffix: ".html", idType: "str", note: "DLsite 女性向け" },
  { token: 0x0022, prefix: "https://www.dlsite.com/home/work/=/product_id/", suffix: ".html", idType: "str", note: "DLsite 全年齢" },
  { token: 0x0023, prefix: "https://www.dlsite.com/books/work/=/product_id/", suffix: ".html", idType: "str", note: "DLsite 書籍" },
  { token: 0x0024, prefix: "https://www.dmm.co.jp/dc/doujin/-/detail/=/cid=", suffix: "/", idType: "str", note: "FANZA 同人" },
  { token: 0x0025, prefix: "https://book.dmm.co.jp/product/", suffix: "/", idType: "str", note: "FANZA ブックス" },
  { token: 0x0026, prefix: "https://www.ec.toranoana.shop/tora/ec/item/", suffix: "/", idType: "num", note: "とらのあな" },
  { token: 0x0027, prefix: "https://www.melonbooks.co.jp/detail/detail.php?product_id=", idType: "num", note: "メロンブックス" },
  { token: 0x0028, prefix: "https://www.melonbooks.com/detail/detail.php?product_id=", idType: "num", note: "メロンブックス国際版" },
  { token: 0x0029, prefix: "https://www.suruga-ya.jp/product/detail/", idType: "str", note: "駿河屋" },

  // ---- R18 イラスト・AI 系 ----
  { token: 0x0030, prefix: "https://www.pixiv.net/artworks/", idType: "num", note: "pixiv イラスト" },
  { token: 0x0031, prefix: "https://www.pixiv.net/users/", idType: "num", note: "pixiv ユーザー" },
  { token: 0x0032, prefix: "https://www.pixiv.net/novel/show.php?id=", idType: "num", note: "pixiv 小説" },
  { token: 0x0033, prefix: "https://fanbox.cc/@", idType: "str", note: "pixiv FANBOX" },
  { token: 0x0034, prefix: "https://fantia.jp/posts/", idType: "num", note: "Fantia 投稿" },
  { token: 0x0035, prefix: "https://fantia.jp/fanclubs/", idType: "num", note: "Fantia ファンクラブ" },
  { token: 0x0036, prefix: "https://ci-en.dlsite.com/creator/", idType: "num", note: "Ci-en クリエイター" },
  { token: 0x0037, prefix: "https://ci-en.net/creator/", idType: "num", note: "Ci-en 旧ドメイン" },
  { token: 0x0038, prefix: "https://chichi-pui.com/posts/", idType: "str", note: "Chichi-pui" },
  { token: 0x0039, prefix: "https://www.aipictors.com/works/", idType: "num", note: "AI ピクターズ" },

  // ---- BL・夢小説・ラノベ系 ----
  { token: 0x0040, prefix: "https://syosetu.org/novel/", suffix: "/", idType: "num", note: "ハーメルン" },
  { token: 0x0041, prefix: "https://ncode.syosetu.com/", suffix: "/", idType: "str", note: "小説家になろう" },
  { token: 0x0042, prefix: "https://novel18.syosetu.com/", suffix: "/", idType: "str", note: "ノクターンノベルズ" },
  { token: 0x0043, prefix: "https://mnlt.syosetu.com/", suffix: "/", idType: "str", note: "ミッドナイトノベルズ" },
  { token: 0x0044, prefix: "https://mypage.syosetu.com/", suffix: "/", idType: "num", note: "なろう ユーザーページ" },
  { token: 0x0045, prefix: "https://www.alphapolis.co.jp/novel/", idType: "str", note: "アルファポリス" },
  { token: 0x0046, prefix: "https://kakuyomu.jp/works/", idType: "num", note: "カクヨム" },
  { token: 0x0047, prefix: "https://estar.jp/novels/", idType: "num", note: "エブリスタ" },
  { token: 0x0048, prefix: "https://maho.jp/works/", idType: "num", note: "魔法のiらんど" },
  { token: 0x0049, prefix: "https://pixiv.net/novel/series/", idType: "num", note: "pixiv 小説シリーズ" },

  // ---- VTuber・ニコニコ系 ----
  { token: 0x0050, prefix: "https://www.youtube.com/watch?v=", idType: "str", note: "YouTube 動画" },
  { token: 0x0051, prefix: "https://youtu.be/", idType: "str", note: "YouTube 短縮" },
  { token: 0x0052, prefix: "https://www.youtube.com/@", idType: "str", note: "YouTube チャンネル (ハンドル)" },
  { token: 0x0053, prefix: "https://www.youtube.com/channel/", idType: "str", note: "YouTube チャンネル ID" },
  { token: 0x0054, prefix: "https://www.youtube.com/playlist?list=", idType: "str", note: "YouTube プレイリスト" },
  { token: 0x0055, prefix: "https://www.youtube.com/shorts/", idType: "str", note: "YouTube Shorts" },
  { token: 0x0056, prefix: "https://www.nicovideo.jp/watch/", idType: "str", note: "ニコニコ動画" },
  { token: 0x0057, prefix: "https://www.nicovideo.jp/user/", idType: "num", note: "ニコニコ ユーザー" },
  { token: 0x0058, prefix: "https://live.nicovideo.jp/watch/", idType: "str", note: "ニコ生" },
  { token: 0x0059, prefix: "https://seiga.nicovideo.jp/seiga/im", idType: "num", note: "ニコニコ静画" },
  { token: 0x005a, prefix: "https://www.twitch.tv/videos/", idType: "num", note: "Twitch VOD" },
  { token: 0x005b, prefix: "https://www.twitch.tv/", idType: "str", note: "Twitch チャンネル" },

  // ---- SNS (Twitter/X) ----
  { token: 0x0060, prefix: "https://twitter.com/i/status/", idType: "num", note: "Twitter 投稿(旧)" },
  { token: 0x0061, prefix: "https://x.com/i/status/", idType: "num", note: "X 投稿" },
  { token: 0x0062, prefix: "https://x.com/", idType: "str", note: "X プロフィール" },
  { token: 0x0063, prefix: "https://twitter.com/", idType: "str", note: "Twitter プロフィール" },
  { token: 0x0064, prefix: "https://www.instagram.com/p/", suffix: "/", idType: "str", note: "Instagram 投稿" },
  { token: 0x0065, prefix: "https://www.instagram.com/reel/", suffix: "/", idType: "str", note: "Instagram リール" },
  { token: 0x0066, prefix: "https://www.instagram.com/", suffix: "/", idType: "str", note: "Instagram プロフィール" },
  { token: 0x0067, prefix: "https://www.tiktok.com/@", idType: "str", note: "TikTok プロフィール" },
  { token: 0x0068, prefix: "https://bsky.app/profile/", idType: "str", note: "Bluesky" },

  // ---- 汎用プレフィックス (フォールバック) ----
  { token: 0x0070, prefix: "https://www.", idType: "str", note: "汎用 https+www" },
  { token: 0x0071, prefix: "https://", idType: "str", note: "汎用 https" },
  { token: 0x0072, prefix: "http://", idType: "str", note: "汎用 http" },
];
