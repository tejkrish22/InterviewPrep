// Pre-commit checks, run by .husky/pre-commit on staged files only.
// Markdown and code are auto-fixed and re-staged; anything that can't be fixed blocks the commit.
export default {
  // Lints and fixes just the staged notes (see scripts/fix-markdown.mjs).
  "docs/**/*.md": "node scripts/fix-markdown.mjs",

  // Validate the whole vault once (links/frontmatter can break in notes that weren't touched).
  "docs/**": () => "node scripts/validate-notes.mjs",

  // Code and config formatting; .prettierignore keeps Prettier out of docs/.
  "*.{js,mjs,cjs,ts,tsx,json,jsonc,yaml,yml,scss,css}": "prettier --write --ignore-unknown",

  "plugins/**/*.{js,mjs}": () => "node --test plugins/**/*.test.mjs",
}
