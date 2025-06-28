


import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext';

const Riding = () => {
  const [rideData, setRideData] = useState(null);
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  // ✅ Vehicles list to match image
  const vehicles = [
    { type: 'car', people: 6, img: '/image/car1.jpg' },
    { type: 'auto', people: 4, img: '/image/auto.jpg' },
    { type: 'moto', people: 2, img: '/image/moto.jpg' },
  ];

  useEffect(() => {
    const ride = localStorage.getItem('currentRide');
    if (ride) {
      const parsed = JSON.parse(ride);
      console.log("🚕 Ride data from localStorage:", parsed);
      setRideData(parsed);
    }
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleRideEnd = () => {
      console.log("📢 Ride ended by captain, redirecting to /home");
      localStorage.removeItem('currentRide');
      navigate('/home');
    };

    socket.on('ride-ended', handleRideEnd);

    return () => {
      socket.off('ride-ended', handleRideEnd);
    };
  }, [socket, navigate]);

  if (!rideData) return <div>Loading...</div>;

  // ✅ Match full vehicle object
  const matchedVehicle = vehicles.find(v => v.type === rideData.vehicleType);

  return (
    <div className="h-screen w-full flex flex-col">
      <Link to='/home' className='fixed top-4 left-4 z-40 h-10 w-10 bg-white flex items-center justify-center rounded-full shadow'>
        <i className='ri-home-5-line text-2xl text-gray-800'></i>
      </Link>

      {/* Map Image */}
      <div className="h-[50vh] w-full flex-shrink-0">
        <img
          src="https://t3.ftcdn.net/jpg/07/28/30/26/240_F_728302620_Xddnf5Cl0K1ACZurd6yByUzHiHMMIoe6.jpg"
          alt="Map"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bottom Ride Info */}
      <div className="h-[50vh] w-full bg-white z-30 p-6 flex flex-col items-center rounded-t-2xl shadow-lg">
        <div className="flex flex-col items-center w-full max-w-md mb-4">
          <img
            src={matchedVehicle?.img || '/image/car1.jpg'}
            alt="Vehicle"
            className="h-20 w-36 object-contain rounded-full bg-gray-100 p-1 shadow-lg mx-auto"
          />
        </div>

        <div className="flex flex-col items-center mb-1">
          <span className="font-bold text-lg text-gray-800">{matchedVehicle?.type || 'Vehicle'}</span>
          <span className="text-gray-700 font-medium">{matchedVehicle?.people} seats</span>
          <span className="flex items-center text-yellow-500 font-semibold text-base mt-1">
            <i className="ri-star-fill mr-1"></i> 4.9
          </span>
        </div>

        <div className="w-full max-w-md mt-4">
          <div className="mb-3 flex items-center">
            <i className="ri-map-pin-2-fill text-green-600 text-xl mr-2"></i>
            <span className="font-medium text-sm">{rideData.pickup}</span>
          </div>
          <div className="mb-3 flex items-center">
            <i className="ri-map-pin-2-fill text-red-500 text-xl mr-2"></i>
            <span className="font-medium text-sm">{rideData.destination}</span>
          </div>
          <div className="mb-4 flex items-center">
            <i className="ri-currency-line text-black text-xl mr-2"></i>
            <span className="font-semibold text-lg">Rs {rideData.fare}</span>
          </div>
        </div>

        <button className="w-full max-w-md mt-4 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow">
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
