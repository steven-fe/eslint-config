import type { Linter } from 'eslint';

import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const getDirname = (importMetaUrl: string) => {
  const __filename = fileURLToPath(importMetaUrl);
  const __dirname = dirname(__filename);
  return __dirname;
};

const __dirname = getDirname(import.meta.url);

import { generateTypescriptConfig } from '@coinstore/eslint-config';

export default [
  ...generateTypescriptConfig({
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  }),
] as Linter.Config[];
