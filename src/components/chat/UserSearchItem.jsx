import Avatar from '../ui/Avatar'

export default function UserSearchItem({ user, onStartChat, starting }) {
  return (
    <button
      type="button"
      onClick={() => onStartChat(user)}
      disabled={starting}
      className="w-full flex items-center gap-3 px-3 sm:px-4 py-3 text-left transition-colors duration-150 hover:bg-[var(--color-surface-overlay)] border-l-2 border-transparent disabled:opacity-50"
    >
      <Avatar name={user.name} size="md" />
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-sm text-[var(--color-text-primary)]">
          {user.name}
        </p>
        <p className="truncate text-xs text-[var(--color-text-muted)]">
          {user.email}
        </p>
      </div>
      <span className="text-xs font-medium text-[var(--color-accent)] shrink-0">
        Chat
      </span>
    </button>
  )
}
