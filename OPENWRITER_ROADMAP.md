# Milestone Plan: OpenCode Fork for Obsidian-Based Creative Ideation

## Working Title

**OpenWriter**

Alternative names: **StoryCode**, **OpenMuse**, **PlotCode**, **InkForge**, **MuseVault**.

## Project Summary

This project is a writing-focused fork or distribution of OpenCode that operates on an Obsidian vault as its primary workspace. Instead of treating the current directory as a software repository, the tool treats it as a structured creative-writing project made of Markdown files, folders, wikilinks, frontmatter, and templates.

The first version should avoid building a custom writing platform. Obsidian remains the human-facing editor and knowledge graph. The OpenCode-derived tool becomes a local-first creative agent layer that can brainstorm, organize, branch, critique, and maintain writing notes through safe Markdown file operations.

The core thesis:

> The vault is the source of truth. The agent is a creative collaborator that reads, writes, links, and reorganizes Markdown notes under explicit user control.

## Product Goals

1. Provide a useful AI brainstorming workflow for creative writing, worldbuilding, game writing, tabletop campaigns, fiction projects, and ideation-heavy design work.
2. Keep the system local-first and file-based by using an Obsidian vault instead of a custom database.
3. Preserve user ownership and manual editability: every output is a normal Markdown file.
4. Reuse OpenCode’s strengths: agent runtime, model/provider support, sessions, tools, permissions, plugins, commands, and file operations.
5. Replace coding-centric defaults with writing-centric agents, commands, templates, and safety rules.
6. Make creative branching explicit through visible Markdown branch folders.
7. Avoid silent destructive edits to prose.

## Non-Goals for the Initial Version

The initial version should not attempt to build:

* a custom writing editor
* a hosted collaboration platform
* a web app
* a proprietary project database
* full Obsidian plugin integration
* real-time co-authoring
* rich visual corkboard UI
* cloud sync
* fine-tuned models
* binary asset management
* publishing/export pipelines beyond Markdown

Those may be useful later, but they are outside the first useful product slice.

---

# Target User Experience

## Primary Workflow

1. User opens a terminal at the root of an Obsidian vault.
2. User launches the writing-focused OpenCode fork or distribution.
3. The tool detects or scaffolds a recommended writing vault structure.
4. User asks for brainstorming, character creation, worldbuilding, plot branching, scene critique, or continuity analysis.
5. The agent reads relevant Markdown notes.
6. The agent proposes new notes, branch folders, edits, or append-only updates.
7. User approves or rejects file changes.
8. User continues editing normally in Obsidian.

## Design Principle

The tool should feel like a **creative production assistant for a Markdown vault**, not like a chatbot that happens to write files.

Good behavior:

* “I found three notes related to this premise.”
* “I can create a branch folder with three alternate versions.”
* “This contradicts the current canon note.”
* “I’ll write this as a revision draft instead of replacing the original scene.”
* “I added unresolved questions to `open-questions.md`.”

Bad behavior:

* dumping large disconnected files into random folders
* rewriting draft prose without permission
* flattening every idea into generic story structure
* treating creative notes like source code
* relying on shell access for ordinary writing operations

---

# Recommended Vault Structure

The project should ship with a starter vault template.

```text
Writing Vault/
  00_Inbox/
    stray-ideas.md
    raw-brainstorming.md

  01_Projects/
    Example Project/
      project.md
      canon.md
      outline.md
      open-questions.md
      continuity-log.md
      style-guide.md

      Characters/
        _template.character.md

      Locations/
        _template.location.md

      Factions/
        _template.faction.md

      Plot/
        premise.md
        act-1.md
        act-2.md
        act-3.md

      Scenes/
        _template.scene.md
        Revisions/

      Branches/
        _template.branch/
          premise.md
          outline.md
          changed-canon.md
          merge-notes.md

      Research/

      Prompts/
        project-voice.md
        constraints.md
```

