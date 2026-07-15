import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`

const ContextBar = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 16px;
  border-bottom: 1px solid #eae9e8;
  flex-shrink: 0;
  font-size: 13px;
  color: #2f3130;
  gap: 12px;
`

const ContextLink = styled.span`
  color: #646864;
  cursor: pointer;
  &:hover { color: #2f3130; }
`

const ContextName = styled.span`
  font-weight: 500;
`

const StatusTag = styled.span`
  background: #c63f46;
  color: #fff;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 3px;
  text-transform: uppercase;
`

const TicketLabel = styled.span`
  font-size: 13px;
  color: #646864;
`

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0;
  border: none;
  background: transparent;
  color: #1f73b7;
  font-size: 13px;
  cursor: pointer;
  font-family: inherit;
  margin-right: auto;

  &:hover {
    text-decoration: underline;
  }
`

const Body = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`

const PropertiesPanel = styled.aside`
  width: 280px;
  min-width: 280px;
  border-right: 1px solid #eae9e8;
  padding: 16px;
  overflow-y: auto;
  font-size: 13px;
`

const PropertyGroup = styled.div`
  margin-bottom: 16px;
`

const PropertyLabel = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: #68737d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`

const PropertyValue = styled.div`
  font-size: 13px;
  color: #2f3941;
`

const MainSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;
`

const ConversationHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid #eae9e8;
  flex-shrink: 0;
`

const Subject = styled.h2`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #2f3941;
`

const Channel = styled.span`
  font-size: 12px;
  color: #68737d;
  margin-top: 4px;
  display: block;
`

