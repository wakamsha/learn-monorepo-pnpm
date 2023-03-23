# Workspace: Packages

このワークスペースには以下のものが含まれます。

|                    パッケージ名 | 概要                                                                                              |
| ------------------------------: | :------------------------------------------------------------------------------------------------ |
|     `@learn-monorepo-pnpm/core` | 当 monorepo 横断（共通）で使用する Components, Constants, Hooks, Utils を持つ汎用ライブラリです。 |
| `@learn-monorepo-pnpm/tsconfig` | 当 monorepo 横断（共通）で使用する tsconfig の共通設定を管理します。                              |

各パッケージは原則として単体でのアプリケーションビルドはせず、 Apps ワークスペース配下のパッケージをはじめ他のパッケージから依存されることを前提としています。