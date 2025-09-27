# Codex Task

Repository: twofoldsam/picturist-website
Base branch: main

## Instruction
Implement the following visual edits in the repository and open commits on this PR. Use the existing code patterns and styling.

## Visual Edits
- [1] Element: P.text-lg.md:text-xl.lg:text-2xl.text-[var(--picturist-text-muted)].max-w-3xl
    - fontSize: "24px" → "30"

## Target Files (from symbolic analysis)
- [1] components/ContentTypeShowcase.tsx (symbolic-analysis, confidence: 70%)
    - Intent: Update p element: Change fontSize from "24px" to "30"
    - Tailwind: {"fontSize":"base"}

## Repository Context
- Framework: react
- Styling: tailwind
- Components analyzed: 86
- Transformation rules: 12897

### Tailwind Preferences (Font Size - from repo theme)
Prefer the nearest defined Tailwind size instead of arbitrary pixel values.

| class | value |
|-------|-------|
| text-xs | 12px |
| text-sm | 14px |
| text-base | 16px |
| text-lg | 18px |
| text-xl | 20px |
| text-2xl | 24px |
| text-3xl | 30px |
| text-4xl | 36px |
| text-5xl | 48px |
| text-6xl | 60px |

Rule: map px values to the closest `text-{k}` above. Only use `text-[NNpx]` if no close match exists.

### Tailwind Preferences (Colors - from repo theme)
Prefer theme color classes over hex values or arbitrary colors.
List truncated to top-level keys.

- slate-50
- slate-100
- slate-200
- slate-300
- slate-400
- slate-500
- slate-600
- slate-700
- slate-800
- slate-900
- picturist-error-bg
- primary
- primary-foreground
- secondary
- secondary-foreground
- accent
- accent-foreground
- sidebar-primary
- sidebar-primary-foreground
- sidebar-accent

Rule: map hex colors to the nearest theme color (e.g., text-[#1e90ff] -> text-primary-500).

### Sample DOM mappings
- [div.min-h-screen.bg-[var(--picturist-warm-white)].relative] -> App (App.tsx) [70%]
- [div.suggestion-with-image-container.relative.w-full] -> ContentTypeShowcase (components/ContentTypeShowcase.tsx) [70%]
- [div.card-header.flex.items-center] -> ContentTypeShowcase (components/ContentTypeShowcase.tsx) [70%]
- [div.star-icon.bg-[var(--picturist-teal)].rounded-full] -> ContentTypeShowcase (components/ContentTypeShowcase.tsx) [70%]
- [span.text-[var(--picturist-teal)].font-medium.text-xs] -> ContentTypeShowcase (components/ContentTypeShowcase.tsx) [70%]
- [p.text-[#292D31].font-medium.text-sm] -> ContentTypeShowcase (components/ContentTypeShowcase.tsx) [70%]
- [div.suggestion-details.space-y-1.5.mb-3] -> ContentTypeShowcase (components/ContentTypeShowcase.tsx) [70%]
- [div] -> ContentTypeShowcase (components/ContentTypeShowcase.tsx) [50%]
- [span.text-[#6B7280].font-semibold.text-[10px]] -> ContentTypeShowcase (components/ContentTypeShowcase.tsx) [70%]
- [p.text-[#292D31].text-xs] -> ContentTypeShowcase (components/ContentTypeShowcase.tsx) [50%]

## Guidelines
- Follow existing coding style and patterns
- Keep changes minimal and scoped to the intents
- If target files differ, select the best match and proceed
- Prefer Tailwind utilities over arbitrary inline values (avoid text-[NNpx] when a theme class exists)

If the change requests a pixel value (e.g., 28px), resolve it to the nearest theme size from the table above. Example: change `lg:text-[28px]` to `lg:text-3xl` when `text-3xl` ~= 28px in this repo.

## Output
- Commit code changes directly to this PR
- Optionally add notes in PR description about decisions made
