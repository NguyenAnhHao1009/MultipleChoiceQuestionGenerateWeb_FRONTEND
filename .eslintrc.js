module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'vue/no-unused-components': 'warn',
  },
};
