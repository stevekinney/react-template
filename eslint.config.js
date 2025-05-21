// eslint.config.js
import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import tseslintPlugin from '@typescript-eslint/eslint-plugin';
import tseslintParser from '@typescript-eslint/parser';
import eslintComments from 'eslint-plugin-eslint-comments';
import importPlugin from 'eslint-plugin-import';
import promise from 'eslint-plugin-promise';
import regexp from 'eslint-plugin-regexp';
import securityPlugin from 'eslint-plugin-security';
import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';

const commonFiles = '**/*.{js,cjs,mjs,ts,tsx}';

export default [
  // ── Ignore ──────────────────────────────────────────────────────────
  {
    ignores: [
      '**/{dist,build,coverage,.bun}/**',
      '**/node_modules/**',
      '**/*.lock',
      '**/ESLint-README.md',
      '**/README.md',
      '**/package.json',
    ],
  },

  // ── Base JS & TS configuration ──────────────────────────────────────
  js.configs.recommended,
  
  {
    files: [commonFiles],
    languageOptions: {
      ecmaVersion: 2025,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          importAttributes: true,
        },
      },
      globals: {
        Bun: 'readonly',
        ...globals.node,
        ...globals.browser,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    plugins: {
      '@stylistic': stylistic,
      promise,
      unicorn,
      sonarjs,
      import: importPlugin,
      'eslint-comments': eslintComments,
      regexp,
      'unused-imports': unusedImports,
      security: securityPlugin,
    },
    settings: {
      'import/resolver': { typescript: true },
    },
    rules: {
      /* Core */
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-restricted-syntax': ['error', 'WithStatement', 'LabeledStatement'],
      'prefer-const': 'error',
      'prefer-template': 'error',
      'no-var': 'error',

      /* Stylistic */
      '@stylistic/indent': ['error', 2],
      '@stylistic/quotes': ['off', 'single'],
      '@stylistic/semi': ['error', 'always'],

      /* Promise */
      'promise/always-return': 'off',
      'promise/no-return-wrap': 'error',
      'promise/param-names': 'error',
      'promise/catch-or-return': 'error',
      'promise/no-native': 'off',
      'promise/no-nesting': 'warn',
      'promise/no-promise-in-callback': 'warn',
      'promise/no-callback-in-promise': 'warn',
      'promise/avoid-new': 'off',
      'promise/no-new-statics': 'error',
      'promise/no-return-in-finally': 'warn',
      'promise/valid-params': 'warn',

      /* Unicorn */
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prefer-switch': 'warn',
      'unicorn/prefer-logical-operator-over-ternary': 'warn',
      'unicorn/no-await-expression-member': 'error',

      /* SonarJS */
      'sonarjs/cognitive-complexity': 'warn',
      'sonarjs/no-identical-expressions': 'error',
      'sonarjs/no-duplicate-string': ['warn', { threshold: 5 }],

      /* Imports */
      'import/no-extraneous-dependencies': 'off',
      'import/order': 'off', // Handled by @ianvs/prettier-plugin-sort-imports
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'import/no-cycle': 'error',

      /* unused-imports */
      'unused-imports/no-unused-imports': 'error',

      /* eslint-comments */
      'eslint-comments/disable-enable-pair': 'error',
      'eslint-comments/no-unlimited-disable': 'error',
      'eslint-comments/no-unused-disable': 'error',

      /* regexp */
      'regexp/no-empty-capturing-group': 'error',
      'regexp/no-lazy-ends': 'error',

      /* security */
      'security/detect-object-injection': 'warn',
      'security/detect-non-literal-regexp': 'warn',
      'security/detect-non-literal-fs-filename': 'warn',
    },
  },

  // ── TypeScript overrides ────────────────────────────────────────────
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslintParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tseslintPlugin,
    },
    rules: {
      ...tseslintPlugin.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/await-thenable': 'error',
    },
  },

  // ── Test file overrides ─────────────────────────────────────────────
  {
    files: ['**/*.{test,spec}.{js,ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off',
      'eslint-comments/disable-enable-pair': 'off',
    },
  },
];