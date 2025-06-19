import React from 'react'
import { Route,Routes } from 'react-router-dom'
import CaptionLogin from './pages/CaptionLogin'
import CaptainSignup from './pages/CaptainSignup'
import UserSignup from './pages/UserSignup'
import UserLogin from './pages/UserLogin'
import Home from './pages/home.jsx'
import Start from './pages/Start.jsx'
import UserProtectedWrapper from './pages/UserProtectedWrapper.jsx'
import UserLogout from './pages/UserLogout.jsx'
import CaptainHome from './pages/CaptainHome.jsx'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper.jsx'
import Riding from './pages/Riding.jsx'
import CaptainRiding from './pages/CaptainRiding.jsx'
import 'remixicon/fonts/remixicon.css'
import OtpLogin from './pages/OtpLogin.jsx'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start/>} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/riding' element={<Riding />} />
        <Route path='/signup' element={<UserSignup/>} />
        <Route path='/CaptainLogin' element={<CaptionLogin/>} />
        <Route path='/captain-login' element={<CaptionLogin/>} />

        <Route path='/CaptainSignup' element={<CaptainSignup />} />
        <Route path="/otp-login" element={<OtpLogin />} />
        <Route path='/home' element={
          <UserProtectedWrapper>
            <Home />
            </UserProtectedWrapper>
        } />
        <Route path='/user/logout' element={
          <UserProtectedWrapper>
            <UserLogout />
          </UserProtectedWrapper>
        } />
        <Route path='/captain-home' element={
          <CaptainProtectWrapper><CaptainHome /></CaptainProtectWrapper>
        } />

        <Route path='/captain-riding' element={
          <CaptainProtectWrapper><CaptainRiding /></CaptainProtectWrapper>
        } />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  )
}

export default App