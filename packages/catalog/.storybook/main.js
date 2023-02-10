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
      directory: '../../core/src',
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
      '@learn-monorepo-pnpm/core': resolve(__dirname, '../../core/src'),
    };
    return config;
  },
};
