import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-config-prettier';
import plugImport from 'eslint-plugin-import';
import pluginReact from 'eslint-plugin-react';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: { js, import: plugImport },
    extends: ['js/recommended', prettier],
    rules: {
      curly: ['error', 'all'],
      'no-use-before-define': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'no-const-assign': 'warn',
      'import/first': 'error',
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'object',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      globals: {
        __dirname: 'readonly',
      },
    },
  },
  pluginReact.configs.flat.recommended,
]);
