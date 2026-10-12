// Local Quartz transformer plugin, enabled in quartz.config.yaml with `source: ./plugins/dataview`.
// Plain JavaScript so Quartz can load it without a build step; `yaml` comes from Quartz's own dependencies.
import fs from "node:fs"
import path from "node:path"
import YAML from "yaml"

/**
 * Renders a small subset of Obsidian Dataview `LIST` queries at build time:
 *
 *   LIST FROM "folder"
 *   WHERE field = [[Link]] AND field != "text"
 *   SORT field ASC|DESC
 *
 * Only `=` / `!=` joined by AND are supported. Links are compared by note name,
 * ignoring folder path, alias and heading, which matches how they resolve in Obsidian.
 * Quartz doesn't tell text transformers which note they are rendering, so
 * `this.file.link` can't be supported; write the note's link instead, e.g. `[[Binary Search]]`.
 */

/** @typedef {string | number | boolean | null} Value */
/** @typedef {{ name: string, relPath: string, fields: Record<string, unknown> }} Note */

function listNotes(dir, root) {
  if (!fs.existsSync(dir)) return []
  /** @type {Note[]} */
  const notes = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (!entry.name.startsWith(".")) notes.push(...listNotes(full, root))
    } else if (entry.name.endsWith(".md")) {
      notes.push({
        name: entry.name.replace(/\.md$/, ""),
        relPath: path.relative(root, full).split(path.sep).join("/").replace(/\.md$/, ""),
        fields: parseFrontmatter(fs.readFileSync(full, "utf-8")),
      })
    }
  }
  return notes
}

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return {}
  try {
    const data = YAML.parse(match[1])
    return data && typeof data === "object" ? data : {}
  } catch {
    return {}
  }
}

/**
 * `[[Folder/Note|Alias]]` -> `note`; plain strings are lower-cased.
 * @returns {Value}
 */
function normalize(value) {
  if (value === undefined || value === null || value === "") return null
  if (typeof value === "number" || typeof value === "boolean") return value
  const str = String(value).trim()
  const link = str.match(/^\[\[([^\]|#]+)(?:[#|][^\]]*)?\]\]$/)
  const target = link ? link[1].split("/").pop().trim() : str
  return target.toLowerCase()
}

/** @returns {Value} */
function parseValue(raw) {
  const text = raw.trim()
  if (/^".*"$/.test(text)) return normalize(text.slice(1, -1))
  if (/^\[\[.*\]\]$/.test(text)) return normalize(text)
  if (text === "null") return null
  if (text === "true" || text === "false") return text === "true"
  if (!Number.isNaN(Number(text))) return Number(text)
  return normalize(text)
}

function getField(note, field) {
  if (field === "file.name") return note.name
  return note.fields[field]
}

const unsupported = (clause) =>
  `> [!warning] Unsupported Dataview clause on the website: \`${clause}\``

function renderQuery(block, contentDir) {
  const query = block.replace(/^```dataview\s*/, "").replace(/```$/, "")

  const from = query.match(/FROM\s+"([^"]+)"/i)
  const where = query.match(/WHERE\s+([\s\S]+?)(?=\n\s*SORT\b|\n\s*LIMIT\b|$)/i)
  const sort = query.match(/SORT\s+([\w.]+)(?:\s+(ASC|DESC))?/i)

  // Conditions are consumed left to right so that "and" inside [[Links]] or "strings" is not a separator.
  const conditions = []
  let rest = where ? where[1].trim() : ""
  while (rest !== "") {
    const m = rest.match(/^([\w.]+)\s*(!=|=)\s*("[^"]*"|\[\[[^\]]*\]\]|[\w.-]+)\s*/)
    if (!m || m[3] === "this.file.link") return unsupported(rest)
    conditions.push({ field: m[1], op: m[2], value: parseValue(m[3]) })
    rest = rest.slice(m[0].length)
    const and = rest.match(/^AND\s+/i)
    if (rest !== "" && !and) return unsupported(rest)
    rest = and ? rest.slice(and[0].length) : rest
  }

  const sourceDir = from ? path.join(contentDir, from[1]) : contentDir
  const notes = listNotes(sourceDir, contentDir).filter((note) =>
    conditions.every(({ field, op, value }) => {
      const equal = normalize(getField(note, field)) === value
      return op === "=" ? equal : !equal
    }),
  )

  const sortField = sort ? sort[1] : "file.name"
  const direction = sort && sort[2]?.toUpperCase() === "DESC" ? -1 : 1
  notes.sort((a, b) => {
    const av = String(getField(a, sortField) ?? "")
    const bv = String(getField(b, sortField) ?? "")
    return (
      direction *
      (av.localeCompare(bv, undefined, { numeric: true }) || a.name.localeCompare(b.name))
    )
  })

  return notes.length > 0
    ? notes.map((note) => `- 🔍 [[${note.relPath}|${note.name}]]`).join("\n")
    : "*No problems logged yet.*"
}

export default function Dataview() {
  return {
    name: "Dataview",
    textTransform(ctx, src) {
      if (!src.includes("```dataview")) return src
      return src.replace(/```dataview[\s\S]*?```/g, (block) =>
        renderQuery(block, ctx.argv.directory),
      )
    },
  }
}
