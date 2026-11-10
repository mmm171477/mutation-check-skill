'use strict';
const assert = require('assert');
const { applyDiscount } = require('./discount');

function throwsCode(fn, code) {
  assert.throws(fn, (e) => e.message === code, 'expected ' + code);
}

assert.strictEqual(applyDiscount(200, 10), 180);
assert.strictEqual(applyDiscount(19.99, 15), 16.99);
assert.strictEqual(applyDiscount(100, 0), 100);
assert.strictEqual(applyDiscount(100, 30), 70);          // boundary: exactly at the cap is allowed
throwsCode(() => applyDiscount(100, 31), 'DISCOUNT_TOO_HIGH'); // just above the cap
throwsCode(() => applyDiscount(-1, 10), 'INVALID_PRICE');
throwsCode(() => applyDiscount('100', 10), 'INVALID_PRICE');
throwsCode(() => applyDiscount(100, -5), 'INVALID_PERCENT');
throwsCode(() => applyDiscount(100, NaN), 'INVALID_PERCENT');
assert.strictEqual(applyDiscount(100, 40, 50), 60);       // custom cap respected

console.log('all tests passed');
