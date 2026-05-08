#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -lt 2 ]; then
  echo "Usage: $0 <vault-path> <project-name>"
  exit 1
fi

vault_path="$1"
project_name="$2"
project_root="$vault_path/01_Projects/$project_name"

mkdir -p "$vault_path/00_Inbox"
mkdir -p "$project_root"/{Characters,Locations,Factions,Plot,Scenes/Revisions,Branches,Research,Prompts}
mkdir -p "$project_root/Branches/_template.branch"

cat > "$vault_path/00_Inbox/stray-ideas.md" <<EOM
---
type: brainstorm
status: draft
---

# Stray Ideas

- 
EOM

cat > "$vault_path/00_Inbox/raw-brainstorming.md" <<EOM
---
type: brainstorm
status: draft
---

# Raw Brainstorming

## Sparks

## Constraints

## Keep / Cut
EOM

cat > "$project_root/project.md" <<EOM
---
type: project
project: $project_name
status: active
---

# $project_name

## Premise

## Scope

## Themes

## Next Actions
EOM

cat > "$project_root/canon.md" <<EOM
---
type: canon
project: $project_name
status: draft
---

# Canon

## Confirmed Truths

## Locked Decisions

## Retcon Notes
EOM

cat > "$project_root/outline.md" <<EOM
---
type: outline
project: $project_name
status: draft
---

# Outline

## Act 1

## Act 2

## Act 3
EOM

cat > "$project_root/open-questions.md" <<EOM
---
type: open-questions
project: $project_name
status: active
---

# Open Questions

- 
EOM

cat > "$project_root/continuity-log.md" <<EOM
---
type: continuity-log
project: $project_name
status: active
---

# Continuity Log

## Date

## Change

## Impacted Notes
EOM

cat > "$project_root/style-guide.md" <<EOM
---
type: style-guide
project: $project_name
status: draft
---

# Style Guide

## Voice

## Tone

## Taboo Moves
EOM

cat > "$project_root/Characters/_template.character.md" <<EOM
---
type: character
project: $project_name
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
EOM

cat > "$project_root/Locations/_template.location.md" <<EOM
---
type: location
project: $project_name
status: draft
tags:
  - location
---

# Location Name

## Summary

## Sensory Details

## Cultural Rules

## Story Use

## Open Questions
EOM

cat > "$project_root/Factions/_template.faction.md" <<EOM
---
type: faction
project: $project_name
status: draft
tags:
  - faction
---

# Faction Name

## Agenda

## Resources

## Public Face

## Internal Friction

## Relationships
EOM

cat > "$project_root/Scenes/_template.scene.md" <<EOM
---
type: scene
project: $project_name
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
EOM

cat > "$project_root/Branches/_template.branch/changed-canon.md" <<EOM
---
type: branch
project: $project_name
status: draft
branch: template
---

# Changed Canon

## Divergence Point

## Canon Changes
EOM

cat > "$project_root/Branches/_template.branch/merge-notes.md" <<EOM
---
type: branch
project: $project_name
status: draft
branch: template
---

# Merge Notes

## Keep

## Drop

## Open Risks
EOM

cat > "$project_root/Branches/_template.branch/outline.md" <<EOM
---
type: outline
project: $project_name
status: draft
branch: template
---

# Branch Outline
EOM

cat > "$project_root/Branches/_template.branch/premise.md" <<EOM
---
type: premise
project: $project_name
status: draft
branch: template
---

# Branch Premise
EOM

cat > "$project_root/Prompts/project-voice.md" <<EOM
---
type: prompt
project: $project_name
status: active
---

# Project Voice

Describe narrative voice preferences.
EOM

cat > "$project_root/Prompts/constraints.md" <<EOM
---
type: prompt
project: $project_name
status: active
---

# Constraints

List must-keep constraints for this project.
EOM

echo "Scaffold complete: $project_root"
