// eslint.config.js
import js from '@eslint/js';
import tseslintPlugin from '@typescript-eslint/eslint-plugin';
import tseslintParser from '@typescript-eslint/parser';
import eslintComments from 'eslint-plugin-eslint-comments';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import promise from 'eslint-plugin-promise';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import regexp from 'eslint-plugin-regexp';
import unicorn from 'eslint-plugin-unicorn';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';

const commonFiles = '**/*.{js,jsx,cjs,mjs,ts,tsx}';
const tsFiles = '**/*.{ts,tsx}';
const testFiles = '**/*.{test,spec}.{js,jsx,ts,tsx}';

const commonPlugins = {
  promise,
  unicorn,
  import: importPlugin,
  'eslint-comments': eslintComments,
  regexp,
  'unused-imports': unusedImports,
  react,
  'react-hooks': reactHooks,
  'jsx-a11y': jsxA11y,
};

const coreRules = {
  'no-restricted-syntax': ['error', 'WithStatement', 'LabeledStatement'],
  'no-console': 'off',
};

const promiseRules = {
  'promise/no-return-wrap': 'error',
  'promise/param-names': 'error',
  'promise/catch-or-return': 'error',
  'promise/no-nesting': 'warn',
  'promise/no-promise-in-callback': 'warn',
  'promise/no-callback-in-promise': 'warn',
  'promise/no-new-statics': 'error',
  'promise/no-return-in-finally': 'warn',
  'promise/valid-params': 'warn',
};

const unicornRules = {
  'unicorn/prevent-abbreviations': 'off',
  'unicorn/no-null': 'off',
  'unicorn/prefer-switch': 'warn',
  'unicorn/prefer-logical-operator-over-ternary': 'warn',
  'unicorn/no-await-expression-member': 'error',
};

const importRules = {
  'import/no-extraneous-dependencies': 'off',
  'import/order': 'off',
  'import/first': 'error',
  'import/no-duplicates': 'error',
  'import/no-cycle': 'error',
  'unused-imports/no-unused-imports': 'error',
};

const eslintCommentsRules = {
  'eslint-comments/disable-enable-pair': 'error',
  'eslint-comments/no-unlimited-disable': 'error',
  'eslint-comments/no-unused-disable': 'error',
};

const regexpRules = {
  'regexp/no-empty-capturing-group': 'error',
  'regexp/no-lazy-ends': 'error',
};

const typeScriptRules = {
  ...tseslintPlugin.configs.recommended.rules,
  '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  '@typescript-eslint/no-floating-promises': 'error',
  '@typescript-eslint/consistent-type-imports': 'off',
  '@typescript-eslint/await-thenable': 'error',
};

const reactRules = {
  ...react.configs.recommended.rules,
  'react/react-in-jsx-scope': 'off',
  'react/prop-types': 'off',
  'react/jsx-uses-react': 'off',
  'react/jsx-uses-vars': 'error',
  'react/jsx-pascal-case': 'error',
  'react/jsx-no-target-blank': 'error',
  'react/jsx-no-duplicate-props': 'error',
  'react/jsx-curly-brace-presence': [
    'error',
    { props: 'never', children: 'never' },
  ],
  'react/self-closing-comp': 'error',
  'react/no-array-index-key': 'warn',
  'react/no-children-prop': 'error',
  'react/no-danger': 'warn',
  'react/no-deprecated': 'error',
  'react/no-direct-mutation-state': 'error',
  'react/no-unescaped-entities': 'error',
  'react/no-unknown-property': 'error',
  'react/no-unused-state': 'error',
  'react/prefer-stateless-function': 'error',
  'react/jsx-boolean-value': ['error', 'never'],
  'react/jsx-fragments': ['error', 'syntax'],
  'react/jsx-no-useless-fragment': 'error',
  'react/jsx-sort-props': [
    'error',
    {
      callbacksLast: true,
      shorthandFirst: true,
      reservedFirst: true,
    },
  ],
};

const reactHooksRules = {
  'react-hooks/rules-of-hooks': 'error',
  'react-hooks/exhaustive-deps': 'warn',
};

const jsxA11yRules = {
  ...jsxA11y.configs.recommended.rules,
  'jsx-a11y/alt-text': 'error',
  'jsx-a11y/anchor-is-valid': 'error',
  'jsx-a11y/aria-props': 'error',
  'jsx-a11y/aria-proptypes': 'error',
  'jsx-a11y/aria-unsupported-elements': 'error',
  'jsx-a11y/role-has-required-aria-props': 'error',
  'jsx-a11y/role-supports-aria-props': 'error',
  'jsx-a11y/no-autofocus': 'warn',
  'jsx-a11y/no-static-element-interactions': 'warn',
  'jsx-a11y/click-events-have-key-events': 'warn',
};

export default [
  // Ignore patterns
  {
    ignores: [
      '**/{dist,build,coverage,.bun}/**',
      '**/node_modules/**',
      '**/*.lock',
      '**/README.md',
      '**/package.json',
    ],
  },

  // Base configuration
  js.configs.recommended,

  // Common JavaScript/TypeScript rules
  {
    files: [commonFiles],
    languageOptions: {
      ecmaVersion: 2025,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          importAttributes: true,
          jsx: true,
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
    plugins: commonPlugins,
    settings: {
      'import/resolver': { typescript: true },
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...coreRules,
      ...promiseRules,
      ...unicornRules,
      ...importRules,
      ...eslintCommentsRules,
      ...regexpRules,
      ...reactRules,
      ...reactHooksRules,
      ...jsxA11yRules,
    },
  },

  // TypeScript-specific rules
  {
    files: [tsFiles],
    languageOptions: {
      parser: tseslintParser,
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
    plugins: {
      '@typescript-eslint': tseslintPlugin,
    },
    rules: typeScriptRules,
  },

  // Test file overrides
  {
    files: [testFiles],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
