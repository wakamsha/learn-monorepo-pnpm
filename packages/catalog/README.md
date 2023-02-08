# @learn-storybook/catalog

## はじめに

公式ドキュメントによると 2023 年 2 月現在の最新版である Storybook v6.5 は pnpm をサポートしておらず、[ベータ版である v7.0 を使う旨が記載されています](https://storybook.js.org/docs/7.0/react/get-started/install)。しかし v7.0 では当該プロジェクトの monorepo 構成で正常に動作しません。これに関連すると思われる [Babel 周辺の不具合報告](https://github.com/storybookjs/storybook/issues/17398)がされていますが、現時点で解決策は見つかっていないようです。

公式ドキュメントでは言及されていないものの、以下の手順を実施することで pnpm による当該プロジェクトの monorepo 構成であっても Storybook v6.5 を動作させることが可能となります。

## Storybook の基本セットアップ

### 関連モジュールをインストール

Storybook を起動するのに最低限必要なモジュールをインストールします。

```bash
pnpm add -D @babel/core babel-loader react react-dom @storybook/react @storybook/{builder,manager}-webpack5 @storybook/addon-{essentials,interactions,links}
```

npm, yarn では hoisting によって `react`, `react-dom` が暗黙的にインストールされますが、 pnpm は明示的にインストールする必要があります。アドオンは `addon-essentials` が必須なのはもちろん、 `addon-interactions`, `addon-links` も実質デファクトスタンダードなので併せてインストールします。

### 設定ファイルを作成

#### `.storybook/main.js`

```js
module.exports = {
  stories: [
    {
      directory: '../../core/src',
      titlePrefix: 'core',
    },
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
};
```

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

## CSS Modules ( Sass ) に対応させる

Storybook はデフォルトでは CSS Modules および Sass を認識しないため、これに対応させる必要があります。

### 関連モジュールをインストール

```bash
yarn add -D css-loader sass sass-loader style-loader
```

### `.storybook/main.js` を編集

CSS Modules と Sass 記法を読み込めるように `.storybook/main.js` を編集します。

```js
const { resolve } = require('path');

module.exports = {
  stories: [
    {
      directory: '../../core/src',
      titlePrefix: 'core',
    },
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              auto: true,
            },
          },
        },
        'sass-loader',
      ],
      include: resolve(__dirname, '../../'),
    });
    return config;
  },
};
```

## npm scripts を定義

```js
{
  "scripts": {
    "start": "start-storybook -p 6006",
    "build": "build-storybook"
  }
}
```

環境によっては Storybook を起動しようとすると `error:0308010C:digital envelope routines::unsupported` というエラーが発生して起動に失敗することがあります。その場合は npm scripts を以下のように修正します。

```diff
- "start": "start-storybook -p 6006",
- "build": "build-storybook"
+ "start": "NODE_OPTIONS=--openssl-legacy-provider start-storybook -p 6006",
+ "build": "NODE_OPTIONS=--openssl-legacy-provider build-storybook"
```

## 参考文献

- [Next.js+CSS Modules(scss 含む) で Storybook の環境構築をする ++ Gaji-Labo ブログ](https://www.gaji.jp/blog/2021/10/20/8350/)
- [Nodejs のバージョンを上げたら`error:0308010C:digital envelope routines::unsupported`が出てしまう - Qiita](https://qiita.com/akitkat/items/f455bbc088a408cbc3a5)
