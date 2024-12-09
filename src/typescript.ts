import type { Linter } from 'eslint';

type ESLintPlugin = NonNullable<Linter.Config['plugins']>[keyof NonNullable<Linter.Config['plugins']>];

import tsEslint from 'typescript-eslint';
import EsModules from './es-modules';

const extractConfigRules = (configs: Linter.Config[]) =>
  configs.reduce<NonNullable<Linter.Config['rules']>>((rules, config) => ({ ...rules, ...(config.rules ?? {}) }), {});

export default ({
  project,
  tsconfigRootDir,
}: {
  /** 项目的根目录 */
  project: string;
  /** TypeScript 配置文件的相对路径（相对项目的根目录） */
  tsconfigRootDir: string;
}) =>
  [
    EsModules,
    {
      name: 'typeScript',
      files: ['**/*.ts', '**/*.tsx'],
      ignores: ['**/dist/**/*'],
      languageOptions: {
        parser: tsEslint.parser as Linter.Parser,
        sourceType: 'module',
        ecmaVersion: 'latest',
        parserOptions: { project, tsconfigRootDir },
      },
      plugins: {
        '@typescript-eslint': tsEslint.plugin as ESLintPlugin,
      },
      rules: {
        ...extractConfigRules(tsEslint.configs.strictTypeChecked as Linter.Config[]),
        ...extractConfigRules(tsEslint.configs.stylisticTypeChecked as Linter.Config[]),
        '@typescript-eslint/ban-ts-comment': [
          'error',
          {
            'ts-expect-error': { descriptionFormat: '^: ts\\(\\d+\\) because .+$' },
            'ts-ignore': { descriptionFormat: '^: ts\\(\\d+\\) because .+$' },
            'ts-nocheck': { descriptionFormat: '^: ts\\(\\d+\\) because .+$' },
            'ts-check': true,
            minimumDescriptionLength: 10,
          },
        ],
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            args: 'all',
            argsIgnorePattern: '^_',
            caughtErrors: 'all',
            caughtErrorsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            ignoreRestSiblings: true,
          },
        ],
      },
    },
  ] as Linter.Config[];
