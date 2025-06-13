import React from 'react';

const LookingForDriver = ({
  selectedVehicle,
  pickupLocation,
  dropoffLocation,
  fare,
  // onBackToHome,
}) => {
  console.log(fare,selectedVehicle)
  return (
    <div
      className="absolute bottom-0 left-0 w-full bg-white z-30 p-6 flex flex-col items-center justify-between min-h-[60vh] rounded-t-2xl shadow-lg"
      style={{ transform: 'translateY(0)', transition: 'transform 0.4s' }}
    >
      {/* Loader Animation */}
      <div className="mb-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600 border-solid mx-auto mb-2"></div>
      </div>
      <h3 className="text-2xl font-bold mb-2 text-center">Looking for a driver...</h3>
      <p className="text-gray-700 mb-6 text-center">
        We are searching for the nearest driver for your ride.
      </p>

      {/* Ride Details */}
      {selectedVehicle && (
        <div className="w-full max-w-md bg-gray-50 rounded-lg p-4 mb-6 shadow">
          <div className="flex items-center mb-3">
            <img
              src={selectedVehicle.img}
              alt={selectedVehicle.type}
              className="h-12 w-20 object-contain rounded"
            />
            <div className="ml-4">
              <div className="font-semibold">{selectedVehicle.type}</div>
              <div className="text-xs text-gray-500 flex items-center">
                <i className="ri-user-3-fill mr-1"></i>
                {selectedVehicle.people} seats
              </div>
              <div className="text-xs text-gray-500">ETA: {selectedVehicle.eta}</div>
            </div>
            <div className="ml-auto font-bold text-lg flex items-center">
              <i className="ri-currency-line mr-1"></i>
              {fare?.[selectedVehicle.type]
              ? `Rs${fare[selectedVehicle.type]}`
              : selectedVehicle.price}

            </div>
          </div>
          <div className="mt-2 flex items-center">
            <i className="ri-map-pin-2-fill text-green-600 mr-2"></i>
            <div>
              <div className="text-xs text-gray-500">Pickup</div>
              <div className="font-medium">{pickupLocation}</div>
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <i className="ri-map-pin-2-fill text-red-500 mr-2"></i>
            <div>
              <div className="text-xs text-gray-500">Dropoff</div>
              <div className="font-medium">{dropoffLocation}</div>
            </div>
          </div>
        </div>
      )}

      {/* Back to Home Button */}
      {/* <div className="w-full mb-5 flex justify-center mt-auto">
        <button
          className="w-full max-w-md bg-black text-white py-3 rounded-md font-semibold text-lg"
          onClick={onBackToHome}
          style={{ marginBottom: 0 }}
        >
          Back to Ride Ur Way
        </button>
      </div> */}
    </div>
  );
};

export default LookingForDriver;