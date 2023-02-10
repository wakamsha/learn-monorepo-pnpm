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
};
