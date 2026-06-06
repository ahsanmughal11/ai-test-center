const variants = {
  primary:
    'bg-[var(--color-accent)] text-[#0c0f14] hover:bg-[var(--color-accent-hover)] shadow-[0_0_20px_rgba(34,211,168,0.25)]',
  secondary:
    'bg-[var(--color-surface-overlay)] text-[var(--color-text-primary)] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-muted)]',
  ghost:
    'bg-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-overlay)]',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm font-semibold',
  lg: 'px-6 py-3 text-base font-semibold',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-200',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none',
        variants[variant],
        sizes[size],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}
