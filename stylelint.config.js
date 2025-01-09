export default {
  extends: ['@wakamsha/stylelint-config/essentials', 'stylelint-config-standard-scss'],
  ignoreFiles: ['**/node_modules/**', '**/*.@(ts|tsx|js|jsx)'],
  rules: {
    'property-no-vendor-prefix': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
  },
};
