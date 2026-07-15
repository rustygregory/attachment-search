import styled from 'styled-components'

const CardWrapper = styled.div`
  z-index: 200;
  width: 360px;
  background: white;
  border: 1px solid #d8dcde;
  border-radius: 8px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  pointer-events: none;
`

const TitleArea = styled.div`
  background: #f8f9f9;
  padding: 14px 16px;
  border-bottom: 1px solid #e9ebed;
  display: flex;
  align-items: center;
  gap: 10px;
`

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #c2c8cc;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 13px;
  font-weight: 600;
`

const SmallAvatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #c2c8cc;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 11px;
  font-weight: 600;
`

const TitleText = styled.div`
  min-width: 0;
`

const SubjectLine = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #2f3941;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const RequesterLine = styled.div`
  font-size: 13px;
  color: #68737d;
  margin-top: 2px;
`

const Body = styled.div`
  padding: 14px 16px;
`

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  color: white;
  background-color: ${props => {
    switch (props.$status) {
      case 'New': return '#37b8af';
      case 'Open': return '#e35b66';
      default: return '#87929d';
    }
  }};
`

const TicketNumber = styled.span`
  font-size: 12px;
  color: #68737d;
`

const Description = styled.div`
  font-size: 12px;
  color: #2f3941;
  line-height: 1.4;
`

const CommentRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-top: 12px;
`

const CommentText = styled.div`
  font-size: 12px;
  color: #2f3941;
  line-height: 1.4;
`

const SectionLabel = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #68737d;
  margin-top: 12px;
  margin-bottom: 8px;
`

const SectionDivider = styled.hr`
  border: none;
  border-top: 1px solid #e9ebed;
  margin: 0;
`

const Highlight = styled.mark`
  background-color: #ffcf8b;
  color: #2f3941;
  padding: 0 2px;
  border-radius: 2px;
  font-weight: 600;
`

const AttachmentItem = styled.div`
  margin-top: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`

const AttachmentName = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #2f3941;
  margin-bottom: 2px;
`

const AttachmentHighlight = styled.div`
  font-size: 12px;
  color: #2f3941;
  line-height: 1.3;
`

function highlightText(text, searchTerm) {
  if (!text || !searchTerm) return text
  const escaped = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'))
  return parts.map((part, i) =>
    part.toLowerCase() === searchTerm.toLowerCase()
      ? <Highlight key={i}>{part}</Highlight>
      : part
  )
}

export default function TicketHoverCard({ ticket, searchTerm, style }) {
  const hasAttachments = ticket.attachments && ticket.attachments.length > 0
  const snippet = ticket.commentSnippets?.[0]

  return (
    <CardWrapper style={style}>
      <TitleArea>
        <Avatar>{ticket.requester.charAt(0)}</Avatar>
        <TitleText>
          <SubjectLine>{highlightText(ticket.subject, searchTerm)}</SubjectLine>
          <RequesterLine>{ticket.requester}</RequesterLine>
        </TitleText>
      </TitleArea>

      <Body>
        <MetaRow>
          <StatusBadge $status={ticket.status}>{ticket.status}</StatusBadge>
          <TicketNumber>Ticket #{ticket.id}</TicketNumber>
        </MetaRow>

        <Description>{ticket.description}</Description>

        <SectionLabel>Results in ticket comments</SectionLabel>
        <SectionDivider />

        {snippet && (
          <CommentRow>
            <SmallAvatar>{snippet.author.charAt(0)}</SmallAvatar>
            <CommentText>{highlightText(snippet.text, searchTerm)}</CommentText>
          </CommentRow>
        )}

        {hasAttachments && (
          <>
            <SectionLabel>Results in attachments</SectionLabel>
            <SectionDivider />
            {ticket.attachments.map(att => (
              <AttachmentItem key={att.id}>
                <AttachmentName>{att.filename}</AttachmentName>
                <AttachmentHighlight>
                  {highlightText(att.highlightText, searchTerm)}
                </AttachmentHighlight>
              </AttachmentItem>
            ))}
          </>
        )}
      </Body>
    </CardWrapper>
  )
}
