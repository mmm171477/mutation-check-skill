'use strict';
// Runs the demo and the documented Trial 2 and compares them with the saved outputs.
const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const demo = path.join(ROOT, 'examples', 'mutation-demo');
const norm = (s) => s.replace(/\r\n/g, '\n').trim();
const saved = (f) => norm(fs.readFileSync(path.join(ROOT, 'samples', f), 'utf8'));
const run = (cwd) => spawnSync(process.execPath, ['mutate.js'], { cwd, encoding: 'utf8' });

const r1 = run(demo);
assert.strictEqual(r1.status, 0); assert.strictEqual(norm(r1.stdout), saved('expected-demo-output.txt'));

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'mc-'));
fs.cpSync(demo, tmp, { recursive: true });
const f = path.join(tmp, 'discount.test.js');
const src = fs.readFileSync(f, 'utf8');
assert.ok(src.includes('applyDiscount(100, 30), 70'));
fs.writeFileSync(f, src.split('\n').filter((l) => !l.includes('applyDiscount(100, 30), 70')).join('\n'));
assert.strictEqual(spawnSync(process.execPath, ['discount.test.js'], { cwd: tmp }).status, 0, 'weakened suite stays green');
const r2 = run(tmp);
assert.strictEqual(r2.status, 1); assert.strictEqual(norm(r2.stdout), saved('expected-trial2-output.txt'));
for (const x of ['skills/mutation-check/SKILL.md', 'README.md', 'LICENSE']) assert.ok(fs.existsSync(path.join(ROOT, x)), x);
console.log('mutation-check sample tests passed');
