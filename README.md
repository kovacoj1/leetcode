# LeetCode Practice

[![Python CI](https://img.shields.io/github/actions/workflow/status/kovacoj1/leetcode/python-ci.yml?label=ruff&style=flat-square)](https://github.com/kovacoj1/leetcode/actions/workflows/python-ci.yml)
[![Daily Problem](https://img.shields.io/github/actions/workflow/status/kovacoj1/leetcode/daily-problem.yml?label=daily%20automation&style=flat-square)](https://github.com/kovacoj1/leetcode/actions/workflows/daily-problem.yml)
[![Issues](https://img.shields.io/github/issues/kovacoj1/leetcode?style=flat-square)](https://github.com/kovacoj1/leetcode/issues)
[![License](https://img.shields.io/github/license/kovacoj1/leetcode?style=flat-square)](LICENSE)

A structured data structures and algorithms practice repository with automated daily problem tracking.

## What This Is

This repo is a personal DSA practice log. Each problem is a single self-contained Python file, organized by LeetCode problem ID. A GitHub Actions workflow automatically creates a daily issue for the current LeetCode problem, keeping practice consistent over time.

## Repository Structure

```
problems/<id>.<slug>.py     # one file per solved problem
.github/workflows/          # daily problem automation
.github/actions/            # custom action: fetch daily LeetCode ID
AGENTS.md                   # agent workflow guidance
TODO.md                     # study plan and topic roadmap
```

### Problem Files

Each solution follows the naming convention `problems/<id>.<slug>.py`:

| File | Problem | Technique |
|------|---------|-----------|
| `35.search-insert-position.py` | Search Insert Position | Binary search |
| `42.trapping-rain-water.py` | Trapping Rain Water | Two pointers |
| `208.implement-trie-prefix-tree.py` | Implement Trie | Trie |
| `494.target-sum.py` | Target Sum | Memoized DFS |

Solutions are intentionally self-contained — no shared modules, no framework, just a clean `class Solution` implementation per file.

## Topics Covered

Based on the study plan in `TODO.md`:

- **Two Pointers** — palindrome checks, container problems, sorted-array search
- **Binary Search** — insert position, range search, rotated arrays
- **Prefix Sum** — range queries, subarray sums
- **DFS / BFS** — tree traversals, grid search, shortest paths
- **Recursion / Backtracking** — subsets, parentheses, combinatorial search
- **Queue** — rolling windows, circular buffers
- **Trie** — prefix matching, word search

## Daily Problem Automation

A scheduled GitHub Actions workflow runs daily at 06:15 CET and:

1. Queries the LeetCode GraphQL API for the current daily problem
2. Opens a GitHub Issue if one does not already exist for that day

This can also be triggered manually via `workflow_dispatch`.

## Practice Philosophy

This repo is for personal practice. The goal is to build consistent DSA skills over time:

- solve or attempt problems personally
- store finished and iterated solutions
- use agents for review, edge cases, debugging, and refactoring — not for solving unsolved problems

## Commit Conventions

This repo uses [Conventional Commits](https://www.conventionalcommits.org/):

| Type | Usage | Example |
|------|-------|---------|
| `feat` | new solution or feature | `feat(35): add binary search solution` |
| `fix` | bug fix in a solution or action | `fix(ci): update node version` |
| `refactor` | improve an existing solution | `refactor(42): simplify two-pointer logic` |
| `docs` | documentation changes | `docs: expand README` |
| `chore` | maintenance, tooling, CI | `chore: add .editorconfig` |

## Verification

There is no automated test suite. Verification is intentionally lightweight:

- **Python CI**: Ruff checks lint (`E`, `F`, `W`, `UP`, `I`) and format on every push/PR that touches `problems/`
- validate logic against the problem's examples and edge cases
- run a local harness if a problem file includes one
- for GitHub Action changes: `npm ci` and `node --check .github/actions/daily-problem/index.js`

## License

Released into the public domain under the [Unlicense](LICENSE).
