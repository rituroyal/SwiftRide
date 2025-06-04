

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';

const CaptainHome = () => {
  const [showRidePopUp, setShowRidePopUp] = useState(true);
  const [showConfirmRide, setShowConfirmRide] = useState(false);

  // Sample data (props pass karne ke liye)
  const rideData = {
    userImg: "/image/male.jpg",
    userName: "Amit Sharma",
    distance: "2.4 km",
    pickupLocation: "562/11-A, Kaikondrahalli, Bengaluru, Karnataka",
    dropoffLocation: "24B, Near Kapoor’s cafe, Sheryians Coding School, Bhopal",
    vehicleType: "Suzuki S-Presso LXI",
    vehicleNumber: "KA15AK00-0",
    fare: "₹193.20",
    eta: "6 min"
  };

  return (
    <div className="h-screen w-full flex flex-col">
      {/* Logout Button - Top Right */}
      <Link
        to="/home"
        className="fixed top-4 right-4 z-40 h-10 w-10 bg-white flex items-center justify-center rounded-full shadow"
        title="Logout"
      >
        <i className="ri-logout-box-r-line text-2xl text-gray-800"></i>
      </Link>
      {/* Top Section - Map with Arrival Time */}
      <div className="h-[50vh] w-full flex-shrink-0 relative">
        <img
          src="https://t3.ftcdn.net/jpg/07/28/30/26/240_F_728302620_Xddnf5Cl0K1ACZurd6yByUzHiHMMIoe6.jpg"
          alt="Map"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-10 left-10 bg-white px-3 py-1 rounded shadow text-sm font-medium">
          Arrival <br /> <span className="text-lg font-semibold">6 min</span>
        </div>
      </div>

      <div className="h-[50vh] w-full bg-white flex flex-col justify-center items-center">
        {showRidePopUp ? (
          <RidePopUp
            {...rideData}
            onConfirm={() => {
              setShowConfirmRide(true);
              setShowRidePopUp(false);
            }}
            onIgnore={() => setShowRidePopUp(false)}
          />
        ) : showConfirmRide ? (
          <ConfirmRidePopUp
            {...rideData}
            onConfirmRide={() => {
              setShowConfirmRide(false);
              
            }}
            onCancelRide={() => setShowConfirmRide(false)}
          />
        ) : (
          <CaptainDetails />
        )}
      </div>
    </div>
  );
};

export default CaptainHome;