const Messages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Message = styled.div`
  display: flex;
  gap: 12px;
`

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  min-width: 32px;
  border-radius: 50%;
  background: ${props => props.$agent ? '#2f3941' : '#1f73b7'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: 600;
`

const MessageContent = styled.div`
  flex: 1;
  min-width: 0;
`

const MessageHeader = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 4px;
`

const AuthorName = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #2f3941;
`

const Timestamp = styled.span`
  font-size: 12px;
  color: #87929d;
`

const MessageBody = styled.div`
  font-size: 13px;
  color: #2f3941;
  line-height: 1.5;
  padding: ${props => props.$requester ? '12px' : '0'};
  background: ${props => props.$requester ? '#edf7ff' : 'transparent'};
  border-radius: ${props => props.$requester ? '8px' : '0'};
`

const AttachmentSection = styled.div`
  margin-top: 8px;
  padding: 12px;
  border: 2px solid #228f67;
  border-radius: 8px;
  background: #f6fef9;
`

const AttachmentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #186146;
`

const AttachmentFile = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: white;
  border: 1px solid #d8dcde;
  border-radius: 6px;
`

const FileIcon = styled.div`
  width: 32px;
  height: 32px;
  min-width: 32px;
  border-radius: 4px;
  background: #e9ebed;
  display: flex;
  align-items: center;
  justify-content: center;
`

const FileInfo = styled.div`
  flex: 1;
  min-width: 0;
`

const FileName = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: #2f3941;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const FileSize = styled.div`
  font-size: 11px;
  color: #87929d;
`

const RightPanel = styled.aside`
  width: 300px;
  min-width: 300px;
  border-left: 1px solid #eae9e8;
  padding: 16px;
  overflow-y: auto;
  font-size: 13px;
`

const RightPanelTitle = styled.h3`
  font-size: 13px;
  font-weight: 600;
  color: #2f3941;
  margin: 0 0 12px 0;
`

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px solid #f3f3f3;

  &:last-child {
    border-bottom: none;
  }
`

const InfoLabel = styled.span`
  font-size: 12px;
  color: #68737d;
`

const InfoValue = styled.span`
  font-size: 12px;
  color: #2f3941;
`

const Footer = styled.div`
  border-top: 1px solid #dcdcda;
  height: 56px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  background: #fff;
  flex-shrink: 0;
`

const CloseTabButton = styled.button`
  background: none;
  border: none;
  font-size: 13px;
  color: #2f3130;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: inherit;
`

const SubmitGroup = styled.div`
  display: flex;
  margin-left: auto;
`

const SubmitButton = styled.button`
  background: #2f3130;
  color: #fff;
  border: none;
  border-radius: 4px 0 0 4px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  font-family: inherit;
  &:hover { background: #404241; }
`

const SubmitChevron = styled.button`
  background: #2f3130;
  color: #fff;
  border: none;
  border-left: 1px solid rgba(255,255,255,0.2);
  border-radius: 0 4px 4px 0;
  padding: 8px 10px;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover { background: #404241; }
`

const ComposerArea = styled.div`
  border-top: 1px solid #eae9e8;
  padding: 12px 20px;
  flex-shrink: 0;
`

const ComposerLabel = styled.div`
  font-size: 12px;
  color: #68737d;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`

const ComposerInput = styled.div`
  min-height: 60px;
  padding: 8px 12px;
  border: 1px solid #d8dcde;
  border-radius: 6px;
  font-size: 13px;
  color: #87929d;
`

export default function TicketView({ ticket, attachment, onBack }) {
  return (
    <Container>
      <ContextBar>
        <BackButton onClick={onBack}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="8,2 4,6 8,10" />
          </svg>
          Back to search
        </BackButton>
        <ContextLink>Support</ContextLink>
        <ContextName>{ticket.requester}</ContextName>
        <StatusTag>{ticket.status}</StatusTag>
        <TicketLabel>Ticket #{ticket.id}</TicketLabel>
      </ContextBar>

      <Body>
        <PropertiesPanel>
          <PropertyGroup>
            <PropertyLabel>Requester</PropertyLabel>
            <PropertyValue>{ticket.requester}</PropertyValue>
          </PropertyGroup>
          <PropertyGroup>
            <PropertyLabel>Assignee</PropertyLabel>
            <PropertyValue>{ticket.assignee === '-' ? 'Unassigned' : ticket.assignee}</PropertyValue>
          </PropertyGroup>
          <PropertyGroup>
            <PropertyLabel>Group</PropertyLabel>
            <PropertyValue>{ticket.group}</PropertyValue>
          </PropertyGroup>
          <PropertyGroup>
            <PropertyLabel>Status</PropertyLabel>
            <PropertyValue>{ticket.status}</PropertyValue>
          </PropertyGroup>
          <PropertyGroup>
            <PropertyLabel>Requested</PropertyLabel>
            <PropertyValue>{ticket.requested}</PropertyValue>
          </PropertyGroup>
          <PropertyGroup>
            <PropertyLabel>Updated</PropertyLabel>
            <PropertyValue>{ticket.updated}</PropertyValue>
          </PropertyGroup>
        </PropertiesPanel>

        <MainSection>
          <ConversationHeader>
            <Subject>{ticket.subject}</Subject>
            <Channel>Via web form</Channel>
          </ConversationHeader>

          <Messages>
            <Message>
              <Avatar>
                {ticket.requester.charAt(0)}
              </Avatar>
              <MessageContent>
                <MessageHeader>
                  <AuthorName>{ticket.requester}</AuthorName>
                  <Timestamp>{ticket.requested}</Timestamp>
                </MessageHeader>
                <MessageBody $requester>
                  Hi, I need help with a refund for my recent purchase. I've attached the relevant documentation below.
                </MessageBody>
                <AttachmentSection>
                  <AttachmentHeader>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#186146" strokeWidth="1.5">
                      <path d="M11 6l-4.5 4.5a2.5 2.5 0 01-3.5-3.5l4.5-4.5a1.5 1.5 0 012.1 2.1l-4.5 4.5a.5.5 0 01-.7-.7L8.5 4.5" />
                    </svg>
                    Attachment — matched your search
                  </AttachmentHeader>
                  <AttachmentFile>
                    <FileIcon>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#68737d" strokeWidth="1.5">
                        <path d="M3 2a1 1 0 011-1h5l4 4v9a1 1 0 01-1 1H4a1 1 0 01-1-1V2z" />
                        <polyline points="8,1 8,5 13,5" />
                      </svg>
                    </FileIcon>
                    <FileInfo>
                      <FileName>{attachment.filename}</FileName>
                      <FileSize>{attachment.filename.toLowerCase().endsWith('.pdf') ? 'PDF Document' : 'Image file'}</FileSize>
                    </FileInfo>
                  </AttachmentFile>
                </AttachmentSection>
              </MessageContent>
            </Message>

            <Message>
              <Avatar $agent>R</Avatar>
              <MessageContent>
                <MessageHeader>
                  <AuthorName>Rusty Admin</AuthorName>
                  <Timestamp>{ticket.updated}</Timestamp>
                </MessageHeader>
                <MessageBody>
                  Thanks for reaching out. I can see the attachment you've provided. Let me review this and get back to you shortly.
                </MessageBody>
              </MessageContent>
            </Message>
          </Messages>

          <ComposerArea>
            <ComposerLabel>
              Public reply
              <span style={{ marginLeft: 'auto', color: '#1f73b7', cursor: 'pointer' }}>CC</span>
            </ComposerLabel>
            <ComposerInput>Type your reply here...</ComposerInput>
          </ComposerArea>
        </MainSection>

        <RightPanel>
          <RightPanelTitle>Customer context</RightPanelTitle>
          <InfoRow>
            <InfoLabel>Email</InfoLabel>
            <InfoValue>{ticket.requester.toLowerCase().replace(/\s/g, '.')}@example.com</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Organization</InfoLabel>
            <InfoValue>Support</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Local time</InfoLabel>
            <InfoValue>10:32 AM</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Language</InfoLabel>
            <InfoValue>English</InfoValue>
          </InfoRow>
        </RightPanel>
      </Body>

      <Footer>
        <CloseTabButton onClick={onBack}>
          Back to search
        </CloseTabButton>
        <SubmitGroup>
          <SubmitButton>Submit as Open</SubmitButton>
          <SubmitChevron>
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth="2">
              <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </SubmitChevron>
        </SubmitGroup>
      </Footer>
    </Container>
  )
}
