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
    'function-no-unknown': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    'at-rule-no-unknown': [true, { ignoreAtRules: ['use', 'include', 'mixin', 'function', 'return', 'extend'] }],
  },
};
