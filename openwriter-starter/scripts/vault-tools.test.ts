import { appendToSection, findRelatedNotes, projectSummary, updateFrontmatter, vaultIndex } from "./vault-tools"
import path from "node:path"

const root = path.join(import.meta.dir, "..", "sample-vault")

test("vaultIndex reports broken links and types", async () => {
  const scratch = path.join(root, "01_Projects", "Example Project", "Scenes", "_milestone2-index.md")
  await Bun.write(scratch, "---\ntype: scene\nproject: Example Project\n---\n# Scratch\n[[Missing Character]]")
  const index = await vaultIndex(root)
  expect(index.total_notes).toBeGreaterThan(0)
  expect(index.note_types.scene).toBeGreaterThan(0)
  expect(index.broken_links.some((link) => link.target === "Missing Character")).toBe(true)
  await Bun.write(scratch, "")
})

test("appendToSection adds content without replacing file", async () => {
  const file = path.join(root, "01_Projects", "Example Project", "open-questions.md")
  const original = await Bun.file(file).text()
  await appendToSection(file, "# Open Questions", "- What is under the lighthouse?")
  const updated = await Bun.file(file).text()
  expect(updated.includes("What is under the lighthouse?")).toBe(true)
  expect(updated.includes("# Open Questions")).toBe(true)
  await Bun.write(file, original)
})

test("updateFrontmatter only changes yaml metadata", async () => {
  const file = path.join(root, "01_Projects", "Example Project", "Scenes", "scene-01-arrival.md")
  const original = await Bun.file(file).text()
  await updateFrontmatter(file, { status: "revised" })
  const updated = await Bun.file(file).text()
  expect(updated.includes("status: revised")).toBe(true)
  expect(updated.includes("## Draft")).toBe(true)
  await Bun.write(file, original)
})

test("findRelatedNotes returns linked notes for a scene", async () => {
  const related = await findRelatedNotes(root, "01_Projects/Example Project/Scenes/scene-01-arrival.md")
  expect(related.length).toBeGreaterThan(0)
})

test("projectSummary returns compact output", async () => {
  const summary = await projectSummary(root)
  expect(summary.includes("Project summary")).toBe(true)
})
