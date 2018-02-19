const signJwt = require('./index');
const testValue = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImFwcF81YTcwMTQxYmU5NjRjNjAwM2ZlMDhhZmMifQ.eyJzY29wZSI6ImFwcFVzZXIiLCJ1c2VySWQiOiJhd2lsbGlhbXMxOTk1IiwiaWF0IjoxNTE5MDAyMTEyfQ.kNUMJ2l_wk0jzdQEL_CTBlD4-TPbOMNMxsVK4bUDx_k';
const assert = require('assert');
describe('index',function(){
  describe('Jwt', function(){
    it('should return a particular string with the user awilliams1995', function(){
      const value = signJwt('awilliams1995');
     return assert.deepEqual(value,testValue)
    });
});
})
