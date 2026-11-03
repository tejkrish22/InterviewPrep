## How to Use the DSA System

A practical guide to the daily DSA routine in Obsidian. For the reasoning behind the rules, see [[DSA Framework]].

---

### The Pieces

| Piece | Where | What it does |
| --- | --- | --- |
| **DSA Dashboard** (Obsidian only) | Opens when Obsidian starts | Shows what is due today, progress, weak sub-patterns and notes missing a trigger |
| `Problems.base` | `Data Structures and Algorithms/` | Tables: **Due Today**, **Next 7 Days**, **All Problems** |
| Problem notes | `Data Structures and Algorithms/Problems/` | One note per problem, with the revision schedule in its properties |
| Review command | `Ctrl+P` → "Templater: Insert Templates/Review.md" | Logs a review and schedules the next one |
| DSA Template | `Templates/DSA Template.md` | Applied automatically to new notes in the Problems folder |

Each problem note tracks four properties:

| Property | Meaning |
| --- | --- |
| `streak` | Clean re-solves in a row. 3 means retired |
| `last_reviewed` | Date of the last attempt |
| `next_review` | Date it is due again. Empty means retired |
| `trigger` | One line: "When I see X, I try Y" |

You never need to edit these by hand. The template and the Review command set them.

---

### Every Day

#### 1. Revise (first, always)

1. Open Obsidian. The dashboard opens with **Due Today** at the top.
2. Start with the oldest due problem. Do at most **5** a day. The rest roll over.
3. For each one:
	1. Click the problem name to see the link, then open it on TUF. **Don't read the note.**
	2. Solve it from a blank editor within **15 minutes**.
	3. If stuck, read only the `trigger` line in the note and try again.
	4. Back in the note (editing view), press `Ctrl+P` and run **Templater: Insert Templates/Review.md**.
	5. Pick the outcome:

| Pick | When | What happens |
| --- | --- | --- |
| Clean | Optimal solution in 15 min, no help | Streak +1. Back in 7 days, then 21 days, then retired |
| Struggled | Needed the trigger, a hint, took longer, or had bugs | Streak 0. Back in 3 days |
| Failed | Needed the solution | Streak 0. Back tomorrow. **Rewrite the trigger and Key Insight now** |

4. If the `trigger` is empty, write it now. The Missing Trigger list on the dashboard shows which ones still need one.

#### 2. Learn New

Take the next **3** problems from the sheet, or **2** if more than 5 reviews were due.

1. Read the problem and work through one example by hand.
2. Write which pattern you think it is and why, before coding.
3. Write the brute-force idea and its complexity.
4. Try for the optimal solution for **20 minutes**.
5. Stuck: read a hint only, try **10 more minutes**.
6. Still stuck: read the solution, close it, and type it from memory.
7. Submit on TUF.
8. Create the note in `Data Structures and Algorithms/Problems/`, named after the problem. The template fills in itself, with today's date and a review tomorrow.
9. Fill in:
	- `pattern`, `SubPattern` and `link`
	- `trigger` (required)
	- **Key Insight**: the idea that made it click, or what you missed (required)
	- Code: Brute Force and Optimal 1, each with its TC and SC. Add Optimal 2 if there is another approach
	- Look out

#### 3. Close

- Finished a sub-pattern today? Add one line to its Recognition Cues note.
- obsidian-git commits for you.

#### Bad Day

Do only 2 reviews and skip new problems. Never skip reviews to do new ones.

---

### Every Sunday

No new sheet problems.

1. Clear any reviews left over from the week.
2. **Blind practice:** 2 unseen LeetCode problems from patterns you have finished, without looking at tags. Name the pattern before coding and explain your approach aloud. 30 minutes each.
3. **Pattern review:** check **Weak Spots** on the dashboard. For the worst sub-patterns, read the `trigger` lines of their problems and update the pattern note's Recognition Cues and Common Pitfalls.

---

### Problems You Solved Before

Many sheet problems are in your earlier practice. Treat them as a review:
- Solve cold within 15 minutes, no note open.
- Clean: write a short note (`trigger`, Key Insight, code). Then run the Review command and pick **Clean**, which sets streak 1 and a review in 7 days.
- Otherwise: write a full note as a new problem.

---

### Troubleshooting

| Problem | Fix |
| --- | --- |
| Review command does nothing | Open the note in editing view, not reading view. The note must be in the Problems folder |
| New note shows `<% ... %>` text | It was created outside the Problems folder or inserted with the wrong command. Delete it and create it inside `Problems/` |
| Logged the wrong outcome | Edit `streak` and `next_review` in the note's Properties panel |
| Dashboard Progress row shows raw HTML | Delete the `<progress>` line in the Progress query |
| Too many reviews piling up | Keep the cap of 5, do 2 new problems instead of 3, and clear the rest on Sunday |
| Want to see the whole schedule | Open `Problems.base` and select **All Problems** |
