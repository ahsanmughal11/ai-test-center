export default function MessageBubble({ message, isSent, showSender }) {
  return (
    <div className={`flex ${isSent ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[75%] sm:max-w-[65%] ${isSent ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
        {showSender && message.senderName && (
          <span className="text-xs font-medium text-[var(--color-text-muted)] px-1">
            {message.senderName}
          </span>
        )}
        <div
          className={[
            'px-4 py-2.5 rounded-2xl text-sm leading-relaxed',
            isSent
              ? 'bg-[var(--color-bubble-sent)] text-white rounded-br-md'
              : 'bg-[var(--color-bubble-received)] text-[var(--color-text-primary)] rounded-bl-md border border-[var(--color-border-subtle)]',
          ].join(' ')}
        >
          {message.text}
        </div>
        <span className="text-[10px] text-[var(--color-text-muted)] px-1">
          {message.time}
        </span>
      </div>
    </div>
  )
}