## Standard Note Types

The system should recognize these frontmatter `type` values:

* `project`
* `canon`
* `outline`
* `open-questions`
* `continuity-log`
* `style-guide`
* `character`
* `location`
* `faction`
* `scene`
* `branch`
* `research`
* `prompt`
* `brainstorm`
* `revision`

## Example Character Note

```markdown
---
type: character
project: Example Project
status: draft
tags:
  - character
aliases: []
---

# Character Name

## Role

## Desire

## Fear

## Contradiction

## Secret

## Relationships

## Voice

## Open Questions
```

## Example Scene Note

```markdown
---
type: scene
project: Example Project
status: draft
characters: []
locations: []
branch: main
---

# Scene Title

## Purpose

## Conflict

## Outcome

## Draft

## Notes

## Revision History
```

---

# Agent Model

The fork should replace coding agents with writing agents. Each agent should have a narrow role, a distinct system prompt, and conservative file permissions.

## Core Agents

### 1. Brainstormer

**Purpose:** Generate divergent ideas without editing files by default.

**Responsibilities:**

* generate premises
* create twist variants
* invent character seeds
* suggest worldbuilding directions
* apply random constraints
* produce multiple distinct options

**Default permissions:**

* read Markdown: allow
* search Markdown: allow
* create/edit files: ask
* shell: deny
* web: ask

### 2. Architect

**Purpose:** Convert raw ideas into project structures.

**Responsibilities:**

* create outlines
* organize acts
* group loose ideas
* propose project structure
* create branch plans
* turn notes into scene lists

**Default permissions:**

* read Markdown: allow
* create/edit project planning files: ask
* edit draft prose: deny unless explicitly requested
* shell: deny

### 3. Character Smith

**Purpose:** Build and refine character notes.

**Responsibilities:**

* create character profiles
* define desires, fears, contradictions, secrets
* map relationships
* generate voice samples
* identify character arc problems

**Default permissions:**

* read Markdown: allow
* create/edit `Characters/**`: ask
* append to open questions: ask
* shell: deny

### 4. Worldbuilder

**Purpose:** Expand settings, factions, locations, rules, and histories.

**Responsibilities:**

* create location notes
* create faction notes
* expand setting logic
* detect generic worldbuilding
* connect world details to plot pressure

**Default permissions:**

* read Markdown: allow
* create/edit `Locations/**`, `Factions/**`, `World/**`: ask
* shell: deny

### 5. Scene Doctor

**Purpose:** Critique and revise scenes safely.

**Responsibilities:**

* analyze scene purpose
* identify weak conflict
* suggest tension improvements
* generate revision drafts
* compare original and revised scene versions

**Default permissions:**

* read Markdown: allow
* write revision files: ask
* overwrite original scenes: deny by default
* shell: deny

### 6. Continuity Editor

**Purpose:** Find contradictions, missing links, and unresolved questions.

**Responsibilities:**

* compare scenes against canon
* identify timeline issues
* find broken or missing character references
* detect duplicated concepts
* update continuity logs with approval

**Default permissions:**

* read Markdown: allow
* append to `continuity-log.md`: ask
* edit canon: ask
* overwrite prose: deny
* shell: deny

### 7. Canon Keeper

**Purpose:** Maintain durable project memory.

**Responsibilities:**

* update `canon.md`
* update `open-questions.md`
* summarize branch decisions
* preserve accepted facts
* distinguish canon from speculation

**Default permissions:**

* read Markdown: allow
* append to canon/open questions/continuity: ask
* broad edit access: deny
* shell: deny

### 8. Critic

**Purpose:** Challenge weak ideas without changing files.

**Responsibilities:**

* detect cliché
* identify weak stakes
* compare branches
* flag tonal inconsistency
* suggest cuts
* suggest stronger alternatives

**Default permissions:**

* read Markdown: allow
* file edits: deny unless explicitly promoted
* shell: deny

