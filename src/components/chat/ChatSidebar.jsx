import { useEffect, useState } from 'react'
import ConversationItem from './ConversationItem'
import UserSearchItem from './UserSearchItem'
import UserAccountBar from './UserAccountBar'
import { searchUsersByName } from '../../services/chatService'

export default function ChatSidebar({
  conversations,
  activeId,
  currentUserId,
  currentUserName,
  currentUserEmail,
  onSelect,
  onStartChat,
  onLogout,
  loggingOut = false,
  mobileOpen,
  onCloseMobile,
  loadingConversations = false,
}) {
  const [search, setSearch] = useState('')
  const [userResults, setUserResults] = useState([])
  const [searchingUsers, setSearchingUsers] = useState(false)
  const [startingChatUserId, setStartingChatUserId] = useState(null)

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  const isUserSearch = search.trim().length >= 2

  function handleSearchChange(e) {
    const value = e.target.value
    setSearch(value)
    if (value.trim().length >= 2) {
      setSearchingUsers(true)
    } else {
      setSearchingUsers(false)
      setUserResults([])
    }
  }

  useEffect(() => {
    if (!isUserSearch || !currentUserId) {
      return undefined
    }

    const timeoutId = setTimeout(async () => {
      try {
        const results = await searchUsersByName(search, currentUserId)
        setUserResults(results)
      } catch {
        setUserResults([])
      } finally {
        setSearchingUsers(false)
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [search, currentUserId, isUserSearch])

  async function handleStartChat(user) {
    setStartingChatUserId(user.uid)
    try {
      await onStartChat(user)
      setSearch('')
      onCloseMobile?.()
    } finally {
      setStartingChatUserId(null)
    }
  }

  return (
    <aside
      className={[
        'flex flex-col bg-[var(--color-surface-raised)] border-r border-[var(--color-border)]',
        'w-full sm:max-w-sm md:w-80 lg:w-96 shrink-0 h-full',
        'absolute md:relative inset-y-0 left-0 z-20 md:z-auto',
        'transition-transform duration-300 ease-out safe-top',
        mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
      ].join(' ')}
    >
      <div className="p-3 sm:p-4 border-b border-[var(--color-border)] shrink-0">
        <div className="flex items-center gap-3 mb-3 sm:mb-4">
          <div className="flex items-center justify-center size-9 rounded-xl bg-[var(--color-accent-muted)] shrink-0">
            <svg className="size-5 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
            </svg>
          </div>
          <h1 className="text-lg font-bold tracking-tight truncate">Chats</h1>
        </div>

        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[var(--color-text-muted)] pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            type="search"
            placeholder="Search people or chats..."
            value={search}
            onChange={handleSearchChange}
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-overlay)] py-2.5 pl-10 pr-4 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent-muted)]"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin min-h-0">
        {isUserSearch && (
          <div className="border-b border-[var(--color-border)]">
            <p className="px-3 sm:px-4 pt-3 pb-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
              People
            </p>
            {searchingUsers && isUserSearch ? (
              <p className="px-3 sm:px-4 pb-4 text-sm text-[var(--color-text-muted)]">Searching...</p>
            ) : isUserSearch && userResults.length === 0 ? (
              <p className="px-3 sm:px-4 pb-4 text-sm text-[var(--color-text-muted)]">No users found</p>
            ) : (
              userResults.map((user) => (
                <UserSearchItem
                  key={user.uid}
                  user={user}
                  onStartChat={handleStartChat}
                  starting={startingChatUserId === user.uid}
                />
              ))
            )}
          </div>
        )}

        <p className="px-3 sm:px-4 pt-3 pb-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
          {isUserSearch ? 'Your chats' : 'Conversations'}
        </p>

        {loadingConversations ? (
          <p className="p-6 text-center text-sm text-[var(--color-text-muted)]">
            Loading conversations...
          </p>
        ) : filteredConversations.length === 0 ? (
          <p className="px-3 sm:px-4 pb-6 text-center text-sm text-[var(--color-text-muted)]">
            {isUserSearch
              ? 'No matching conversations'
              : 'No chats yet. Search for someone to start messaging.'}
          </p>
        ) : (
          filteredConversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              active={conversation.id === activeId}
              onClick={() => {
                onSelect(conversation.id)
                onCloseMobile?.()
              }}
            />
          ))
        )}
      </div>

      <UserAccountBar
        name={currentUserName}
        email={currentUserEmail}
        onLogout={onLogout}
        loggingOut={loggingOut}
      />
    </aside>
  )
}
