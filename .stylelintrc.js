module.exports = {
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    'stylelint-config-standard-scss',
  ],
  ignoreFiles: ['**/node_modules/**', '**/*.ts{,x}'],
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
