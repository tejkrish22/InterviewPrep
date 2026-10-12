# 🚀 Obsidian Environment Setup & Git Sync Guide

> Instructions for cross-laptop synchronization, installed plugins, site engine preferences, and AI/Copilot environment initialization.

---

## 📁 1. Vault Directory Location

The **`docs/`** subfolder is configured as the official Obsidian Vault (`docs/.obsidian/`).

### 💡 Opening in Obsidian:

When launching Obsidian on any laptop:

1. Click **Open folder as vault**.
2. Select the **`InterviewPrep/docs/`** directory.
3. This keeps your Obsidian workspace clean and focused on your Markdown notes (`DSA/Patterns`, `DSA/Problems`, etc.) without clutter from `node_modules/`, `quartz/`, or build configuration files.

---

## 🔌 2. Installed Obsidian Community Plugins

The vault is configured with the following 8 core community plugins inside `docs/.obsidian/`:

| Plugin                           | Purpose & Functionality                                                          |
| :------------------------------- | :------------------------------------------------------------------------------- |
| **`dataview`**                   | Metadata querying, pattern auto-linking, and dynamic problem table generation.   |
| **`obsidian-excalidraw-plugin`** | Interactive architecture diagrams and whiteboard visual note-taking.             |
| **`obsidian-linter`**            | Automated formatting of Markdown headers, frontmatter YAML, and tag consistency. |
| **`obsidian-git`**               | Automatic scheduled Git commits, pushes, and backup synchronization.             |
| **`obsidian-tasks-plugin`**      | Task management, due-date tracking, and interactive checklist queries.           |
| **`notebook-navigator`**         | Enhanced file tree navigation and folder browsing sidebar.                       |
| **`multi-column-markdown`**      | Multi-column layout formatting for side-by-side note comparisons.                |
| **`obsidian-importer`**          | Utility for importing notes from Notion, HTML, and external Markdown tools.      |

---

## ⚡ 3. How Cross-Laptop Git Sync Works

Obsidian stores all installed community plugins, binaries, and configurations inside **`docs/.obsidian/`**:

- `docs/.obsidian/plugins/` $\rightarrow$ Contains compiled plugin binaries (`main.js`, `manifest.json`, `styles.css`).
- `docs/.obsidian/community-plugins.json` $\rightarrow$ Lists enabled plugins.

### 💡 The Golden Rule:

By committing `docs/.obsidian/plugins/` and `docs/.obsidian/community-plugins.json` to Git (configured in `.gitignore`), **you never need to manually install or configure plugins when switching laptops**.

When running `git clone` or `git pull` on any device:

1. Open Obsidian $\rightarrow$ "Open folder as vault" $\rightarrow$ select the `InterviewPrep/docs` folder.
2. **All 8 plugins and configurations load automatically out-of-the-box!**

---

## 🛠️ 4. Site Generator & CI/CD Preferences

