import { useState } from 'react'
import { ThemeProvider } from './flora-theme/elements/ThemeProvider'
import { TopBar, MainNav } from 'zendesk-globalnav-template'
import { Combobox, Field, Option } from '@zendeskgarden/react-dropdowns'
import styled from 'styled-components'
import SearchPage from './components/SearchPage'
import TicketView from './components/TicketView'
import TabBar from './components/TabBar'
import './App.css'

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #f8f9f9;
  overflow: hidden;
`

const ContentRow = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
  width: 100%;
  overflow: hidden;
`

const MainContent = styled.main`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  background: #ffffff;
  border-radius: 8px 0px 0px 0px;
  box-shadow: 0px 0px 4px rgba(10, 13, 14, 0.16);
  overflow: hidden;
`

const TopBarRow = styled.div`
  position: relative;
  flex-shrink: 0;
`

const TabBarOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 140px;
  height: 100%;
  display: flex;
  align-items: center;
  z-index: 10;
`

const ToggleOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 380px;
  height: 100%;
  display: flex;
  align-items: center;
  z-index: 10;
`

const ModeFieldWrapper = styled.div`
  min-width: 160px;
`

export default function App() {
  const [currentProduct, setCurrentProduct] = useState('support')
  const [activeNavItem, setActiveNavItem] = useState(1)
  const [isSubnavExpanded, setIsSubnavExpanded] = useState(false)

  const [version, setVersion] = useState('mvp')

  const [openTabs, setOpenTabs] = useState([
    { id: 'search', type: 'search', title: 'Search: Refund', closeable: false }
  ])
  const [activeTab, setActiveTab] = useState('search')

  const handleOpenTicket = (ticket, attachment = null) => {
    const tabId = `ticket-${ticket.id}`
    const existingTab = openTabs.find(t => t.id === tabId)
    if (!existingTab) {
      setOpenTabs(prev => [...prev, {
        id: tabId,
        type: 'ticket',
        title: ticket.subject,
        ticketId: String(ticket.id),
        ticket,
        attachment,
      }])
    }
    setActiveTab(tabId)
  }

  const handleTabClose = (tabId) => {
    setOpenTabs(prev => prev.filter(t => t.id !== tabId))
    if (activeTab === tabId) {
      setActiveTab('search')
    }
  }

  const activeTabData = openTabs.find(t => t.id === activeTab)

  return (
    <ThemeProvider>
      <PageContainer>
        <TopBarRow>
          <TopBar
            currentProduct={currentProduct}
            onProductChange={setCurrentProduct}
          />
          <TabBarOverlay>
            <TabBar
              openTabs={openTabs}
              activeTab={activeTab}
              onTabClick={setActiveTab}
              onTabClose={handleTabClose}
            />
          </TabBarOverlay>
          <ToggleOverlay>
            <ModeFieldWrapper>
              <Field>
                <Combobox
                  isCompact
                  isEditable={false}
                  inputValue={version === 'mvp' ? 'MVP' : 'V2'}
                  selectionValue={version}
                  onChange={({ selectionValue }) => { if (selectionValue) setVersion(selectionValue) }}
                >
                  <Option value="mvp">MVP</Option>
                  <Option value="v2">V2</Option>
                </Combobox>
              </Field>
            </ModeFieldWrapper>
          </ToggleOverlay>
        </TopBarRow>
        <ContentRow>
          <MainNav
            currentProduct="support"
            activeNavItem={activeNavItem}
            setActiveNavItem={setActiveNavItem}
            isSubnavExpanded={isSubnavExpanded}
            setIsSubnavExpanded={setIsSubnavExpanded}
          />
          <MainContent>
            {activeTabData?.type === 'ticket' ? (
                <TicketView
                ticket={activeTabData.ticket}
                attachment={activeTabData.attachment}
                onBack={() => setActiveTab('search')}
              />
            ) : (
              <SearchPage onOpenTicket={handleOpenTicket} version={version} />
            )}
          </MainContent>
        </ContentRow>
      </PageContainer>
    </ThemeProvider>
  )
}