---

# Safety and Permission Rules

## Baseline Policy

The writing distribution should invert OpenCode’s coding assumptions:

* shell access is denied by default
* arbitrary file edits require approval
* `.obsidian/**` is denied by default
* binary files are ignored unless explicitly referenced
* draft prose is never silently overwritten
* generated revisions should be written to separate files
* canon changes should be append-first, not rewrite-first
* destructive operations require explicit confirmation

## Recommended Default Rules

```json
{
  "permission": {
    "bash": "deny",
    "websearch": "ask",
    "webfetch": "ask",
    "read": {
      "**/*.md": "allow",
      ".obsidian/**": "deny",
      "**/.env": "deny",
      "**/node_modules/**": "deny"
    },
    "edit": {
      "00_Inbox/**": "ask",
      "01_Projects/**": "ask",
      ".obsidian/**": "deny",
      "**/.env": "deny"
    }
  }
}
```

The exact config shape may need to match OpenCode’s current schema, but the behavioral intent should remain the same.

---

# Custom Commands

The MVP should ship with a command pack. Commands should be simple Markdown prompt templates before becoming custom runtime tools.

## MVP Commands

```text
/premise
/expand-premise
/create-character
/create-location
/create-faction
/generate-plot-branches
/compare-branches
/create-scene-list
/critique-scene
/rewrite-scene-as-revision
/update-canon
/find-continuity-issues
/make-weirder
/reduce-cliche
/raise-stakes
/summarize-project
/organize-inbox
```

## Example Command: `/generate-plot-branches`

Expected behavior:

1. Read project premise, canon, outline, open questions, and style guide.
2. Generate three to five distinct plot branches.
3. For each branch, create or propose a folder under `Branches/`.
4. Each branch contains:

   * `premise.md`
   * `outline.md`
   * `changed-canon.md`
   * `risks.md`
   * `merge-notes.md`
5. Do not modify the main outline unless the user requests a merge.

## Example Command: `/critique-scene`

Expected behavior:

1. Read the selected scene.
2. Read relevant character, location, canon, and style notes.
3. Produce critique under these headings:

   * Scene Purpose
   * Conflict
   * Stakes
   * Character Pressure
   * Information Flow
   * Pacing
   * Tone
   * Continuity Issues
   * Revision Options
4. Do not rewrite the scene unless requested.

---

# Custom Tools

Custom tools should be introduced after the prompt-only command pack proves useful.

## Tool 1: `vault_index`

**Purpose:** Build a structured map of the vault.

Returns:

* projects
* note counts by type
* characters
* locations
* factions
* scenes
* branches
* orphan notes
* broken links
* duplicate titles
* missing frontmatter

## Tool 2: `create_note_from_template`

**Purpose:** Safely create a note from a known template.

Inputs:

* template type
* target path
* title
* project
* initial fields

## Tool 3: `append_to_section`

**Purpose:** Append content to a named Markdown heading without rewriting the whole file.

Useful for:

* `## Open Questions`
* `## Continuity Issues`
* `## Canon Updates`
* `## Revision History`
* `## Ideas to Revisit`

## Tool 4: `update_frontmatter`

**Purpose:** Safely update YAML frontmatter without modifying note body content.

## Tool 5: `find_related_notes`

**Purpose:** Find relevant notes through wikilinks, tags, folders, frontmatter, and eventually embeddings.

## Tool 6: `compare_branches`

**Purpose:** Compare branch folders and output a structured merge recommendation.

## Tool 7: `detect_broken_links`

**Purpose:** Identify unresolved Obsidian wikilinks and optionally propose note creation.

---

# Milestones

## Milestone 0: Project Definition and Fork Strategy

**Goal:** Decide whether this is a true fork, a thin distribution, or an OpenCode config/plugin pack.

**Recommended outcome:** Start as a thin distribution plus command/agent pack. Avoid deep fork changes until the workflow proves valuable.

