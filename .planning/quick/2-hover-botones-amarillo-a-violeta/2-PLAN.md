---
task_num: 2
description: "Cambiar hover de botones de amarillo a violeta"
mode: quick
---

# Quick Task 2: Cambiar hover de botones de amarillo a violeta

## Task 1: Update button hover variants

**Files:** `BAsura/src/components/ui/button.tsx`
**Action:** Change outline, secondary, ghost hover classes from `hover:bg-accent hover:text-accent-foreground` to `hover:bg-primary/10 hover:text-primary`
**Verify:** Button variants use violet-tinted hover
**Done:** All three variants updated

## Task 2: Update CSS --accent and --sidebar-accent variables

**Files:** `BAsura/src/index.css`
**Action:**
- `:root` — change `--accent` from `oklch(0.80 0.15 80)` (yellow) to violet light `oklch(0.90 0.08 295)`
- `:root` — change `--sidebar-accent` from `oklch(0.80 0.15 80)` to `oklch(0.90 0.08 295)`
- `.dark` — change `--accent` from `oklch(0.80 0.15 80)` to `oklch(0.35 0.08 295)`
- `.dark` — change `--sidebar-accent` from `oklch(0.80 0.15 80)` to `oklch(0.35 0.08 295)`
- Update `--accent-foreground` and `--sidebar-accent-foreground` to match primary tones
**Verify:** CSS variables use violet hue (295) instead of yellow (80)
**Done:** All accent variables updated in both light and dark modes
