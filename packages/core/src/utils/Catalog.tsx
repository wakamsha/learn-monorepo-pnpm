import { type Args, type DecoratorFunction } from '@storybook/csf';
import { type ReactFramework } from '@storybook/react';
import { rest, type RequestHandler } from 'msw';
import { useEffect } from 'react';

type MSWRest = typeof rest;

/**
 * MSW を使って API 通信をモックするデコレーター。
 *
 * MSW によるモックと、そのリセット処理をまとめてくれる。
 *
 * Storybook の decorators に `mswDecorator(モック定義を返す関数)` の戻り値を渡して適用する。
 *
 * `モック定義を返す関数` の部分は、[`rest`](https://mswjs.io/docs/api/rest) を受け取って `RequestHandler[]` を返す関数。
 * `RequestHandler` は [`setupWorker`](https://mswjs.io/docs/api/setup-worker) や [`worker.use`](https://mswjs.io/docs/api/setup-worker/use) に渡す値と同じもの。
 *
 * 具体的なモックの書き方は `rest`, `setupWorker`, `worker.use` の公式の説明を見てください。
 *
 * @see https://mswjs.io/docs/api/rest
 * @see https://mswjs.io/docs/api/setup-worker
 * @see https://mswjs.io/docs/api/setup-worker/use
 *
 * @example
 * ```tsx
 * export default {
 *   component: SomeComponent,
 *   decorators: [mswDecorator(rest => [rest.get(...)])],
 * } as StorybookMeta;
 * ```
 */
export const mswDecorator = (mock: (rest: MSWRest) => RequestHandler[]): DecoratorFunction<ReactFramework, Args> => {
  const Wrapper = ({ children }: { children: JSX.Element }) => {
    useEffect(() => {
      const { worker } = (catalog as any).msw;

      worker.use(...mock(rest));

      return () => {
        worker.resetHandlers();
      };
    }, []);

    return children;
  };

  return (Story) => (
    <Wrapper>
      <Story />
    </Wrapper>
  );
};
