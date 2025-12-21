import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    ignores: [
      'dist/**',
      'build/**',
      '.next/**',
      '.vite/**',
      'node_modules/**',
    ],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      /* React */
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      /* Architecture – prevent deep feature imports */
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@features/*/*',
                '@features/*/*/*',
                '@features/*/*/*/*',
              ],
              message:
                'Do not import internal feature paths. Use the public API instead: @features/<feature>',
            },
          ],
        },
      ],
    },
  },
]);
