import type { Linter } from 'eslint';

type ESLintPlugin = NonNullable<Linter.Config['plugins']>[keyof NonNullable<Linter.Config['plugins']>];

type JestPlugin = ESLintPlugin & { configs: Record<'flat/recommended' | 'flat/style', Linter.Config> };
type JestDomPlugin = ESLintPlugin & { configs: Record<'flat/recommended', Linter.Config> };

// @ts-ignore: ts(7016) because eslint-plugin-jest has not type files.
import _jestPlugin from 'eslint-plugin-jest';
// @ts-ignore: ts(7016) because eslint-plugin-jest-dom has not type files.
import _jestDomPlugin from 'eslint-plugin-jest-dom';

const jestPlugin = _jestPlugin as JestPlugin;
const jestDomPlugin = _jestDomPlugin as JestDomPlugin;

export default {
  name: 'jest',
  files: ['**/__tests__/**/*.test.[jt]s?(x)'],
  plugins: {
    ...jestPlugin.configs['flat/recommended'].plugins,
    ...jestDomPlugin.configs['flat/recommended'].plugins,
  },
  languageOptions: jestPlugin.configs['flat/recommended'].languageOptions,
  rules: {
    ...jestPlugin.configs['flat/recommended'].rules,
    ...jestPlugin.configs['flat/style'].rules,
    ...jestDomPlugin.configs['flat/recommended'].rules,
  },
} as Linter.Config;
