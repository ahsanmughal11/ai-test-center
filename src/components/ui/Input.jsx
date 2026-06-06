export default function Input({
  label,
  id,
  type = 'text',
  error,
  icon,
  className = '',
  ...props
}) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-[var(--color-text-secondary)]"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          type={type}
          className={[
            'w-full rounded-xl border bg-[var(--color-surface-overlay)] px-4 py-3 text-sm text-[var(--color-text-primary)]',
            'placeholder:text-[var(--color-text-muted)] transition-colors duration-200',
            'focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent-muted)]',
            error ? 'border-[var(--color-danger)]' : 'border-[var(--color-border)]',
            icon ? 'pl-10' : '',
          ].join(' ')}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs text-[var(--color-danger)]">{error}</p>
      )}
    </div>
  )
}
