#!/usr/bin/env bun
import path from "node:path"

type VaultNote = {
  path: string
  title: string
  type: string | null
  frontmatter: Record<string, string>
  links: string[]
  content: string
}

const markdownFiles = async (root: string) => {
  const files: string[] = []
  for await (const item of new Bun.Glob("**/*.md").scan({ cwd: root, onlyFiles: true })) {
    if (item.startsWith(".obsidian/")) continue
    files.push(item)
  }
  return files
}

const parseFrontmatter = (content: string) => {
  if (!content.startsWith("---\n")) return { body: content, frontmatter: {} as Record<string, string> }
  const end = content.indexOf("\n---\n", 4)
  if (end === -1) return { body: content, frontmatter: {} as Record<string, string> }
  const frontmatter: Record<string, string> = {}
  content
    .slice(4, end)
    .split("\n")
    .map((line) => line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/))
    .filter((value): value is RegExpMatchArray => Boolean(value))
    .forEach((match) => {
      frontmatter[match[1]] = match[2].trim()
    })
  return { body: content.slice(end + 5), frontmatter }
}

const parseWikiLinks = (content: string) => Array.from(content.matchAll(/\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|[^\]]+)?\]\]/g)).map((m) => m[1].trim())

const readNotes = async (root: string) =>
  Promise.all(
    (await markdownFiles(root)).map(async (file) => {
      const content = await Bun.file(path.join(root, file)).text()
      const parsed = parseFrontmatter(content)
      return {
        path: file,
        title: path.basename(file, ".md"),
        type: parsed.frontmatter.type ?? null,
        frontmatter: parsed.frontmatter,
        links: parseWikiLinks(content),
        content,
      } satisfies VaultNote
    }),
  )

export const vaultIndex = async (root: string) => {
  const notes = await readNotes(root)
  const titleMap = notes.reduce((acc, note) => acc.set(note.title.toLowerCase(), (acc.get(note.title.toLowerCase()) ?? 0) + 1), new Map<string, number>())
  const types = notes.reduce((acc, note) => ({ ...acc, [note.type ?? "unknown"]: (acc[note.type ?? "unknown"] ?? 0) + 1 }), {} as Record<string, number>)
  const titles = new Set(notes.map((n) => n.title.toLowerCase()))
  return {
    total_notes: notes.length,
    note_types: types,
    broken_links: notes.flatMap((note) => note.links.filter((link) => !titles.has(path.basename(link).toLowerCase())).map((link) => ({ source: note.path, target: link }))),
    duplicate_titles: Array.from(titleMap.entries()).filter((entry) => entry[1] > 1).map((entry) => entry[0]),
    missing_frontmatter: notes.filter((note) => Object.keys(note.frontmatter).length === 0).map((note) => note.path),
    projects: notes.filter((note) => note.type === "project").map((note) => note.path),
  }
}

export const appendToSection = async (filePath: string, heading: string, content: string) => {
  const text = await Bun.file(filePath).text()
  const lines = text.split("\n")
  const headingIndex = lines.findIndex((line) => line.trim() === heading.trim())
  if (headingIndex === -1) throw new Error(`Heading not found: ${heading}`)
  const endIndex = lines.findIndex((line, index) => index > headingIndex && /^#{1,6}\s+/.test(line))
  const insertIndex = endIndex === -1 ? lines.length : endIndex
  const updated = [...lines.slice(0, insertIndex), "", content, ...lines.slice(insertIndex)].join("\n")
  await Bun.write(filePath, updated)
}

export const updateFrontmatter = async (filePath: string, updates: Record<string, string>) => {
  const text = await Bun.file(filePath).text()
  const parsed = parseFrontmatter(text)
  if (Object.keys(parsed.frontmatter).length === 0) throw new Error("No frontmatter block found")
  Object.entries(updates).forEach(([key, value]) => {
    parsed.frontmatter[key] = value
  })
  const frontmatter = Object.entries(parsed.frontmatter)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n")
  await Bun.write(filePath, `---\n${frontmatter}\n---\n${parsed.body.startsWith("\n") ? parsed.body.slice(1) : parsed.body}`)
}

export const findRelatedNotes = async (root: string, targetPath: string) => {
  const notes = await readNotes(root)
  const target = notes.find((note) => note.path === targetPath)
  if (!target) throw new Error(`Target note not found: ${targetPath}`)
  const targetName = target.title.toLowerCase()
  return notes
    .filter((note) => note.path !== target.path)
    .map((note) => ({
      path: note.path,
      score: (note.links.some((link) => path.basename(link).toLowerCase() === targetName) ? 2 : 0) + (target.links.some((link) => path.basename(link).toLowerCase() === note.title.toLowerCase()) ? 1 : 0) + (note.frontmatter.project && note.frontmatter.project === target.frontmatter.project ? 1 : 0),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
}

export const projectSummary = async (root: string) => {
  const index = await vaultIndex(root)
  return `Project summary:\n- Total notes: ${index.total_notes}\n- Types: ${Object.entries(index.note_types)
    .map(([type, count]) => `${type} (${count})`)
    .join(", ")}\n- Broken links: ${index.broken_links.length}\n- Missing frontmatter: ${index.missing_frontmatter.length}`
}
