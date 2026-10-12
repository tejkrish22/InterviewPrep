#!/usr/bin/env bash
# Upgrades the vendored Quartz framework to a newer upstream commit.
#
# The framework files (quartz/, quartz.ts, ...) are kept identical to the upstream commit
# recorded in .quartz-upstream, so they can simply be replaced. Your customizations live
# elsewhere: quartz.config.yaml, plugins/, quartz/styles/custom.scss (preserved) and the
# extra scripts/devDependencies in package.json (3-way merged by scripts/merge-package-json.mjs).
#
# Usage: npm run upgrade:quartz [-- <upstream ref>]   (default ref: v5)
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

REPO="https://github.com/jackyzha0/quartz.git"
REF="${1:-v5}"
PIN_FILE=".quartz-upstream"
FRAMEWORK=(quartz quartz.ts globals.d.ts index.d.ts tsconfig.json quartz.config.default.yaml .prettierrc)
PRESERVE="quartz/styles/custom.scss"

if [ -n "$(git status --porcelain)" ]; then
  echo "✗ Commit or stash your changes before upgrading Quartz." >&2
  exit 1
fi

OLD="$(head -n1 "$PIN_FILE")"
git remote get-url upstream >/dev/null 2>&1 || git remote add upstream "$REPO"
echo "→ Fetching upstream Quartz ($REF)..."
git fetch --quiet upstream "$REF"
NEW="$(git rev-parse FETCH_HEAD)"
git cat-file -e "$OLD^{commit}" 2>/dev/null || git fetch --quiet upstream "$OLD"

if [ "$NEW" = "$OLD" ]; then
  echo "✓ Already on upstream ${NEW:0:7}."
  exit 0
fi

# Refuse to overwrite local edits to framework files; they would be lost.
if ! git diff --quiet "$OLD" HEAD -- "${FRAMEWORK[@]}" ":!$PRESERVE"; then
  echo "✗ These Quartz files differ from upstream ${OLD:0:7}:" >&2
  git --no-pager diff --stat "$OLD" HEAD -- "${FRAMEWORK[@]}" ":!$PRESERVE" >&2
  echo "  Move those changes into quartz.config.yaml, plugins/ or $PRESERVE first." >&2
  exit 1
fi

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
cp "$PRESERVE" "$TMP/custom.scss"

echo "→ Replacing framework files with upstream ${NEW:0:7}..."
for p in "${FRAMEWORK[@]}"; do
  git rm -r -q --ignore-unmatch -- "$p"
  if git cat-file -e "$NEW:$p" 2>/dev/null; then
    git checkout "$NEW" -- "$p"
  fi
done
cp "$TMP/custom.scss" "$PRESERVE"

echo "→ Merging package.json (your changes + upstream changes)..."
git show "$OLD:package.json" >"$TMP/base.json"
git show "$NEW:package.json" >"$TMP/upstream.json"
node scripts/merge-package-json.mjs "$TMP/base.json" package.json "$TMP/upstream.json" >"$TMP/merged.json"
mv "$TMP/merged.json" package.json

echo "→ Installing dependencies (starting from upstream's lockfile)..."
git checkout "$NEW" -- package-lock.json
npm install --legacy-peer-deps --no-audit --no-fund

echo "$NEW" >"$PIN_FILE"
# Leave everything unstaged so the upgrade can be reviewed as one diff.
git reset -q
echo "✓ Quartz upgraded ${OLD:0:7} → ${NEW:0:7}. Now run:"
echo "    npm run check && npm test && npm run lint && npm run test:links"
echo "  then review 'git status' and commit."
