'use strict';

module.exports = {
  foo(two: number) {
    return two;
  },
  
  // Test @typescript-eslint/no-unused-vars rule: underscore-prefixed params should be allowed
  testUnusedVars(_unusedParam: string, used: string) {
    return used || 'default';
  },
};
