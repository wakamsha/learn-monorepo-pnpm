# Workspace: Apps

このワークスペースには以下のものが含まれます。

|                   パッケージ名 | 概要                                                                                                                                     |
| -----------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------- |
|    `@learn-monorepo-pnpm/app1` | [Next.js](https://nextjs.org/) で実装されたアプリケーションです。                                                                        |
|    `@learn-monorepo-pnpm/app2` | [React](https://react.dev/) + [Vite](https://vitejs.dev/) で実装されたアプリケーションです。                                             |
| `@learn-monorepo-pnpm/catalog` | [Storybook](https://storybook.js.org/) で実装された UI カタログアプリケーションです。当 monorepo 配下にある全ての stories を掲載します。 |

このワークスペースにあるパッケージは、全て単体のアプリケーションとしてビルド、デプロイ可能なものです。各パッケージは必要に応じて Packages ワークスペース配下のパッケージに依存します。
