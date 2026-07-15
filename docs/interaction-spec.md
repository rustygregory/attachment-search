# Interaction Specification

## Attachment Column Tags

### States
- **Match found:** Green tag with AI-generated concept label
- **No match:** Empty cell (nothing displayed)
- **Loading:** Skeleton shimmer animation while AI processes

### Tag Appearance
- Background: `#edf8f4` (light green)
- Border: `1px solid #228f67`
- Text color: `#186146`
- Border radius: 12px (pill shape)
- Font size: 12px, weight 500

### Multiple Attachments
When more than one attachment matches:
- First matching attachment shows as a tag
- Additional matches shown as "+N more" text after the tag

## TooltipDialog (on tag click/focus)

### Trigger
- **Click** on the green tag
- **Focus** on the tag (keyboard Tab) + Enter/Space

### Content
1. **Header:** Attachment filename (e.g., "File_12345.JPEG")
2. **Label:** "Attachment Summary" (uppercase, small)
3. **Body:** AI-generated summary explaining what's in the attachment and how it relates to the search (e.g., "Receipt entailing a purchase of a Lenovo keyboard model 123 on June 10, 2026.")
4. **Action:** "Open attachment" button (primary blue) — opens the ticket's attachment

### Close Mechanisms
- X button in header
- Escape key
- Clicking outside the dialog

### Positioning
- Anchored below the tag that triggered it
- Arrow/caret pointing up to the trigger tag
- Adjusts position if near viewport edge

### Keyboard Navigation
- Tab moves focus through: Close button → Open attachment button
- Escape closes and returns focus to the trigger tag
- Focus is trapped within the dialog while open

### Accessibility
- `role="dialog"` on the container
- `aria-label` with attachment filename
- `aria-expanded` on trigger tag
- `aria-haspopup="dialog"` on trigger tag

## Progressive Loading

### Sequence
1. Agent submits search query
2. Ticket rows appear immediately (standard search)
3. Attachment cells show skeleton/shimmer placeholder
4. As AI processes each ticket's attachments, green tags replace skeletons
5. Non-matching rows transition from skeleton to empty

### Timing Expectations
- Standard ticket results: immediate
- Attachment AI processing: 1-3 seconds per ticket (estimated)

## Preferences Bar

- Displayed above the search bar
- Shows "Preferences" label + green indicator showing "Attachment Search enabled"
- Gear icon for accessing settings
- Persists across sessions once configured

## Column Management

- "Manage columns" button opens a right-side panel
- Panel shows current visible columns with drag handles for reorder
- Each column has an X button to remove
- "+ Add column" button at bottom to add available columns
- "Attachment" column appears in the available columns list
- Max 10 columns; counter shows remaining slots
- Cancel/Apply buttons in footer
