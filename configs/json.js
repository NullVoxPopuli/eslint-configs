// @ts-check
//  https://ota-meshi.github.io/eslint-plugin-jsonc/#features
import jsonc from 'eslint-plugin-jsonc';

import base from 'eslint-plugin-jsonc/dist/configs/base';
import jsonConfig from 'eslint-plugin-jsonc/dist/configs/recommended-with-json';
import jsonCommentConfig from 'eslint-plugin-jsonc/dist/configs/recommended-with-jsonc';

// eslint-plugin-jsonc needs native ESLint9 exports
const jsonBaseConfig = base.overrides[0];

export const baseConfig = {
  plugins: { jsonc },
  parser: jsonBaseConfig.parser,
  rules: {
    ...jsonBaseConfig.rules,
    ...jsonConfig.rules,
  },
};

export const withCommentsConfig = {
  plugins: { jsonc },
  parser: jsonBaseConfig.parser,
  rules: {
    ...jsonBaseConfig.rules,
    ...jsonCommentConfig.rules,
  },
};

const packageJson = {
  ...baseConfig,
  files: ['./package.json'],
};

const tsConfig = {
  ...withCommentsConfig,
  // match any tsconfig, not just at the root directory (no preceeding ./)
  // this is so that projects can have multiple tsconfigs, like if they need to manage
  // their own composite projects w/ references in a monorepo
  files: ['tsconfig.json', 'tsconfig*.json'],
};

export const json = [packageJson, tsConfig];
