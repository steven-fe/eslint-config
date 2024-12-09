import type { Linter } from 'eslint';

type ESLintPlugin = NonNullable<Linter.Config['plugins']>[keyof NonNullable<Linter.Config['plugins']>];
type ESLintRules = NonNullable<Linter.Config['rules']>;
type ESLintLanguageOptions = NonNullable<Linter.Config['languageOptions']>;

interface ReactPlugin {
  configs: {
    flat: Record<
      'recommended' | 'jsx-runtime',
      {
        plugins: { react: ESLintPlugin };
        rules: ESLintRules;
        languageOptions: ESLintLanguageOptions;
      }
    >;
  };
}

type ReactHooksPlugin = ESLintPlugin & { configs: Record<'recommended', { rules: ESLintRules }> };

import _reactPlugin from 'eslint-plugin-react';
// @ts-ignore: ts(7016) because eslint-plugin-react-hooks has not type files.
import _reactHooksPlugin from 'eslint-plugin-react-hooks';
import * as lodash from 'lodash-es';
import { fixupPluginRules } from '@eslint/compat';

const reactPlugin = _reactPlugin as ReactPlugin;
const reactHooksPlugin = _reactHooksPlugin as ReactHooksPlugin;

export default {
  name: 'react',
  files: ['**/*.tsx', '**/*.ts'],
  settings: { react: { version: 'detect' } },
  languageOptions: {
    ...lodash.merge(
      {},
      reactPlugin.configs.flat.recommended.languageOptions,
      reactPlugin.configs.flat['jsx-runtime'].languageOptions,
    ),
  },
  plugins: {
    ...reactPlugin.configs.flat.recommended.plugins,
    ...reactPlugin.configs.flat['jsx-runtime'].plugins,
    'react-hooks': fixupPluginRules(reactHooksPlugin),
  },
  rules: {
    ...reactPlugin.configs.flat.recommended.rules,
    ...reactPlugin.configs.flat['jsx-runtime'].rules,
    ...reactHooksPlugin.configs.recommended.rules,
    'react/prop-types': 'off', // React.PropTypes is deprecated since React 15.5.0, use TypeScript instead.
  },
} as Linter.Config;
