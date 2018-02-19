const signJwt = require('./index');
const keys = require('./test.keys.js')
const assert = require('assert');
describe('index',function(){
  describe('Jwt', function(){
    const testCase = 'awilliams1995';
    it(`should return a particular string with the user ${testCase}`, function(){
      const actualValue = signJwt(testCase).split('.')[0];
      const testValue = keys[testCase].split('.')[0]
     return assert.deepEqual(actualValue,testValue)
    });
});
})
