# Vercel + Next.js → Cloudflare Pages + Astro 移行計画

## 全体方針

- Next.js の `.tsx` コンポーネントをすべて `.astro` ファイルに置き換える
- `src/lib/feed.ts`（RSS取得ロジック）は変更なし
- CSS Module (`Home.module.css`) は Tailwind クラスに置き換えて削除
- デプロイ先を Vercel → Cloudflare Pages に変更

---

## Step 1: Astro プロジェクトのセットアップ

### 作業内容

**`package.json` の依存関係を更新**

| 操作 | パッケージ |
|------|-----------|
| 削除 | `next`, `react`, `react-dom`, `@types/react`, `@types/react-dom` |
| 追加 | `astro`, `@astrojs/tailwind` |
| 維持 | `dayjs`, `rss-parser`, `typescript`, `tailwindcss`, `autoprefixer`, `postcss` |

新しいスクリプト:
```json
"dev": "astro dev",
"build": "astro build",
"preview": "astro preview"
```

**`astro.config.mjs` を新規作成**（`next.config.js` の代替）

```js
import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'

export default defineConfig({
  integrations: [tailwind()],
  output: 'static',
})
```

**`tsconfig.json` を Astro 向けに更新**

### 完了条件
- `yarn dev` で Astro の開発サーバーが起動する

---

## Step 2: Layout・グローバル CSS の移行

### 作業内容

**`src/layouts/Layout.astro` を新規作成**

以下を統合:
- `src/pages/_document.tsx` → `<html lang="ja">`, Google Fonts の `<link>`
- `src/pages/_app.tsx` → グローバル CSS の import
- `src/pages/index.tsx` の `<Head>` → `<title>`, `<meta>`, `<link rel="icon">`

```astro
---
import '../styles/globals.css'
---
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>合同会社UNICORN</title>
    <meta name="description" content="合同会社UNICORNのコーポレートサイト" />
    <link rel="icon" href="/favicon.ico" />
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;600;700&display=swap" rel="stylesheet" />
  </head>
  <body>
    <slot />
  </body>
</html>
```

**`src/styles/globals.css` を整理**

`Home.module.css` 内の CSS 変数（`--background-start-rgb` 等）を body スタイルごと整理。
使用している変数のみ残し、未使用の Next.js ボイラープレート変数は削除。

**`src/styles/Home.module.css` は削除予定**（Step 4 で Tailwind 置き換え後）

### 完了条件
- `Layout.astro` が正しく HTML を出力する

---

## Step 3: コンポーネントの `.astro` 変換

各 `.tsx` → `.astro` に変換。`next/image` は `<img>` タグに置き換え（Astro は画像最適化を組み込みで持つが、静的サイトなので `<img>` で十分）。

### `Main.tsx` → `Main.astro`

```astro
---
---
<div>
  <div>
    <img src="/logo.svg" alt="unicorn Logo" width={100} height={24} />
  </div>
  <div class="py-4">
    <img src="/main_screen.jpg" alt="main screen" width={1000} height={600} />
  </div>
</div>
```

### `News.tsx` → `News.astro`

- Props: `feedItems: FeedItem[]`
- `dayjs` を使った日付フォーマットはフロントマターで処理
- `Array.map()` は Astro テンプレートで `{items.map(...)}` のまま使用可能

```astro
---
import type { FeedItem } from '../../../lib/feed'
import dayjs from 'dayjs'

interface Props {
  feedItems: FeedItem[]
}
const { feedItems } = Astro.props
const hatenaItems = feedItems.filter(v => v.type === 'hatena').slice(0, 3)
const zennItems = feedItems.filter(v => v.type === 'zenn')
---
<!-- JSX に近い Astro テンプレートで記述 -->
```

### `Works.tsx` → `Works.astro`

- `next/image` → `<img>`
- それ以外は JSX とほぼ同一

### `Company.tsx` → `Company.astro`

- React の型定義 (`React.FC`, `Props`) を削除するだけでほぼそのまま移植可能

### 完了条件
- 各 `.astro` コンポーネントが単体でエラーなくビルドされる

---

## Step 4: ページの移行

### `Page.tsx` → `Page.astro`

```astro
---
import type { FeedItem } from '../../../lib/feed'
import Main from '../../organisms/Top/Main.astro'
import News from '../../organisms/Top/News.astro'
import Works from '../../organisms/Top/Works.astro'
import Company from '../../organisms/Top/Company.astro'

interface Props {
  feedItems: FeedItem[]
}
const { feedItems } = Astro.props
---
<div>
  <Main />
  <News feedItems={feedItems} />
  <div class="border-black border mb-4" />
  <Works />
  <div class="border-black border mb-4" />
  <Company />
  <div class="border-black border mb-4" />
  <div class="text-xs text-center py-4">2022 UNICORN.LCC</div>
</div>
```

