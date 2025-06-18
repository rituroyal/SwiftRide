import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


function ConfirmRidePopUp(props) {
    const [otp, setotp] = useState("")
    const navigate=useNavigate()

    const submitHandler = async(e) => {
      e.preventDefault();
      // Handle OTP submission logic here
      const token=localStorage.getItem('token');
      const res=await axios.get(`${import.meta.env.VITE_BASE_URL}/api/rides/start-ride`,{
        params:{
          rideId:props.confirmRideData._id,
          otp:otp
        },
        headers:{
        Authorization: `Bearer ${token}`
      }
      },
    )

      if (res.status === 200) {
      
        
        const user = props.confirmRideData?.user || {};
const fullName = `${user.fullname?.firstname || ''} ${user.fullname?.lastname || ''}`.trim();
        localStorage.setItem(
          'currentRide',
          JSON.stringify({
            user: {
              name: fullName || 'Passenger',
              image: user.image || 'https://via.placeholder.com/150',
            },
            pickupLocation: props.confirmRideData?.pickup || 'Not available',
            dropoffLocation: props.confirmRideData?.destination || 'Not available',
            estimatedFare: props.confirmRideData?.fare?.toString() || '0',
          })
        );
        

      props.setConfirmRidePopPanel(false)
      navigate('/captain-riding');

    }




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
              <p className="text-gray-600 font-bold italic mb-2">{props?.confirmRideData?.user?.fullname?.firstname + " " + props?.confirmRideData?.user?.fullname?.lastname}</p>
            </div>
            <div>
              <div className="text-gray-600 font-semibold mb-2">Pickup Location:<p className='text-base'> {props?.confirmRideData?.pickup}</p></div>
            <div className="text-gray-600 font-semibold mb-2">Dropoff Location:<p className='text-base'> {props.confirmRideData?.destination}</p></div>
            <div className="text-gray-600 font-semibold mb-4">Estimated Fare:<p className='text-base'>{props.confirmRideData?.fare} </p></div>
            </div>
            <div className='flex flex-col w-full px-4 '>
              <form onSubmit={(e)=>{submitHandler(e)}} >
                <input onChange={(e)=>setotp(e.target.value)} placeholder='Enter OTP' className='w-full px-4 py-2 border border-gray-300 rounded-lg mb-3' required />
                        <button
                          type='submit'
                          className={`bg-green-500 flex items-center justify-center w-full text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200 my-3 ${otp.length!=6 ? 'opacity-50 pointer-events-none' : ''}`}
                          tabIndex={!otp ? -1 : 0}
                          aria-disabled={!otp}
                        >
                          Confirm Ride
                        </button>
                        <button onClick={() => {props.setRidePopPanel(false); props.setConfirmRidePopPanel(false);}} className="bg-zinc-400 w-full text-white px-4 py-2 rounded-lg hover:bg-zinc-500 transition duration-200 my-3">
            Cancel Ride
            </button>
              </form>
            </div>
        </div>
  )
}

export default ConfirmRidePopUp
