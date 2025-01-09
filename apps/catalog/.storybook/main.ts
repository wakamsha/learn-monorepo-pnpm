export default {
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
  framework: '@storybook/react-vite',
  docs: {
    autodocs: true,
  },
  typescript: {
    reactDocgenTypescriptOptions: {
      // この設定は monorepo 配下にある各種コンポーネントの JSDoc を認識させるために必要。
      // cf. https://github.com/storybookjs/storybook/issues/21399#issuecomment-1473800791
      include: ['../../../**/*.tsx'],
    },
  },
};
