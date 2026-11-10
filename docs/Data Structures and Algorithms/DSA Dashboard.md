## DSA Dashboard

Revise what is due, then the new problems shown below. Sunday: leftovers, 2 blind problems, pattern review. Rules: [[DSA Framework]]. Guide: [[How to Use the DSA System]].

---

## Today's Plan

```dataview
TABLE WITHOUT ID
  length(filter(rows, (r) => r.next_review AND r.next_review <= date(today) AND r.streak < 3)) AS "Reviews left",
  length(filter(rows, (r) => r.last_reviewed = date(today) AND r.times_reviewed > 0)) AS "Reviewed today",
  choice(date(today).weekday = 7, "0 (Sunday)",
    choice(length(filter(rows, (r) => (r.next_review AND r.next_review <= date(today) AND r.streak < 3) OR (r.last_reviewed = date(today) AND r.times_reviewed > 0))) <= 5, "3",
      choice(length(filter(rows, (r) => (r.next_review AND r.next_review <= date(today) AND r.streak < 3) OR (r.last_reviewed = date(today) AND r.times_reviewed > 0))) <= 8, "2", "0 (reviews first)"))) AS "New problems today"
FROM "Data Structures and Algorithms/Problems"
GROUP BY true
```

New problems today: 3 if today's reviews are 5 or fewer, 2 if 6 to 8, none if more than 8. A new problem's own note doesn't count.

---

## Due Today

Re-solve cold, 15 minute cap, oldest first, at most 5 a day. Then open the note and run **Templater: Insert Templates/Review.md** to log the outcome.

| Outcome | `streak` | `next_review` |
| --- | --- | --- |
| Failed | 0 | Tomorrow |
| Struggled | 0 | In 3 days |
| Clean | +1 | 7 days (streak 1), 21 days (streak 2), retired (streak 3). Moved to the next day with room if that day already has 5, or is a Sunday |

![[Problems.base#Due Today]]

---

## Progress

```dataview
TABLE WITHOUT ID
  length(filter(rows, (r) => contains(r.file.tags, "#striver180"))) + " / 179" AS "Striver 180",
  "<progress value='" + length(filter(rows, (r) => contains(r.file.tags, "#striver180"))) + "' max='179'></progress>" AS "",
  length(rows) AS "All notes",
  length(filter(rows, (r) => r.streak >= 3)) AS "Retired",
  sum(rows.times_reviewed) AS "Total reviews",
  length(filter(rows, (r) => r.next_review AND r.next_review <= date(today))) AS "Due now",
  length(filter(rows, (r) => r.last_reviewed AND r.last_reviewed >= date(today) - dur(7 days))) AS "Reviewed or added (7d)"
FROM "Data Structures and Algorithms/Problems"
GROUP BY true
```

---

## Coming Up

![[Problems.base#Next 7 Days]]

---

## Weak Spots

Sub-patterns with the most shaky problems first. Use this to pick the Sunday pattern review.

```dataview
TABLE WITHOUT ID
  key AS "Sub-pattern",
  length(rows) AS "Problems",
  length(filter(rows, (r) => r.streak = 0)) AS "Shaky",
  length(filter(rows, (r) => r.streak >= 3)) AS "Retired"
FROM "Data Structures and Algorithms/Problems"
WHERE SubPattern
GROUP BY SubPattern
SORT length(filter(rows, (r) => r.streak = 0)) DESC
```

---

## Missing Trigger

Fill these in the next time each one comes up for review.

```dataview
LIST next_review
FROM "Data Structures and Algorithms/Problems"
WHERE !trigger
SORT next_review ASC
```
