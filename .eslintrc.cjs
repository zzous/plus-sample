module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2024: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2024,
    sourceType: 'module',
    extraFileExtensions: ['.vue'],
    project: ['./tsconfig.json'],
    warnOnUnsupportedTypeScriptVersion: false,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'vue/script-setup-uses-vars': 'error',
    'vue/no-multiple-template-root': 'off',
    'no-console': 'warn',
    'no-debugger': 'error',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
        endOfLine: 'lf',
      },
    ],
  },
  settings: {
    'vue/setup-compiler-macros': true,
  },
}
