import { useState } from 'react'
import app from './firebase/firebaseConfig'
import './App.css'

function App() {
  console.log("Firebase app initialized:", app)

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-green-600">
          Firebase Connected 🚀
        </h1>
      </div>
    </>
  )
}

export default App
