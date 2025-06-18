

import React, { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';


const ConfirmRide = forwardRef(
  (
    { open, selectedVehicle, pickupLocation, dropoffLocation, onBackToHome, onConfirm, fare },
    ref
  ) => {

    const navigate = useNavigate();
    if (!open)
      return (
        <div
          ref={ref}
          className="absolute bottom-0 w-full bg-white z-10 p-4"
          style={{ transform: 'translateY(100%)', transition: 'transform 0.4s' }}
        />
      );

    const dynamicPrice =
      selectedVehicle && fare[selectedVehicle.type]
        ? `Rs ${fare[selectedVehicle.type]}`
        : selectedVehicle?.price || 'Rs0';
    
       
    
    const handleConfirm = () => {
      // Don't navigate directly here
      onConfirm({
        pickupLocation,
        dropoffLocation,
        fare: fare[selectedVehicle.type],
        vehicle: selectedVehicle,
      });
    };
    

    return (
      <div
        ref={ref}
        className="absolute bottom-0 left-0 w-full bg-white z-30 p-6 flex flex-col items-center justify-between min-h-[60vh] rounded-t-2xl shadow-lg"
        style={{ transform: 'translateY(0)', transition: 'transform 0.4s' }}
      >
       
        <h3 className="text-2xl font-bold mb-4 text-center">Confirm your ride</h3>

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
                {dynamicPrice}
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

        {/* Confirm + Back Button */}
        <div className="w-full mb-5 flex justify-center mt-auto">
          <div className="w-full max-w-md flex flex-col gap-3">
            {/* <button
              className="bg-green-600 text-white py-3 rounded-md font-semibold text-lg"
              onClick={onConfirm}
              
            >
              Confirm Ride
            </button> */}

<button
  className="bg-green-600 text-white py-3 rounded-md font-semibold text-lg"
  onClick={handleConfirm}   // ✅ this will trigger navigate()
>
  Confirm Ride
</button>

            <button
              className="bg-gray-800 text-white py-3 rounded-md font-semibold text-lg"
              onClick={onBackToHome}
            >
              Back to Ride Ur Way
            </button>
          </div>
        </div>
      </div>
    );
  }
);

export default ConfirmRide;
