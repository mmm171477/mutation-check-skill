# mutation-check: do your tests catch a mistake?

A green test suite only proves the tests pass. **mutation-check** breaks each guard in your code on purpose and checks that a test fails. This repository has the agent skill, a runnable demo and two ten-minute trials. Node.js 18+ only; no dependencies. MIT licence.

```bash
node examples/mutation-demo/mutate.js
```
Expected: `7/7 mutations killed` (saved in `samples/expected-demo-output.txt`).

## Trial 2: weaken one test and watch a mutation survive
Copy `examples/mutation-demo` somewhere, delete the line containing `applyDiscount(100, 30), 70` from `discount.test.js`, run `node discount.test.js` (still green) and `node mutate.js`: `SURVIVED cap boundary > to >=`, `6/7 mutations killed` (see `samples/expected-trial2-output.txt`).

## Use the skill
Copy `skills/mutation-check/SKILL.md` to `.claude/skills/mutation-check/SKILL.md` (Claude Code skills layout) or paste it into your agent's instructions, then use the prompt in `samples/sample-prompt-mutation-check.md`.

## Tests
`npm test` runs the demo and checks both trials against the saved outputs.

## Want more?
The paid **Ship-Safe Kit** adds the ship-feature procedure, the approval-gate prompt for AI agents, a UI-component skill, a cross-platform installer and more trials: https://921795454738.gumroad.com/l/gpfkc?utm_source=github&utm_medium=readme&utm_campaign=launch-2026-11

I am the author; built with AI assistance. No guarantee of bug-free code.
