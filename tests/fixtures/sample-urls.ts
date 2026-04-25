/**
 * 各 v0 辞書エントリにつき代表 URL を 1 つ。
 * 辞書追加時はここに 1 行足すだけでラウンドトリップテストの対象が増える。
 */
export const SAMPLE_URLS_BY_TOKEN: ReadonlyMap<number, string> = new Map([
  // エロ動画系
  [0x0001, "https://www.fanza.co.jp/digital/videoa/-/detail/=/cid=abcd00123/"],
  [0x0002, "https://www.dmm.co.jp/digital/videoa/-/detail/=/cid=h_001wxyz/"],
  [0x0003, "https://www.fanza.co.jp/mono/dvd/-/detail/=/cid=mono_001/"],
  [0x0004, "https://www.pornhub.com/view_video.php?viewkey=ph5fabc123"],
  [0x0005, "https://jp.pornhub.com/view_video.php?viewkey=ph5fabc456"],
  [0x0006, "https://xhamster.com/videos/sample-video-12345"],
  [0x0007, "https://www.xvideos.com/video.abc1234567/some-slug/"],
  [0x0008, "https://missav.com/ja/sample-001"],
  [0x0009, "https://missav.com/sample-002"],
  [0x000a, "https://javmost.com/sample-001/"],
  [0x000b, "https://jav.guru/12345-some-slug/"],
  [0x000c, "https://www.eporner.com/video-AbCdEf/example-slug/"],
  [0x000d, "https://spankbang.com/abcd1/some-slug/"],
  [0x000e, "https://hanime.tv/videos/hentai/sample-episode-1"],
  [0x000f, "https://hentaihaven.xxx/?p=12345"],
  [0x0010, "https://www3.javmost.com/sample-002/"],
  [0x0011, "https://video.dmm.co.jp/amateur/content/?id=twt002"],
  [0x0012, "https://video.dmm.co.jp/av/content/?id=kavr00504"],

  // エロ同人・商品系
  [0x0020, "https://www.dlsite.com/maniax/work/=/product_id/RJ01234567.html"],
  [0x0021, "https://www.dlsite.com/girls/work/=/product_id/RJ02345678.html"],
  [0x0022, "https://www.dlsite.com/home/work/=/product_id/VJ00345678.html"],
  [0x0023, "https://www.dlsite.com/books/work/=/product_id/BJ00456789.html"],
  [0x0024, "https://www.dmm.co.jp/dc/doujin/-/detail/=/cid=d_123456/"],
  [0x0025, "https://book.dmm.co.jp/product/abc123/"],
  [0x0026, "https://www.ec.toranoana.shop/tora/ec/item/140030901234/"],
  [0x0027, "https://www.melonbooks.co.jp/detail/detail.php?product_id=987654"],
  [0x0028, "https://www.melonbooks.com/detail/detail.php?product_id=123456"],
  [0x0029, "https://www.suruga-ya.jp/product/detail/123456789abc"],

  // R18 イラスト・AI 系
  [0x0030, "https://www.pixiv.net/artworks/123456789"],
  [0x0031, "https://www.pixiv.net/users/9876543"],
  [0x0032, "https://www.pixiv.net/novel/show.php?id=2468013"],
  [0x0033, "https://fanbox.cc/@example_creator"],
  [0x0034, "https://fantia.jp/posts/1234567"],
  [0x0035, "https://fantia.jp/fanclubs/24680"],
  [0x0036, "https://ci-en.dlsite.com/creator/13579"],
  [0x0037, "https://ci-en.net/creator/24680"],
  [0x0038, "https://chichi-pui.com/posts/abc123def456"],
  [0x0039, "https://www.aipictors.com/works/987654"],

  // BL・夢小説・ラノベ系
  [0x0040, "https://syosetu.org/novel/123456/"],
  [0x0041, "https://ncode.syosetu.com/n1234ab/"],
  [0x0042, "https://novel18.syosetu.com/n5678cd/"],
  [0x0043, "https://mnlt.syosetu.com/n9012ef/"],
  [0x0044, "https://mypage.syosetu.com/3456789/"],
  [0x0045, "https://www.alphapolis.co.jp/novel/123456789/987654321"],
  [0x0046, "https://kakuyomu.jp/works/16817330647755099999"],
  [0x0047, "https://estar.jp/novels/24680135"],
  [0x0048, "https://maho.jp/works/13572468"],
  [0x0049, "https://pixiv.net/novel/series/987654"],

  // VTuber・ニコニコ系
  [0x0050, "https://www.youtube.com/watch?v=dQw4w9WgXcQ"],
  [0x0051, "https://youtu.be/dQw4w9WgXcQ"],
  [0x0052, "https://www.youtube.com/@SomeChannel"],
  [0x0053, "https://www.youtube.com/channel/UCabcdefghijklmnopqrstuv"],
  [0x0054, "https://www.youtube.com/playlist?list=PLabcdefghijklmnopqrstuvwx"],
  [0x0055, "https://www.youtube.com/shorts/abcdefghij1"],
  [0x0056, "https://www.nicovideo.jp/watch/sm12345678"],
  [0x0057, "https://www.nicovideo.jp/user/24681357"],
  [0x0058, "https://live.nicovideo.jp/watch/lv123456789"],
  [0x0059, "https://seiga.nicovideo.jp/seiga/im12345678"],
  [0x005a, "https://www.twitch.tv/videos/2468013579"],
  [0x005b, "https://www.twitch.tv/some_streamer"],

  // SNS
  [0x0060, "https://twitter.com/i/status/1234567890123456789"],
  [0x0061, "https://x.com/i/status/1234567890123456789"],
  [0x0062, "https://x.com/some_handle"],
  [0x0063, "https://twitter.com/some_handle"],
  [0x0064, "https://www.instagram.com/p/Cabcdef1234/"],
  [0x0065, "https://www.instagram.com/reel/Crabcdef567/"],
  [0x0066, "https://www.instagram.com/some_user/"],
  [0x0067, "https://www.tiktok.com/@some_creator"],
  [0x0068, "https://bsky.app/profile/example.bsky.social"],

  // 汎用フォールバック
  [0x0070, "https://www.example-fallback.com/path?q=1"],
  [0x0071, "https://example-fallback.com/path?q=1"],
  [0x0072, "http://legacy-fallback.com/index.html"],
]);
