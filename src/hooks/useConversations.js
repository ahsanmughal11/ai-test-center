import { useEffect, useState } from 'react'
import { subscribeToConversations } from '../services/chatService'

export function useConversations(userId) {
  const [conversations, setConversations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!userId) return undefined

    const unsubscribe = subscribeToConversations(
      userId,
      (nextConversations) => {
        setConversations(nextConversations)
        setLoading(false)
      },
      (err) => {
        setError(err.message ?? 'Failed to load conversations')
        setLoading(false)
      }
    )

    return unsubscribe
  }, [userId])

  return {
    conversations: userId ? conversations : [],
    loading: Boolean(userId) && loading,
    error: userId ? error : null,
  }
}
