import type { Linter } from 'eslint';

type ESLintPlugin = NonNullable<Linter.Config['plugins']>[keyof NonNullable<Linter.Config['plugins']>];
type ESLintRules = NonNullable<Linter.Config['rules']>;

type StorybookPlugin = ESLintPlugin & {
  configs: { recommended: { overrides: { files: string[]; rules: ESLintRules }[] } };
};

// @ts-ignore: ts(7016) because eslint-plugin-storybook has not type files.
import * as _storybookPlugin from 'eslint-plugin-storybook';
import { fixupPluginRules } from '@eslint/compat';

const storybookPlugin = _storybookPlugin as StorybookPlugin;

export default [
  {
    name: 'storybook-story',
    files: ['**/__stories__/*.@(js|jsx|mjs|ts|tsx)'],
    plugins: {
      storybook: fixupPluginRules(storybookPlugin),
    },
    rules: storybookPlugin.configs.recommended.overrides.at(0)?.rules ?? undefined,
  },
  {
    name: 'storybook-config',
    files: storybookPlugin.configs.recommended.overrides.at(1)?.files,
    plugins: {
      storybook: fixupPluginRules(storybookPlugin),
    },
    rules: storybookPlugin.configs.recommended.overrides.at(1)?.rules ?? undefined,
  },
] as Linter.Config[];
