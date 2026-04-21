# LeetCode Practice Repository

This repository is a personal data structures and algorithms practice space.

It has two goals:

1. keep a growing set of self-contained LeetCode solutions
2. automate a daily reminder workflow through GitHub Issues

## Repository Layout

- `problems/`: individual LeetCode solutions in Python
- `.github/workflows/daily-problem.yml`: scheduled workflow that creates a daily issue
- `.github/actions/daily-problem/`: custom GitHub Action that fetches the current LeetCode daily problem ID
- `TODO.md`: study plan and topic roadmap
- `AGENTS.md`: repo-specific instructions for coding agents

## Problem Files

Each LeetCode solution lives in a single file named like this:

`problems/<id>.<slug>.py`

Examples:

- `problems/35.search-insert-position.py`
- `problems/208.implement-trie-prefix-tree.py`
- `problems/42.trapping-rain-water.py`

The solution files are intentionally simple:

- no shared helper package
- no repo-wide problem framework
- each file should stay self-contained

That keeps every solution easy to review in isolation and close to the format used on LeetCode itself.

## Daily Problem Automation

The repository includes a GitHub Actions workflow that runs daily and opens an issue for the current LeetCode daily problem.

Current behavior:

- the workflow runs on a schedule and also supports manual dispatch
- it queries the LeetCode GraphQL API for the current daily problem
- it creates an issue only if an open issue for that day does not already exist

This automation is implemented with:

- GitHub Actions workflow YAML in `.github/workflows/daily-problem.yml`
- a small Node-based custom action in `.github/actions/daily-problem/index.js`

## Practice Philosophy

This repo is for practice, not for outsourcing unsolved DSA work.

That means the preferred workflow is:

- solve or attempt problems personally
- use the repo to store finished or iterated solutions
- use agents for review, edge cases, debugging help, refactoring, and repository improvements
- avoid having agents fully solve unsolved LeetCode problems from scratch

## Working With Agents

This repo is set up to work well with coding agents, but with clear boundaries.

Agents are useful here for:

- reviewing an existing solution for correctness or clarity
- suggesting the smallest improvement to a solution
- explaining time and space complexity
- debugging a failing approach
- improving the GitHub Action or repository docs
- preparing commits and pull requests

For repo-specific guidance, see `AGENTS.md`.

## Commit Style

For problem solutions, commits follow this format:

`problem(<id>): <technique>`

Examples:

- `problem(35): binary search`
- `problem(2078): bottom-up two-pointers`
- `problem(3488): hash-table & binary search`

For docs or automation changes, use a short imperative commit message that describes the change.

## Verification Approach

There is no full automated test suite for the problem files, so verification is intentionally lightweight.

Typical checks are:

- validate logic against the main examples and edge cases
- run a local harness if a problem file includes one
- for GitHub Action changes, run `npm ci` and `node --check .github/actions/daily-problem/index.js`

## Why This Repo Exists

The main purpose of this repository is to build consistent DSA practice over time while keeping the process lightweight:

- one file per solved problem
- one issue per daily prompt
- minimal tooling
- clear history in Git

That makes it easy to practice, review progress, and experiment with agent-assisted workflows without turning the repo into a large framework.
