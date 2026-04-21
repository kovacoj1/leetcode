const topicSelect = document.querySelector("#topic-select");
const topicList = document.querySelector("#topic-list");
const resultsTitle = document.querySelector("#results-title");
const resultsCount = document.querySelector("#results-count");
const resultsBody = document.querySelector("#results-body");
const resultsTable = document.querySelector("#results-table");
const resultsEmpty = document.querySelector("#results-empty");
const problemCount = document.querySelector("#problem-count");
const topicCount = document.querySelector("#topic-count");
const generatedAt = document.querySelector("#generated-at");

function formatGeneratedDate(value) {
  const date = new Date(value);
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function renderTopics(data, currentTopic) {
  topicList.innerHTML = "";

  const allTopics = [{ name: "All Topics", count: data.totalProblems }, ...data.topics];

  for (const topic of allTopics) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `topic-pill${topic.name === currentTopic ? " active" : ""}`;
    button.textContent = `${topic.name} (${topic.count})`;
    button.addEventListener("click", () => {
      topicSelect.value = topic.name;
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
    const link = document.createElement("a");
    link.href = problem.url;
    link.textContent = problem.title;
    link.target = "_blank";
    link.rel = "noreferrer";
    titleCell.append(link);

    const topicsCell = document.createElement("td");
    const topicWrapper = document.createElement("div");
    topicWrapper.className = "tag-list";

    for (const topic of problem.topics) {
      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = topic;
      topicWrapper.append(tag);
    }

    topicsCell.append(topicWrapper);
    row.append(idCell, titleCell, topicsCell);
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

  problemCount.textContent = String(data.totalProblems);
  topicCount.textContent = String(data.topics.length);
  generatedAt.textContent = formatGeneratedDate(data.generatedAt);

  topicSelect.innerHTML = "";
  for (const topic of [{ name: "All Topics" }, ...data.topics]) {
    const option = document.createElement("option");
    option.value = topic.name;
    option.textContent = topic.name;
    topicSelect.append(option);
  }

  const initialTopic = resolveInitialTopic(data);
  topicSelect.value = initialTopic;
  renderResults(data, initialTopic);

  topicSelect.addEventListener("change", () => {
    renderResults(data, topicSelect.value);
  });
}

main().catch((error) => {
  resultsTable.classList.add("hidden");
  resultsEmpty.textContent = error.message;
  resultsEmpty.classList.remove("hidden");
});
