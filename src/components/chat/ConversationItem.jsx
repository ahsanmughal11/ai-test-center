import Avatar from '../ui/Avatar'

export default function ConversationItem({ conversation, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'w-full flex items-center gap-3 px-3 sm:px-4 py-3 sm:py-3.5 text-left transition-colors duration-150',
        active
          ? 'bg-[var(--color-accent-muted)] border-l-2 border-[var(--color-accent)]'
          : 'hover:bg-[var(--color-surface-overlay)] border-l-2 border-transparent',
      ].join(' ')}
    >
      <Avatar name={conversation.name} online={conversation.online} size="md" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate font-semibold text-sm text-[var(--color-text-primary)]">
            {conversation.name}
          </span>
          <span className="shrink-0 text-xs text-[var(--color-text-muted)]">
            {conversation.lastTime}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 mt-0.5">
          <p className="truncate text-sm text-[var(--color-text-secondary)]">
            {conversation.lastMessage}
          </p>
          {conversation.unread > 0 && (
            <span className="shrink-0 flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-[var(--color-accent)] text-[10px] font-bold text-[#0c0f14]">
              {conversation.unread}
            </span>
          )}
        </div>
      </div>
    </button>
  )
}
