

import React from 'react';

const ConfirmRidePopUp = ({
  pickupLocation,
  dropoffLocation,
  vehicleType,
  vehicleNumber,
  fare,
  eta,
  userImg,
  userName,
  distance,
  onConfirmRide,
  onCancelRide
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 mx-2 flex flex-col items-center">
        {/* Uber-style header */}
        <div className="w-16 h-2 bg-gray-300 rounded-full mb-6 mt-2" />
        <h3 className="text-3xl font-bold mb-4 text-center">Confirm this Ride to start</h3>
        {/* User Info Row */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={userImg}
            alt="User"
            className="h-14 w-14 rounded-full object-cover border border-gray-300"
          />
          <div>
            <div className="font-semibold text-gray-800 text-lg">{userName}</div>
            <div className="text-sm text-gray-500">{distance} away</div>
          </div>
        </div>
        {/* Ride Details */}
        <div className="w-full bg-gray-50 rounded-lg p-6 mb-8 shadow flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">{vehicleType}</span>
            <span className="text-gray-700 font-bold">{fare}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Vehicle No: <span className="font-medium text-gray-800">{vehicleNumber}</span></span>
            <span>ETA: <span className="font-medium text-gray-800">{eta}</span></span>
          </div>
          <div className="flex items-center mt-2">
            <i className="ri-map-pin-2-fill text-green-600 mr-2"></i>
            <div>
              <div className="text-xs text-gray-500">Pickup</div>
              <div className="font-medium text-gray-800">{pickupLocation}</div>
            </div>
          </div>
          <div className="flex items-center mt-2">
            <i className="ri-map-pin-2-fill text-red-500 mr-2"></i>
            <div>
              <div className="text-xs text-gray-500">Dropoff</div>
              <div className="font-medium text-gray-800">{dropoffLocation}</div>
            </div>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="w-full flex gap-4">
          <button
            className="flex-1 py-3 rounded-lg font-semibold bg-red-500 text-white hover:bg-red-600 transition"
            onClick={onCancelRide}
          >
            Cancel Ride
          </button>
          <button
            className="flex-1 py-3 rounded-lg font-semibold bg-green-600 text-white hover:bg-green-700 transition"
            onClick={onConfirmRide}
          >
            Confirm Ride
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;