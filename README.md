# Software Engineering Interview Prep

Personal study notes for software engineering interviews, written in [Obsidian](https://obsidian.md) and published with [Quartz](https://quartz.jzhao.xyz).

**Read them online: <https://tejkrish22.github.io/InterviewPrep/>**

## What's inside

- **Data Structures & Algorithms**: 17 pattern cheat sheets and solved problems with C++ code, complexity, and pitfalls.
- **Core CS**: Computer Networks, Operating Systems, OOP, C++, Cloud Computing, and System Design.
- **Learn LLM**: a course log on LLMs, Hugging Face, transformers, and agentic AI.

## Getting started

1. Install Node.js 22 and run `npm install` (this also installs the pre-commit hook).
2. Open the `docs/` folder as a vault in Obsidian. Plugins and settings are already included.
3. Preview the site locally with `npm run docs`.

| Command                  | What it does                                           |
| :----------------------- | :----------------------------------------------------- |
| `npm run docs`           | Build and serve the site locally                       |
| `npm run lint`           | Check note formatting, frontmatter, and links          |
| `npm run lint:md:fix`    | Auto-fix note formatting                               |
| `npm run test:links`     | Build the site and check for broken links              |
| `npm run upgrade:quartz` | Upgrade Quartz to the latest upstream version          |

Pushing to `main` lints the notes, builds the site, checks links, and deploys it to GitHub Pages.

## Repository layout

| Path                         | Contents                                                       |
| :--------------------------- | :------------------------------------------------------------- |
| `docs/`                      | The notes (Obsidian vault)                                     |
| `quartz.config.yaml`         | Site settings and plugin list                                  |
| `plugins/`                   | Local Quartz plugins (build-time Dataview rendering)           |
| `scripts/`                   | Note validation, link checking, and the Quartz upgrade script  |
| `quartz/`                    | Quartz itself, kept unmodified from upstream                   |

See [setup_vault_instructions.md](setup_vault_instructions.md) for note conventions, the linting setup, and how Quartz upgrades work.
