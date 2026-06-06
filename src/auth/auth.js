import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase/firebaseConfig'

export function getAuthErrorMessage(error) {
  const code = error?.code ?? ''

  const messages = {
    'auth/email-already-in-use': 'An account with this email already exists.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/weak-password': 'Password must be at least 6 characters.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/invalid-credential': 'Invalid email or password.',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Check your connection.',
  }

  return messages[code] ?? error?.message ?? 'Something went wrong. Please try again.'
}

async function createUserProfile(user, name) {
  await setDoc(doc(db, 'users', user.uid), {
    uid: user.uid,
    name,
    email: user.email,
    createdAt: serverTimestamp(),
  })
}

export async function signUp({ name, email, password }) {
  const credential = await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(credential.user, { displayName: name })
  await createUserProfile(credential.user, name)
  return credential.user
}

export async function signIn({ email, password }) {
  const credential = await signInWithEmailAndPassword(auth, email, password)
  return credential.user
}

export async function logOut() {
  await signOut(auth)
}