### `index.tsx` → `index.astro`

`getStaticProps` の処理をフロントマターに移動:

```astro
---
import Layout from '../layouts/Layout.astro'
import Page from '../components/templates/Top/Page.astro'
import { getZennRssFeed, getHatenaRssFeed, type FeedItem } from '../lib/feed'

const zennArticles = await getZennRssFeed()
const hatenaArticles = await getHatenaRssFeed()
const feedItems: FeedItem[] = [...zennArticles, ...hatenaArticles]
  .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
---
<Layout>
  <main class="flex flex-col items-center px-24 py-8 min-h-screen container mx-auto">
    <Page feedItems={feedItems} />
  </main>
</Layout>
```

> `Home.module.css` の `.main` クラスを Tailwind クラスに置き換えてここで削除。

### 完了条件
- `yarn build` が成功し `dist/` に `index.html` が生成される
- `yarn dev` でサイトが正しく表示される（RSS フィードも表示）

---

## Step 5: 不要ファイルの削除

| ファイル | 理由 |
|---------|------|
| `next.config.js` | `astro.config.mjs` に置き換え |
| `src/pages/_app.tsx` | `Layout.astro` に統合 |
| `src/pages/_document.tsx` | `Layout.astro` に統合 |
| `src/pages/api/hello.ts` | 使用していない Next.js サンプル |
| `src/styles/Home.module.css` | Tailwind クラスに置き換え済み |
| `next-env.d.ts` | Next.js 専用の型定義ファイル |

### 完了条件
- Next.js 関連ファイルがすべて削除されている
- `yarn build` が引き続き成功する

---

## Step 6: GitHub Actions の更新

`.github/workflows/deploy_website.yml` を Cloudflare Pages 用に書き換え:

```yaml
name: deploy website
on:
  workflow_dispatch:
    inputs:
      ref:
        description: branch|tag|SHA to checkout
        default: "main"
        required: true
  schedule:
    - cron: "0 2 * * *"
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      deployments: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: yarn install --frozen-lockfile
      - run: yarn build
      - uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: unicorn-website
          directory: dist
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}
          branch: main
```

**GitHub Secrets の更新:**

| 操作 | Secret 名 |
|------|----------|
| 追加 | `CLOUDFLARE_API_TOKEN` |
| 追加 | `CLOUDFLARE_ACCOUNT_ID` |
| 削除可 | `VERCEL_TOKEN`, `ORG_ID`, `PROJECT_ID` |

### 完了条件
- Actions が正常に完了し Cloudflare Pages にデプロイされる

---

## Step 7: Cloudflare Pages の設定とドメイン切り替え

### Cloudflare Pages プロジェクト作成

1. Cloudflare ダッシュボード → **Pages** → 「Create a project」
2. GitHub リポジトリ (`wheatandcat/unicorn-website`) を連携
3. ビルド設定（GitHub Actions でビルドするため「Direct Upload」でも可）

### ドメイン切り替え

1. Cloudflare Pages にカスタムドメイン `www.unicornllc.dev` を追加
2. ドメインの DNS プロバイダーで CNAME を Cloudflare Pages のドメインに変更
   - 事前に TTL を 300 秒に下げておくと切り替え時のダウンタイムを最小化できる
3. HTTPS が有効になったことを確認
4. Vercel 側でドメインの関連付けを解除

### Vercel プロジェクトの削除

動作確認後、Vercel ダッシュボードからプロジェクトを削除。

### 完了条件
- `https://www.unicornllc.dev/` が Cloudflare Pages から配信されている
- RSS フィードが正しく表示されている
- 毎日11時の定期デプロイが動いている

---

## 移行後のファイル構成

```
src/
  layouts/
    Layout.astro          # 新規（_app + _document + Head を統合）
  pages/
    index.astro           # index.tsx から移行
  components/
    templates/Top/
      Page.astro          # Page.tsx から移行
    organisms/Top/
      Main.astro          # Main.tsx から移行
      News.astro          # News.tsx から移行
      Works.astro         # Works.tsx から移行
      Company.astro       # Company.tsx から移行
  lib/
    feed.ts               # 変更なし
  styles/
    globals.css           # 整理（CSS 変数のクリーンアップ）
astro.config.mjs          # 新規
```
