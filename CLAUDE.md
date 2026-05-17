# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

合同会社 UNICORN のコーポレートサイト。Next.js 13 + TypeScript + Tailwind CSS で構築し、Vercel にデプロイ。URL: https://www.unicornllc.dev/

## Commands

```bash
yarn dev       # 開発サーバー起動 (http://localhost:3000)
yarn build     # プロダクションビルド
yarn lint      # ESLint (next/core-web-vitals)
```

テストは存在しない。

## Architecture

### コンポーネント構造 (Atomic Design 風)

```
src/
  pages/          # Next.js ページ (ルーティング)
  components/
    templates/    # ページレイアウト全体
    organisms/    # セクション単位のコンポーネント
  lib/            # ユーティリティ (RSS フェッチなど)
  styles/         # グローバル CSS + CSS Modules
```

`pages/index.tsx` が唯一のページ。`GetStaticProps` でビルド時に RSS フィードを取得し、`templates/Top/Page.tsx` に渡す。`Page.tsx` が `Main / News / Works / Company` の各 organism を並べる。

### データフロー

- `src/lib/feed.ts` が Zenn (`https://zenn.dev/wheatandcat/feed`) と はてなブログ (`https://www.wheatandcat.me/rss`) の RSS を `rss-parser` で取得。
- 取得した `FeedItem[]` を `News` organism が一覧表示。

### パスエイリアス

`@/` → `src/` (tsconfig の `paths` 設定)

## デプロイ

GitHub Actions (`.github/workflows/deploy_website.yml`) が毎日 JST 11:00 に自動実行し、Vercel へデプロイ。`main` ブランチへのプッシュで本番デプロイ、それ以外はプレビューデプロイ。手動トリガーも可能。
