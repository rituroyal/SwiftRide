import React from 'react';

const RidePopUp = ({
  pickupLocation = "562/11-A, Kaikondrahalli, Bengaluru, Karnataka",
  dropoffLocation = "24B, Near Kapoor’s cafe, Sheryians Coding School, Bhopal",
  onConfirm = () => {},
  onIgnore = () => {},
  vehicleType = "Suzuki S-Presso LXI",
  vehicleNumber = "KA15AK00-0",
  fare = "₹193.20",
  eta = "6 min",
  userImg = "/image/male.jpg",
  userName = "Amit Sharma",
  distance = "2.4 km"
}) => {
  return (
    <div
      className="fixed bottom-0 left-0 w-full bg-white z-50 p-6 flex flex-col items-center rounded-t-2xl shadow-2xl"
      style={{ transition: 'transform 0.4s' }}
    >
      {/* Uber-style header */}
      <div className="w-12 h-1.5 bg-gray-300 rounded-full mb-4" />
      <h3 className="text-2xl font-bold mb-1 text-center">New Ride Available</h3>
      {/* User Info Row */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={userImg}
          alt="User"
          className="h-10 w-10 rounded-full object-cover border border-gray-300"
        />
        <div>
          <div className="font-semibold text-gray-800">{userName}</div>
          <div className="text-xs text-gray-500">{distance} away</div>
        </div>
      </div>
      <p className="text-gray-600 mb-4 text-center">You have a new ride nearby. Confirm to accept or ignore.</p>

      {/* Ride Details */}
      <div className="w-full max-w-md bg-gray-50 rounded-lg p-4 mb-6 shadow flex flex-col gap-2">
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
      <div className="w-full max-w-md flex gap-4">
        <button
          className="flex-1 py-3 rounded-lg font-semibold bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
          onClick={onIgnore}
        >
          Ignore
        </button>
        <button
          className="flex-1 py-3 rounded-lg font-semibold bg-green-600 text-white hover:bg-green-700 transition"
          onClick={onConfirm}
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default RidePopUp;