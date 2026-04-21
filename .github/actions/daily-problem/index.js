const core = require("@actions/core");

async function run() {
    try {
        const response = await fetch("https://leetcode.com/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Referer": "https://leetcode.com/problemset/",
                "User-Agent": "github-actions"
            },
            body: JSON.stringify({
                query: `
          query questionOfToday {
            activeDailyCodingChallengeQuestion {
              question {
                questionFrontendId
                titleSlug
              }
            }
          }
        `,
                operationName: "questionOfToday"
            })
        });

        if (!response.ok) {
            throw new Error(`LeetCode GraphQL returned HTTP ${response.status}`);
        }

        const payload = await response.json();
        const problemId =
            payload?.data?.activeDailyCodingChallengeQuestion?.question?.questionFrontendId;
        const problemSlug =
            payload?.data?.activeDailyCodingChallengeQuestion?.question?.titleSlug;

        if (!problemId || !problemSlug) {
            throw new Error("Daily problem metadata was not found in the response");
        }

        core.setOutput("problem_id", String(problemId));
        core.setOutput("problem_slug", String(problemSlug));
    } catch (error) {
        core.setFailed(error instanceof Error ? error.message : String(error));
    }
}

run();
