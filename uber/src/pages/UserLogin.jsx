import React,{useState, useContext} from 'react'
import { NavLink } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';
function UserLogin(){ 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState({})
    const { user, setUser } = useContext(UserDataContext)
  const navigate = useNavigate()
  

const submitHandler = async (e) => {
  e.preventDefault();
  const userData = {
      email: email,
      password: password
  }
  try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)
      if (response.status === 200 && response.data && response.data.user) {
          setUser(response.data.user)
          localStorage.setItem('token', response.data.token)
          toast.success('Login successful!');
          setTimeout(() => {
              navigate('/home')
          }, 1000); // 1 second delay for toast
      } else {
          toast.error('Login failed. Please check your credentials.');
      }
  } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
  }
  setEmail('')
  setPassword('')
}
// ...existing code...
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
            <h2 className='my-8 w-16 font-bold text-2xl font-mono'>RideUrWay</h2>
           
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
        
        <p className='text-center'>New here?<NavLink to='/signup' className="text-blue-600">Create new Account</NavLink></p>
      </form>
      </div>

      <div>
        <NavLink to='/CaptainLogin' className='bg-[#10b461] text-white flex justify-center items-centerfont-semibold mb-7 rounded px-2 py-2  w-full text-lg placeholder:text-base'>Sign in as Captain
        
        </NavLink>
      </div>

      
      
      
      
    </div>
  )
}

export default UserLogin
