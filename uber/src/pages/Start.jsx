import React from 'react'
import img1 from "../../images/GW-Generated-Image-5_27_2025__5_12_34_PM.png"
import { NavLink } from 'react-router-dom'
function Start() {
  return (
    <div>
        <div className='bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1624724126923-e2c021df1311?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRyYWZmaWMlMjBsaWdodHxlbnwwfHwwfHx8MA%3D%3D)] h-screen pt-9  flex justify-between flex-col w-full bg-red-400'>
            <h2 className='ml-8 w-16 font-bold text-2xl font-mono'>RideUrWay</h2>
            <div className='bg-white pb-7 px-4 py-4'>
               <h2 className='text-2xl font-bold'>Get Started With Us...</h2>
                <NavLink to='/login' className='flex item-center justify-center w-full bg-black text-white py-3 rounded mt-5 '>Continue</NavLink>
            </div>
        </div>
    </div>
  )
}

export default Start
