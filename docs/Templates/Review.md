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

const today = moment();
let message = "";
await app.fileManager.processFrontMatter(file, (fm) => {
  fm.last_reviewed = today.format("YYYY-MM-DD");
  if (outcome === "clean") {
    fm.streak = (Number(fm.streak) || 0) + 1;
    if (fm.streak >= 3) {
      fm.next_review = null;
      message = "Retired after 3 clean solves.";
      return;
    }
    const days = fm.streak === 1 ? 7 : 21;
    fm.next_review = today.clone().add(days, "days").format("YYYY-MM-DD");
    message = `Streak ${fm.streak}. Next review in ${days} days.`;
  } else {
    fm.streak = 0;
    const days = outcome === "failed" ? 1 : 3;
    fm.next_review = today.clone().add(days, "days").format("YYYY-MM-DD");
    message = `Next review in ${days} day${days > 1 ? "s" : ""}.`;
    if (outcome === "failed") message += " Rewrite the trigger and Key Insight now.";
  }
});
new Notice(message, 8000);
-%>