### Deliverables

* project name decision
* repo strategy document
* upstream OpenCode version baseline
* initial product principles
* initial vault convention
* initial permission policy
* “do not build yet” list

### Engineering Tasks

* clone/fork OpenCode
* identify extension points for agents, commands, permissions, plugins, and custom tools
* verify local launch flow
* verify config override flow
* verify command pack loading
* verify whether a no-shell writing mode can be enforced cleanly

### Acceptance Criteria

* project can be launched locally
* default writing config can be loaded
* at least one custom writing command can run
* shell access is denied by default
* Markdown read/edit permissions can be constrained
* project direction is documented

### Risks

* too much time spent modifying OpenCode internals before proving the workflow
* unclear naming and branding
* accidentally preserving unsafe coding defaults

---

## Milestone 1: Starter Vault and Writing Agent Pack

**Goal:** Make the tool useful in a real Obsidian vault without custom code beyond configuration, prompts, and templates.

### Deliverables

* starter vault structure
* note templates
* writing agent definitions
* command pack v0
* safe default permissions
* sample project vault
* README for setup and usage

### Engineering Tasks

* create vault scaffold script or template folder
* create templates for project, character, location, faction, scene, branch, canon, continuity, and open questions
* define Brainstormer, Architect, Character Smith, Worldbuilder, Scene Doctor, Continuity Editor, Canon Keeper, and Critic agents
* create first-pass command prompts
* test commands against sample vault
* document manual approval workflow for edits

### UX Tasks

* define expected launch flow
* define how users choose a project inside a vault
* define how agents refer to files and links
* define when the tool should create notes versus answer in chat
* define branch folder naming conventions

### Acceptance Criteria

* user can scaffold a new writing project inside an Obsidian vault
* user can generate a premise expansion
* user can generate character notes
* user can generate location or faction notes
* user can create branch folders
* user can critique a scene without rewriting it
* user can create a separate revision file for a scene
* generated notes use valid Markdown and frontmatter
* generated notes contain usable Obsidian wikilinks where appropriate

### Risks

* generated content becomes generic
* files are created in inconsistent locations
* branches become cluttered
* agent writes too much too soon

---

## Milestone 2: Vault-Aware Behaviors

**Goal:** Move beyond generic Markdown editing and make the agent understand the vault as a structured writing project.

### Deliverables

* vault indexing prototype
* broken wikilink detection
* note type detection from frontmatter
* related note discovery
* safer append-to-section behavior
* frontmatter update helper
* project summary generation

### Engineering Tasks

* implement `vault_index`
* parse Markdown frontmatter
* parse Obsidian wikilinks
* detect missing target notes
* detect duplicate note titles
* detect missing frontmatter
* implement `append_to_section`
* implement `update_frontmatter`
* implement `find_related_notes`
* add tests using sample vaults

### UX Tasks

* define how the agent reports vault issues
* define “fix suggestions” versus “apply fixes”
* define display format for broken links and orphan notes
* define conventions for unresolved questions and continuity issues

### Acceptance Criteria

* agent can list all project notes by type
* agent can identify missing character/location links
* agent can find related notes for a scene
* agent can append to `open-questions.md` without rewriting the file
* agent can update frontmatter without modifying body content
* agent can produce a useful project summary from vault files

### Risks

* Markdown parsing edge cases
* frontmatter damage
* poor handling of duplicate filenames
* incompatibility with unusual Obsidian vault conventions

---

## Milestone 3: Branching Workflow

**Goal:** Make creative branching a first-class workflow using visible Markdown folders.

### Deliverables

* branch folder generator
* branch comparison command
* branch merge recommendation command
* changed-canon tracking
* branch status frontmatter
* branch cleanup/archive behavior

### Engineering Tasks

