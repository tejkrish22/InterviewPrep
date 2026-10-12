// Validates the structure of the Obsidian vault in docs/:
// - file and folder names are URL/Windows safe
// - frontmatter is valid YAML and follows the schema for each note type
// - notes are not empty
// - every [[wikilink]] and ![[embed]] resolves to a file in the vault
// - every ```dataview block can be rendered by the website (plugins/dataview)
//
// Usage: node scripts/validate-notes.mjs
import fs from "fs"
import path from "path"
import YAML from "yaml"
import Dataview from "../plugins/dataview/index.js"

const VAULT = path.resolve("docs")
const SKIP_DIRS = new Set([".obsidian", "Templates"])
const PROBLEMS_DIR = "Data Structures and Algorithms/Problems"
const PATTERNS_DIR = "Data Structures and Algorithms/Patterns"
const SUBPATTERNS_DIR = "Data Structures and Algorithms/Subpatterns"
const UNSAFE_NAME = /[?,:#^[\]|\\*"<>]/
const GENERAL_KEYS = ["title", "aliases", "tags", "description", "draft"]
const PROBLEM_SECTIONS = ["Question", "Code", "Complexity", "Look out"]

const errors = []
const report = (file, message) => errors.push(`${file}: ${message}`)

function walk(dir) {
  const out = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue
    const full = path.join(dir, entry.name)
    const rel = path.relative(VAULT, full).split(path.sep).join("/")
    if (UNSAFE_NAME.test(entry.name)) {
      report(rel, `name contains an unsafe character (avoid ? , : # ^ [ ] | \\ * " < >)`)
    }
    if (entry.isDirectory()) out.push(...walk(full))
    else out.push(rel)
  }
  return out
}

const files = walk(VAULT)
const notes = files.filter((f) => f.endsWith(".md"))

// Obsidian resolves links by vault-relative path or by unique file name.
const byPath = new Set(files.map((f) => f.toLowerCase()))
const byName = new Set(files.map((f) => path.posix.basename(f).toLowerCase()))

function linkTarget(link) {
  return link.split("|")[0].split("#")[0].trim()
}

function resolves(target, fromFile) {
  if (target === "") return true // same-note heading link: [[#Heading]]
  const candidates = path.posix.extname(target) ? [target] : [target, `${target}.md`]
  const dir = path.posix.dirname(fromFile)
  return candidates.some((c) => {
    const lower = c.toLowerCase()
    return (
      byPath.has(lower) ||
      byPath.has(path.posix.join(dir, c).toLowerCase()) ||
      byName.has(path.posix.basename(lower))
    )
  })
}

/** Returns the target of a `"[[Link]]"` frontmatter value, or null if it isn't one. */
function frontmatterLink(value) {
  const match = typeof value === "string" ? value.trim().match(/^\[\[([^\]]+)\]\]$/) : null
  return match ? linkTarget(match[1]) : null
}

function checkLinkField(file, fm, key, folder, { required }) {
  const value = fm[key]
  if (value === undefined || value === null || value === "") {
    if (required) report(file, `frontmatter \`${key}\` is required`)
    return
  }
  const target = frontmatterLink(value)
  if (!target) {
    report(file, `frontmatter \`${key}\` must be a quoted wikilink, e.g. "[[Name]]"`)
    return
  }
  const name = path.posix.basename(target).toLowerCase()
  const ok = notes.some(
    (n) => n.startsWith(`${folder}/`) && path.posix.basename(n, ".md").toLowerCase() === name,
  )
  if (!ok)
    report(file, `frontmatter \`${key}\` links to "${target}", which is not a note in ${folder}/`)
}

function checkAllowedKeys(file, fm, allowed) {
  for (const key of Object.keys(fm)) {
    if (!allowed.includes(key)) {
      report(file, `unexpected frontmatter key \`${key}\` (allowed: ${allowed.join(", ")})`)
    }
  }
}

function checkGeneralTypes(file, fm) {
  for (const key of ["title", "description"]) {
    if (key in fm && typeof fm[key] !== "string")
      report(file, `frontmatter \`${key}\` must be a string`)
  }
  for (const key of ["tags", "aliases"]) {
    const value = fm[key]
    if (value === undefined || value === null) continue
    const list = Array.isArray(value) ? value : [value]
    if (!list.every((v) => typeof v === "string")) {
      report(file, `frontmatter \`${key}\` must be a string or a list of strings`)
    }
  }
  if ("draft" in fm && typeof fm.draft !== "boolean")
    report(file, "frontmatter `draft` must be true or false")
}

