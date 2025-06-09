import React,{useState,useContext} from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

function CaptionLogin() {
    const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        
  const { updateCaptain, captain } = useContext(CaptainDataContext)
        
  const navigate = useNavigate();
 


        const submitHandler=async(e)=>{
            e.preventDefault();
           const captain = {
             email: email,
             password: password
          }
          
          const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain) 

          console.log(response.data, 'captain login response')
          if(response.data){
          updateCaptain(response.data.captain)

          localStorage.setItem('token', response.data.token) // Store the token in localStorage
          }
          setEmail('')
          setPassword('')
          navigate('/captain-home')
        }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
        <h2 className='my-4  font-bold text-2xl font-mono'>-RideUrWay-</h2>
           
      <form onSubmit={(e)=>submitHandler(e)}>
        <h3 className='text-lg font-medium mb-2'>What's your email</h3>
        <input 
        required
        value={email}
        onChange={(e)=>{setEmail(e.target.value)}}
        className='bg-[#eeeeee] mb-7 rounded px-2 py-2 border w-full text-lg placeholder:text-base' 
        type='email' 
        placeholder='Enter Your Email'
        />
        <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
        <input 
        required type='password' 
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        className='bg-[#eeeeee] mb-7 rounded px-2 py-2 border w-full text-lg placeholder:text-base' 
        placeholder='Enter Password'/>
        <button
        className='bg-[#111] text-white font-semibold mb-7 rounded px-2 py-2  w-full text-lg placeholder:text-base' >Login</button>
        <p className='text-center'>Join a Fleet?<NavLink to='/CaptainSignup' className="text-blue-600">Register as a Captain</NavLink></p>
      </form>
      </div>

      <div>
        <NavLink to='/login' className='bg-[#d5622d] text-white flex justify-center items-centerfont-semibold mb-7 rounded px-2 py-2  w-full text-lg placeholder:text-base'>Sign in as User</NavLink>
      </div>
    </div>
  )
}

export default CaptionLogin
