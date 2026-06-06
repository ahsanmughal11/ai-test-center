import Avatar from '../ui/Avatar'
import Button from '../ui/Button'

export default function UserAccountBar({
  name,
  email,
  onLogout,
  loggingOut = false,
  compact = false,
}) {
  if (compact) {
    return (
      <div className="flex items-center gap-2 min-w-0 px-3 py-2 rounded-xl bg-[var(--color-surface-overlay)] border border-[var(--color-border-subtle)]">
        <Avatar name={name} size="sm" />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-[var(--color-text-primary)] truncate">{name}</p>
          <p className="text-[10px] text-[var(--color-text-muted)] truncate">{email}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-3 sm:p-4 border-t border-[var(--color-border)] bg-[var(--color-surface-overlay)]/50 safe-bottom">
      <div className="flex items-center gap-3 min-w-0">
        <Avatar name={name} size="md" />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)]">
            Signed in as
          </p>
          <p className="font-semibold text-sm text-[var(--color-text-primary)] truncate">
            {name}
          </p>
          <p className="text-xs text-[var(--color-text-secondary)] truncate">
            {email}
          </p>
        </div>
      </div>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        className="w-full mt-3"
        onClick={onLogout}
        disabled={loggingOut}
      >
        {loggingOut ? 'Signing out...' : 'Sign out'}
      </Button>
    </div>
  )
}
