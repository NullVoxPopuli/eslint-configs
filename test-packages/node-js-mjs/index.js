export function foo() {
  return 2;
}

// Test no-unused-vars rule: underscore-prefixed should be allowed
export function testUnusedVars(_unusedParam, used) {
  const _unusedVar = 'allowed';

  return used || 'default';
}
