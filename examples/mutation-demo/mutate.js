'use strict';
// Minimal mutation runner. Works on a temp copy; the original files are never edited.
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const SRC = path.join(__dirname, 'discount.js');
const TEST = path.join(__dirname, 'discount.test.js');

const mutations = [
  { name: 'remove cap check',            from: "if (pct > maxPct) throw new Error('DISCOUNT_TOO_HIGH');", to: '' },
  { name: 'cap boundary > to >=',        from: 'pct > maxPct', to: 'pct >= maxPct' },
  { name: 'allow negative price',        from: "!(price >= 0)", to: 'false' },
  { name: 'skip type check on price',    from: "typeof price !== 'number' ||", to: '' },
  { name: 'allow negative percent',      from: "!(pct >= 0)", to: 'false' },
  { name: 'ignore custom cap',           from: 'pct > maxPct', to: 'pct > 30' },
  { name: 'break rounding',              from: 'Math.round(price * (100 - pct)) / 100', to: 'price * (100 - pct) / 100' },
];

const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'mutation-demo-'));
const original = fs.readFileSync(SRC, 'utf8');
fs.copyFileSync(TEST, path.join(dir, 'discount.test.js'));

function runTests() {
  return spawnSync(process.execPath, ['discount.test.js'], { cwd: dir, encoding: 'utf8' }).status;
}

fs.writeFileSync(path.join(dir, 'discount.js'), original);
if (runTests() !== 0) { console.error('Baseline tests fail; fix them before mutating.'); process.exit(2); }

let survived = 0;
for (const m of mutations) {
  if (!original.includes(m.from)) { console.log(`SKIP     ${m.name} (pattern not found)`); survived++; continue; }
  fs.writeFileSync(path.join(dir, 'discount.js'), original.replace(m.from, m.to));
  const killed = runTests() !== 0;
  if (!killed) survived++;
  console.log(`${killed ? 'KILLED  ' : 'SURVIVED'} ${m.name}`);
}
fs.rmSync(dir, { recursive: true, force: true });
console.log(`\n${mutations.length - survived}/${mutations.length} mutations killed`);
process.exit(survived ? 1 : 0);
