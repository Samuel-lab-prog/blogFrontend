import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import { defineConfig } from 'eslint/config';

export default defineConfig([
	{
		files: ['src/**/*.ts', 'src/**/*.tsx'],
		ignores: ['dist/**', 'build/**', '.vite/**', 'node_modules/**'],
		extends: [
			js.configs.recommended,
			tseslint.configs.recommended,
			reactHooks.configs['recommended-latest'],
			reactRefresh.configs.vite,
			eslintConfigPrettier,
		],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: globals.browser,
		},
		rules: {
			/* =====================
			 * React
			 * ===================== */
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',

			/* =====================
			 * TypeScript
			 * ===================== */
			'no-unused-vars': 'off',
			'no-undef': 'off',

			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
				},
			],
			'@typescript-eslint/no-explicit-any': 'warn',

			/* =====================
			 * Code Style
			 * ===================== */
			'arrow-body-style': ['error', 'as-needed'],

			/* =====================
			 * Architecture
			 * ===================== */
			'no-restricted-imports': [
				'error',
				{
					patterns: [
						{
							group: ['@features/*/**'],
							message:
								'Do not import internal feature paths. Use the public API instead: @features/<feature>',
						},
						{
							group: ['../**/features/**'],
							message:
								'Do not bypass feature boundaries using relative imports.',
						},
					],
				},
			],
		},
	},
]);
