# Session Changes: 2026-11-03

What changed in this session, and why.

---

## 1. Computer Networks: Application Layer Notes

Folder: `docs/Concepts/Computer Networks/Application Layer/`

- **2_HTTP Basics.md**
	- Fixed typos ("Headers contain", "Status Line tells").
	- Moved the Request Line and Status Line examples out of the numbered lists, so "three things" lists three items.
- **3_HTTP Methods and Status Codes.md**
	- Fixed typos ("Update", "Fetch", "The server").
	- Added a blank line after the methods table so the list after it renders.
	- Added a **Safe / Idempotent** column to the methods table.
	- Added a short **Safety and Idempotency** section.
	- Added common status codes: 103, 202, 204, 302, 304, 307, 308, 405, 409, 429, 501, 502, 503, 504. Replaced the WebDAV-only 102 with 103.

---

## 2. Problem Notes

- **Trapping Rainwater.md**: filled in Look out with the two-pointer intuition.
- **Count Inversions.md**: filled in Look out with the merge sort counting logic.
- **Contains Duplicate.md**: changed tag `"#nc150"` to `nc150` so it groups with the other NeetCode problems.

### Code Fixes

Found while restructuring the Code sections.

| Note | Fix |
| --- | --- |
| Floor and Ceil in Sorted Array | `#` comments changed to `//` (invalid C++) |
| Single element in sorted array | Check the first and last element before the loop and search `[1, n-2]`, so `arr[mid-1]` and `arr[mid+1]` stay in bounds. Added a Look out line |
| Search in Sorted Array 2 | Returns `bool` as the problem asks. Added `continue` after the duplicate trim. TC corrected to O(log n) average, O(n) worst case. Look out updated |
| Lower Bound | Method renamed from `upperBound` to `lowerBound` |
| Minimum days to make M bouquets | SC corrected from O(1) to O(n), since `func` copies `arr` on every call. Code kept, as the Look out deliberately passes by value |

Valid Anagram was left as is. Its strings are passed by value because of the platform signature, and the map is bounded by the alphabet, so O(1) space holds.

---

## 3. DSA Revision System

### New Files

| File | Purpose |
| --- | --- |
| `docs/Data Structures and Algorithms/DSA Framework.md` | The framework: research findings, revision rule, daily and weekly routine, plan |
| `docs/Data Structures and Algorithms/DSA Dashboard.md` | Obsidian dashboard: due today, progress, coming up, weak spots, missing triggers |
| `docs/Data Structures and Algorithms/How to Use the DSA System.md` | Step-by-step usage guide |
| `docs/Templates/Review.md` | Templater command that logs a review and sets the next review date |
| `docs/.obsidian/plugins/templater-obsidian/` | Templater plugin and its settings |
| `docs/.obsidian/plugins/homepage/` | Homepage plugin and its settings |

### Changed Files

| File | Change |
| --- | --- |
| `Problems.base` | Replaced the old views with **Due Today**, **Next 7 Days** and **All Problems** |
| `Templates/DSA Template.md` | `confidence` replaced by `streak`. Added `last_reviewed`, `next_review` (auto-filled with today and tomorrow), `trigger`, a Key Insight section, a Code section with Brute Force and Optimal 1 (each with TC and SC) replacing the separate Complexity section, and the `striver180` tag by default |
| All 30 problem notes | `confidence` replaced by `streak`, `last_reviewed`, `next_review`, `trigger`. Reviews spread from 2026-11-04 to 2026-11-16, weakest first, 2 a day (4 on Sundays). Old confidence 4 or 5 starts at streak 1 |
| All 30 problem notes (Code) | Code section restructured to Brute Force / Optimal 1 (/ Optimal 2), each with TC and SC. Separate Complexity section removed. Existing code kept verbatim apart from the Code Fixes below; brute force code written for the 28 notes that had none |
| `.obsidian/types.json` | Typed `streak` as number, `last_reviewed` and `next_review` as dates, `trigger` as text. Removed `confidence` |
| `Subpatterns/Two Pointers.md` | Fixed the Dataview query (`pattern` to `SubPattern`). Its problem list was always empty |
| `Patterns/Arrays.md` | Fixed the broken first heading |
| `index.md` | Updated the DSA links and the note format to the new fields |
| `quartz.config.yaml` | Excluded the dashboard from the website, since its queries only work in Obsidian |
| `.obsidian/community-plugins.json` | Enabled Templater and Homepage |
| `.obsidian/core-plugins.json` | Turned off the core Templates plugin, so it can't insert unprocessed Templater placeholders |

