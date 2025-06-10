import React,{useState} from 'react'
import { Link } from 'react-router-dom';


function ConfirmRidePopUp(props) {
    const [otp, setotp] = useState("")

    const submitHandler = (e) => {
      e.preventDefault();
      // Handle OTP submission logic here

    };
  return (
    <div className="w-full h-screen overflow-hidden justify-center  border border-gray-300 rounded-xl bg-gray-50 flex flex-col  items-center ">
          <div className='w-full px-4 py-2 relative flex justify-between items-center'>
            <h5 onClick={() => props.setRidePopPanel(false)} className='absolute right-6 top-[-2] text-2xl '><i className='ri-arrow-down-wide-line'></i></h5>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirm This Ride To Start</h2>
          </div>

            <div className='flex items-center gap-3 '>
              <img
                src="https://imgs.search.brave.com/cMKPEZRQ94c8cyLIyzjd3ZT8zhTRGMcWw8Gz_Vxf24o/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQ1/MDI2ODU1OC9waG90/by9zdW1tZXItc2Vs/ZmllLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1JaXZHUUlY/VjdwQ3VfdHIxMEkw/a2FEb3VVdElpX3BL/ek9ycUJfTkFHb0NB/PQ"
                alt="Ride Image"
                className="h-20 w-20 object-contain rounded-full bg-gray-100 p-1 shadow-lg mb-4"
              />
              <p className="text-gray-600 font-bold italic mb-2">Ritu Raj</p>
            </div>
            <div>
              <div className="text-gray-600 font-semibold mb-2">Pickup Location:<p className='text-base'> 24B, Near Kapoor’s cafe, Sheryians Coding School, Bhopal</p></div>
            <div className="text-gray-600 font-semibold mb-2">Dropoff Location:<p className='text-base'> 14A, Opposite DB Mall, MP Nagar, Bhopal</p></div>
            <div className="text-gray-600 font-semibold mb-4">Estimated Fare:<p className='text-base'> ₹150</p></div>
            </div>
            <div className='flex flex-col w-full px-4 '>
              <form onSubmit={(e)=>{submitHandler(e)}} >
                <input type="text" value={otp} onChange={(e)=>{setotp(e.target.value)}} placeholder='Enter OTP' className='w-full px-4 py-2 border border-gray-300 rounded-lg mb-3' required />
                <Link to='/captain-riding' className="bg-green-500 flex items-center justify-center text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200 my-3">
            Confirm Ride
            
            </Link>
            <button onClick={() => {props.setRidePopPanel(false); props.setConfirmRidePopPanel(false);}} className="bg-zinc-400 text-white px-4 py-2 rounded-lg hover:bg-zinc-500 transition duration-200 my-3">
            Cancel Ride
            </button>
              </form>
            </div>
        </div>
  )
}

export default ConfirmRidePopUp
