import { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'

export function useUserProfile(userId, authUser) {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    if (!userId) return undefined

    const unsubscribe = onSnapshot(
      doc(db, 'users', userId),
      (snapshot) => {
        setProfile(snapshot.exists() ? snapshot.data() : null)
      },
      () => {
        setProfile(null)
      }
    )

    return unsubscribe
  }, [userId])

  return {
    name: profile?.name || authUser?.displayName || 'User',
    email: profile?.email || authUser?.email || '',
  }
}
