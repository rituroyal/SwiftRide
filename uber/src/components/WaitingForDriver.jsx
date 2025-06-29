

import React from 'react';

const WaitingForDriver = ({ rideConfirm, selectedVehicle }) => {
  if (!rideConfirm || !rideConfirm.captain || !rideConfirm.captain.vehicle) return null;

  const {
    captain: {
      fullname = {},
      vehicle: { color = '', vehicleType = '', plate = '' } = {},
      profileImage,
    },
    pickup,
    destination,
    otp,
  } = rideConfirm;

  const driverImg = profileImage || '/image/male.jpg';
  const vehicleImg = selectedVehicle?.img || '/image/car1.jpg';

  return (
    <div className="absolute bottom-0 left-0 w-full h-[60vh] px-4 py-6 z-50 flex justify-center items-start bg-white rounded-t-3xl shadow-xl border-t border-gray-300">

      <div className="w-full max-w-xl bg-white rounded-2xl shadow-md px-6 py-5 space-y-6 border border-gray-200">

        {/* Header */}
        <h2 className="text-center text-xl font-semibold text-gray-800 tracking-wide">
          Your Captain is on the Way
        </h2>

        {/* Driver & Vehicle Row */}
        <div className="flex items-center justify-between gap-4">
          {/* Driver Image */}
          <img
            src={driverImg}
            alt="Driver"
            className="h-16 w-16 rounded-full object-cover border-2 border-green-500 shadow-md"
          />

          {/* Driver Info */}
          <div className="flex flex-col justify-center flex-1 ml-3">
            <h3 className="text-lg font-semibold text-gray-900 capitalize">
              {fullname.firstname} {fullname.lastname}
            </h3>
            <p className="text-sm text-gray-500 font-medium">
              {plate} • {color} {vehicleType}
            </p>
            <p className="text-sm text-gray-700 font-semibold mt-1">
              OTP: <span className="text-blue-600 font-bold tracking-wider">{otp}</span>
            </p>
          </div>

          {/* Vehicle Image */}
          <img
            src={vehicleImg}
            alt={vehicleType}
            className="h-16 w-28 object-contain rounded-lg bg-gray-50 p-2 shadow-sm"
          />
        </div>

        {/* Pickup & Dropoff Locations */}
        <div className="space-y-3">
          {pickup && (
            <div className="flex items-center bg-green-50 rounded-md px-4 py-2 border border-green-200">
              <i className="ri-map-pin-2-fill text-green-600 text-lg mr-2"></i>
              <span className="text-sm text-gray-800 font-medium truncate">{pickup}</span>
            </div>
          )}
          {destination && (
            <div className="flex items-center bg-red-50 rounded-md px-4 py-2 border border-red-200">
              <i className="ri-navigation-fill text-red-500 text-lg mr-2"></i>
              <span className="text-sm text-gray-800 font-medium truncate">{destination}</span>
            </div>
          )}
        </div>

        {/* Status Footer */}
        <div className="text-center pt-2">
          <p className="text-sm text-gray-500">
            Sit back and relax while your driver is on the way...
          </p>
          <div className="flex justify-center mt-2">
            <span className="h-3 w-3 bg-green-400 rounded-full animate-ping absolute opacity-75"></span>
            <span className="h-3 w-3 bg-green-600 rounded-full relative"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
