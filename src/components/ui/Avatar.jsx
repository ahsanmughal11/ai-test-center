const sizes = {
  sm: 'size-9 text-xs',
  md: 'size-11 text-sm',
  lg: 'size-14 text-base',
}

const colors = [
  'bg-teal-600',
  'bg-violet-600',
  'bg-amber-600',
  'bg-rose-600',
  'bg-sky-600',
  'bg-emerald-600',
]

function getColor(name) {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

export default function Avatar({ name, src, size = 'md', online, className = '' }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div className={`relative shrink-0 ${className}`}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={`${sizes[size]} rounded-full object-cover ring-2 ring-[var(--color-border-subtle)]`}
        />
      ) : (
        <div
          className={`${sizes[size]} ${getColor(name)} flex items-center justify-center rounded-full font-semibold text-white ring-2 ring-[var(--color-border-subtle)]`}
        >
          {initials}
        </div>
      )}
      {online !== undefined && (
        <span
          className={[
            'absolute bottom-0 right-0 size-3 rounded-full ring-2 ring-[var(--color-surface-raised)]',
            online ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-text-muted)]',
          ].join(' ')}
        />
      )}
    </div>
  )
}