* define branch metadata schema
* implement branch creation from current project state
* implement branch comparison across `premise.md`, `outline.md`, `changed-canon.md`, and related notes
* implement structured branch report generation
* implement branch status values: `draft`, `active`, `rejected`, `merged`, `archived`
* implement merge proposal output without automatic destructive edits

### UX Tasks

* define branch naming format
* define what it means to “merge” a branch in a Markdown vault
* define how rejected branches are archived
* define how canon changes are promoted from branch to main project

### Acceptance Criteria

* user can generate three or more plot branches from one premise
* each branch is materialized as a folder
* user can compare branches
* agent can identify strongest elements from each branch
* agent can propose a hybrid branch
* agent does not modify main canon without explicit approval

### Risks

* branch folders create clutter
* merge semantics become vague
* agent confuses speculative branch facts with accepted canon

---

## Milestone 4: Continuity and Canon Management

**Goal:** Make the tool valuable for longer projects by preserving facts, contradictions, open questions, and accepted decisions.

### Deliverables

* canon update workflow
* continuity scan command
* open question tracker
* accepted/rejected idea tracking
* scene-to-canon comparison
* project memory summary

### Engineering Tasks

* implement `find-continuity-issues`
* implement `update-canon` as an approval-first workflow
* implement append-only canon decision logs
* identify scenes that reference missing or changed facts
* compare branch facts against main canon
* produce project memory summaries for agent context

### UX Tasks

* define difference between canon, speculation, branch canon, and rejected ideas
* define review flow for proposed canon updates
* define how the agent should present uncertainty
* define conflict severity levels

### Acceptance Criteria

* agent can scan a project and report likely contradictions
* agent can distinguish main canon from branch-only facts
* agent can append accepted decisions to canon or continuity logs
* agent can generate a useful open questions list
* agent can summarize current project state compactly

### Risks

* false positives overwhelm the user
* agent treats ambiguous creative material as contradiction
* canon maintenance becomes bureaucratic instead of useful

---

## Milestone 5: Scene Revision Workflow

**Goal:** Support prose revision without risking destructive edits.

### Deliverables

* scene critique command
* revision draft creation command
* side-by-side revision summary
* scene purpose analysis
* tension/stakes pass
* tone/voice pass

### Engineering Tasks

* implement `critique-scene`
* implement `rewrite-scene-as-revision`
* write revisions to `Scenes/Revisions/` or adjacent revision folder
* add revision metadata linking original and revised notes
* generate change summaries
* prevent direct overwrite unless explicitly requested

### UX Tasks

* define revision naming scheme
* define accepted edit flow
* define how to preserve the original scene
* define how the agent should handle partial scene selections if launched from Obsidian later

### Acceptance Criteria

* user can critique a scene
* user can generate a revision file
* revision file links back to original scene
* agent summarizes major changes
* original file remains unchanged by default
* user can request a focused pass: tension, clarity, voice, pacing, stakes, or continuity

### Risks

* revision output becomes too generic
* agent overwrites authorial voice
* user loses track of revision variants

---

## Milestone 6: Obsidian Plugin Bridge

**Goal:** Make the workflow accessible from inside Obsidian while keeping the OpenCode-derived agent as the backend/runtime.

### Deliverables

* minimal Obsidian plugin
* command palette actions
* current-note context sending
* insert-at-cursor support
* create-note-from-agent-output support
* side panel chat or action panel

### Engineering Tasks

* create Obsidian plugin scaffold
* connect plugin to local agent process or local HTTP server
* implement “Ask Agent About Current Note”
* implement “Critique Current Scene”
* implement “Create Character From Selection”
* implement “Update Canon From Current Note”
* implement patch/insert approval flow

### UX Tasks

* define command palette names
* define side panel layout
* define approval UI for proposed edits
* define how the plugin handles missing local agent process

### Acceptance Criteria

* user can invoke the agent from Obsidian
* plugin can send current note content to the agent
* plugin can insert generated text at cursor
* plugin can create a new Markdown note from approved output
* plugin can run at least three MVP commands
* plugin does not require cloud hosting

