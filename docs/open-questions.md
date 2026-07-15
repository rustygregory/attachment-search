# Open Questions

## For Customer Interviews

1. **Concept vs. keyword expectations** — Do agents mentally distinguish between searching for a specific word vs. a concept? How do they describe their search intent today?

2. **Tag click behavior** — When seeing a green tag in results, what's the expected interaction? Is the summary in the TooltipDialog sufficient, or would agents want to preview the actual attachment?

3. **Information density** — Would agents prefer to see attachment summaries directly in the table (no click needed) at the cost of wider rows? Or is the click-to-reveal approach less overwhelming?

4. **Progressive loading tolerance** — How long would agents wait for attachment results before assuming nothing was found? Should there be a "still searching" indicator?

5. **Multiple attachment matches** — When "+3 more" is shown, what's the expected behavior? Should clicking "+3 more" expand all tags, or open a list view?

## For Engineering / Technical

6. **PII masking in summaries** — How do we handle PII that appears in attachment content? Should the AI-generated summary redact sensitive data, or does it inherit the agent's permission level?

7. **Malware safety** — Follow up with Chika: is there a possibility that an attachment may not be safe even after a malware scan? What's the safe access pattern?

8. **Performance at scale** — For tickets with 10+ attachments, how do we handle processing time? Should there be a cap on attachments scanned per ticket?

9. **Headless API design** — When AI agents use this on a headless platform, what does the API contract look like? Same search endpoint with attachment results included, or separate call?

## For Design

10. **Preferences specifics** — What settings go in Preferences beyond enable/disable? File type filters? Attachment count limits? Default column visibility?

11. **Empty state** — What does the Attachment column show for tickets that have attachments but none matched the search? Empty (current design) vs. a subtle "no match" indicator?

12. **Accessibility audit** — Validate the TooltipDialog keyboard interaction with assistive technology. Does the focus trap work correctly in context of the table?
