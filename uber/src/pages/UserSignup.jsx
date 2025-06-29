import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'
import OtpInput from 'react-otp-input';

function UserSignup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })

  const navigate = useNavigate()
  const { user, setUser } = React.useContext(UserDataContext)
  const [OTP, setOtp] = useState("");
    const [otpmodal, setOtpModal] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);

    async function submitHandle(e) {

        e.preventDefault()
        if (otpLoading) return;
        setOtpLoading(true);
        
        try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/send-otp`, { email: formData.email });
        console.log(response.data);
        setOtpModal(true);
    } catch (error) {
        console.log("SENDOTP API ERROR............", error);
    } finally {
        setOtpLoading(false);
    }
    }

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    console.log("OTP:", OTP)
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    const newUser = {
      fullname: {
        firstname: formData.firstName
      },
      lastname: formData.lastName,
      email: formData.email,

      phone: formData.phone,
      password: formData.password,
      otp: OTP
    }
    console.log("New User Data:", newUser)

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

    if (response.status === 201) {
      console.log("User registered successfully")
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }
    // Handle form submission here
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    })

  }



  return (
    <div className='px-14 h-screen flex flex-col justify-between mx-auto'>
      <div className='mb-8'>
        <h2 className='my-4  font-bold text-2xl font-mono'>RideUrWay</h2>

        <form  >
          <div className='flex gap-2'>
            <div>
              <h3 className='text-lg font-medium mb-2'>First Name</h3>
              <input
                required
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className='bg-[#eeeeee] mb-4 rounded px-2 py-2 border w-full text-lg placeholder:text-base'
                type='text'
                placeholder='Enter Your First Name'
              />
            </div>

            <div>
              <h3 className='text-lg font-medium mb-2'>Last Name</h3>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className='bg-[#eeeeee] mb-4 rounded px-2 py-2 border w-full text-lg placeholder:text-base'
                type='text'
                placeholder='Enter Your Last Name'
              />
            </div>
          </div>

          <h3 className='text-lg font-medium mb-2'>Email</h3>
          <input
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
            className='bg-[#eeeeee] mb-4 rounded px-2 py-2 border w-full text-lg placeholder:text-base'
            type='email'
            placeholder='Enter Your Email'
          />

          <h3 className='text-lg font-medium mb-2'>Phone Number</h3>
          <input
            required
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className='bg-[#eeeeee] mb-4 rounded px-2 py-2 border w-full text-lg placeholder:text-base'
            type='tel'
            placeholder='Enter Your Phone Number'
          />

          <h3 className='text-lg font-medium mb-2'>Password</h3>
          <input
            required
            name="password"
            value={formData.password}
            onChange={handleChange}
            className='bg-[#eeeeee] mb-4 rounded px-2 py-2 border w-full text-lg placeholder:text-base'
            type='password'
            placeholder='Enter Password'
          />

          <h3 className='text-lg font-medium mb-2'>Confirm Password</h3>
          <input
            required
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className='bg-[#eeeeee] mb-4 rounded px-2 py-2 border w-full text-lg placeholder:text-base'
            type='password'
            placeholder='Confirm Password'
          />

          <button
            type="button"
            onClick={(e) => submitHandle(e)}
            className='bg-[#111] text-white font-semibold mb-4 rounded px-2 py-2 w-full text-lg'
          >

            {otpLoading ? "Sending OTP..." : "Send OTP"}
          </button>

          {otpmodal &&
            <form  >
              <OtpInput
                value={OTP}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input
                  {...props}
                  className="text-black bg-white border mx-auto  border-black   h-12 text-xl text-center rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-4"
                />} />
              <button type='button' onClick={(e)=>submitHandler(e)} className='rounded-md px-4 py-2 bg-green-500 text-white text-xl w-full my-4 cursor-pointer'>
                Verify Email
              </button>

            </form>
          }

          <p className='text-center'>
            Already have an account? <NavLink to='/login' className="text-blue-600">Login</NavLink>
          </p>
        </form>
      </div>
      <div>
        <p className='text-[8px] text-zinc-600'>By proceeding, yu consent to get calls, WhatsApp or SMS message, including by automated means, from Uber and its affiliated to the number provided.</p>
      </div>
    </div>
  )
}

export default UserSignup
