<%*
const file = tp.config.target_file;
if (!file.path.startsWith("Data Structures and Algorithms/Problems/")) {
  new Notice("Open a DSA problem note first.");
  return;
}

const outcome = await tp.system.suggester(
  ["Clean: optimal in 15 min, no help", "Struggled: trigger, hint, slow or bugs", "Failed: needed the solution"],
  ["clean", "struggled", "failed"],
  false,
  "How did the re-solve go?"
);
if (!outcome) return;

// Count current scheduled reviews per day across all active problems
const files = app.vault.getMarkdownFiles();
const reviewCounts = {};
for (const f of files) {
  if (!f.path.startsWith("Data Structures and Algorithms/Problems/")) continue;
  if (f.path === file.path) continue; // exclude current file being reviewed
  const cache = app.metadataCache.getFileCache(f);
  const nr = cache?.frontmatter?.next_review;
  const s = cache?.frontmatter?.streak;
  if (nr && (s === undefined || Number(s) < 3)) {
    reviewCounts[nr] = (reviewCounts[nr] || 0) + 1;
  }
}

// Helper to find next open slot (cap at 5 reviews/day, skip Sunday for normal scheduled reviews)
const DAILY_CAP = 5;
function getLoadBalancedDate(startDate, daysToAdd) {
  let target = startDate.clone().add(daysToAdd, "days");
  let shifted = false;
  while ((reviewCounts[target.format("YYYY-MM-DD")] || 0) >= DAILY_CAP || target.day() === 0) {
    target.add(1, "days");
    shifted = true;
  }
  return { date: target.format("YYYY-MM-DD"), shifted };
}

const today = moment();
let message = "";
await app.fileManager.processFrontMatter(file, (fm) => {
  fm.last_reviewed = today.format("YYYY-MM-DD");
  fm.times_reviewed = (Number(fm.times_reviewed) || 0) + 1;
  if (outcome === "clean") {
    fm.streak = (Number(fm.streak) || 0) + 1;
    if (fm.streak >= 3) {
      fm.next_review = null;
      message = `Retired after 3 clean solves. (Reviewed ${fm.times_reviewed} times)`;
      return;
    }
    const baseDays = fm.streak === 1 ? 7 : 21;
    const { date, shifted } = getLoadBalancedDate(today, baseDays);
    fm.next_review = date;
    const note = shifted ? `(auto-balanced to ${date} to respect cap of ${DAILY_CAP}/day)` : `on ${date}`;
    message = `Streak ${fm.streak}. Next review in ${baseDays} days${note}. (Reviewed ${fm.times_reviewed} time${fm.times_reviewed > 1 ? "s" : ""})`;
  } else {
    fm.streak = 0;
    const baseDays = outcome === "failed" ? 1 : 3;
    const { date, shifted } = getLoadBalancedDate(today, baseDays);
    fm.next_review = date;
    const note = shifted ? `(auto-balanced to ${date} to respect cap of ${DAILY_CAP}/day)` : `on ${date}`;
    message = `Next review in ${baseDays} day${baseDays > 1 ? "s" : ""}${note}. (Reviewed ${fm.times_reviewed} time${fm.times_reviewed > 1 ? "s" : ""})`;
    if (outcome === "failed") message += " Rewrite the trigger and Key Insight now.";
  }
});
new Notice(message, 8000);
-%>
