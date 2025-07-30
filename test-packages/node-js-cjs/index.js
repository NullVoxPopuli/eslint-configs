'use strict';

module.exports = {
  foo() {
    return 2;
  },
  
  // Test no-unused-vars rule: underscore-prefixed should be allowed
  testUnusedVars(_unusedParam, used) {
    const _unusedVar = 'allowed';

    return used || 'default';
  },
};
