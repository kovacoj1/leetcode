const topicList = document.querySelector("#topic-list");
const resultsTitle = document.querySelector("#results-title");
const resultsCount = document.querySelector("#results-count");
const resultsBody = document.querySelector("#results-body");
const resultsTable = document.querySelector("#results-table");
const resultsEmpty = document.querySelector("#results-empty");

function renderTopics(data, currentTopic) {
  topicList.innerHTML = "";

  const allTopics = [{ name: "All Topics", count: data.totalProblems }, ...data.topics];

  for (const topic of allTopics) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `topic-pill${topic.name === currentTopic ? " active" : ""}`;
    button.textContent = `${topic.name} (${topic.count})`;
    button.addEventListener("click", () => {
      renderResults(data, topic.name);
    });
    topicList.append(button);
  }
}

function renderResults(data, topicName) {
  const selectedTopic = topicName || "All Topics";
  const filteredProblems = selectedTopic === "All Topics"
    ? data.problems
    : data.problems.filter((problem) => problem.topics.includes(selectedTopic));

  window.location.hash = selectedTopic === "All Topics"
    ? ""
    : encodeURIComponent(selectedTopic.toLowerCase().replace(/\s+/g, "-"));

  resultsTitle.textContent = selectedTopic === "All Topics"
    ? "All solved problems"
    : `${selectedTopic} problems`;
  resultsCount.textContent = `${filteredProblems.length} result${filteredProblems.length === 1 ? "" : "s"}`;

  renderTopics(data, selectedTopic);
  resultsBody.innerHTML = "";

  if (filteredProblems.length === 0) {
    resultsTable.classList.add("hidden");
    resultsEmpty.classList.remove("hidden");
    return;
  }

  resultsTable.classList.remove("hidden");
  resultsEmpty.classList.add("hidden");

  for (const problem of filteredProblems) {
    const row = document.createElement("tr");

    const idCell = document.createElement("td");
    idCell.textContent = String(problem.id);

    const titleCell = document.createElement("td");
    titleCell.textContent = problem.title;

    const solutionCell = document.createElement("td");
    const solutionLink = document.createElement("a");
    solutionLink.href = problem.solutionUrl;
    solutionLink.textContent = problem.path;
    solutionLink.target = "_blank";
    solutionLink.rel = "noreferrer";
    solutionCell.append(solutionLink);

    const leetcodeCell = document.createElement("td");
    const leetcodeLink = document.createElement("a");
    leetcodeLink.href = problem.leetcodeUrl;
    leetcodeLink.textContent = "Open problem";
    leetcodeLink.target = "_blank";
    leetcodeLink.rel = "noreferrer";
    leetcodeCell.append(leetcodeLink);

    row.append(idCell, titleCell, solutionCell, leetcodeCell);
    resultsBody.append(row);
  }
}

function resolveInitialTopic(data) {
  const topicSlug = decodeURIComponent(window.location.hash.replace(/^#/, ""));

  if (!topicSlug) {
    return "All Topics";
  }

  const match = data.topics.find(
    (topic) => topic.name.toLowerCase().replace(/\s+/g, "-") === topicSlug,
  );

  return match?.name ?? "All Topics";
}

async function main() {
  const response = await fetch("./data.json", { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Failed to load topic data (${response.status})`);
  }

  const data = await response.json();

  const initialTopic = resolveInitialTopic(data);
  renderResults(data, initialTopic);
}

main().catch((error) => {
  resultsTable.classList.add("hidden");
  resultsEmpty.textContent = error.message;
  resultsEmpty.classList.remove("hidden");
});
