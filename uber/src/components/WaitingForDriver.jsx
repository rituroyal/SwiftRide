
import React from 'react';

const WaitingForDriver = ({ rideConfirm, selectedVehicle }) => {
  if (!rideConfirm || !rideConfirm.captain || !rideConfirm.captain.vehicle) return null;

  const {
    captain: {
      fullname,
      vehicle: { color, vehicleType, plate },
      profileImage,
    },
    pickup,
    destination,
    otp,
  } = rideConfirm;

  const driverImg = profileImage || '/image/male.jpg';
  const vehicleImg = selectedVehicle?.img || '/image/car1.jpg';

  return (
    <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-white z-30 px-4 py-4 flex flex-col items-center justify-start rounded-t-3xl shadow-2xl border border-gray-300">
      {/* Driver + Vehicle Section */}
      <div className="flex items-center justify-between w-full max-w-md mb-4">
        {/* Driver Image */}
        <img
          src={driverImg}
          alt="Driver"
          className="h-14 w-14 rounded-full object-cover border-2 border-green-500"
        />

        {/* Driver & Vehicle Info */}
        <div className="ml-4 flex flex-col flex-1">
          <h2 className="text-base font-semibold text-gray-900 capitalize leading-tight">
            {fullname.firstname} {fullname.lastname}
          </h2>
          <p className="text-xs text-gray-600 font-medium tracking-wide">
            {plate} • {color} {vehicleType}
          </p>
          <p className="text-sm text-gray-800 font-semibold mt-1">
            OTP: <span className="text-blue-600">{otp}</span>
          </p>
        </div>

        {/* Vehicle Image */}
        <img
          src={vehicleImg}
          alt={vehicleType}
          className="h-14 w-24 object-contain ml-4 rounded-lg bg-gray-100 p-1"
        />
      </div>

      {/* Pickup & Dropoff Info */}
      <div className="w-full max-w-md space-y-2 mt-auto">
        {pickup && (
          <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2">
            <i className="ri-map-pin-2-fill text-green-600 text-lg mr-2"></i>
            <span className="text-sm text-gray-800 font-medium">{pickup}</span>
          </div>
        )}
        {destination && (
          <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2">
            <i className="ri-navigation-fill text-red-500 text-lg mr-2"></i>
            <span className="text-sm text-gray-800 font-medium">{destination}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default WaitingForDriver;

