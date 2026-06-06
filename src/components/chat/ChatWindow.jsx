import { useState, useRef, useEffect } from 'react'
import Avatar from '../ui/Avatar'
import MessageBubble from './MessageBubble'
import Button from '../ui/Button'

export default function ChatWindow({ conversation, onBack }) {
  const [draft, setDraft] = useState('')
  const [localMessages, setLocalMessages] = useState([])
  const bottomRef = useRef(null)

  const baseMessages = conversation?.messages ?? []
  const messages = [...baseMessages, ...localMessages]

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  if (!conversation) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[var(--color-surface)] p-8 text-center">
        <div className="size-20 rounded-3xl bg-[var(--color-surface-overlay)] border border-[var(--color-border)] flex items-center justify-center mb-6">
          <svg className="size-10 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
          Select a conversation
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)] max-w-xs">
          Pick a chat from the sidebar to start messaging
        </p>
      </div>
    )
  }

  const isGroup = conversation.id === '2' || conversation.id === '5'

  function handleSend(e) {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return

    const now = new Date()
    const time = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })

    setLocalMessages((prev) => [
      ...prev,
      { id: `local-${Date.now()}`, senderId: 'me', text, time },
    ])
    setDraft('')
  }

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[var(--color-surface)]">
      <header className="flex items-center gap-3 px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-surface-raised)] shrink-0">
        <button
          type="button"
          onClick={onBack}
          className="md:hidden p-2 -ml-2 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-overlay)]"
        >
          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        <Avatar name={conversation.name} online={conversation.online} size="md" />
        <div className="min-w-0 flex-1">
          <h2 className="font-semibold text-[var(--color-text-primary)] truncate">
            {conversation.name}
          </h2>
          <p className="text-xs text-[var(--color-text-muted)]">
            {conversation.online ? 'Online' : 'Offline'}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button type="button" className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-overlay)] transition-colors">
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
          <button type="button" className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-overlay)] transition-colors">
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
            </svg>
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto scrollbar-thin px-4 py-6 space-y-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isSent={message.senderId === 'me'}
            showSender={isGroup && message.senderId !== 'me'}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSend}
        className="p-4 border-t border-[var(--color-border)] bg-[var(--color-surface-raised)] shrink-0"
      >
        <div className="flex items-end gap-2">
          <button
            type="button"
            className="p-2.5 rounded-xl text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-overlay)] transition-colors shrink-0"
          >
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.009-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
            </svg>
          </button>
          <div className="flex-1 relative">
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
              className="w-full resize-none rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-overlay)] px-4 py-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent-muted)] max-h-32"
            />
          </div>
          <Button type="submit" size="sm" disabled={!draft.trim()} className="shrink-0 !rounded-xl">
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
          </Button>
        </div>
      </form>
    </div>
  )
}
