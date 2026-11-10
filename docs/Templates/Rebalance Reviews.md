<%*
// Templater script: Rebalance Reviews across days
const today = moment();
const defaultDate = "2026-11-11";

const startDateStr = await tp.system.prompt(
  "Enter start date for rebalancing (YYYY-MM-DD):",
  defaultDate
);
if (!startDateStr) return;

const startMoment = moment(startDateStr, "YYYY-MM-DD");
if (!startMoment.isValid()) {
  new Notice("Invalid date format. Use YYYY-MM-DD.");
  return;
}

const capChoice = await tp.system.suggester(
  ["3 reviews/day (Recommended: leaves time for 2-3 new problems)", "4 reviews/day", "5 reviews/day (Maximum framework cap)"],
  [3, 4, 5],
  false,
  "Select daily review cap:"
);
const DAILY_CAP = capChoice || 3;

const skipSunday = await tp.system.suggester(
  ["Yes: Skip Sundays (keep Sundays for backlog clearing & blind practice)", "No: Include Sundays"],
  [true, false],
  false,
  "Skip Sundays?"
);

// Collect all problem notes
const files = app.vault.getMarkdownFiles().filter(f => f.path.startsWith("Data Structures and Algorithms/Problems/"));

// Find problems that are unretired and due on or before the start date (or unreviewed)
const toRebalance = [];
for (const f of files) {
  const cache = app.metadataCache.getFileCache(f);
  const fm = cache?.frontmatter;
  const streak = Number(fm?.streak) || 0;
  if (streak >= 3) continue; // retired
  
  const nr = fm?.next_review;
  // If next_review is empty, or on/before the start date, or overdue
  if (!nr || moment(nr).isSameOrBefore(startMoment, "day")) {
    toRebalance.push({
      file: f,
      streak: streak,
      lastReviewed: fm?.last_reviewed || "",
      nextReview: nr || ""
    });
  }
}

if (toRebalance.length === 0) {
  new Notice("No overdue or due problems found to rebalance before " + startMoment.format("YYYY-MM-DD") + ".");
  return;
}

// Sort by lowest streak first (weakest first), then oldest nextReview
toRebalance.sort((a, b) => {
  if (a.streak !== b.streak) return a.streak - b.streak;
  return (a.nextReview || "").localeCompare(b.nextReview || "");
});

// Distribute across days
let curDate = startMoment.clone();
let dayCount = 0;
let updatedCount = 0;

for (const item of toRebalance) {
  while ((skipSunday && curDate.day() === 0) || dayCount >= DAILY_CAP) {
    curDate.add(1, "days");
    dayCount = 0;
  }
  
  const assignedDate = curDate.format("YYYY-MM-DD");
  await app.fileManager.processFrontMatter(item.file, (fm) => {
    fm.next_review = assignedDate;
  });
  
  dayCount++;
  updatedCount++;
}

new Notice(`Successfully rebalanced ${updatedCount} problems starting from ${startMoment.format("YYYY-MM-DD")} (cap: ${DAILY_CAP}/day).`, 10000);
-%>
