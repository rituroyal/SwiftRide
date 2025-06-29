


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import img from '../../images/download.jpeg'

function FinishRide(props) {
  const [ride, setRide] = useState(null);
  const navigate = useNavigate();
  

  useEffect(() => {
    if (props.rideInfo) {
      console.log("🚨 rideInfo passed to FinishRide:", props.rideInfo);
      setRide(props.rideInfo);
    }
  }, [props.rideInfo]);

  async function endRide() {
    if (!ride?._id) {
      console.warn("⛔ ride._id is undefined. Ride:", ride);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/rides/end`,
        { rideId: ride._id },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        props.setFinishRide(false);
        props.setRidePopupPanel(false);
        localStorage.removeItem('currentRide');

        const isCaptain = localStorage.getItem('isCaptain');
        if (isCaptain === 'true') {
          localStorage.removeItem('isCaptain');
          navigate('/captain-login');
        } else {
          navigate('/home');
        }
      }
    } catch (error) {
      console.error('❌ Error finishing ride:', error?.response || error.message);
    }
  }

  if (!ride) return <div className="text-center mt-10">Loading ride info...</div>;

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-50 px-4 py-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-6 relative">
        {/* Close Button */}
        <button onClick={() => props.setFinishRide(false)} className="absolute right-4 top-4 text-2xl text-gray-500 hover:text-gray-700">
          <i className="ri-close-line"></i>
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Finish Your Ride</h2>

        {/* Passenger Info */}
        <div className="flex flex-col items-center mb-6">
        <img
  src={
     img // Fallback image if no user image is provided
  }
  alt="User"
  className="h-24 w-24 rounded-full object-cover border-4 border-green-500 shadow-md"
/>

          <p className="text-lg font-semibold text-gray-700 mt-3">
            {ride?.user?.name || "Passenger"}
          </p>
        </div>

        {/* Ride Details */}
        <div className="space-y-4 text-gray-700 text-sm font-medium">
          <div className="bg-gray-100 rounded-lg px-4 py-3">
            <p className="text-gray-500 mb-1">Pickup Location</p>
            <p>{ride?.pickup || "Not Available"}</p>
          </div>
          <div className="bg-gray-100 rounded-lg px-4 py-3">
            <p className="text-gray-500 mb-1">Dropoff Location</p>
            <p>{ride?.destination || "Not Available"}</p>
          </div>
          <div className="bg-gray-100 rounded-lg px-4 py-3">
            <p className="text-gray-500 mb-1">Fare</p>
            <p className="text-green-600 font-bold text-lg">₹{ride?.fare || "0"}</p>
          </div>
        </div>

        {/* Finish Button */}
        <button
          onClick={endRide}
          className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold w-full py-3 rounded-lg shadow transition-all flex items-center justify-center gap-2"
        >
          <i className="ri-check-line text-xl"></i> Finish Ride
        </button>
      </div>
    </div>
  );
}

export default FinishRide;
