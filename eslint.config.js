// @ts-check
import next from '@next/eslint-plugin-next';
import { essentials, react, storybook, typescript } from '@wakamsha/eslint-config';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['**/.next/**', '**/dist/**', '**/*.scss.d.ts', '**/ambience.d.ts', '**/next-env.d.ts'],
  },

  ...essentials,
  {
    files: ['**/*.config.*'],
    rules: {
      'import/no-default-export': ['off'],
      'unicorn/filename-case': ['off'],
    },
  },

  ...typescript,
  ...react,

  ...storybook,
  {
    rules: {
      'storybook/no-uninstalled-addons': ['off'],
    },
  },
  {
    files: ['**/*.stories.@(tsx|jsx|js)'],
    rules: {
      'react-hooks/rules-of-hooks': ['off'],
    },
  },

  {
    plugins: {
      '@next/next': next,
    },
    rules: {
      ...next.configs.recommended.rules,
      ...next.configs['core-web-vitals'].rules,
    },
  },

  {
    files: ['**/@(app|pages)/**/*', '**/*.page.@(tsx|jsx|js)'],
    rules: {
      'import/no-default-export': ['off'],
    },
  },

  /* prettier */
  eslintConfigPrettier,
];
