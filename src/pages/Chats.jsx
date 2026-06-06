import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ChatSidebar from '../components/chat/ChatSidebar'
import ChatWindow from '../components/chat/ChatWindow'
import { logOut } from '../auth/auth'
import { useAuth } from '../context/useAuth'
import { useConversations } from '../hooks/useConversations'
import { useUserProfile } from '../hooks/useUserProfile'
import { getOrCreateChat } from '../services/chatService'

export default function Chats() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { name, email } = useUserProfile(user?.uid, user)
  const { conversations, loading, error } = useConversations(user?.uid)
  const [activeId, setActiveId] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  const activeConversation = conversations.find((c) => c.id === activeId) ?? null
  const showSidebarOnMobile = sidebarOpen || !activeId

  async function handleStartChat(otherUser) {
    const chatId = await getOrCreateChat({ uid: user.uid }, otherUser)
    setActiveId(chatId)
    setSidebarOpen(false)
  }

  async function handleLogout() {
    setLoggingOut(true)
    try {
      await logOut()
      navigate('/login')
    } catch {
      setLoggingOut(false)
    }
  }

  return (
    <div className="h-dvh flex flex-col overflow-hidden bg-[var(--color-surface)]">
      {error && (
        <div className="shrink-0 px-3 sm:px-4 py-2 text-center text-xs sm:text-sm text-[var(--color-danger)] bg-[var(--color-danger)]/10 border-b border-[var(--color-danger)]/20 safe-top">
          {error}
        </div>
      )}

      <div className="flex-1 flex min-h-0 relative">
        {showSidebarOnMobile && (
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
          currentUserId={user?.uid}
          currentUserName={name}
          currentUserEmail={email}
          onSelect={(id) => {
            setActiveId(id)
            setSidebarOpen(false)
          }}
          onStartChat={handleStartChat}
          onLogout={handleLogout}
          loggingOut={loggingOut}
          loadingConversations={loading}
          mobileOpen={showSidebarOnMobile}
          onCloseMobile={() => setSidebarOpen(false)}
        />

        <div
          className={[
            'flex-1 flex flex-col min-w-0 min-h-0',
            showSidebarOnMobile ? 'hidden md:flex' : 'flex',
          ].join(' ')}
        >
          <ChatWindow
            conversation={activeConversation}
            currentUserId={user?.uid}
            currentUserName={name}
            currentUserEmail={email}
            onBack={() => {
              setActiveId(null)
              setSidebarOpen(true)
            }}
          />
        </div>
      </div>
    </div>
  )
}
