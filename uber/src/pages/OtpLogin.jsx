


import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';

const OtpLogin = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const sendOtp = async () => {
    try {
      const res = await axios.post(
        'http://localhost:4000/api/auth/send-otp',
        { phone },
        { withCredentials: true }
      );
      setMessage(res.data.message);
      setStep(2);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Something went wrong');
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post(
        'http://localhost:4000/api/auth/verify-otp',
        {  phone, code: otp  },
        { withCredentials: true }
      );
      setUser(res.data.user);
      setMessage(`Welcome, ${res.data.user.fullname.firstname}`);
      navigate('/home');
    } catch (err) {
      setMessage(err.response?.data?.error || 'OTP verification failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login with OTP</h2>

        {step === 1 && (
          <>
            <label className="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              onClick={sendOtp}
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <label className="block mb-2 text-sm font-medium text-gray-700">OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              onClick={verifyOtp}
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Verify OTP
            </button>
          </>
        )}

        {message && (
          <p className="text-sm text-center mt-4 text-gray-600">{message}</p>
        )}
      </div>
    </div>
  );
};

export default OtpLogin;

