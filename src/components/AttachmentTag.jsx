import { useState, useRef } from 'react'
import styled from 'styled-components'
import AttachmentTooltipDialog from './AttachmentTooltipDialog'

const TagContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
`

const Tag = styled.button`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 12px;
  border: 1px solid #228f67;
  background-color: #edf8f4;
  color: #186146;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.15s, box-shadow 0.15s;
  white-space: nowrap;
  line-height: 1.4;

  &:hover {
    background-color: #d1f0e4;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(34, 143, 103, 0.35);
  }
`

const MoreIndicator = styled.span`
  font-size: 12px;
  color: #68737d;
  white-space: nowrap;
`

export default function AttachmentTag({ attachments, ticket, onOpenAttachment }) {
  const [activeAttachment, setActiveAttachment] = useState(null)
  const triggerRef = useRef(null)

  if (!attachments || attachments.length === 0) return null

  const firstAttachment = attachments[0]
  const remainingCount = attachments.length - 1

  return (
    <TagContainer>
      <Tag
        ref={triggerRef}
        onClick={() => setActiveAttachment(activeAttachment ? null : firstAttachment)}
        aria-expanded={!!activeAttachment}
        aria-haspopup="dialog"
      >
        {firstAttachment.conceptLabel}
      </Tag>
      {remainingCount > 0 && (
        <MoreIndicator>+{remainingCount} more</MoreIndicator>
      )}

      {activeAttachment && (
        <AttachmentTooltipDialog
          attachment={activeAttachment}
          ticket={ticket}
          triggerRef={triggerRef}
          onClose={() => setActiveAttachment(null)}
          onOpenAttachment={onOpenAttachment}
        />
      )}
    </TagContainer>
  )
}