### Risks

* plugin work distracts from core workflow validation
* local process connection is brittle
* Obsidian plugin permissions and file handling introduce edge cases

---

## Milestone 7: Packaging and Distribution

**Goal:** Make the tool installable and understandable for non-OpenCode contributors.

### Deliverables

* installation guide
* example vault
* packaged command/agent set
* default config
* troubleshooting guide
* demo video script or walkthrough
* release checklist

### Engineering Tasks

* decide distribution model:

  * OpenCode fork binary
  * OpenCode config pack
  * npm package
  * plugin pack
  * starter vault template
* automate setup where possible
* add versioned example vault
* add smoke tests
* add upgrade notes

### UX Tasks

* write “first 15 minutes” tutorial
* write “turn a messy idea into a project” tutorial
* write “branch a plot” tutorial
* write “critique a scene safely” tutorial

### Acceptance Criteria

* fresh user can install and run the tool from documentation
* fresh user can scaffold a project
* fresh user can generate notes and branches
* fresh user can safely approve/reject edits
* release has a clear known-issues section

### Risks

* setup feels too developer-oriented
* tool requires too much terminal comfort
* fork naming creates confusion with upstream OpenCode

---

# MVP Definition

## MVP Scope

The MVP is complete when a user can:

1. Set up a writing vault.
2. Launch the agent in the vault.
3. Generate and organize brainstorming notes.
4. Create structured character/location/faction notes.
5. Generate visible plot branches as folders.
6. Compare branches.
7. Critique a scene.
8. Create a safe revision draft.
9. Update canon/open questions/continuity logs with approval.
10. Continue using the vault normally in Obsidian.

## MVP Exclusions

The MVP does not require:

* custom GUI
* Obsidian plugin
* cloud storage
* account system
* collaboration
* fine-tuning
* mobile support
* visual graph rendering
* DOCX/PDF/Fountain export

---

# Suggested Timeline

This assumes one experienced developer working part-time to full-time, with occasional design/testing support.

## Phase 0: Definition

**Duration:** 2–4 days

* confirm fork/distribution strategy
* define product name
* define vault structure
* define agent list
* define permission policy

## Phase 1: Prompt-and-Config Prototype

**Duration:** 1–2 weeks

* starter vault
* templates
* agent prompts
* commands
* sample project
* manual testing

## Phase 2: Vault-Aware Tools

**Duration:** 2–4 weeks

* vault indexer
* frontmatter parser
* wikilink parser
* append-to-section helper
* related-note finder
* broken link detector

## Phase 3: Branching and Canon

**Duration:** 2–3 weeks

* branch generator
* branch comparison
* merge recommendation
* canon update workflow
* continuity scan

## Phase 4: Scene Workflow and Hardening

**Duration:** 1–3 weeks

* scene critique
* revision file creation
* approval behavior
* regression tests
* docs

## Phase 5: Optional Obsidian Plugin

**Duration:** 3–6 weeks

* plugin scaffold
* current note action
* side panel
* insert/create note actions
* local server bridge

## Practical MVP Estimate

A useful terminal-first MVP is likely achievable in **6–10 weeks** if the fork stays thin and avoids custom UI.

A more polished version with an Obsidian plugin is more realistically **10–16 weeks**.

---

# Technical Architecture

## Initial Architecture

```text
Obsidian Vault
   ↓
OpenCode-derived CLI/runtime
   ↓
Writing agents + commands + safe permissions
   ↓
Markdown file operations
   ↓
User reviews changes in terminal and Obsidian
```

## Later Architecture with Plugin

```text
Obsidian Plugin
   ↓
Local Agent Bridge
   ↓
OpenCode-derived Runtime
   ↓
Vault-Aware Tools
   ↓
Markdown Files
```

## Keep Local-First

