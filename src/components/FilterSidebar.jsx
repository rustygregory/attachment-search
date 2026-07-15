import styled from 'styled-components'

const Sidebar = styled.aside`
  width: 200px;
  min-width: 200px;
  padding: 24px 16px;
  border-right: 1px solid #e9ebed;
  overflow-y: auto;
`

const SidebarTitle = styled.h2`
  font-size: 14px;
  font-weight: 600;
  color: #2f3941;
  margin: 0 0 4px 0;
  padding: 0 8px;
`

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  margin-bottom: 12px;
`

const ChevronIcon = styled.svg`
  width: 12px;
  height: 12px;
  fill: none;
  stroke: #68737d;
  stroke-width: 2;
`

const FilterList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const FilterItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 8px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  color: ${props => props.$active ? '#1f73b7' : '#2f3941'};
  font-weight: ${props => props.$active ? '600' : '400'};
  background: ${props => props.$active ? '#edf7ff' : 'transparent'};

  &:hover {
    background: ${props => props.$active ? '#edf7ff' : '#f8f9f9'};
  }
`

const Count = styled.span`
  font-size: 13px;
  color: ${props => props.$active ? '#1f73b7' : '#87929d'};
  font-weight: ${props => props.$active ? '600' : '400'};
`

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e9ebed;
  margin: 16px 0;
`

const SavedSearchesTitle = styled.h3`
  font-size: 13px;
  font-weight: 600;
  color: #2f3941;
  margin: 0 0 8px 0;
  padding: 0 8px;
`

const EmptyText = styled.p`
  font-size: 13px;
  color: #87929d;
  padding: 0 8px;
  margin: 0;
`

export default function FilterSidebar({ counts }) {
  return (
    <Sidebar>
      <SectionHeader>
        <SidebarTitle>Filter by</SidebarTitle>
        <ChevronIcon viewBox="0 0 12 12">
          <polyline points="2,4 6,8 10,4" />
        </ChevronIcon>
      </SectionHeader>

      <FilterList>
        <FilterItem $active>
          <span>Tickets</span>
          <Count $active>{counts.tickets}</Count>
        </FilterItem>
        <FilterItem>
          <span>Articles</span>
          <Count>{counts.articles}</Count>
        </FilterItem>
        <FilterItem>
          <span>Users</span>
          <Count>{counts.users}</Count>
        </FilterItem>
        <FilterItem>
          <span>Organizations</span>
          <Count>{counts.organizations}</Count>
        </FilterItem>
        <FilterItem>
          <span>Side conversations</span>
          <Count>{counts.sideConversations}</Count>
        </FilterItem>
      </FilterList>

      <Divider />

      <SectionHeader>
        <SavedSearchesTitle>Saved searches</SavedSearchesTitle>
        <ChevronIcon viewBox="0 0 12 12">
          <polyline points="2,4 6,8 10,4" />
        </ChevronIcon>
      </SectionHeader>
      <EmptyText>No saved searches</EmptyText>
    </Sidebar>
  )
}
