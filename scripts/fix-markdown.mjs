// Runs `markdownlint-cli2 --fix` repeatedly until no more issues are fixed (max 3 passes).
// A single pass can leave issues behind when fixes interact (e.g. a heading directly followed
// by a list needs both MD022 and MD032 to insert blank lines).
//
// Usage: node scripts/fix-markdown.mjs [files...]
//   With no files, lints everything matched by "globs" in .markdownlint-cli2.jsonc.
import { spawnSync } from "node:child_process"
import { fileURLToPath } from "node:url"

const files = process.argv.slice(2)
const args = files.length > 0 ? ["--fix", "--no-globs", ...files] : ["--fix"]
const bin = fileURLToPath(
  new URL("../node_modules/markdownlint-cli2/markdownlint-cli2-bin.mjs", import.meta.url),
)

let result
for (let pass = 1; pass <= 3; pass++) {
  result = spawnSync(process.execPath, [bin, ...args], { encoding: "utf-8" })
  if (result.error) {
    console.error(result.error.message)
    process.exit(1)
  }
  if (result.status === 0) break
}

process.stdout.write(result.stdout)
process.stderr.write(result.stderr)
process.exit(result.status ?? 1)
