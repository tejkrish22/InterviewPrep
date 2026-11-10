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

const DAILY_CAP = 5;
const today = moment().startOf("day");

// Scheduled reviews per day, excluding this note and retired problems.
const load = {};
for (const f of app.vault.getMarkdownFiles()) {
  if (!f.path.startsWith("Data Structures and Algorithms/Problems/") || f.path === file.path) continue;
  const fm = app.metadataCache.getFileCache(f)?.frontmatter;
  if (fm?.next_review && (Number(fm.streak) || 0) < 3) {
    const day = String(fm.next_review);
    load[day] = (load[day] || 0) + 1;
  }
}

// Only long Clean intervals move; short reviews must happen on time.
function nextOpenDay(days) {
  const target = today.clone().add(days, "days");
  while ((load[target.format("YYYY-MM-DD")] || 0) >= DAILY_CAP || target.day() === 0) {
    target.add(1, "days");
  }
  return target;
}

let message = "";
await app.fileManager.processFrontMatter(file, (fm) => {
  fm.last_reviewed = today.format("YYYY-MM-DD");
  fm.times_reviewed = (Number(fm.times_reviewed) || 0) + 1;

  if (outcome === "clean") {
    fm.streak = Math.min((Number(fm.streak) || 0) + 1, 3);
    if (fm.streak === 3) {
      fm.next_review = null;
      message = "Retired after 3 clean solves in a row.";
      return;
    }
    const days = fm.streak === 1 ? 7 : 21;
    const date = nextOpenDay(days);
    fm.next_review = date.format("YYYY-MM-DD");
    const moved = date.diff(today, "days") - days;
    message = `Streak ${fm.streak}. Next review on ${fm.next_review}` +
      (moved > 0 ? ` (${moved} day${moved > 1 ? "s" : ""} later than ${days}, to keep days at ${DAILY_CAP} or fewer).` : ".");
  } else {
    fm.streak = 0;
    const days = outcome === "failed" ? 1 : 3;
    fm.next_review = today.clone().add(days, "days").format("YYYY-MM-DD");
    message = `Next review on ${fm.next_review}.`;
    if (outcome === "failed") message += " Rewrite the trigger and Key Insight now.";
  }
});
new Notice(message, 8000);
-%>
