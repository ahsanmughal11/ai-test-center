import { useState, useRef, useEffect } from 'react'
import Avatar from '../ui/Avatar'
import MessageBubble from './MessageBubble'
import UserAccountBar from './UserAccountBar'
import Button from '../ui/Button'
import { useMessages } from '../../hooks/useMessages'
import { sendMessage } from '../../services/chatService'

export default function ChatWindow({
  conversation,
  currentUserId,
  currentUserName,
  currentUserEmail,
  onBack,
}) {
  const [draft, setDraft] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef(null)
  const { messages, loading } = useMessages(conversation?.id, currentUserId)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length, conversation?.id])

  if (!conversation) {
    return (
      <div className="flex-1 flex flex-col min-w-0 bg-[var(--color-surface)]">
        <div className="md:hidden p-3 border-b border-[var(--color-border)] bg-[var(--color-surface-raised)] shrink-0 safe-top">
          <UserAccountBar
            name={currentUserName}
            email={currentUserEmail}
            compact
          />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 text-center">
          <div className="size-16 sm:size-20 rounded-3xl bg-[var(--color-surface-overlay)] border border-[var(--color-border)] flex items-center justify-center mb-4 sm:mb-6">
            <svg className="size-8 sm:size-10 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
            </svg>
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-[var(--color-text-primary)] mb-2">
            Select a conversation
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)] max-w-xs px-2">
            Search for someone by name in the sidebar to start a new chat
          </p>
        </div>
      </div>
    )
  }

  async function handleSend(e) {
    e.preventDefault()
    const text = draft.trim()
    if (!text || sending) return

    setSending(true)
    setDraft('')

    try {
      await sendMessage(conversation.id, currentUserId, text)
    } catch {
      setDraft(text)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[var(--color-surface)]">
      <header className="flex flex-col border-b border-[var(--color-border)] bg-[var(--color-surface-raised)] shrink-0 safe-top">
        <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3">
          <button
            type="button"
            onClick={onBack}
            className="md:hidden p-2 -ml-1 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-overlay)] shrink-0"
            aria-label="Back to conversations"
          >
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          <Avatar name={conversation.name} online={conversation.online} size="md" />
          <div className="min-w-0 flex-1">
            <h2 className="font-semibold text-sm sm:text-base text-[var(--color-text-primary)] truncate">
              {conversation.name}
            </h2>
            <p className="text-xs text-[var(--color-text-muted)]">
              Direct message
            </p>
          </div>
        </div>
        <div className="md:hidden px-3 pb-2.5">
          <UserAccountBar
            name={currentUserName}
            email={currentUserEmail}
            compact
          />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto scrollbar-thin px-3 sm:px-4 py-4 sm:py-6 space-y-3 sm:space-y-4 min-h-0">
        {loading ? (
          <p className="text-center text-sm text-[var(--color-text-muted)]">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-center text-sm text-[var(--color-text-muted)] px-2">
            No messages yet. Say hello!
          </p>
        ) : (
          messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isSent={message.senderId === currentUserId}
            />
          ))
        )}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSend}
        className="p-3 sm:p-4 border-t border-[var(--color-border)] bg-[var(--color-surface-raised)] shrink-0 safe-bottom"
      >
        <div className="flex items-end gap-2">
          <div className="flex-1 min-w-0">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend(e)
                }
              }}
              placeholder="Type a message..."
              rows={1}
              disabled={sending}
              className="w-full resize-none rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-overlay)] px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent-muted)] max-h-28 sm:max-h-32 disabled:opacity-50"
            />
          </div>
          <Button type="submit" size="sm" disabled={!draft.trim() || sending} className="shrink-0 !rounded-xl !px-3 sm:!px-4">
            {sending ? (
              <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
              </svg>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
