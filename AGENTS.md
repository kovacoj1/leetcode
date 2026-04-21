## Purpose

This repository works well with coding agents because the scope is small and the work falls into two clear categories:

1. `problems/*.py`: single-file LeetCode solutions in Python.
2. `.github/actions/daily-problem/*` and `.github/workflows/daily-problem.yml`: the automation that creates a daily GitHub issue.

Use this file as the repo-specific operating guide for agentic work.

This repo is also a DSA practice space for the user. Agents should not solve unsolved LeetCode problem tasks here. For problem work, prefer hints, reviews, edge-case checks, complexity analysis, and feedback on the user's approach over writing full solutions.

## Repository Shape

- `problems/<id>.<slug>.py`
- `.github/workflows/daily-problem.yml`
- `.github/actions/daily-problem/index.js`
- `TODO.md`

Important constraints:

- LeetCode solutions are intentionally self-contained.
- There is no shared Python package for solutions.
- There is no full automated test suite for problem files.
- The GitHub Action uses Node and `@actions/core` from the root `package.json`.

## What Agents Should Optimize For

- Make the smallest correct change.
- Preserve the one-file-per-problem structure.
- Prefer clarity over cleverness unless the problem requires a specific optimization.
- Do not introduce helper modules for LeetCode solutions.
- Keep commit messages in Conventional Commits format: `type(scope): description` (e.g. `feat(35): add binary search solution`, `fix(ci): update node version`, `docs: expand README`).

## Good Task Types For Agents

Agents are a strong fit for:

- Reviewing an existing solution for correctness, edge cases, or clarity.
- Refactoring an existing solution to a cleaner or faster approach.
- Explaining time and space complexity for a solution.
- Giving hints or partial guidance on a problem without fully solving it.
- Updating the daily GitHub Action.
- Updating repository metadata, README quality, and lightweight CI.
- Preparing a branch, commit, or PR summary.

Agents are a weaker fit for:

- Open-ended brainstorming with no target problem.
- Solving unsolved LeetCode problem tasks from scratch.
- Claims of correctness without at least example-based verification.

## Default Workflow

When working with an agent in this repo, use this sequence:

1. Inspect the target file and adjacent files first.
2. Identify whether the task is a LeetCode solution change or GitHub Action change.
3. Make the minimal code change.
4. Verify with the lightest useful check.
5. Summarize what changed, why, and any remaining risk.

## Working On LeetCode Problems

For `problems/*.py` tasks, agents should:

1. Treat the repo as a practice space, so default to review and guidance rather than writing a fresh full solution.
2. Match the existing file naming convention exactly when touching an existing problem file.
3. Keep any solution changes self-contained in that single file.
4. Prefer standard LeetCode-compatible Python 3 syntax.
5. Include only the imports actually needed.
6. State time and space complexity in the final summary when useful.

Suggested verification:

- Check the algorithm against the prompt's main examples and edge cases.
- If a local harness exists in the file, run it.
- If no harness exists, do not invent a heavy test framework just for one solution.

If the user asks for help on a problem they have not solved yet, prefer one of these responses:

- explain the key pattern or data structure
- point out flaws in their current approach
- give the next hint only
- help them test or debug their own attempt

## Working On The GitHub Action

For `.github/actions/daily-problem/` or workflow changes, agents should:

1. Preserve the current behavior unless the task says otherwise.
2. Keep dependencies minimal.
3. Prefer straightforward JavaScript over extra abstraction.
4. Verify syntax and behavior locally where practical.

Suggested verification:

- `npm ci`
- `node --check .github/actions/daily-problem/index.js`

If behavior changes are non-trivial, explain the expected runtime behavior in GitHub Actions.

## Git And GitHub Conventions

- Do not commit unrelated files.
- Do not rewrite history unless explicitly requested.
- Keep commits focused.
- Use Conventional Commits: `type(scope): description`.
- Solution commits: `feat(<id>): <technique>` (e.g. `feat(35): binary search`).
- Automation/docs commits: `type: description` (e.g. `fix(ci): update node version`, `docs: expand README`).

When opening a PR, include:

- what changed
- why it changed
- how it was verified

## Good Prompts For Agents In This Repo

Use prompts like these:

- `Review my solution in problems/42.trapping-rain-water.py for correctness, edge cases, and unnecessary complexity. Suggest the smallest improvement.`
- `Give me a hint for today's LeetCode daily problem without solving it.`
- `Update the daily GitHub Action to fail more clearly when the LeetCode API shape changes. Keep the change minimal and verify syntax.`
- `Prepare a PR summary for the current branch based on all changes since main.`

## Recommended Collaboration Style

The most effective way to use agents here is:

1. Give one concrete task at a time.
2. Name the exact file or problem ID when possible.
3. Ask for implementation plus verification, not just ideas.
4. Ask for a review separately from implementation when you want critical feedback.
5. Ask for a commit or PR only when you are satisfied with the change.

## Anti-Patterns

Avoid asking agents to:

- build a general framework for all LeetCode solutions
- add premature abstractions across problem files
- create broad repo-wide changes for a single-problem task
- solve unsolved LeetCode practice problems end-to-end
- assume correctness without checking examples or edge cases

## Practical Starting Point

For this repo, a clean agentic loop looks like this:

1. Pick one problem or one automation change.
2. Ask the agent to inspect the relevant files first.
3. Have it implement the smallest correct change.
4. Have it verify the result.
5. Then ask for a commit and PR summary if you want to publish it.

That workflow keeps agent output useful, reviewable, and easy to merge.
