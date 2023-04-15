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
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: true,
  },
};
