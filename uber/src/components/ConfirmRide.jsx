
import React, { forwardRef } from 'react';

const ConfirmRide = forwardRef(
  (
    { open, selectedVehicle, pickupLocation, dropoffLocation, onBackToHome },
    ref
  ) => {
    if (!open)
      return (
        <div
          ref={ref}
          className="absolute bottom-0 w-full bg-white z-10 p-4"
          style={{ transform: 'translateY(100%)', transition: 'transform 0.4s' }}
        />
      );

    return (
      <div
        ref={ref}
        className="absolute bottom-0 left-0 w-full bg-white z-30 p-6 flex flex-col items-center justify-between min-h-[60vh] rounded-t-2xl shadow-lg"
        style={{ transform: 'translateY(0)', transition: 'transform 0.4s' }}
      >
        {/* Success Tick */}
        <div className="bg-green-100 rounded-full p-4 mb-4">
          <i className="ri-check-line text-4xl text-green-600"></i>
        </div>
        <h3 className="text-2xl font-bold mb-2 text-center">Ride Confirmed!</h3>
        <p className="text-gray-700 mb-6 text-center">
          Your driver is on the way. Thank you for booking with RideUrWay.
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
                {selectedVehicle.price}
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
        <div className="w-full mb-5 flex justify-center mt-auto">
          <button
            className="w-full max-w-md bg-black text-white py-3 rounded-md font-semibold text-lg"
            onClick={onBackToHome}
            style={{ marginBottom: 0 }}
          >
            Back to Ride Ur Way
          </button>
        </div>
      </div>
    );
  }
);

export default ConfirmRide;