import { QuartzTransformerPlugin } from "../types"
import fs from "fs"
import path from "path"

function getSubPattern(content: string): string {
  const match = content.match(/SubPattern:\s*"?\[\[([^\]]+)\]\]"?/)
  return match ? match[1] : ""
}

export const DataviewTransformer: QuartzTransformerPlugin = () => {
  return {
    name: "DataviewTransformer",
    textTransform(ctx, src) {
      if (!src.includes("```dataview")) {
        return src
      }

      // Read problem files from possible directories
      const possibleDirs = [
        path.join(ctx.argv.directory, "DSA", "Problems"),
        path.join(ctx.argv.directory, "Data Structure and Algorithms", "Problems"),
        path.join(ctx.argv.directory, "Data Structures and Algorithms", "Problems"),
      ]

      let problemFiles: { name: string; content: string; ctimeMs: number }[] = []

      for (const dir of possibleDirs) {
        if (fs.existsSync(dir)) {
          const files = fs.readdirSync(dir)
          for (const file of files) {
            if (file.endsWith(".md")) {
              const filePath = path.join(dir, file)
              const stat = fs.statSync(filePath)
              const content = fs.readFileSync(filePath, "utf-8")
              const name = file.replace(/\.md$/, "")
              problemFiles.push({
                name,
                content,
                ctimeMs: stat.ctimeMs || stat.mtimeMs,
              })
            }
          }
        }
      }

      // Extract title of current pattern note
      const pageTitleMatch = src.match(/^#\s+(.+)$/m)
      const pageTitle = pageTitleMatch ? pageTitleMatch[1].trim() : ""

      // Filter problem files referencing this pattern title
      const matchingProblems = problemFiles
        .filter((p) => {
          if (!pageTitle) return false
          const lowerTitle = pageTitle.toLowerCase()
          const lowerContent = p.content.toLowerCase()
          return lowerContent.includes(lowerTitle)
        })
        .sort((a, b) => a.ctimeMs - b.ctimeMs)

      // Process each dataview block individually to support SubPattern filtering
      // Supports both string ("X") and link ([[X]]) literals in WHERE clauses
      const valuePattern = /(?:"([^"]*)"|\[\[([^\]]+)\]\])/
      return src.replace(/```dataview[\s\S]*?```/g, (block) => {
        const exactMatch = block.match(
          new RegExp(`WHERE\\s+SubPattern\\s*=\\s*${valuePattern.source}`),
        )
        // Collect all SubPattern != conditions (valid Dataview syntax with links)
        const excludeMatches = [
          ...block.matchAll(
            new RegExp(`SubPattern\\s*!=\\s*${valuePattern.source}`, "g"),
          ),
        ]

        let filtered = matchingProblems

        if (exactMatch && excludeMatches.length === 0) {
          const target = exactMatch[1] ?? exactMatch[2] ?? ""

          if (target === "") {
            // Match problems with no SubPattern assigned
            filtered = matchingProblems.filter((p) => getSubPattern(p.content) === "")
          } else {
            // Match problems with a specific SubPattern
            filtered = matchingProblems.filter((p) => getSubPattern(p.content) === target)
          }
        } else if (excludeMatches.length > 0) {
          // Exclude problems whose SubPattern matches any of the != conditions
          const excluded = new Set(
            excludeMatches.map((m) => m[1] ?? m[2] ?? ""),
          )
          filtered = matchingProblems.filter((p) => !excluded.has(getSubPattern(p.content)))
        }

        return filtered.length > 0
          ? filtered
              .map(
                (p) =>
                  `- 🔍 [[Data Structures and Algorithms/Problems/${p.name}|${p.name}]]`,
              )
              .join("\n")
          : "*No problems logged yet under this sub-pattern.*"
      })
    },
  }
}
