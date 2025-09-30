// @ts-check
import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';
import n from 'eslint-plugin-n';

/** @type {import('eslint/').Linter.Config[]} */
export default [
  {
    ignores: ['**/dist/', '**/coverage/'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  // ...tseslint.configs.stylistic,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.es2021,
      },
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      n,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          // varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      'n/file-extension-in-import': ['error', 'always'],
    },
  },
  // test related
  {
    files: ['**/__mocks__/**/*'],
    languageOptions: {
      globals: {
        ...globals.commonjs,
        ...globals.jest,
      },
    },
  },
  {
    files: ['./jest*.cjs'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    files: ['./test-setup*.ts'],
    rules: {
      'n/file-extension-in-import': ['off'],
    },
  },
];
