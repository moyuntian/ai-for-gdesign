---
name: derive-experience-insights
description: Derive evidence-linked user journeys, experience needs, opportunities, and one or more design directions from designer-selected structured requirements and research evidence.
---

# AI for Design · Derive Experience Insights

Turn a designer-selected requirement baseline into decision-ready experience directions. This Skill is standalone: never invoke another Skill or choose an input file automatically.

## Before execution

Ask the designer to provide the exact structured-requirement file and any supporting research, feedback, screenshots, or notes. Ask for an output directory. Show selected paths, document status, evidence gaps, planned analysis, draft filename, and confirmed filenames.

Request **Execute**, **Change inputs**, **Change output**, or **Cancel** before writing.

## Derive

1. Read [direction-rules.md](references/direction-rules.md).
2. Build the current journey from trigger through task completion and recovery.
3. For every stage identify goal, action, information need, pain point, risk, and evidence.
4. Synthesize experience needs and opportunities without prematurely proposing UI.
5. Form `1..N` materially distinct design directions. They must differ in core object, entry point, information organization, task path, decision logic, or applicable scenario—not only visual styling.
6. Create an editable Markdown draft containing evidence, journey, needs, opportunities, directions, benefits, tradeoffs, applicable conditions, and gaps.

## Confirm and save

Offer **Open/edit draft**, **I edited the file**, **Apply feedback**, **Select directions**, **Confirm draft**, or **Abandon**. Reread designer-edited files before continuing. The designer decides which directions are approved; never force exactly two.

Only after confirmation create:

- `<insight-id>_experience-insights.md`;
- `<insight-id>_experience-insights.yaml`, based on [experience-insights.yaml](assets/experience-insights.yaml).

Preserve candidate directions and their explicit statuses. Do not generate prototypes or silently overwrite confirmed files.
