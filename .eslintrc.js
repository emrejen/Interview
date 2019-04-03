module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    mocha: true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    indent: 2,
    'arrow-parens': [2, 'as-needed'],
    'no-plusplus': 0,
  },
};
