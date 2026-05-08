# OpenWriter Command Pack v0

## `/premise-expand`
Expand this premise into 5 distinct directions. Keep each direction under 120 words, include tone, core conflict, and one risk.

## `/character-create <name>`
Create a character note for `<name>` using `_template.character.md`. Include 3 wikilinked relationship placeholders.

## `/location-create <name>`
Create a location note for `<name>` using `_template.location.md`, and add 2 links to related factions or scenes.

## `/faction-create <name>`
Create a faction note for `<name>` using `_template.faction.md`, including public face vs hidden agenda.

## `/branch-create <slug>`
Create `Branches/<YYYY-MM-DD>-<slug>/` using `_template.branch` contents and add a short divergence summary.

## `/scene-critique <scene-file>`
Critique `<scene-file>` without rewriting it. Return strengths, weaknesses, continuity risks, and targeted next edits.

## `/scene-revision <scene-file>`
Create a separate revision draft in `Scenes/Revisions/` based on `<scene-file>`. Keep original untouched and include a short change log.

## `/continuity-check`
Compare `canon.md`, `outline.md`, `Scenes/`, and character/location/faction notes. Report contradictions and append unresolved items to `open-questions.md` after approval.
