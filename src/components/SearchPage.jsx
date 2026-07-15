import { useState, useMemo } from 'react'
import styled from 'styled-components'
import FilterSidebar from './FilterSidebar'
import SearchResultsTable from './SearchResultsTable'
import ColumnManager from './ColumnManager'
import { allTickets, columns as defaultColumns, filterCounts } from '../data/searchResults'

const PageWrapper = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
  overflow: hidden;
`

const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  padding: 24px 24px 24px 24px;
  overflow-y: auto;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`

const Title = styled.h1`
  font-size: 22px;
  font-weight: 600;
  color: #2f3941;
  margin: 0;
  font-family: inherit;
`

const ActionsWrapper = styled.div`
  position: relative;
`

const ActionsButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: 1px solid #c2c8cc;
  border-radius: 8px;
  background: white;
  color: #1f73b7;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;

  &:hover {
    background: rgba(104, 115, 125, 0.08);
    border-color: #87929d;
  }

  &:active {
    background: rgba(104, 115, 125, 0.15);
    border-color: #68737d;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(31, 115, 183, 0.35);
  }
`

const ActionsMenu = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  min-width: 160px;
  background: white;
  border: 1px solid #d8dcde;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 4px 0;
  z-index: 100;
`

const MenuItem = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  padding: 8px 16px;
  border: none;
  background: transparent;
  color: #2f3941;
  font-size: 14px;
  cursor: pointer;
  font-family: inherit;

  &:hover {
    background: #f8f9f9;
  }

  &:focus-visible {
    outline: none;
    background: #edf7ff;
  }
`

const SearchBarRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
`

const SearchInput = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  border: 1px solid #d8dcde;
  border-radius: 8px;
  padding: 8px 12px;
  background: white;
  gap: 8px;

  &:focus-within {
    border-color: #5293c7;
    box-shadow: 0 0 0 3px rgba(31, 115, 183, 0.35);
  }
`

const SearchIcon = styled.svg`
  width: 16px;
  height: 16px;
  fill: none;
  stroke: #87929d;
  stroke-width: 2;
  flex-shrink: 0;
`

const Input = styled.input`
  border: none;
  outline: none;
  flex: 1;
  font-size: 14px;
  color: #2f3941;
  background: transparent;
  font-family: inherit;

  &::placeholder {
    color: #87929d;
  }
`

const FiltersButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: 1px solid #1f73b7;
  border-radius: 8px;
  background: white;
  color: #1f73b7;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  font-family: inherit;

  &:hover {
    background: #edf7ff;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(31, 115, 183, 0.35);
  }
`

const ColumnManagerButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid #1f73b7;
  border-radius: 8px;
  background: white;
  color: #1f73b7;
  cursor: pointer;

  &:hover {
    background: #edf7ff;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(31, 115, 183, 0.35);
  }
`

function searchTickets(tickets, query) {
  if (!query.trim()) return []
  const term = query.toLowerCase()
  return tickets.filter(ticket => {
    if (ticket.subject.toLowerCase().includes(term)) return true
    if (ticket.description.toLowerCase().includes(term)) return true
    if (ticket.concepts.some(c => c.toLowerCase().includes(term))) return true
    if (ticket.commentSnippets.some(s => s.text.toLowerCase().includes(term))) return true
    if (ticket.attachments.some(a =>
      a.highlightText.toLowerCase().includes(term) ||
      a.conceptLabel.toLowerCase().includes(term) ||
      a.summary.toLowerCase().includes(term)
    )) return true
    return false
  })
}

export default function SearchPage({ onOpenTicket, version }) {
  const [columns, setColumns] = useState(defaultColumns)
  const [showColumnManager, setShowColumnManager] = useState(false)
  const [showActionsMenu, setShowActionsMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState('Refund')

  const filteredResults = useMemo(() => searchTickets(allTickets, searchQuery), [searchQuery])

  const visibleColumns = version === 'mvp'
    ? columns.filter(c => c.id !== 'attachment')
    : columns

  return (
    <PageWrapper>
      <FilterSidebar counts={{ ...filterCounts, tickets: filteredResults.length }} />
      <ContentArea>
        <Header>
          <Title>Tickets</Title>
          <ActionsWrapper>
            <ActionsButton onClick={() => setShowActionsMenu(!showActionsMenu)}>
              Actions
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="2,4 6,8 10,4" />
              </svg>
            </ActionsButton>
            {showActionsMenu && (
              <ActionsMenu>
                <MenuItem onClick={() => setShowActionsMenu(false)}>Save</MenuItem>
                <MenuItem onClick={() => setShowActionsMenu(false)}>Copy link</MenuItem>
                <MenuItem onClick={() => setShowActionsMenu(false)}>Preferences</MenuItem>
              </ActionsMenu>
            )}
          </ActionsWrapper>
        </Header>

        <SearchBarRow>
          <SearchInput>
            <SearchIcon viewBox="0 0 16 16">
              <circle cx="7" cy="7" r="5" />
              <line x1="11" y1="11" x2="14" y2="14" />
            </SearchIcon>
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tickets..."
            />
          </SearchInput>
          <FiltersButton>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="1" width="2" height="14" rx="1" fill="currentColor" />
              <rect x="10" y="1" width="2" height="14" rx="1" fill="currentColor" />
              <circle cx="5" cy="5" r="2.5" fill="white" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="11" cy="11" r="2.5" fill="white" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            Filters
          </FiltersButton>
          <ColumnManagerButton
            onClick={() => setShowColumnManager(true)}
            aria-label="Manage columns"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="2" width="14" height="12" rx="1" />
              <line x1="5.5" y1="2" x2="5.5" y2="14" />
              <line x1="10.5" y1="2" x2="10.5" y2="14" />
            </svg>
          </ColumnManagerButton>
        </SearchBarRow>

        <SearchResultsTable
          results={filteredResults}
          columns={visibleColumns}
          onOpenTicket={onOpenTicket}
          searchQuery={searchQuery}
        />

        {showColumnManager && (
          <ColumnManager
            columns={visibleColumns}
            onColumnsChange={setColumns}
            onClose={() => setShowColumnManager(false)}
          />
        )}
      </ContentArea>
    </PageWrapper>
  )
}
