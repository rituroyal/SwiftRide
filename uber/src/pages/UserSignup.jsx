import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

function UserSignup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    // Handle form submission here
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    })
    console.log(formData)
  }

  return (
    <div className='px-14 h-screen flex flex-col justify-between mx-auto'>
      <div className='mb-8'>
        <h2 className='my-4  font-bold text-2xl font-mono'>RideUrWay</h2>
        
        <form onSubmit={submitHandler}  >
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
            type="submit"
            className='bg-[#111] text-white font-semibold mb-4 rounded px-2 py-2 w-full text-lg'
          >
            Sign Up
          </button>

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
