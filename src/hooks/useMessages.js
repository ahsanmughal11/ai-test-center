import { useEffect, useState } from 'react'
import { subscribeToMessages } from '../services/chatService'
import { formatMessageTime } from '../utils/formatTime'

export function useMessages(chatId, currentUserId) {
  const [messages, setMessages] = useState([])
  const [loadedChatId, setLoadedChatId] = useState(null)

  useEffect(() => {
    if (!chatId || !currentUserId) return undefined

    const unsubscribe = subscribeToMessages(
      chatId,
      (nextMessages) => {
        setMessages(
          nextMessages.map((message) => ({
            ...message,
            time: formatMessageTime(message.createdAt),
          }))
        )
        setLoadedChatId(chatId)
      },
      () => {
        setLoadedChatId(chatId)
      }
    )

    return unsubscribe
  }, [chatId, currentUserId])

  const isActiveChat = chatId && currentUserId && loadedChatId === chatId

  return {
    messages: isActiveChat ? messages : [],
    loading: Boolean(chatId && currentUserId) && !isActiveChat,
  }
}
