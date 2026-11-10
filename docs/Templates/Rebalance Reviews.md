<%*
// Spreads reviews that are due on or before a start date over the following days.
const today = moment().startOf("day");
const tomorrow = today.clone().add(1, "days").format("YYYY-MM-DD");

const startDateStr = await tp.system.prompt("Spread due reviews starting from (YYYY-MM-DD):", tomorrow);
if (!startDateStr) return;

const start = moment(startDateStr.trim(), "YYYY-MM-DD", true);
if (!start.isValid()) {
  new Notice("Invalid date. Use YYYY-MM-DD.");
  return;
}
if (start.isBefore(today, "day")) {
  new Notice("The start date can't be in the past.");
  return;
}

const DAILY_CAP = await tp.system.suggester(
  ["3 reviews/day (recommended: leaves time for new problems)", "4 reviews/day", "5 reviews/day (framework maximum)"],
  [3, 4, 5],
  false,
  "Daily review cap"
);
if (DAILY_CAP === null || DAILY_CAP === undefined) return;

const skipSunday = await tp.system.suggester(
  ["Yes: keep Sundays free", "No: use Sundays too"],
  [true, false],
  false,
  "Skip Sundays?"
);
if (skipSunday === null || skipSunday === undefined) return;

const key = (m) => m.format("YYYY-MM-DD");
const toMove = [];
const load = {}; // reviews already booked after the start date, which stay where they are

for (const f of app.vault.getMarkdownFiles()) {
  if (!f.path.startsWith("Data Structures and Algorithms/Problems/")) continue;
  const fm = app.metadataCache.getFileCache(f)?.frontmatter;
  if (!fm) continue;
  const streak = Number(fm.streak) || 0;
  if (streak >= 3) continue;

  const due = fm.next_review ? moment(String(fm.next_review), "YYYY-MM-DD", true) : null;
  if (!due || !due.isValid() || due.isSameOrBefore(start, "day")) {
    toMove.push({ file: f, streak, due: due && due.isValid() ? key(due) : "" });
  } else {
    load[key(due)] = (load[key(due)] || 0) + 1;
  }
}

if (toMove.length === 0) {
  new Notice(`Nothing is due on or before ${key(start)}.`);
  return;
}

// Weakest first, then the longest overdue.
toMove.sort((a, b) => a.streak - b.streak || a.due.localeCompare(b.due));

const day = start.clone();
for (const item of toMove) {
  while ((skipSunday && day.day() === 0) || (load[key(day)] || 0) >= DAILY_CAP) day.add(1, "days");
  const assigned = key(day);
  await app.fileManager.processFrontMatter(item.file, (fm) => {
    fm.next_review = assigned;
  });
  load[assigned] = (load[assigned] || 0) + 1;
}

new Notice(`Spread ${toMove.length} reviews from ${key(start)} to ${key(day)} (max ${DAILY_CAP} a day).`, 10000);
-%>
