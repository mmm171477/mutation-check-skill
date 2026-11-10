# Sample: asking an agent to use `mutation-check`

> Illustrative example.

## Prompt
```
Use the mutation-check skill on <path to one function> and its test file.
Work on a temporary copy; do not edit the original.
1. List every guard (validation, limit, permission, rounding, ordering).
2. Break each guard with the smallest edit, run the tests, and record killed or survived.
3. For every survivor write the missing test, then rerun.
Give me the final table and the tests you added.
```

## Result format to expect
| Mutation | Result | Test that caught it |
|---|---|---|
| remove cap check | killed | `rejects 31 percent` |
| cap boundary `>` to `>=` | survived, then killed after adding `allows exactly 30 percent` | new test |

A real run of the bundled example is in `expected-demo-output.txt` (all seven killed) and `expected-trial2-output.txt` (one survivor).
