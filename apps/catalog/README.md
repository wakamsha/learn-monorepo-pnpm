# @learn-storybook/catalog

## はじめに

公式ドキュメントによると 2023 年 2 月現在の最新版である Storybook v6.5 は pnpm をサポートしておらず、[ベータ版である v7.0 を使う旨が記載されています](https://storybook.js.org/docs/7.0/react/get-started/install)。しかし v7.0 では当該プロジェクトの monorepo 構成で正常に動作しません。これに関連すると思われる [Babel 周辺の不具合報告](https://github.com/storybookjs/storybook/issues/17398)がされていますが、現時点で解決策は見つかっていないようです。

公式ドキュメントでは言及されていないものの、以下の手順を実施することで pnpm による当該プロジェクトの monorepo 構成であっても Storybook v6.5 を動作させることが可能となります。

## Storybook の基本セットアップ（Vite）

Storybook の標準ビルダーは webpack ですが、Vite の選択も可能です。webpack と比較するとピーキーなのは否めませんが、こちらに移行することでより高速な開発体験を得られます。

### 関連モジュールをインストール

```bash
pnpm add -D \
  @babel/core \
  babel-loader \
  react react-dom \
  @storybook/react \
  @storybook/builder-vite \
  @storybook/channel-{postmessage,websocket} \
  @storybook/client-api \
  @storybook/preview-web \
  @storybook/addons \
  @storybook/addon-{actions,backgrounds,docs,essentials,interactions,links,measure,outline} \
  vite \
  @vitejs/plugin-react
```

React を Vite でビルドするため、 `vite` と `@vitejs/plugin-react` も併せてインストールします。

また、npm, yarn との大きな違いは react, react-dom を明示的にインストールする必要がある点です。npm, yarn であれば全ての依存モジュールが node_modules ディレクトリ配下にフラットに展開されるため、暗黙的にインストールされるこれら 2 つのモジュールは何もせずともよしなに参照してくれます。しかし pnpm はフラットに展開しないため、これら 2 つのモジュールも明示的にインストールせねばなりません。

### 設定ファイルを作成

#### `.storybook/main.js`

```js
const { resolve } = require('path');

module.exports = {
  stories: [
    {
      directory: '../../app1/src',
      titlePrefix: 'app1',
    },
    {
      directory: '../../app2/src',
      titlePrefix: 'app2',
    },
    {
      directory: '../../../packages/core/src',
      titlePrefix: 'core',
    },
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite',
  },
  features: {
    storyStoreV7: true,
  },
  async viteFinal(config) {
    // 各サブパッケージ配下のコードにある path alias を Storybook に認識させる。
    config.resolve.alias = {
      ...config.resolve.alias,
      '@learn-monorepo-pnpm/core': resolve(__dirname, '../../../packages/core/src'),
    };
    return config;
  },
};
```

code splitting に対応するために `storyStoreV7` フラグを有効化します。これをしないと起動時に `Couldn't find any stories in your Storybook.` というエラーになって stories の読み込みに失敗してしまうため、この設定は必須です。

- 参考文献: [Webpack](https://storybook.js.org/docs/react/builders/webpack#code-splitting)

#### `.storybook/preview.js`

```js
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
```

上記は Storybook CLI で自動生成されるコードと全く同じです。ひとまずこれで OK。

#### `.storybook/preview-head.html`

```html
<script>
  window.global = window;
</script>
```

webpack のときは不要ですが Vite でビルドする際はこれが必要となります。

- 参考文献: [Interactions-addon relies on polyfilled `global` (via jest-mock) · Issue #17516 · storybookjs/storybook](https://github.com/storybookjs/storybook/issues/17516)

## CSS Modules ( Sass ) に対応させる

Vite は webpack と違ってデフォルトで CSS Modules ( Sass ) をサポートしているため、追加の対応は不要です。

## npm scripts を定義

```js
{
  "scripts": {
    "start": "start-storybook -p 6006",
    "build": "build-storybook"
  }
}
```

Node.js のバージョンなど環境によっては `error:0308010C:digital envelope routines::unsupported` というエラーが発生してビルドに失敗することがあります。その場合は `openssl-legacy-provider` オプションを使用することで回避します。npm scripts を以下のように修正します。

```diff
- "start": "start-storybook -p 6006",
- "build": "build-storybook"
+ "start": "NODE_OPTIONS=--openssl-legacy-provider start-storybook -p 6006",
+ "build": "NODE_OPTIONS=--openssl-legacy-provider build-storybook"
```

## 参考文献

- [Next.js+CSS Modules(scss 含む) で Storybook の環境構築をする ++ Gaji-Labo ブログ](https://www.gaji.jp/blog/2021/10/20/8350/)
- [Nodejs のバージョンを上げたら`error:0308010C:digital envelope routines::unsupported`が出てしまう - Qiita](https://qiita.com/akitkat/items/f455bbc088a408cbc3a5)
