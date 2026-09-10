---
name: extract-structured-requirements
description: Convert designer-provided vague requirements, notes, screenshots, recordings, or documents into a reviewable structured requirement. Use when users, tasks, data, rules, risks, constraints, or open questions need to be made explicit before design work.
---

# AI for Design · Extract Structured Requirements

Create a trustworthy requirement baseline without inventing product decisions. This Skill is standalone: never invoke another Skill, search for the newest file, or continue into insight or prototype work.

## Before execution

Ask the designer to provide the exact source content or file paths for this run and choose an output directory. Show selected inputs, proposed draft and confirmed filenames, important unknowns, and the extraction plan.

Request **Execute**, **Change inputs**, **Change output**, or **Cancel**. Prefer native buttons or choices when available and numbered text otherwise. Do not write files before execution is approved.

## Extract

1. Separate stated facts, interpretations, assumptions, and unresolved questions.
2. Identify users, scenarios, goals, tasks, information fields, functions, business rules, permissions, risks, success criteria, and delivery constraints.
3. Link material requirements to their source. Mark insufficient evidence as `unverified`.
4. Surface conflicts and ask only questions that materially change scope, rules, or risk.
5. Read [output-contract.md](references/output-contract.md) and create an editable Markdown draft.

## Confirm and save

After creating the draft, offer **Open/edit draft**, **I edited the file**, **Apply feedback**, **Confirm draft**, or **Abandon**. If the designer edited the file, reread it and use that version as authoritative.

Only after confirmation create:

- `<requirement-id>_structured-requirement.md`;
- `<requirement-id>_structured-requirement.yaml`, based on [structured-requirements.yaml](assets/structured-requirements.yaml).

Keep both files aligned. Do not silently overwrite an existing confirmed version; propose a new versioned filename instead.

## Boundaries

- Do not turn suggestions into confirmed requirements.
- Do not generate experience insights or interface solutions.
- Do not silently resolve conflicting rules.
- If files cannot be written, show the Markdown draft in chat and pause for confirmation before producing YAML.
