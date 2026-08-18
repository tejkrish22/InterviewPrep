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

| Plugin | Purpose & Functionality |
| :--- | :--- |
| **`dataview`** | Metadata querying, pattern auto-linking, and dynamic problem table generation. |
| **`obsidian-excalidraw-plugin`** | Interactive architecture diagrams and whiteboard visual note-taking. |
| **`obsidian-linter`** | Automated formatting of Markdown headers, frontmatter YAML, and tag consistency. |
| **`obsidian-git`** | Automatic scheduled Git commits, pushes, and backup synchronization. |
| **`obsidian-tasks-plugin`** | Task management, due-date tracking, and interactive checklist queries. |
| **`notebook-navigator`** | Enhanced file tree navigation and folder browsing sidebar. |
| **`multi-column-markdown`** | Multi-column layout formatting for side-by-side note comparisons. |
| **`obsidian-importer`** | Utility for importing notes from Notion, HTML, and external Markdown tools. |

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
- **Quartz Dataview Transformer**: `quartz/plugins/transformers/dataview.ts` evaluates ` ```dataview ` blocks at build time and emits live links.
- **Automated 404 Link Audit**: `npm run test:links` (runs `node scripts/check-links.mjs` scanning 3000+ internal hyperlinks).
- **GitHub Actions Pipeline**: `.github/workflows/deploy.yaml` automatically builds Quartz, audits 404 links, and deploys to GitHub Pages on `git push origin main`.

---

## 🤖 5. Instructions for Copilot / AI Assistants

If setting up a fresh environment with an AI assistant or terminal agent, prompt it with:

> *"Please check `docs/.obsidian/plugins/dataview`. If missing, fetch `main.js`, `manifest.json`, and `styles.css` from `blacksmithgu/obsidian-dataview` on GitHub and verify `npm run test:links`."*

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
