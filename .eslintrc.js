module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/prop-types': 0,
    'no-param-reassign': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/alt-text': 0,
    'no-unused-vars': 'warn',
    'react/jsx-props-no-spreading': 0,
    'react/no-array-index-key': 0,
    'no-unused-expressions': 0,
    'react/no-unstable-nested-components': [
      'error',
      { allowAsProps: true },
    ],
    'import/no-extraneous-dependencies': 0,
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    'import/no-named-as-default': 0,
  },
};