### Plugin Settings

- **Templater**
	- New notes in `Data Structures and Algorithms/Problems` get the DSA Template automatically.
	- `Templates/Review.md` is available as a command.
- **Homepage**: opens the DSA Dashboard on startup.

### Key Decisions

- **Outcome instead of rating.** A 1 to 5 confidence score was replaced by three outcomes (Clean, Struggled, Failed). They are easier to judge honestly.
- **Retiring problems.** A problem is retired after 3 clean solves in a row, so the daily review list stays small.
- **Review cap.** At most 5 reviews a day. New problems drop to 2 on heavy review days.
- **Timeline.** About 10 to 12 weeks for the 180 sheet instead of 8. Each new problem brings 3 reviews, so most days hit the review cap and drop to 2 new problems. Finishing in 8 weeks would mean cutting revision.
- **Research limits.** Reddit and TUF blocked page fetching, so the findings rely on blogs, guides and search snippets. Sources are listed in the framework.

### Code Review Fixes

A reviewer subagent checked the staged changes. Fixed:

| File | Fix |
| --- | --- |
| `scripts/validate-notes.mjs` | Updated to the new schema: `streak` (0 to 3), `last_reviewed` and `next_review` (empty or a date), `trigger` instead of `confidence`. `## Complexity` is no longer required. The dashboard's Dataview queries are skipped, since it is not published. Without this, the pre-commit hook and the deploy lint would reject every problem note |
| `How to Use the DSA System.md` | Removed the `[[DSA Dashboard]]` link, which would be a dead link on the website |
| `DSA Dashboard.md` | Removed a leading tab that turned the title into a code block. "Reviewed (7d)" renamed to "Reviewed or added (7d)", since new notes also count |
| `DSA Framework.md` | Template example uses a 4-backtick fence (markdownlint MD048). Timeline corrected to 10 to 12 weeks, review step to up to 75 minutes, done count to 11 |
| `Problems.base` | Due Today and Next 7 Days also filter `streak < 3`, so retired problems can't reappear if Bases compares an empty date as earlier than today |
| Git index | Unstaged the stale root copy of this log and staged `session_logs/` |

Not changed, with reasons:
- Brute force SC for Valid Anagram and Minimum days to make M bouquets: copying inputs because of the platform's function signature isn't counted as extra space.
- Trapping Rainwater's review on 2026-11-03 was a real run of the Review command, so its dates stay.
- The HTTP notes, Look out sections and tag fix (sections 1 and 2) were done in this session but committed before the staged change.

---

## 4. Verified

- The Review command updated Trapping Rainwater correctly: Struggled set `next_review` to 2026-11-06.
- No problem note, template or Base still uses `confidence`.
- `Problems.base`, `types.json` and `quartz.config.yaml` parse correctly.
- All 30 notes after the Code restructure, checked against the last commit: original code blocks unchanged, Question, Example and Look out unchanged, balanced code fences, TC and SC for every approach.
- The four code fixes compile with g++ (address and undefined-behaviour sanitizers) and pass test cases, including edge cases.

## 5. Not Verified

- The Quartz site build. Node isn't installed on this machine.
- The dashboard's Dataview queries display correctly.
- The 28 generated brute force solutions were not compiled or tested.

## 6. Follow-ups

- Commit this session's changes.
- `setup_vault_instructions.md` still lists 8 plugins. Add Templater and Homepage there.
- Fill in `trigger` on old notes as they come up for review.
- Read each generated brute force the first time its note comes up for review.
- Search in Sorted Array 2 uses `search` returning `bool`. Rename it if TUF's signature differs.
- Proposed, not built: the Review command asks for the trigger when it is empty or the outcome is Failed, and a "New Problem" command that picks pattern and sub-pattern from the existing notes.
