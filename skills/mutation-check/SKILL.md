---
name: mutation-check
description: Prove that tests actually protect your guards by breaking each guard on purpose and confirming a test fails. Use after writing validation, permission, limit, or money logic, or whenever tests are green but you do not trust them.
---

# mutation-check

Green tests only prove the tests pass. This skill proves they would **fail** if a guard disappeared.

## Procedure
1. List every guard you added: validations, permission checks, limits, rounding, ordering, idempotency checks.
2. For each guard, create a mutation: the smallest edit that disables or weakens it (remove the check, flip `>` to `>=`, change a limit, skip a lock).
3. Work on a **copy** of the code (a temp directory), never on the original.
4. Apply one mutation, run the test suite, record the result:
   - Suite fails → **killed** (good).
   - Suite passes → **survived** (bad: write the missing test).
5. Restore, move to the next mutation.
6. Report a table: mutation, killed/survived, test that caught it.

## Rules
- One mutation at a time.
- A survivor is never "fine". Either add a test that kills it or document why the guard is unreachable.
- Do not claim protection for a guard that was not mutated.

## Working example
`EXAMPLES/mutation-demo/` contains a small function, its tests, and `mutate.js`, which runs this exact loop. Run it with `node EXAMPLES/mutation-demo/mutate.js`.
