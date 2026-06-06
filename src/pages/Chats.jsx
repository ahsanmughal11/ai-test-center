import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ChatSidebar from '../components/chat/ChatSidebar'
import ChatWindow from '../components/chat/ChatWindow'
import { conversations } from '../data/mockChats'

export default function Chats() {
  const navigate = useNavigate()
  const [activeId, setActiveId] = useState(conversations[0]?.id ?? null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const activeConversation = conversations.find((c) => c.id === activeId) ?? null

  function handleLogout() {
    navigate('/login')
  }

  return (
    <div className="h-screen flex overflow-hidden bg-[var(--color-surface)] relative">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <ChatSidebar
        conversations={conversations}
        activeId={activeId}
        onSelect={setActiveId}
        onLogout={handleLogout}
        mobileOpen={sidebarOpen || !activeId}
        onCloseMobile={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <ChatWindow
          key={activeId ?? 'empty'}
          conversation={activeConversation}
          onBack={() => {
            setActiveId(null)
            setSidebarOpen(true)
          }}
        />
      </div>
    </div>
  )
}
