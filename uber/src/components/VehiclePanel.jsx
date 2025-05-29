

import React, { forwardRef } from 'react';

const vehicles = [
  {
    type: 'UberX',
    people: 4,
    eta: '1:29pm',
    price: 'Rs193.20',
    img: '/image/car1.jpg',
  },
  {
    type: 'Uber Green',
    people: 4,
    eta: '1:27pm',
    price: 'Rs193.20',
    img: '/image/car1.jpg',
  },
  {
    type: 'UberXL',
    people: 6,
    eta: '1:29pm',
    price: 'Rs270.40',
    img: '/image/car1.jpg',
  },
];

const VehiclePanel = forwardRef(
  (
    {
      open,
      setOpen,
      setConfirmedRide,
      confirmedRide,
      selectedVehicle,
      setSelectedVehicle,
    },
    ref
  ) => (
    <div
      ref={ref}
      className="absolute bottom-0 w-full bg-white z-10 p-4"
      style={{ transform: 'translateY(100%)', transition: 'transform 0.4s' }}
    >
      {open && !confirmedRide && (
        <>
          <h5
            className="p-3 text-center absolute top-0 right-0 cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h3 className="text-xl font-bold mb-4">Choose a Ride</h3>
          {vehicles.map((v, index) => (
            <div
              key={index}
              onClick={() => setSelectedVehicle(index)}
              className={`flex items-center justify-between border rounded-lg p-3 mb-3 shadow-sm cursor-pointer ${
                selectedVehicle === index
                  ? 'border-black bg-gray-100'
                  : 'border-gray-300'
              }`}
            >
              <img src={v.img} alt={v.type} className="h-14 w-20 object-contain" />
              <div className="ml-3 flex-1">
                <h4 className="font-semibold text-base">
                  {v.type}{' '}
                  <span className="text-sm text-gray-500 ml-1">
                    <i className="ri-user-3-fill"></i>
                    {v.people}
                  </span>
                </h4>
                <p className="text-sm text-gray-600">{v.eta} away</p>
                <p className="text-xs text-gray-500">Affordable, compact rides</p>
              </div>
              <h4 className="text-lg font-semibold">{v.price}</h4>
            </div>
          ))}
          {/* Confirm Ride Button only if a vehicle is selected */}
          {selectedVehicle !== null && (
            <button
              className="mt-4 w-full bg-green-600 text-white py-2 rounded-md font-semibold"
              onClick={() => setConfirmedRide(true)}
            >
              Confirm Ride
            </button>
          )}
        </>
      )}
    </div>
  )
);

export default VehiclePanel;