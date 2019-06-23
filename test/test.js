
var assert = require('assert');
describe('Test #1', function() {
  describe('#1.1', function() {
    it('should return -1 when the value is not present', function() {

      assert.equal([1, 2, 3, 4, 5, 67 ].indexOf(4), -1);

    });
  });
});