- **Site Engine**: Quartz v5 (`npx quartz build -d docs`).
- **Content Source**: `docs/` folder (Root page: `docs/index.md`).
- **Site Configuration**: `quartz.config.yaml` (title, base URL, plugins). Don't edit `quartz.config.default.yaml`; it stays identical to upstream.
- **Dataview Plugin**: the local Quartz plugin in `plugins/dataview/` renders ` ```dataview ` `LIST` blocks at build time. It supports `FROM "folder"`, `WHERE` conditions using `=` / `!=` joined by `AND` (values can be `[[Link]]` or `"text"`), and `SORT field ASC|DESC`. `this.file.link` is not supported, so write the note's own link (`WHERE pattern = [[Arrays]]`). Sort by `file.name`, not `file.ctime`: file creation times are not preserved by a CI checkout. `npm run lint:notes` reports any query the website can't render.
- **Automated 404 Link Audit**: `npm run test:links` (runs `node scripts/check-links.mjs` scanning 6000+ internal hyperlinks).
- **GitHub Actions Pipeline**: `.github/workflows/deploy.yaml` lints the notes, builds Quartz, audits 404 links, and deploys to GitHub Pages on `git push origin main`.

### Keeping Quartz upgradable

The `quartz/` framework code is vendored unmodified from upstream [jackyzha0/quartz](https://github.com/jackyzha0/quartz) at the commit recorded in `.quartz-upstream`. All customizations live outside it:

| What                                  | Where                                                                             |
| :------------------------------------ | :-------------------------------------------------------------------------------- |
| Site settings and plugin list         | `quartz.config.yaml`                                                              |
| Custom build-time behaviour           | `plugins/<name>/` (local Quartz plugins, enabled with `source: ./plugins/<name>`) |
| Custom CSS                            | `quartz/styles/custom.scss` (the only framework file you may edit)                |
| Extra npm scripts and devDependencies | `package.json`                                                                    |

To upgrade, commit your work and run `npm run upgrade:quartz` (optionally `npm run upgrade:quartz -- <ref>`). It replaces the framework files with the new upstream version, keeps `custom.scss`, merges `package.json` key by key, and installs dependencies. Then run `npm run check && npm test && npm run lint && npm run test:links` and commit. Don't use `npx quartz upgrade`: it merges the whole upstream repo, including Quartz's own `docs/` folder, which would conflict with this vault. The upgrade script refuses to run if anything under `quartz/` (other than `custom.scss`) has been edited.

---

## ✍️ 5. Note Conventions & Linting

Run these before pushing (CI runs `npm run lint` and fails the deploy on errors):

| Command               | What it does                                                                                           |
| :-------------------- | :----------------------------------------------------------------------------------------------------- |
| `npm run lint`        | Runs both checks below.                                                                                |
| `npm run lint:md`     | Markdown style via `markdownlint-cli2`. Rules live in `.markdownlint-cli2.jsonc`.                      |
| `npm run lint:md:fix` | Auto-fixes most style issues (blank lines, bullets, trailing spaces).                                  |
| `npm run lint:notes`  | `scripts/validate-notes.mjs`: file names, frontmatter schema, empty notes, and broken `[[wikilinks]]`. |

The **Obsidian Linter** plugin is configured to apply the same formatting on save, so most issues are fixed while you write.

### Pre-commit hook

`npm install` installs a Git pre-commit hook (husky + lint-staged, configured in `.lintstagedrc.mjs`). On every commit it:

- auto-fixes staged notes with markdownlint and re-stages them;
- runs `npm run lint:notes` on the whole vault when any note is staged;
- formats staged code and config files with Prettier;
- runs the `plugins/` tests when a plugin file is staged.

If something can't be fixed automatically, the commit is stopped and your files are left as they were. Fix the reported issue and commit again, or bypass the hook once with `git commit --no-verify`. If Node.js isn't on `PATH` (for example in some GUI Git clients), the hook prints a warning and lets the commit through; CI still checks on push. To give GUI clients your Node, add it to `PATH` in `~/.config/husky/init.sh`.

### Conventions

- **Formatting**: `#` headings with a blank line before and after; `-` bullets; `---` horizontal rules; fenced code blocks with a language (use `text` for diagrams); `*italic*` / `**bold**`. Tabs for nested lists are fine.
- **Titles**: Quartz shows the file name as the page title, so never use an H1 (`#`): start at `##`. `npm run lint:notes` flags any H1, and the Obsidian Linter's _Heading Increment_ rule (with _Start Headings at H2_) renumbers headings on save. To keep a longer name searchable, such as "Priority Queue" for `Heap.md`, add it to `aliases` in the frontmatter.
- **File names**: no `? , : # ^ [ ] | \ * " < >`. Use a numeric prefix for ordered series (`3_UDP.md`) and `Week N Day N - Topic.md` in Learn LLM.
- **Frontmatter**: optional for concept notes; only `title`, `aliases`, `tags`, `description` and `draft` are allowed.
- **DSA problems** (`Data Structures and Algorithms/Problems/`): create them from `Templates/DSA Template.md`. They require `pattern` (a `[[link]]` to a note in `Patterns/`), `SubPattern` (empty or a `[[link]]` to a note in `Subpatterns/`), `confidence` (1–5), `unique` (true/false) and `link` (problem URL), plus the sections `## Question`, `## Code`, `## Complexity` and `## Look out`, in that order.
- **Sub-patterns** (`Data Structures and Algorithms/Subpatterns/`): require a `parent` `[[link]]` to their pattern.
- **Placeholders**: a note that isn't written yet should contain a `> [!todo] Coming soon` callout rather than being empty.

---

## 🤖 6. Instructions for Copilot / AI Assistants

If setting up a fresh environment with an AI assistant or terminal agent, prompt it with:

> _"Please check `docs/.obsidian/plugins/dataview`. If missing, fetch `main.js`, `manifest.json`, and `styles.css` from `blacksmithgu/obsidian-dataview` on GitHub and verify `npm run test:links`."_

### Shell Command for Manual Plugin Recovery:

```bash
# Fetch Dataview binaries into docs/.obsidian if missing
mkdir -p docs/.obsidian/plugins/dataview
curl -sL "https://github.com/blacksmithgu/obsidian-dataview/releases/latest/download/main.js" -o docs/.obsidian/plugins/dataview/main.js
curl -sL "https://github.com/blacksmithgu/obsidian-dataview/releases/latest/download/manifest.json" -o docs/.obsidian/plugins/dataview/manifest.json
curl -sL "https://github.com/blacksmithgu/obsidian-dataview/releases/latest/download/styles.css" -o docs/.obsidian/plugins/dataview/styles.css

# Test Quartz build and link integrity
npm run test:links
```
