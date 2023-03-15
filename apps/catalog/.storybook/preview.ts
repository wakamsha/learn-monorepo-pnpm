import { startMsw } from '@learn-monorepo-pnpm/core/src/utils/Catalog';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

startMsw();
