import React from 'react'
import { Route,Routes } from 'react-router-dom'
import CaptionLogin from './pages/CaptionLogin'
import CaptainSignup from './pages/CaptainSignup'
import UserSignup from './pages/UserSignup'
import UserLogin from './pages/UserLogin'
import Home from './pages/Start.jsx'
import Start from './pages/Start.jsx'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start/>} />
        <Route path='/login' element={<UserLogin/>} />
        <Route path='/signup' element={<UserSignup/>} />
        <Route path='/CaptainLogin' element={<CaptionLogin/>} />
        <Route path='/CaptainSignup' element={<CaptainSignup />} />
        <Route path='/home' element={<Home />} />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  )
}

export default App