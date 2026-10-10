import type { Linter } from 'eslint';

export type ConfigOverride = Linter.Config;

export type PartialConfig = Omit<ConfigOverride, 'files' | 'extends'> & {
  // files?: string | string[] | undefined;
  name?: string;
};

export interface Options {
  /**
   * Default: false
   *
   * when set to true, prettier will be ran through ESLint, and errors will show up in
   * ESLint.
   * This is significantly slower than running both tools separately.
   * But allows folks to use only one command, since there are too many commands to use in
   * modern javascript development
   */
  prettierIntegration?: boolean;

  /**
   * Default: false
   *
   * Only used by `configs.ember`.
   *
   * when set to true, the templates in gjs and gts files are linted with
   * the rules that ember-template-lint has in its `recommended` preset.
   * This replaces ember-template-lint.
   */
  templates?: boolean;
}
