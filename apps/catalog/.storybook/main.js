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
    builder: 'webpack5',
  },
  docs: {
    autodocs: true,
  },
  webpackFinal: async (config) => {
    // 各サブパッケージ配下のコードにある CSS Modules (Sass) を Storybook に認識させる。
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
      include: resolve(__dirname, '../../../'),
    });
    return config;
  },
};