The first version should not require a server beyond any local server OpenCode already uses internally. User writing should remain in the vault. Model API calls are acceptable, but project persistence should be local Markdown.

---

# Quality Bar

## Generated Content Quality

Generated content should be:

* specific
* usable
* linked to existing context
* non-generic
* structurally consistent
* easy to edit manually
* clear about canon versus speculation
* respectful of the user’s existing style and constraints

## File Operation Quality

File operations should be:

* predictable
* reviewable
* reversible where possible
* minimally invasive
* scoped to approved folders
* resistant to malformed Markdown
* safe around `.obsidian` internals

## UX Quality

The workflow should feel:

* faster than manual brainstorming
* more structured than plain chat
* safer than asking an AI to rewrite your vault
* compatible with existing Obsidian habits
* useful even if the user ignores half the generated ideas

---

# Test Plan

## Sample Vaults

Create test vaults for:

1. empty vault
2. small fiction project
3. messy idea dump
4. large worldbuilding project
5. project with broken links
6. project with contradictory canon
7. project with multiple branches
8. project with unusual note naming

## Automated Tests

Test:

* frontmatter parsing
* wikilink parsing
* note type detection
* append-to-section behavior
* branch folder generation
* broken link detection
* permission-denied paths
* revision file naming
* no accidental `.obsidian` edits

## Manual Tests

Test whether users can:

* understand setup
* scaffold a project
* generate useful ideas
* find generated notes later
* approve/reject edits confidently
* avoid losing original prose
* continue working in Obsidian without friction

---

# Risk Register

## Risk: The tool becomes generic AI slop in Markdown files

**Mitigation:** Force specificity through project context, constraints, branch comparison, and critique modes. Generate fewer but better structured files.

## Risk: The vault becomes cluttered

**Mitigation:** Use strict folder conventions, branch folders, inbox organization, and archive workflows.

## Risk: The agent damages user prose

**Mitigation:** Default to revision files. Deny direct overwrites unless explicitly requested.

## Risk: Coding-agent defaults leak into writing workflow

**Mitigation:** Deny shell access. Hide or disable coding commands. Replace agent prompts and tools.

## Risk: Obsidian conventions vary widely

**Mitigation:** Support a recommended structure first. Add configuration later for custom vault conventions.

## Risk: Maintaining a fork becomes expensive

**Mitigation:** Start as a thin distribution. Keep core OpenCode changes minimal. Put writing behavior in agents, commands, plugins, and custom tools.

## Risk: Users do not want a terminal workflow

**Mitigation:** Validate terminal-first version with technical users first. Build Obsidian plugin bridge after core workflow proves useful.

---

# Open Questions

1. Should this begin as a true fork or as an installable OpenCode writing pack?
2. How much of OpenCode’s coding UI should be hidden versus left available?
3. Should the tool enforce one recommended vault layout or adapt to arbitrary vaults?
4. How should users select the “current project” inside a large vault?
5. Should branch folders duplicate related notes or only describe differences?
6. What is the minimum useful Obsidian plugin bridge?
7. Should local-only models be a first-class goal or a later privacy feature?
8. What should the default name be?
9. How opinionated should the writing methodology be?
10. Should this target fiction writers first, game writers first, or general ideation?

---

# Immediate Next Steps

1. Create a sample vault with one fictional project.
2. Draft the first agent prompts.
3. Draft the first command pack.
4. Configure safe Markdown-only permissions.
5. Test against three workflows:

   * generate a premise and characters
   * create three plot branches
   * critique and revise a scene safely
6. Only after those workflows feel useful, decide whether custom tools are necessary.

---

# Success Criteria

The first version succeeds if a user can say:

> “This helped me turn a messy creative idea into a structured Obsidian project without trapping my writing inside a proprietary app.”

The product should not be judged by how much text it generates. It should be judged by whether it helps the user make better creative decisions, preserve useful ideas, and continue writing with less friction.
