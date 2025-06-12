
import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'

const OtpVerify = () => {
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const { setUser } = useContext(UserDataContext)

  const verifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:4000/users/verify-otp', {
        phone,
        otp,
      }, {
        withCredentials: true
      })

      const { token, user } = response.data

      localStorage.setItem('token', token)
        setUser(user)
        
      setMessage('✅ OTP Verified Successfully!')
      navigate('/home')                      
    } catch (error) {
      setMessage('❌ OTP Verification Failed')
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>OTP Verification</h2>
      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <br />
      <button onClick={verifyOtp}>Verify OTP</button>
      <p>{message}</p>
    </div>
  )
}

export default OtpVerify
