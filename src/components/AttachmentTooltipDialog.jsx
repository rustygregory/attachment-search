import { useEffect, useRef } from 'react'
import styled from 'styled-components'

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999;
`

const Dialog = styled.div`
  position: fixed;
  z-index: 1000;
  width: 280px;
  max-width: calc(100vw - 32px);
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-wrap: break-word;
  word-wrap: break-word;
`

const Knob = styled.div`
  position: absolute;
  top: -6px;
  width: 12px;
  height: 12px;
  background: white;
  transform: rotate(45deg);
  box-shadow: -1px -1px 2px rgba(0, 0, 0, 0.05);
`

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
`

const Filename = styled.h3`
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  color: #2f3941;
  word-break: break-all;
  overflow-wrap: break-word;
`

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  min-width: 24px;
  border: none;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  color: #68737d;
  flex-shrink: 0;

  &:hover {
    background: #f8f9f9;
    color: #2f3941;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(31, 115, 183, 0.35);
  }
`

const SummaryLabel = styled.p`
  margin: 0;
  font-size: 11px;
  font-weight: 600;
  color: #68737d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const Summary = styled.p`
  margin: 0;
  font-size: 13px;
  color: #49545c;
  line-height: 1.5;
  white-space: normal;
  overflow-wrap: break-word;
  word-wrap: break-word;
`

const OpenLink = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
  padding: 0;
  border: none;
  background: transparent;
  color: #1f73b7;
  font-size: 13px;
  font-weight: 400;
  cursor: pointer;
  text-decoration: none;
  font-family: inherit;

  &:hover {
    text-decoration: underline;
    color: #144a75;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(31, 115, 183, 0.35);
    border-radius: 2px;
  }
`

export default function AttachmentTooltipDialog({ attachment, ticket, triggerRef, onClose, onOpenAttachment }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
        triggerRef.current?.focus()
      }
    }

    const handleClickOutside = (e) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target) && !triggerRef.current?.contains(e.target)) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose, triggerRef])

  useEffect(() => {
    if (dialogRef.current) {
      const firstFocusable = dialogRef.current.querySelector('button')
      firstFocusable?.focus()
    }
  }, [])

  const getPosition = () => {
    if (!triggerRef.current) return { top: 0, left: 0, knobLeft: 24 }
    const rect = triggerRef.current.getBoundingClientRect()
    const tagCenterX = rect.left + rect.width / 2
    const dialogLeft = Math.min(
      Math.max(16, tagCenterX - 140),
      window.innerWidth - 296
    )
    const knobLeft = tagCenterX - dialogLeft - 6
    return {
      top: `${rect.bottom + 8}px`,
      left: `${dialogLeft}px`,
      knobLeft: Math.max(16, Math.min(knobLeft, 252)),
    }
  }

  const position = getPosition()

  return (
    <>
      <Overlay aria-hidden="true" />
      <Dialog
        ref={dialogRef}
        role="dialog"
        aria-label={`Attachment details: ${attachment.filename}`}
        style={{ top: position.top, left: position.left }}
      >
        <Knob style={{ left: `${position.knobLeft}px` }} />
        <Header>
          <Filename>{attachment.filename}</Filename>
          <CloseButton
            onClick={onClose}
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="1" y1="1" x2="13" y2="13" />
              <line x1="13" y1="1" x2="1" y2="13" />
            </svg>
          </CloseButton>
        </Header>

        <SummaryLabel>Attachment Summary</SummaryLabel>
        <Summary>{attachment.summary}</Summary>

        <OpenLink
          onClick={() => {
            onClose()
            if (onOpenAttachment && ticket) {
              onOpenAttachment(ticket, attachment)
            }
          }}
        >
          Open attachment
        </OpenLink>
      </Dialog>
    </>
  )
}
