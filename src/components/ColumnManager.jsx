import { useState } from 'react'
import styled from 'styled-components'

const ManagerOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
`

const Panel = styled.div`
  width: 360px;
  background: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 16px rgba(0, 0, 0, 0.1);
`

const PanelHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px 24px 16px;
  border-bottom: 1px solid #e9ebed;
`

const PanelTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const PanelTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #2f3941;
`

const PanelSubtitle = styled.p`
  margin: 0;
  font-size: 13px;
  color: #68737d;
`

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  color: #68737d;

  &:hover {
    background: #f8f9f9;
    color: #2f3941;
  }
`

const ColumnCount = styled.p`
  margin: 0;
  padding: 12px 24px;
  font-size: 13px;
  color: #68737d;
`

const ColumnList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 16px;
`

const ColumnItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 8px;
  border-radius: 6px;
  gap: 10px;

  &:hover {
    background: #f8f9f9;
  }
`

const DragHandle = styled.span`
  display: flex;
  align-items: center;
  color: #c2c8cc;
  cursor: grab;
`

const ColumnIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: #68737d;
`

const ColumnLabel = styled.span`
  flex: 1;
  font-size: 14px;
  color: #2f3941;
`

const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  color: #c2c8cc;

  &:hover {
    background: #f8f9f9;
    color: #e35b66;
  }
`

const PanelFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-top: 1px solid #e9ebed;
`

const AddColumnButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: 1px dashed #1f73b7;
  border-radius: 8px;
  background: transparent;
  color: #1f73b7;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  margin: 8px 24px;

  &:hover {
    background: #edf7ff;
  }
`

const CancelButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #d8dcde;
  border-radius: 8px;
  background: white;
  color: #2f3941;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    border-color: #5293c7;
  }
`

const ApplyButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  background: #1f73b7;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: #144a75;
  }
`

function getColumnIcon(iconType) {
  switch (iconType) {
    case 'status':
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="8" cy="8" r="3" />
        </svg>
      )
    case 'hash':
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="4" y1="1" x2="3" y2="15" />
          <line x1="10" y1="1" x2="9" y2="15" />
          <line x1="1" y1="5" x2="14" y2="5" />
          <line x1="2" y1="11" x2="15" y2="11" />
        </svg>
      )
    case 'text':
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="2" y1="3" x2="14" y2="3" />
          <line x1="8" y1="3" x2="8" y2="14" />
          <line x1="5" y1="14" x2="11" y2="14" />
        </svg>
      )
    case 'calendar':
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="3" width="12" height="11" rx="1" />
          <line x1="2" y1="7" x2="14" y2="7" />
          <line x1="5" y1="1" x2="5" y2="4" />
          <line x1="11" y1="1" x2="11" y2="4" />
        </svg>
      )
    case 'user':
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="8" cy="5" r="3" />
          <path d="M2 14c0-3 2.5-5 6-5s6 2 6 5" />
        </svg>
      )
    case 'group':
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="6" cy="5" r="2.5" />
          <circle cx="11" cy="6" r="2" />
          <path d="M1 13c0-2.5 2-4 5-4s5 1.5 5 4" />
          <path d="M11 9c2 0 4 1 4 3" />
        </svg>
      )
    case 'attachment':
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M13 7l-5 5a3 3 0 01-4.2-4.2l5-5a2 2 0 012.8 2.8l-5 5a1 1 0 01-1.4-1.4l4-4" />
        </svg>
      )
    default:
      return null
  }
}

export default function ColumnManager({ columns, onColumnsChange, onClose }) {
  const [localColumns, setLocalColumns] = useState(columns)
  const visibleColumns = localColumns.filter(c => c.visible)
  const maxColumns = 10
  const remaining = maxColumns - visibleColumns.length

  const handleRemove = (colId) => {
    setLocalColumns(prev => prev.map(c => c.id === colId ? { ...c, visible: false } : c))
  }

  const handleApply = () => {
    onColumnsChange(localColumns)
    onClose()
  }

  return (
    <ManagerOverlay onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <Panel onClick={e => e.stopPropagation()}>
        <PanelHeader>
          <PanelTitleGroup>
            <PanelTitle>Manage columns</PanelTitle>
            <PanelSubtitle>Add, remove or reorder columns within ticket results</PanelSubtitle>
          </PanelTitleGroup>
          <CloseButton onClick={onClose} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="2" y1="2" x2="14" y2="14" />
              <line x1="14" y1="2" x2="2" y2="14" />
            </svg>
          </CloseButton>
        </PanelHeader>

        <ColumnCount>{remaining} of {maxColumns} columns remaining</ColumnCount>

        <ColumnList>
          {visibleColumns.map(col => (
            <ColumnItem key={col.id}>
              <DragHandle>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                  <circle cx="4" cy="2" r="1" />
                  <circle cx="8" cy="2" r="1" />
                  <circle cx="4" cy="6" r="1" />
                  <circle cx="8" cy="6" r="1" />
                  <circle cx="4" cy="10" r="1" />
                  <circle cx="8" cy="10" r="1" />
                </svg>
              </DragHandle>
              <ColumnIcon>{getColumnIcon(col.icon)}</ColumnIcon>
              <ColumnLabel>{col.label}</ColumnLabel>
              <RemoveButton
                onClick={() => handleRemove(col.id)}
                aria-label={`Remove ${col.label} column`}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="1" y1="1" x2="11" y2="11" />
                  <line x1="11" y1="1" x2="1" y2="11" />
                </svg>
              </RemoveButton>
            </ColumnItem>
          ))}
        </ColumnList>

        {remaining > 0 && (
          <AddColumnButton>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="6" y1="1" x2="6" y2="11" />
              <line x1="1" y1="6" x2="11" y2="6" />
            </svg>
            Add column
          </AddColumnButton>
        )}

        <PanelFooter>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <ApplyButton onClick={handleApply}>Apply</ApplyButton>
        </PanelFooter>
      </Panel>
    </ManagerOverlay>
  )
}
