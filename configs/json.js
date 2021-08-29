'use strict';

const baseConfig = {
  plugins: ['json'],
  extends: ['plugin:json/recommended'],
};

const withCommentsConfig = {
  plugins: ['json'],
  extends: ['plugin:json/recommended-with-comments'],
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

module.exports = { baseConfig, withCommentsConfig, json: [packageJson, tsConfig] };
