import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'
import { formatRelativeTime } from '../utils/formatTime'

export function getChatId(uid1, uid2) {
  return [uid1, uid2].sort().join('_')
}

async function getUserName(userId) {
  const userSnap = await getDoc(doc(db, 'users', userId))
  return userSnap.exists() ? userSnap.data().name : 'Unknown'
}

export function subscribeToConversations(userId, onUpdate, onError) {
  const chatsQuery = query(
    collection(db, 'chats'),
    where('participants', 'array-contains', userId),
    orderBy('lastMessageAt', 'desc')
  )

  return onSnapshot(
    chatsQuery,
    async (snapshot) => {
      const conversations = await Promise.all(
        snapshot.docs.map(async (chatDoc) => {
          const data = chatDoc.data()
          const otherUserId = data.participants.find((id) => id !== userId)
          const name = otherUserId ? await getUserName(otherUserId) : 'Unknown'

          return {
            id: chatDoc.id,
            otherUserId,
            name,
            lastMessage: data.lastMessage || 'No messages yet',
            lastTime: formatRelativeTime(data.lastMessageAt),
            online: false,
            unread: 0,
          }
        })
      )

      onUpdate(conversations)
    },
    onError
  )
}

export function subscribeToMessages(chatId, onUpdate, onError) {
  const messagesQuery = query(
    collection(db, 'chats', chatId, 'messages'),
    orderBy('createdAt', 'asc')
  )

  return onSnapshot(
    messagesQuery,
    (snapshot) => {
      const messages = snapshot.docs.map((messageDoc) => {
        const data = messageDoc.data()
        return {
          id: messageDoc.id,
          senderId: data.senderId,
          text: data.text,
          type: data.type ?? 'text',
          createdAt: data.createdAt,
        }
      })

      onUpdate(messages)
    },
    onError
  )
}

export async function searchUsersByName(searchTerm, currentUserId) {
  const term = searchTerm.trim().toLowerCase()
  if (term.length < 2) return []

  const usersQuery = query(
    collection(db, 'users'),
    where('nameLower', '>=', term),
    where('nameLower', '<=', `${term}\uf8ff`),
    limit(10)
  )

  const snapshot = await getDocs(usersQuery)

  return snapshot.docs
    .map((userDoc) => ({ id: userDoc.id, ...userDoc.data() }))
    .filter((user) => user.uid !== currentUserId)
}

export async function getOrCreateChat(currentUser, otherUser) {
  const chatId = getChatId(currentUser.uid, otherUser.uid)
  const chatRef = doc(db, 'chats', chatId)
  const chatSnap = await getDoc(chatRef)

  if (!chatSnap.exists()) {
    await setDoc(chatRef, {
      participants: [currentUser.uid, otherUser.uid].sort(),
      lastMessage: '',
      lastMessageSenderId: null,
      lastMessageAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    })
  }

  return chatId
}

export async function sendMessage(chatId, senderId, text, type = 'text') {
  const trimmed = text.trim()
  if (!trimmed) return

  await addDoc(collection(db, 'chats', chatId, 'messages'), {
    senderId,
    text: trimmed,
    type,
    createdAt: serverTimestamp(),
  })

  await updateDoc(doc(db, 'chats', chatId), {
    lastMessage: trimmed,
    lastMessageSenderId: senderId,
    lastMessageAt: serverTimestamp(),
  })
}
