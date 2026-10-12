// 3-way merge of package.json used by scripts/upgrade-quartz.sh.
//
// Starts from upstream's new package.json and re-applies every change you made relative to the
// old upstream version (added/changed/removed scripts, dependencies, ...). Works key by key, so
// it isn't confused by npm re-sorting dependencies. When you and upstream changed the same key
// differently, upstream wins and the key is reported so you can re-apply your change if needed.
//
// Usage: node scripts/merge-package-json.mjs <base.json> <ours.json> <upstream.json> > merged.json
import fs from "node:fs"

const [basePath, oursPath, upstreamPath] = process.argv.slice(2)
if (!upstreamPath) {
  console.error("Usage: merge-package-json.mjs <base.json> <ours.json> <upstream.json>")
  process.exit(2)
}

const read = (p) => JSON.parse(fs.readFileSync(p, "utf-8"))
const isObject = (v) => v !== null && typeof v === "object" && !Array.isArray(v)
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b)

const overridden = []

function merge(base, ours, upstream, keyPath = []) {
  const result = { ...upstream }
  const keys = new Set([...Object.keys(base ?? {}), ...Object.keys(ours ?? {})])
  for (const key of keys) {
    const b = base?.[key]
    const o = ours?.[key]
    const u = upstream?.[key]
    const here = [...keyPath, key].join(".")
    if (same(o, b)) continue // you didn't change it: keep upstream's value
    if (isObject(o) && isObject(u) && (isObject(b) || b === undefined)) {
      result[key] = merge(b ?? {}, o, u, [...keyPath, key])
    } else if (same(u, b) || same(u, o)) {
      if (o === undefined) delete result[key]
      else result[key] = o
    } else {
      overridden.push(`${here}: yours ${JSON.stringify(o)}, upstream ${JSON.stringify(u)}`)
    }
  }
  return result
}

const merged = merge(read(basePath), read(oursPath), read(upstreamPath))
process.stdout.write(JSON.stringify(merged, null, 2) + "\n")
if (overridden.length > 0) {
  console.error("⚠ Upstream's value was kept where both sides changed the same key:")
  for (const line of overridden) console.error(`  - ${line}`)
}
