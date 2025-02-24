import type { Linter } from 'eslint';

export type ConfigOverride = Linter.ConfigOverride;

export type PartialConfig = Omit<ConfigOverride, 'files' | 'extends'> & {
  // files?: string | string[] | undefined;
  extends?: string[];
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
}
