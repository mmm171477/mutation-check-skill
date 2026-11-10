'use strict';
// Small guarded function used by the mutation demo.
function applyDiscount(price, pct, maxPct = 30) {
  if (typeof price !== 'number' || !(price >= 0)) throw new Error('INVALID_PRICE');
  if (!(pct >= 0)) throw new Error('INVALID_PERCENT');
  if (pct > maxPct) throw new Error('DISCOUNT_TOO_HIGH');
  return Math.round(price * (100 - pct)) / 100;
}
module.exports = { applyDiscount };
