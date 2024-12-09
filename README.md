# Eslint-config

Coinstore's Eslint config.

## Installation

```sh
npm install @coinstore/eslint-config -D
```

## Usage

<!--
After installing, update your project's `prettier.config.mjs` file to import the rule sets you want:

```js
import prettierConfig from '@coinstore/prettier-config';

const config = {
  ...prettierConfig,
  // your overrides here
};

export default config;
```

---

Read the [Prettier config docs](https://prettier.io) for more information. -->

## 介绍

### ES-modules

包含的文件："**/\*.js", "**/_.cjs"，"\*\*/_.mjs"（所有的 .js / .cjs / .mjs 文件）

#### 全局变量

禁止的全局变量：

- \_\_dirname
- \_\_filename

> 在 Node 中有两个常见的变量：\_\_dirname\_ 和 \_\_filename，但是仅仅是在 CommonJS 规范中才能使用，ES modules 中是无法使用的。

#### rules 按照顺序依次为：

- [Eslint 推荐的 rules](https://eslint.org/docs/latest/rules/)
- 对 \_\_filename / \_\_dirname / require / module / exports 等 CommonJS 中用到的全局变量，而在ES modules中不存在的全局变量，进行限制
- 通过 PrettierConfigRules 禁止 [Eslint 中的样式 rules](https://eslint.org/docs/latest/rules/#layout--formatting)

### TypeScript

包含的文件："**/\*.ts", "**/\_.tsx"（所有的 .ts / .tsx 文件）

#### 使用

需要传入两个参数：

- project - 项目的根目录
- tsconfigRootDir - TypeScript 配置文件的相对路径（相对项目的根目录）

#### languageOptions

- sourceType - module
- ecmaVersion - latest

#### rules 按照顺序依次为：

- [strictTypeChecked](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/strict-type-checked.ts)
- [stylisticTypeChecked](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/stylistic-type-checked.ts)

### React

包含的文件："**/\*.ts", "**/\_.tsx"（所有的 .ts / .tsx 文件）

### Storybook

### Jest

包含的文件：**/\_\_tests\_\_/**/\*.test.[jt]s?(x)
