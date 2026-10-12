import test, { describe, before, after } from "node:test"
import assert from "node:assert"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import Dataview from "./index.js"

const problems = {
  "Lower Bound": `pattern: "[[Patterns/Binary Search|Binary Search]]"\nSubPattern: "[[Upper and Lower Limits]]"`,
  "Koko Eating Bananas": `pattern: "[[Binary Search]]"\nSubPattern: "[[Binary Search On Answer]]"`,
  "Aggressive Cows": `pattern: "[[Binary Search]]"\nSubPattern: "[[Binary Search On Answer]]"`,
  "Plain Search": `pattern: "[[Binary Search]]"\nSubPattern:`,
  "Two Sum": `pattern: "[[Arrays]]"\nSubPattern:`,
}

let dir
const transform = (src) => Dataview().textTransform({ argv: { directory: dir } }, src)
const query = (body) => "```dataview\n" + body + "\n```"

describe("Dataview plugin", () => {
  before(() => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), "dataview-"))
    fs.mkdirSync(path.join(dir, "Problems"))
    for (const [name, fm] of Object.entries(problems)) {
      fs.writeFileSync(path.join(dir, "Problems", `${name}.md`), `---\n${fm}\n---\n\n## Question\n`)
    }
  })

  after(() => fs.rmSync(dir, { recursive: true, force: true }))

  test("leaves notes without dataview blocks untouched", () => {
    assert.strictEqual(transform("## Hello"), "## Hello")
  })

  test("filters by a link whose name contains 'and'", () => {
    const out = transform(
      query(
        `LIST FROM "Problems"\nWHERE SubPattern = [[Upper and Lower Limits]]\nSORT file.name ASC`,
      ),
    )
    assert.strictEqual(out, "- 🔍 [[Problems/Lower Bound|Lower Bound]]")
  })

  test("sorts by file name in both directions", () => {
    const asc = transform(
      query(
        `LIST FROM "Problems"\nWHERE SubPattern = [[Binary Search On Answer]]\nSORT file.name ASC`,
      ),
    )
    const desc = transform(
      query(
        `LIST FROM "Problems"\nWHERE SubPattern = [[Binary Search On Answer]]\nSORT file.name DESC`,
      ),
    )
    assert.match(asc, /Aggressive Cows[\s\S]*Koko Eating Bananas/)
    assert.match(desc, /Koko Eating Bananas[\s\S]*Aggressive Cows/)
  })

  test("matches links by note name and combines != conditions with lowercase and", () => {
    const out = transform(
      query(
        `LIST FROM "Problems"\nWHERE pattern = [[Binary Search]] and SubPattern != [[Upper and Lower Limits]] AND SubPattern != [[Binary Search On Answer]]`,
      ),
    )
    assert.strictEqual(out, "- 🔍 [[Problems/Plain Search|Plain Search]]")
  })

  test("shows a placeholder when nothing matches", () => {
    const out = transform(query(`LIST FROM "Problems"\nWHERE SubPattern = [[Nothing]]`))
    assert.match(out, /No problems logged yet/)
  })

  test("flags unsupported clauses instead of guessing", () => {
    for (const where of [`contains(file.name, "Bound")`, `pattern = this.file.link`]) {
      const out = transform(query(`LIST FROM "Problems"\nWHERE ${where}`))
      assert.match(out, /Unsupported Dataview clause/, where)
    }
  })
})
