# User Needs

Captured during crazy 8's session with PM (Salvador Vazquez).

## Observations

- Agents use 3rd party apps to copy attachment information and make it searchable
- 3rd party apps are expensive
- Current search only covers ticket comments, not attachment content

## Pains

- Searching for what the ticket is *about*, not just the words being searched
- If agents or AI agents don't know the ticket concept, it can't be assigned or resolved
- 3rd party apps are copying over information — we can't mask PII

## Motivations

- AI agents need to search tickets to find the right information to solve them — search the *entire* ticket including the attachments
- Future: AI agents on a headless platform will interact with this search functionality (concept-level search is a game changer)
- Make searching safe — what if malware is present in attachments?

## Constraints

- Search bar (standard layout)
- Setting up search constraints
- Understanding what hit in the search (why did this result appear?)
- Highlight searched items
- PII data masking — how do we handle that?
- AI agents will have to work with this information
- Attachments need to make sure they are safe (malware scanning)
- Permissions — certain agents can see certain information
- Reduce breaking changes or workflows for customers when feature rolls out
- Need to follow up with Chika on how to safely access attachments (is there a possibility that an attachment may not be safe after a malware scan?)
