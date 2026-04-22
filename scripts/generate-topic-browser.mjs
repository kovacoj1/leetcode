import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = path.join(rootDir, "site", "data.json");

const topicDefinitions = [
  { name: "Two Pointers", patterns: [/\btwo[- ]pointers?\b/i] },
  { name: "Binary Search", patterns: [/\bbinary[- ]search\b/i] },
  { name: "Prefix Sum", patterns: [/\bprefix[- ]sum\b/i] },
  { name: "DFS / BFS", patterns: [/\bdfs\b/i, /\bbfs\b/i] },
  { name: "Trie", patterns: [/\btrie\b/i] },
  { name: "Queue", patterns: [/\bqueue\b/i] },
  {
    name: "Recursion / Backtracking",
    patterns: [/\brecurs(?:ion|ive)\b/i, /\bbacktracking\b/i],
  },
  { name: "Dynamic Programming", patterns: [/\bdp\b/i, /dynamic programming/i] },
  { name: "Hashing", patterns: [/\bhash[- ]table\b/i, /\bhashmap\b/i, /\bhash map\b/i] },
  { name: "Counting", patterns: [/\bcounter\b/i, /\bcounting\b/i] },
  { name: "Heap", patterns: [/\bheap\b/i] },
  { name: "Tree", patterns: [/\btree\b/i] },
  { name: "Greedy", patterns: [/\bgreedy\b/i] },
];

function runGit(args) {
  return execFileSync("git", args, {
    cwd: rootDir,
    encoding: "utf8",
  }).trim();
}

function normalizeRepoUrl(remoteUrl) {
  if (remoteUrl.startsWith("git@github.com:")) {
    return `https://github.com/${remoteUrl.slice("git@github.com:".length).replace(/\.git$/, "")}`;
  }

  return remoteUrl.replace(/\.git$/, "");
}

function toTitleCase(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function extractTopics(subjects) {
  const topics = new Set();

  for (const subject of subjects) {
    const scopedMatch = subject.match(/^[a-z]+(?:\(([^)]+)\))?:\s*(.*)$/i);
    const text = scopedMatch
      ? [scopedMatch[1], scopedMatch[2]].filter(Boolean).join(" ")
      : subject;

    for (const topic of topicDefinitions) {
      if (topic.patterns.some((pattern) => pattern.test(text))) {
        topics.add(topic.name);
      }
    }
  }

  if (topics.size === 0) {
    topics.add("Uncategorized");
  }

  const orderedTopicNames = topicDefinitions.map((topic) => topic.name);
  return Array.from(topics).sort((left, right) => {
    const leftIndex = orderedTopicNames.indexOf(left);
    const rightIndex = orderedTopicNames.indexOf(right);

    if (leftIndex === -1 && rightIndex === -1) {
      return left.localeCompare(right);
    }

    if (leftIndex === -1) {
      return 1;
    }

    if (rightIndex === -1) {
      return -1;
    }

    return leftIndex - rightIndex;
  });
}

const repoUrl = normalizeRepoUrl(runGit(["config", "--get", "remote.origin.url"]));
const files = runGit(["ls-files", "problems/*.py"])
  .split("\n")
  .filter(Boolean)
  .sort((left, right) => {
    const leftId = Number(path.basename(left).split(".", 1)[0]);
    const rightId = Number(path.basename(right).split(".", 1)[0]);
    return leftId - rightId;
  });

const problems = files.map((file) => {
  const basename = path.basename(file, ".py");
  const firstDotIndex = basename.indexOf(".");
  const id = basename.slice(0, firstDotIndex);
  const slug = basename.slice(firstDotIndex + 1);
  const subjects = runGit(["log", "--follow", "--format=%s", "--", file])
    .split("\n")
    .filter(Boolean);

  return {
    id: Number(id),
    slug,
    title: toTitleCase(slug),
    path: file,
    url: `${repoUrl}/blob/main/${file}`,
    solutionUrl: `${repoUrl}/blob/main/${file}`,
    leetcodeUrl: `https://leetcode.com/problems/${slug}/`,
    topics: extractTopics(subjects),
    commitSubjects: subjects,
  };
});

const topicMap = new Map();

for (const problem of problems) {
  for (const topic of problem.topics) {
    if (!topicMap.has(topic)) {
      topicMap.set(topic, []);
    }

    topicMap.get(topic).push(problem.id);
  }
}

const orderedTopicNames = [
  ...topicDefinitions.map((topic) => topic.name).filter((name) => topicMap.has(name)),
  ...Array.from(topicMap.keys())
    .filter((name) => !topicDefinitions.some((topic) => topic.name === name))
    .sort((left, right) => left.localeCompare(right)),
];

const data = {
  generatedAt: new Date().toISOString(),
  repoUrl,
  totalProblems: problems.length,
  topics: orderedTopicNames.map((name) => ({
    name,
    count: topicMap.get(name)?.length ?? 0,
  })),
  problems,
};

mkdirSync(path.dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(data, null, 2)}\n`);
