import React from 'react';

const RidePopUp = (props) => {
  
  return (
    
        <div className="w-full h-full  py-4 max-w-md border border-gray-300 rounded-xl bg-gray-50 flex flex-col justify-center items-center ">
          <div className='w-full px-4 py-2 relative flex justify-between items-center'>
            <h5 onClick={() => props.setRidePopPanel(false)} className='absolute right-6 top-[-2] text-2xl '><i className='ri-arrow-down-wide-line'></i></h5>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Ride Details</h2>
          </div>

            <div className='flex items-center gap-3 '>
              <img
                src="https://imgs.search.brave.com/cMKPEZRQ94c8cyLIyzjd3ZT8zhTRGMcWw8Gz_Vxf24o/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQ1/MDI2ODU1OC9waG90/by9zdW1tZXItc2Vs/ZmllLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1JaXZHUUlY/VjdwQ3VfdHIxMEkw/a2FEb3VVdElpX3BL/ek9ycUJfTkFHb0NB/PQ"
                alt="Ride Image"
                className="h-20 w-20 object-contain rounded-full bg-gray-100 p-1 shadow-lg mb-4"
              />
              {/* <p className="text-gray-600 font-bold italic mb-2">{props.rideData?.user?.firstname + " " + props.rideData?.user?.lastname}</p> */}
              <p className="text-gray-600 font-bold italic mb-2">
  {props.rideData?.user?.fullname?.firstname} {props.rideData?.user?.fullname?.lastname}
</p>

            
            </div>
            <div>
              <div className="text-gray-600 font-semibold mb-2">Pickup Location:<p className='text-base'>{props.rideData?.pickup} </p></div>
            <div className="text-gray-600 font-semibold mb-2">Dropoff Location:<p className='text-base'>{props.rideData?.destination}</p></div>
            <div className="text-gray-600 font-semibold mb-4">Estimated Fare:<p className='text-base'> ₹{props.rideData?.fare}</p></div>
            </div>
            <div className='flex flex-col w-full px-4 '>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200 my-3"
              onClick={() => {
                props.setRidePopPanel(false);
                props.confirmRide()
                props.setConfirmRidePopPanel(true);
              }}>
            Accept
            </button>
            <button onClick={() => props.setRidePopPanel(false)} className="bg-zinc-400 text-white px-4 py-2 rounded-lg hover:bg-zinc-500 transition duration-200 my-3">
            Ignore
            </button>
            </div>
        </div>
          
   
  )
}


export default RidePopUp;