import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import SignUpPage from './pages/SignUpPage'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import ChatPage from './pages/ChatPage'
import Protected from './components/protected/protected'
import ProfilePage from './pages/ProfilePage'

function App() {

  return (
    <>
      <Routes >
        {/* Auth  */}
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/logIn" element={<LoginPage />} />
        <Route path="*" element={<LoginPage />} />


        <Route path="/chat" element={<Protected><ChatPage /></Protected>} />
        <Route path="/profile" element={<Protected><ProfilePage /></Protected>} />
        
        <Route path="*" element={<Protected><ChatPage /></Protected>} />
        
      </Routes>
    </>
  )
}

export default App
