# OpenWriter Starter Vault (Milestone 1)

This folder contains a scaffold script, starter templates, agent pack, and command pack for bootstrapping a writing project inside an Obsidian vault.

## Quick Start

```bash
./openwriter-starter/scripts/scaffold-vault.sh "/path/to/Your Vault" "My Project"
```

The script creates:

- `00_Inbox` with brainstorming scratch files
- `01_Projects/<Project Name>` with project notes
- template files for character, location, faction, scene, branch, canon, continuity, and open questions
- `Agents` and `Commands` folders you can copy into your runtime config

## Manual Approval Workflow

1. Ask an agent to propose files/edits first.
2. Review the proposed paths and markdown content.
3. Approve creation or updates file-by-file.
4. Keep drafted scene rewrites in `Scenes/Revisions/` instead of overwriting the original scene.
5. Record continuity decisions in `continuity-log.md` and canon updates in `canon.md`.

## Launch Flow

1. Open terminal at your Obsidian vault root.
2. Run the scaffold command once per project.
3. Start OpenWriter/OpenCode in the vault root.
4. Pick a project folder in `01_Projects/` and tell the agent to scope work to that folder.

## Conventions

- **Project selection:** the active project is the folder under `01_Projects/` you specify in chat.
- **Note references:** use wikilinks with relative context, such as `[[Characters/Ada Vale]]`.
- **Create vs chat:** create files for reusable artifacts (characters, locations, scenes, branches); use chat for quick ideation.
- **Branch folders:** use `Branches/<YYYY-MM-DD>-<slug>` for each creative branch.

## Files

- `scripts/scaffold-vault.sh`: creates starter structure and notes.
- `agents/writing-agents.yaml`: Brainstormer, Architect, Character Smith, Worldbuilder, Scene Doctor, Continuity Editor, Canon Keeper, Critic.
- `commands/command-pack-v0.md`: starter command prompts.
- `sample-vault/`: sample populated project vault.

## Milestone 2 Vault-Aware Tools

`openwriter-starter/scripts/vault-tools.ts` provides prototype helpers for vault-aware behavior:

- `vaultIndex(root)` indexes notes by type, reports broken wikilinks, duplicate titles, and missing frontmatter.
- `appendToSection(file, heading, content)` appends content under a heading without rewriting full notes.
- `updateFrontmatter(file, updates)` updates YAML frontmatter keys while preserving body content.
- `findRelatedNotes(root, targetPath)` discovers related notes by backlinks/outlinks and shared project metadata.
- `projectSummary(root)` generates a compact summary for project context.

Run tests from this directory:

```bash
cd openwriter-starter/scripts
bun test vault-tools.test.ts
```
