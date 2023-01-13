import type { Linter } from 'eslint';

export function findRule(config: Linter.Config, ruleName: string) {
  if (!config.overrides) return [];

  return config.overrides
    .map((override) => {
      return override?.rules?.[ruleName];
    })
    .filter(Boolean);
}
