
import React, { useEffect, useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import FinishRide from '../components/FinishRide';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { SocketContext } from '../context/SocketContext';

function CaptainRiding() {
  const [finishRide, setFinishRide] = useState(false);
  const [rideInfo, setRideInfo] = useState(null);
  const FinishRideRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    const ride = JSON.parse(localStorage.getItem('currentRide'));
    if (ride && ride._id) {
      console.log("✅ rideInfo loaded:", ride);
      setRideInfo(ride);

      // ✅ Force join with captain ID
      const captainId = ride?.captain?._id || localStorage.getItem('userId');
      if (socket && captainId) {
        socket.emit('join', { userId: captainId, role: 'captain' });
        console.log("🟢 JOIN sent from captain:", captainId);
      }
    } else {
      console.warn("⚠️ ride._id is missing in localStorage:", ride);
    }
  }, [socket]);

  useEffect(() => {
    if (!socket) {
      console.warn("❌ Socket not connected yet");
      return;
    }

    console.log("🟢 Waiting for user-location updates...");
    socket.on('user-location', (data) => {
      console.log("📍 Received from socket:", data);
      if (!data || !data.latitude || !data.longitude) {
        console.warn("❌ Invalid location data:", data);
        return;
      }
      setUserLocation({
        latitude: data.latitude,
        longitude: data.longitude
      });
    });

    return () => socket.off('user-location');
  }, [socket]);

  useGSAP(() => {
    gsap.to(FinishRideRef.current, {
      transform: finishRide ? 'translateY(0)' : 'translateY(100%)',
    });
  }, [finishRide]);

  return (
    <div className="h-screen w-full relative overflow-hidden flex flex-col">
      <Link
        to="/home"
        className="fixed top-4 right-4 z-40 h-10 w-10 bg-white flex items-center justify-center rounded-full shadow"
        title="Logout"
      >
        <i className="ri-logout-box-r-line text-2xl text-gray-800"></i>
      </Link>

      <div className="h-full w-full flex-shrink-0 relative">
        <img
          src="https://t3.ftcdn.net/jpg/07/28/30/26/240_F_728302620_Xddnf5Cl0K1ACZurd6yByUzHiHMMIoe6.jpg"
          alt="Map"
          className="w-full h-full object-cover"
        />
        <div
          onClick={() => setFinishRide(!finishRide)}
          className="h-1/5 p-6 w-full flex items-center absolute bottom-0 justify-between bg-green-300"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">4km Away</h2>
          <button className="bg-green-800 text-white font-semibold p-3 px-10 rounded-lg">
            Complete Ride
          </button>
        </div>
      </div>

      <div
        ref={FinishRideRef}
        className="flex-1 absolute bottom-0 py-4 min-h-[50%] w-screen bg-white z-30 flex flex-col items-center rounded-t-2xl shadow-lg"
      >
        <FinishRide
          setFinishRide={setFinishRide}
          rideInfo={rideInfo}
          setRidePopupPanel={() => {}}
        />
      </div>

      {userLocation ? (
        <div className="absolute top-5 left-5 bg-white p-3 rounded shadow-md z-50 border border-red-500">
          <p className="font-semibold text-sm">📍 User Location:</p>
          <p className="text-xs text-gray-600">Lat: {userLocation.latitude}</p>
          <p className="text-xs text-gray-600">Lng: {userLocation.longitude}</p>
        </div>
      ) : (
        <div className="absolute top-5 left-5 bg-white text-red-600 text-xs p-2 rounded shadow z-50 border border-red-500">
          🚫 No live location received yet
        </div>
      )}
    </div>
  );
}

export default CaptainRiding;

