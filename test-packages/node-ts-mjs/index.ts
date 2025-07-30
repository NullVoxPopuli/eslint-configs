import path from 'node:path';

export const _path = path;

export function foo(two: number) {
  return two;
}

// Test @typescript-eslint/no-unused-vars rule: underscore-prefixed params should be allowed
export function testUnusedVars(_unusedParam: string, used: string) {
  return used || 'default';
}
