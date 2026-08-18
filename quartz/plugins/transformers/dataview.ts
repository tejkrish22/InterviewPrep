import { QuartzTransformerPlugin } from "../types"
import fs from "fs"
import path from "path"

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

      let problemFiles: { name: string; content: string }[] = []

      for (const dir of possibleDirs) {
        if (fs.existsSync(dir)) {
          const files = fs.readdirSync(dir)
          for (const file of files) {
            if (file.endsWith(".md")) {
              const filePath = path.join(dir, file)
              const content = fs.readFileSync(filePath, "utf-8")
              const name = file.replace(/\.md$/, "")
              problemFiles.push({
                name,
                content,
              })
            }
          }
        }
      }

      // Extract title of current pattern note
      const pageTitleMatch = src.match(/^#\s+(.+)$/m)
      const pageTitle = pageTitleMatch ? pageTitleMatch[1].trim() : ""

      // Filter problem files referencing this pattern title
      const matchingProblems = problemFiles.filter((p) => {
        if (!pageTitle) return false
        const lowerTitle = pageTitle.toLowerCase()
        const lowerContent = p.content.toLowerCase()
        return lowerContent.includes(lowerTitle)
      })

      const replacementText =
        matchingProblems.length > 0
          ? matchingProblems
              .map((p) => `- 🔍 [[Data Structures and Algorithms/Problems/${p.name}|${p.name}]]`)
              .join("\n")
          : "*No problems logged yet under this pattern.*"

      return src.replace(/```dataview[\s\S]*?```/g, replacementText)
    },
  }
}