function checkProblem(file, fm, body) {
  checkAllowedKeys(file, fm, [
    "pattern",
    "SubPattern",
    "confidence",
    "unique",
    "link",
    ...GENERAL_KEYS,
  ])
  for (const key of ["pattern", "SubPattern", "confidence", "unique", "link"]) {
    if (!(key in fm)) report(file, `frontmatter \`${key}\` is missing (use the DSA Template)`)
  }
  checkLinkField(file, fm, "pattern", PATTERNS_DIR, { required: true })
  checkLinkField(file, fm, "SubPattern", SUBPATTERNS_DIR, { required: false })
  if (
    "confidence" in fm &&
    !(Number.isInteger(fm.confidence) && fm.confidence >= 1 && fm.confidence <= 5)
  ) {
    report(file, "frontmatter `confidence` must be an integer from 1 to 5")
  }
  if ("unique" in fm && typeof fm.unique !== "boolean")
    report(file, "frontmatter `unique` must be true or false")
  if ("link" in fm && !/^https?:\/\/\S+$/.test(String(fm.link ?? ""))) {
    report(file, "frontmatter `link` must be an http(s) URL to the problem")
  }

  const headings = [...body.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim())
  const positions = PROBLEM_SECTIONS.map((section) => headings.indexOf(section))
  const missing = PROBLEM_SECTIONS.filter((_, i) => positions[i] === -1)
  if (missing.length > 0) {
    report(
      file,
      `missing section(s): ${missing.map((s) => `## ${s}`).join(", ")} (use the DSA Template)`,
    )
  } else if (positions.some((pos, i) => i > 0 && pos < positions[i - 1])) {
    report(
      file,
      `sections must appear in order: ${PROBLEM_SECTIONS.map((s) => `## ${s}`).join(", ")}`,
    )
  }
}

function checkSubpattern(file, fm) {
  checkAllowedKeys(file, fm, ["parent", ...GENERAL_KEYS])
  checkLinkField(file, fm, "parent", PATTERNS_DIR, { required: true })
}

for (const file of notes) {
  const content = fs.readFileSync(path.join(VAULT, file), "utf-8")
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)
  let fm = {}
  if (fmMatch) {
    try {
      fm = YAML.parse(fmMatch[1]) ?? {}
    } catch (e) {
      report(file, `invalid frontmatter YAML: ${e.message.split("\n")[0]}`)
    }
  }
  const body = fmMatch ? content.slice(fmMatch[0].length) : content

  if (file.startsWith(`${PROBLEMS_DIR}/`)) {
    checkProblem(file, fm, body)
  } else if (file.startsWith(`${SUBPATTERNS_DIR}/`)) {
    checkSubpattern(file, fm)
  } else {
    checkAllowedKeys(file, fm, GENERAL_KEYS)
  }
  checkGeneralTypes(file, fm)

  // Sub-pattern notes are hubs whose content is their backlinks.
  if (!file.startsWith(`${SUBPATTERNS_DIR}/`) && body.trim() === "") {
    report(file, 'note is empty (write it, or add a "> [!todo] Coming soon" callout)')
  }

  const prose = body.replace(/^(```|~~~)[\s\S]*?^\1/gm, "").replace(/`[^`\n]*`/g, "")
  const h1 = prose.match(/^# .*/m)
  if (h1) {
    report(
      file,
      `H1 heading "${h1[0]}" found; Quartz already shows the file name as the title, so start at ##`,
    )
  }
  if (body.includes("```dataview")) {
    const rendered = Dataview().textTransform({ argv: { directory: VAULT } }, body)
    for (const warning of rendered.matchAll(/Unsupported Dataview clause on the website: (.*)/g)) {
      report(file, `dataview query can't be rendered on the website: ${warning[1]}`)
    }
  }

  for (const match of prose.matchAll(/!?\[\[([^\]]+)\]\]/g)) {
    const target = linkTarget(match[1])
    if (!resolves(target, file)) report(file, `broken link ${match[0]}`)
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"))
  console.error(`\n❌ ${errors.length} problem(s) found in ${notes.length} notes.`)
  process.exit(1)
}
console.log(`✅ ${notes.length} notes are valid.`)
