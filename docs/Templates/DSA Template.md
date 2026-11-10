---
pattern:
SubPattern:
streak: 0
times_reviewed: 0
last_reviewed: <% tp.date.now("YYYY-MM-DD") %>
next_review: <%*
  const files = app.vault.getMarkdownFiles();
  const counts = {};
  for (const f of files) {
    if (!f.path.startsWith("Data Structures and Algorithms/Problems/")) continue;
    const cache = app.metadataCache.getFileCache(f);
    const nr = cache?.frontmatter?.next_review;
    const s = cache?.frontmatter?.streak;
    if (nr && (s === undefined || Number(s) < 3)) {
      counts[nr] = (counts[nr] || 0) + 1;
    }
  }
  let target = moment().add(1, "days");
  while ((counts[target.format("YYYY-MM-DD")] || 0) >= 5 || target.day() === 0) {
    target.add(1, "days");
  }
  tR += target.format("YYYY-MM-DD");
%>
trigger:
unique: false
link:
tags:
  - striver180
---
---

## Question

### Example

---

## Key Insight

1. The one idea that makes the optimal solution work.
2. What I did not see the first time.

---

## Code

### Brute Force

```cpp

```

- TC: O(...)
- SC: O(...)

### Optimal 1

```cpp

```

- TC: O(...)
- SC: O(...)

---

## Look out

1. ...

---

## Related Problems

1.
