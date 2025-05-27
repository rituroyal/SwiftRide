import React,{useState} from 'react'
import { NavLink } from 'react-router-dom'

function UserLogin(){ 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState({})

    const submitHandler=(e)=>{
        e.preventDefault();
       
        setUserData({
            email:email,
            password:password
        })
        
        setEmail('')
        setPassword('')
    }
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
        <NavLink to='/CaptainLogin' className='bg-[#10b461] text-white flex justify-center items-centerfont-semibold mb-7 rounded px-2 py-2  w-full text-lg placeholder:text-base'>Sign in as Captain</NavLink>
      </div>
    </div>
  )
}

export default UserLogin
