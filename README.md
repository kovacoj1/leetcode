# LeetCode Practice

[![Python CI](https://img.shields.io/github/actions/workflow/status/kovacoj1/leetcode/python-ci.yml?branch=main&label=python%20ci&style=flat-square)](https://github.com/kovacoj1/leetcode/actions/workflows/python-ci.yml)
[![Daily Automation](https://img.shields.io/github/actions/workflow/status/kovacoj1/leetcode/daily-problem.yml?branch=main&label=daily%20automation&style=flat-square)](https://github.com/kovacoj1/leetcode/actions/workflows/daily-problem.yml)
[![Python](https://img.shields.io/badge/python-3.12-blue?style=flat-square&logo=python&logoColor=white)](https://www.python.org/)
[![License](https://img.shields.io/github/license/kovacoj1/leetcode?style=flat-square)](LICENSE)

Public record of my data structures and algorithms practice in Python, with lightweight CI and a custom GitHub Actions workflow for daily LeetCode tracking.

## What This Is

This repository shows how I approach algorithm practice as an engineering project rather than a pile of scratch files.

It demonstrates:

- self-contained Python problem solving
- consistent file and commit conventions
- custom GitHub Actions automation
- lightweight CI with Ruff on changed solution files

Each problem is stored as a single Python file named by LeetCode problem ID and slug.

## Repository Structure

```
problems/<id>.<slug>.py     # one file per solved problem
.github/workflows/          # daily problem automation
.github/actions/            # custom action: fetch daily LeetCode ID
AGENTS.md                   # agent workflow guidance
TODO.md                     # study plan and topic roadmap
```

## Snapshot

- growing set of single-file Python solutions in `problems/`
- custom GitHub Action for daily problem issue creation
- Ruff-based Python CI for changed solution files
- Conventional Commits for readable history

### Problem Files

Each solution follows the naming convention `problems/<id>.<slug>.py`:

| File | Problem | Technique |
|------|---------|-----------|
| `35.search-insert-position.py` | Search Insert Position | Binary search |
| `42.trapping-rain-water.py` | Trapping Rain Water | Two pointers |
| `208.implement-trie-prefix-tree.py` | Implement Trie | Trie |
| `494.target-sum.py` | Target Sum | Memoized DFS |

Solutions are intentionally self-contained: no shared helper package, no abstraction layer, just a focused `class Solution` implementation per file.

## Selected Examples

- [`problems/42.trapping-rain-water.py`](./problems/42.trapping-rain-water.py): two-pointer technique
- [`problems/208.implement-trie-prefix-tree.py`](./problems/208.implement-trie-prefix-tree.py): trie data structure
- [`problems/494.target-sum.py`](./problems/494.target-sum.py): memoized DFS
- [`problems/3488.closest-equal-element-queries.py`](./problems/3488.closest-equal-element-queries.py): hashing with indexed search

## Topics Covered

Based on the study plan in [`TODO.md`](./TODO.md):

- **Two Pointers** — palindrome checks, container problems, sorted-array search
- **Binary Search** — insert position, range search, rotated arrays
- **Prefix Sum** — range queries, subarray sums
- **DFS / BFS** — tree traversals, grid search, shortest paths
- **Recursion / Backtracking** — subsets, parentheses, combinatorial search
- **Queue** — rolling windows, circular buffers
- **Trie** — prefix matching, word search

## Daily Problem Automation

A scheduled GitHub Actions workflow runs daily at 06:15 UTC and:

1. Queries the LeetCode GraphQL API for the current daily problem
2. Opens a labeled GitHub Issue if one does not already exist for that day

This can also be triggered manually via `workflow_dispatch`.

Open daily issues are intentional practice backlog items, not product bugs.

## Practice Philosophy

This repo is for personal practice. The goal is to build consistent DSA skills over time while keeping the work reviewable and publishable:

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

There is no full automated test suite. Verification is intentionally lightweight:

- **Python CI**: Ruff checks lint (`E`, `F`, `W`, `UP`, `I`) and format for changed `problems/*.py` files
- **Syntax smoke check**: changed `problems/*.py` files are compiled with Python to catch syntax errors early
- validate logic against the problem's examples and edge cases
- run a local harness if a problem file includes one
- for GitHub Action changes: `npm ci` and `node --check .github/actions/daily-problem/index.js`

## License

Released into the public domain under the [Unlicense](LICENSE).
