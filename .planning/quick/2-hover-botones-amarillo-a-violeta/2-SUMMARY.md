---
task_num: 2
description: "Cambiar hover de botones de amarillo a violeta"
mode: quick
completed: 2026-04-02
duration: ~3min
tasks_completed: 2
tasks_total: 2
key_files:
  modified:
    - src/components/ui/button.tsx
    - src/index.css
decisions:
  - "Used hover:bg-primary/10 for subtle violet tint on button hovers instead of accent color"
  - "Accent hue shifted from 80 (yellow) to 295 (violet) to match primary brand palette"
---

# Quick Task 2: Cambiar hover de botones de amarillo a violeta

Button hover states and accent CSS variables updated from yellow (hue 80) to violet (hue 295), aligning hover feedback with the primary brand color.

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Update button hover variants | 15d8bfc | src/components/ui/button.tsx |
| 2 | Update CSS accent variables | cc99c06 | src/index.css |

## Changes Made

### Task 1: Button hover variants (button.tsx)

Changed three button variant hover classes from yellow-accent-based to violet-primary-based:

- **outline**: `hover:bg-accent hover:text-accent-foreground` -> `hover:bg-primary/10 hover:text-primary`
- **secondary**: `hover:bg-secondary/80` -> `hover:bg-primary/10 hover:text-primary`
- **ghost**: `hover:bg-accent hover:text-accent-foreground` -> `hover:bg-primary/10 hover:text-primary`

### Task 2: CSS accent variables (index.css)

Updated accent and sidebar-accent variables in both light and dark modes:

**:root (light mode):**
- `--accent`: `oklch(0.80 0.15 80)` -> `oklch(0.90 0.08 295)`
- `--accent-foreground`: `oklch(0.15 0 0)` -> `oklch(0.30 0.05 295)`
- `--sidebar-accent`: `oklch(0.80 0.15 80)` -> `oklch(0.90 0.08 295)`
- `--sidebar-accent-foreground`: `oklch(0.15 0 0)` -> `oklch(0.30 0.05 295)`

**.dark (dark mode):**
- `--accent`: `oklch(0.80 0.15 80)` -> `oklch(0.35 0.08 295)`
- `--accent-foreground`: `oklch(0.15 0 0)` -> `oklch(0.90 0.03 295)`
- `--sidebar-accent`: `oklch(0.80 0.15 80)` -> `oklch(0.35 0.08 295)`
- `--sidebar-accent-foreground`: `oklch(0.15 0 0)` -> `oklch(0.90 0.03 295)`

## Deviations from Plan

None - plan executed exactly as written.

## Notes

- An initial commit (83a19b5) was created for the BAsura project source files since the nested repo had no prior commits.
- The `--chart-2` variable still uses `oklch(0.80 0.15 80)` (yellow hue) -- this was not in scope for this task.
