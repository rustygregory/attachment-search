# Attachment Search

## Problem Statement

Attachments are essential to full ticket understanding and customer workflows. Excluding attachment information from search creates an incomplete view of the ticket and hinders workflow efficiency. Agents currently have to open individual tickets and manually inspect attachments to find relevant information — a time-consuming process especially when searching across many tickets.

## Proposed Solution

When agents search for keywords or concepts, AI also searches inside attachments (JPEG, PDF) and surfaces results as concept tags in a new "Attachment" column in the search results table. Agents can click a tag to see the attachment filename, an AI-generated summary, and an "Open attachment" button — all without leaving search results.

## Key Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Tag content | AI-generated concept labels | Filenames like "IMG_4532.jpg" are unhelpful; agents need to know what's *in* the attachment |
| Feature activation | Opt-in via Preferences | Reduces disruption; provides clean adoption metrics |
| Supported file types | PDF, JPEG, JPG, PNG, DOC, DOCX | Covers the most common attachment types agents encounter |
| Attachment column | Green tags when match; empty otherwise | No noise — only show signal |
| Tooltip interaction | Garden TooltipDialog (click/focus) | Accessible; keyboard navigable; has close button |
| Results loading | Progressive (skeleton → tags appear) | AI concept search is slower than keyword; don't block the page |

## Running the Prototype

```bash
cd attachment-search
npm install
npm run dev
```

## Interview Talking Points

1. **Search behavior** — "When you search for a concept like 'camera hardware refund,' how would you expect attachment results to appear alongside ticket results?"
2. **Tag utility** — "If you saw a green tag like 'Warranty receipt' in search results, what would you expect to happen when you click it?"
3. **Information density** — "Would you want to see the attachment summary directly in the table, or is the tooltip approach (click to reveal) preferable?"
4. **Progressive loading** — "Would you be comfortable with attachment results appearing slightly after ticket results load?"
5. **Preferences** — "Would you want to enable/disable this feature? What other preferences would be useful?"

## Team

- **UX Design:** Rusty Gregory
- **Product Management:** Salvador Vazquez

## Status

Design exploration phase — preparing for customer interviews.
