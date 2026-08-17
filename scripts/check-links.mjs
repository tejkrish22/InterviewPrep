import fs from "fs"
import path from "path"

const publicDir = path.resolve("public")

if (!fs.existsSync(publicDir)) {
  console.error("❌ public/ directory does not exist. Run 'npx quartz build -d docs' first.")
  process.exit(1)
}

function getAllFiles(dir, ext) {
  let results = []
  const list = fs.readdirSync(dir)
  for (const file of list) {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(filePath, ext))
    } else if (filePath.endsWith(ext)) {
      results.push(filePath)
    }
  }
  return results
}

const htmlFiles = getAllFiles(publicDir, ".html")
let brokenLinks = []
let totalChecked = 0

for (const htmlFile of htmlFiles) {
  const content = fs.readFileSync(htmlFile, "utf-8")
  const hrefMatches = content.matchAll(/href=["']([^"']+)["']/g)

  for (const match of hrefMatches) {
    let href = match[1]

    // Skip external URLs, mailto, tel, javascript, or empty anchors
    if (
      href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("javascript:") ||
      href === "#" ||
      href.startsWith("#")
    ) {
      continue
    }

    totalChecked++

    // Remove query params and hashes for file checking
    const cleanHref = href.split("?")[0].split("#")[0]
    if (!cleanHref) continue

    // Resolve target path
    let targetPath
    if (cleanHref.startsWith("/")) {
      const relativeHref = cleanHref.replace(/^\/InterviewPrep/, "").replace(/^\//, "")
      targetPath = path.join(publicDir, relativeHref)
    } else {
      targetPath = path.resolve(path.dirname(htmlFile), cleanHref)
    }

    // Check if target file or target/index.html or target.html exists
    let exists =
      fs.existsSync(targetPath) ||
      fs.existsSync(`${targetPath}.html`) ||
      fs.existsSync(path.join(targetPath, "index.html")) ||
      fs.existsSync(path.join(publicDir, "dsa", "problems", `${path.basename(cleanHref)}.html`)) ||
      fs.existsSync(path.join(publicDir, "dsa", "patterns", `${path.basename(cleanHref)}.html`))

    if (!exists) {
      const relSource = path.relative(publicDir, htmlFile)
      brokenLinks.push({
        source: relSource,
        href: href,
        target: targetPath,
      })
    }
  }
}

console.log(`\n🔍 Checked ${totalChecked} internal links across ${htmlFiles.length} HTML files.`)

if (brokenLinks.length > 0) {
  console.error(`\n❌ Found ${brokenLinks.length} BROKEN LINK(S) (404):\n`)
  for (const link of brokenLinks) {
    console.error(`  - Source: ${link.source}`)
    console.error(`    Broken Href: "${link.href}"`)
    console.error(`    Expected Target: ${link.target}\n`)
  }
  process.exit(1)
} else {
  console.log("✅ ALL INTERNAL HYPERLINKS ARE VALID AND ACCESSIBLE! Zero 404s found.\n")
  process.exit(0)
}
