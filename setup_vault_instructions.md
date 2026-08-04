# 🚀 Obsidian Vault Setup & Git Sync Guide

> Instructions for Git cross-laptop synchronization and AI/Copilot vault environment initialization.

---

## ⚡ 1. How Cross-Laptop Git Sync Works (Automatic Plugins)

Obsidian stores all installed community plugins, themes, and configuration settings inside the **`.obsidian/`** folder:
- `.obsidian/plugins/dataview/` $\rightarrow$ Dataview plugin binary (`main.js`, `manifest.json`, `styles.css`).
- `.obsidian/community-plugins.json` $\rightarrow$ List of active enabled plugins.

### 💡 The Golden Rule:
By committing the `.obsidian/` directory (specifically `.obsidian/plugins/` and `.obsidian/community-plugins.json`) to your Git repository, **you never need to manually install or configure plugins on new laptops**. 

When you run `git clone` or `git pull` on any device:
1. Open Obsidian $\rightarrow$ "Open folder as vault" $\rightarrow$ select your `InterviewPrep` folder.
2. **All plugins (Dataview, Excalidraw, Linter, etc.) are pre-installed and enabled out-of-the-box!**

---

## 🤖 2. Instructions for Copilot / AI Assistant

If you are using Copilot, Gemini, or an AI Coding Assistant on a new machine, prompt it with the following directive:

> *"Please check the `.obsidian/plugins/dataview` directory. If missing, fetch `main.js`, `manifest.json`, and `styles.css` from the latest release of `blacksmithgu/obsidian-dataview` on GitHub and place them in `.obsidian/plugins/dataview/`."*

### 🛠️ Shell Command for AI Setup (Run in terminal):
```bash
# Create dataview plugin folder
mkdir -p .obsidian/plugins/dataview

# Download latest release binaries
curl -sL "https://github.com/blacksmithgu/obsidian-dataview/releases/latest/download/main.js" -o .obsidian/plugins/dataview/main.js
curl -sL "https://github.com/blacksmithgu/obsidian-dataview/releases/latest/download/manifest.json" -o .obsidian/plugins/dataview/manifest.json
curl -sL "https://github.com/blacksmithgu/obsidian-dataview/releases/latest/download/styles.css" -o .obsidian/plugins/dataview/styles.css
```

---

## 🔍 3. Verification Checklist

To confirm your vault is fully operational on a new laptop:
1. Open `DSA/README.md`.
2. Open `DSA/Patterns/BFS.md` — verify that `## Related Problems` shows Dataview results or backlinks.
3. Check `DSA/Problems.base` for live problem table rendering.
