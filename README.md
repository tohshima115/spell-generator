# 復活の呪文ジェネレーター

URL を「一見意味のないひらがな列」に可逆変換する Web ツール。
ドラゴンクエストの「ふっかつのじゅもん」をモチーフに、URL ⇄ 64 ひらがな (DQ2 の対応表をそのまま流用した Base64 亜種) の双方向変換を提供します。

家族や同僚に画面を覗かれたくない URL を、ブックマークや Obsidian メモに「平文っぽいひらがな」として残しておくためのツールです。

```
https://x.com/example/status/1234567890123456789
            ↓ 唱える
ぱとざ はみべ ひのぞご るかが
            ↑ 解く
```

## 仕組み

DQ2 の「ふっかつのじゅもん」が **64 種類のひらがな** で構成されていた事実 (1 文字 = 6bit の Base64 亜種、1986 年・RFC化前) に着想を得て、その対応表をそのまま流用しています。

```
URL 入力
  ↓ 辞書マッチ (最長一致)
[Version 1B] [Dict Token 2B] [ID Payload 可変長] [Checksum 1B]
  ↓ Base64ひらがな変換 (3バイト → 4文字)
  ↓ 3-3-4 リズムで半角スペース挿入
ひらがな呪文
```

主要サイト (X, Pixiv, Fanza, DLsite ほか) は辞書登録されており、19 桁の X 投稿 ID は **18 ひらがな** にまで圧縮されます。

## おことわり

本プロジェクトは個人運営の **非公式・非営利のジョークツール** であり、株式会社スクウェア・エニックスおよび「ドラゴンクエスト」シリーズの公式とは一切関係ありません。著作権・商標その他の問題のあるご指摘をいただいた場合は、速やかに対応・該当箇所の削除をいたします。

## 技術スタック

- [React Router v7](https://reactrouter.com/) (SSR モード)
- TypeScript / TailwindCSS / Vite
- [Cloudflare Workers](https://workers.cloudflare.com/) (デプロイ先)
- [pixel-retroui](https://www.npmjs.com/package/pixel-retroui) / [pixelarticons](https://pixelarticons.com/)

## セットアップ

```bash
npm install
npm run dev
```

`http://localhost:5173` で起動。

## テスト / 型チェック

```bash
npm test            # vitest 実行 (1 回)
npm run test:watch  # vitest ウォッチ
npm run typecheck   # wrangler types + react-router typegen + tsc
```

## デプロイ (Cloudflare Workers)

```bash
npm run deploy
```

`wrangler.jsonc` の `routes.pattern` を自分のドメインに書き換えてください。Custom Domain を使う場合は、Cloudflare で管理しているゾーンを指定する必要があります。

## fork して自分のサイトとして使う場合

このリポジトリには作者個人のドメイン・連絡先が複数箇所に書かれています。fork した後、最低限以下を書き換えてください:

| ファイル | 書き換え対象 |
|---|---|
| `app/config.ts` | `SITE_URL` / `SITE_TITLE` / `SITE_DESCRIPTION` / `SUPPORT_EMAIL` / `X_HANDLE` / `SHARE_HASHTAGS` / `SHARE_PREFIXES` |
| `wrangler.jsonc` | `name` / `routes` |
| `public/OGP.png` | OGP カード画像 (1200×600) |
| `public/logo.png` / `favicon.*` / `bg.png` / `ribonn.png` | サイト固有の画像アセット |

`app/config.ts` には全ての設定値が集約されているので、まずはそこから始めるのが早いです。

## 辞書の追加

`app/core/dictionary/v0.ts` の `DICT_V0_ENTRIES` に新しいエントリを追加すると、対応サイトを増やせます。エントリを追加した場合は `app/core/dictionary/registry.ts` のテストや既存の生成済み呪文との互換性に影響しないよう、新しい token id を末尾に追加する形にしてください。

辞書バージョンを上げる場合 (大幅な変更時)、`v0.ts` を残したまま `v1.ts` を追加して、`registry.ts` で複数バージョン参照する方針です。これにより過去の呪文も復号可能のまま保たれます。

## ライセンス

[MIT License](./LICENSE) (ソースコードのみ)。

`public/` 配下の画像アセット (`logo.png`, `OGP.png`, `bg.png`, `ribonn.png`, `favicon.*`) は MIT の対象外で、本プロジェクト独自のものです。fork の際は自分のアセットに差し替えてください。
