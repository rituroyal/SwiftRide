


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FinishRide(props) {
  const [ride, setRide] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (props.rideInfo) {
      console.log("🚨 rideInfo passed to FinishRide:", props.rideInfo);
      setRide(props.rideInfo);
    }
  }, [props.rideInfo]);
  

  const handleFinish = () => {
    localStorage.removeItem('currentRide');
    navigate('/home');
  };

  if (!ride) return <div className="text-center mt-10">Loading ride info...</div>;

  return (
    <div className="w-full h-screen overflow-hidden justify-center border border-gray-300 rounded-xl bg-gray-50 flex flex-col items-center">
      <div className='w-full px-4 py-2 relative flex justify-between items-center'>
        <h5 onClick={() => props.setFinishRide(false)} className='absolute right-6 top-[-2] text-2xl '>
          <i className='ri-arrow-down-wide-line'></i>
        </h5>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Finish This Ride </h2>
      </div>

      <div className='flex items-center gap-3 '>
        <img
          src={ride?.user?.image}
          alt="User"
          className="h-20 w-20 object-contain rounded-full bg-gray-100 p-1 shadow-lg mb-4"
        />



        <p className="text-gray-600 font-bold italic mb-2">{ride?.user?.name}</p>
      </div>

      <div>
        <p className="text-gray-600 font-semibold mb-2">
          Pickup Location:
          <p className='text-base'>{ride?.pickupLocation}</p>
        </p>
        <p className="text-gray-600 font-semibold mb-2">
          Dropoff Location:
          <p className='text-base'>{ride?.dropoffLocation}</p>
        </p>
        <p className="text-gray-600 font-semibold mb-4">
          Estimated Fare:
          <p className='text-base'>₹{ride?.estimatedFare}</p>
        </p>
      </div>

      <div className='flex flex-col w-full px-4'>
        <button
          onClick={handleFinish}
          className="bg-green-500 flex items-center justify-center text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200 my-3"
        >
          Finish Ride
        </button>
      </div>
    </div>
  );
}

export default FinishRide;


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function FinishRide(props) {
//   const [ride, setRide] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (props.rideInfo) {
//       console.log("🚨 rideInfo passed to FinishRide:", props.rideInfo);
//       setRide(props.rideInfo);
//     }
//   }, [props.rideInfo]);

//   const handleFinish = () => {
//     localStorage.removeItem('currentRide');
//     navigate('/home');
//   };

//   if (!ride) return <div className="text-center mt-10">Loading ride info...</div>;

//   // Fallback image if none is present
//   const userImage = ride?.user?.image
//     ? ride.user.image.startsWith('http')
//       ? ride.user.image
//       : `http://localhost:4000/${ride.user.image}` // adjust path based on backend
//     : 'https://via.placeholder.com/100';

//   return (
//     <div className="w-full h-screen overflow-hidden justify-center border border-gray-300 rounded-xl bg-gray-50 flex flex-col items-center">
//       <div className='w-full px-4 py-2 relative flex justify-between items-center'>
//         <h5 onClick={() => props.setFinishRide(false)} className='absolute right-6 top-[-2] text-2xl cursor-pointer'>
//           <i className='ri-arrow-down-wide-line'></i>
//         </h5>
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">Finish This Ride</h2>
//       </div>

//       <div className='flex items-center gap-3'>
//         <img
//           src={userImage}
//           alt="User"
//           className="h-20 w-20 object-contain rounded-full bg-gray-100 p-1 shadow-lg mb-4"
//         />
//         <span className="text-gray-600 font-bold italic mb-2">{ride?.user?.name}</span>
//       </div>

//       <div>
//         <div className="text-gray-600 font-semibold mb-2">
//           Pickup Location:
//           <div className='text-base'>{ride?.pickupLocation}</div>
//         </div>
//         <div className="text-gray-600 font-semibold mb-2">
//           Dropoff Location:
//           <div className='text-base'>{ride?.dropoffLocation}</div>
//         </div>
//         <div className="text-gray-600 font-semibold mb-4">
//           Estimated Fare:
//           <div className='text-base'>₹{ride?.estimatedFare}</div>
//         </div>
//       </div>

//       <div className='flex flex-col w-full px-4'>
//         <button
//           onClick={handleFinish}
//           className="bg-green-500 flex items-center justify-center text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200 my-3"
//         >
//           Finish Ride
//         </button>
//       </div>
//     </div>
//   );
// }

// export default FinishRide;

