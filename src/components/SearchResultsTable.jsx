import { useState, useRef, useCallback } from 'react'
import styled from 'styled-components'
import AttachmentTag from './AttachmentTag'
import TicketHoverCard from './TicketHoverCard'

const TableWrapper = styled.div`
  flex: 1;
  overflow-x: auto;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
`

const Thead = styled.thead`
  border-bottom: 1px solid #d8dcde;
`

const Th = styled.th`
  text-align: left;
  padding: 10px 12px;
  font-weight: 600;
  color: #2f3941;
  font-size: 13px;
  white-space: nowrap;
  user-select: none;
  cursor: default;

  &:first-child {
    width: 32px;
    padding-left: 12px;
  }
`

const SortableTh = styled(Th)`
  cursor: pointer;

  &:hover {
    color: #1f73b7;
  }
`

const SortIcon = styled.svg`
  width: 12px;
  height: 12px;
  margin-left: 4px;
  vertical-align: middle;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
`

const Tr = styled.tr`
  border-bottom: 1px solid #e9ebed;
  transition: background-color 0.15s;
  cursor: pointer;

  &:hover {
    background-color: #f8f9f9;
  }
`

const Td = styled.td`
  padding: 10px 12px;
  color: #2f3941;
  vertical-align: middle;
  white-space: nowrap;

  &:first-child {
    width: 32px;
    padding-left: 12px;
  }
`

const SubjectText = styled.span`
  color: #2f3941;

  tr:hover & {
    text-decoration: underline;
  }
`

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: #1f73b7;
`

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
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

const AttachmentCell = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
`

const sortableColumns = ['requested', 'updated']

export default function SearchResultsTable({ results, columns, onOpenTicket, searchQuery }) {
  const visibleColumns = columns.filter(c => c.visible)
  const [hoveredTicket, setHoveredTicket] = useState(null)
  const [cardPosition, setCardPosition] = useState({ top: 0, left: 0 })
  const hoverTimeoutRef = useRef(null)

  const handleCellMouseEnter = useCallback((ticket, e) => {
    clearTimeout(hoverTimeoutRef.current)
    const cell = e.currentTarget
    hoverTimeoutRef.current = setTimeout(() => {
      const cellRect = cell.getBoundingClientRect()
      const CARD_WIDTH = 360
      const MARGIN = 12
      // Keep the card within the viewport horizontally
      let left = cellRect.left
      if (left + CARD_WIDTH + MARGIN > window.innerWidth) {
        left = Math.max(MARGIN, window.innerWidth - CARD_WIDTH - MARGIN)
      }
      // Position below the cell, but flip above if it would run off the bottom
      let top = cellRect.bottom + 4
      const estimatedHeight = 320
      if (top + estimatedHeight + MARGIN > window.innerHeight) {
        top = Math.max(MARGIN, cellRect.top - estimatedHeight - 4)
      }
      setCardPosition({ top, left })
      setHoveredTicket(ticket)
    }, 400)
  }, [])

  const handleCellMouseLeave = useCallback(() => {
    clearTimeout(hoverTimeoutRef.current)
    setHoveredTicket(null)
  }, [])

  const handleRowClick = useCallback((ticket, e) => {
    if (e.target.closest('[data-no-row-click]')) return
    onOpenTicket(ticket)
  }, [onOpenTicket])

  return (
    <TableWrapper>
      <Table>
        <Thead>
          <tr>
            <Th><Checkbox type="checkbox" aria-label="Select all" /></Th>
            {visibleColumns.map(col => {
              const isSortable = sortableColumns.includes(col.id)
              const ThComponent = isSortable ? SortableTh : Th
              return (
                <ThComponent key={col.id}>
                  {col.label}
                  {isSortable && (
                    <SortIcon viewBox="0 0 12 12">
                      <path d="M6 2v8M3 7l3 3 3-3" />
                    </SortIcon>
                  )}
                </ThComponent>
              )
            })}
          </tr>
        </Thead>
        <tbody>
          {results.map(ticket => (
            <Tr
              key={ticket.id}
              onClick={(e) => handleRowClick(ticket, e)}
            >
              <Td data-no-row-click><Checkbox type="checkbox" aria-label={`Select ticket ${ticket.id}`} /></Td>
              {visibleColumns.map(col => {
                const isHoverTrigger = col.id === 'status' || col.id === 'subject' || col.id === 'attachment'
                return (
                  <Td
                    key={col.id}
                    onMouseEnter={isHoverTrigger ? (e) => handleCellMouseEnter(ticket, e) : undefined}
                    onMouseLeave={isHoverTrigger ? handleCellMouseLeave : undefined}
                    data-no-row-click={col.id === 'attachment' || col.id === 'subject' ? '' : undefined}
                  >
                    {renderCell(col.id, ticket, onOpenTicket)}
                  </Td>
                )
              })}
            </Tr>
          ))}
        </tbody>
      </Table>
      {hoveredTicket && (
        <TicketHoverCard
          ticket={hoveredTicket}
          searchTerm={searchQuery}
          style={{ position: 'fixed', top: cardPosition.top, left: cardPosition.left }}
        />
      )}
    </TableWrapper>
  )
}

function renderCell(columnId, ticket, onOpenTicket) {
  switch (columnId) {
    case 'status':
      return <StatusBadge $status={ticket.status}>{ticket.status}</StatusBadge>
    case 'id':
      return `#${ticket.id}`
    case 'subject':
      return <SubjectText>{ticket.subject}</SubjectText>
    case 'requested':
      return ticket.requested
    case 'updated':
      return ticket.updated
    case 'requester':
      return ticket.requester
    case 'assignee':
      return ticket.assignee
    case 'group':
      return ticket.group
    case 'attachment':
      return <AttachmentCell data-no-row-click>
        {ticket.attachments.length > 0 ? (
          <AttachmentTag
            attachments={ticket.attachments}
            ticket={ticket}
            onOpenAttachment={(t, att) => onOpenTicket(t, att)}
          />
        ) : null}
      </AttachmentCell>
    default:
      return null
  }
}
