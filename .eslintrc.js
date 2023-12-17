module.exports = {
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: ['alloy', 'alloy/react', 'alloy/typescript'],
  env: {
    browser: true,
  },
  globals: {},
  rules: {
    'no-console': 'error',
  },
};
