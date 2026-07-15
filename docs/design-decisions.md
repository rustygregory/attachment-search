# Design Decisions

## AI-Generated Concept Labels (not filenames)

The tags in the Attachment column display AI-generated concept labels (e.g., "Warranty receipt", "PDF invoice") rather than raw filenames. This is the core value proposition — agents see what's *in* the attachment without opening it.

## Opt-in via Preferences

The feature is off by default. Agents enable it in Preferences. This reduces risk of overwhelming agents who don't need it and provides a clean adoption metric. In the prototype, it's shown enabled for demonstration purposes.

## Supported File Types

Both versions support the following attachment file types for AI search:
- PDF
- JPEG / JPG
- PNG
- DOC / DOCX

## Green Tags with Match-Only Display

- Attachment column shows green concept tags **only** when the AI finds a concept/keyword match
- Empty cells when no attachment matches — no noise
- Hit words appear as green tags when searching keywords
- Concepts appear as green tags when searching concepts

## Garden TooltipDialog (not a modal, not hover tooltip)

- Click or focus on a tag opens a **TooltipDialog** anchored to the tag
- Contains: filename (header), AI summary (body), "Open attachment" button (footer)
- Close via: X button, Escape key, or clicking outside
- Keyboard navigable (Tab through content, Escape to close)
- This is the Garden `TooltipDialog` component — not a full modal, not a hover-only tooltip

## Progressive Loading

AI concept search across attachments is inherently slower than keyword search. Results stream in progressively — ticket rows appear immediately, attachment tags populate as the AI finishes processing each attachment. Skeleton/shimmer state on attachment cells while processing.

## Column Management

The Attachment column fits within Zendesk's existing 10-column limit (currently 8 used = 2 remaining). Agents add it via the existing "Manage columns" panel using "+ Add column."
