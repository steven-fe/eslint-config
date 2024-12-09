import type { Linter } from 'eslint';

import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';

export default {
  name: 'es-modules',
  ignores: ['**/dist/**/*'],
  languageOptions: {
    globals: {
      __filename: 'off',
      __dirname: 'off',
    },
  },
  rules: {
    ...js.configs.recommended.rules,
    'no-restricted-globals': [
      'error',
      { name: '__filename', message: '__filename is not defined in the ES module scope' },
      { name: '__dirname', message: '__dirname is not defined in the ES module scope' },
      { name: 'require', message: 'only use ES Module' },
      { name: 'module', message: 'only use ES Module' },
      { name: 'exports', message: 'only use ES Module' },
    ],
    ...prettierConfig.rules,
  },
} as Linter.Config;
