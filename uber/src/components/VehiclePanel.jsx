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
      className="fixed bottom-0 left-0 right-0 w-full bg-white p-4 z-50"
      style={{
        transform: 'translateY(100%)',
        transition: 'transform 0.4s',
        maxHeight: 'none',
        overflowY: 'visible',
        paddingBottom: '5rem',
      }}
    >
      {open && !confirmedRide && (
        <>
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
          {/* Center the Confirm Ride Button */}
          <div className="flex justify-center mb-8">
            <button
              className={`py-2 w-[90%] bg-green-600 text-white rounded-md font-semibold ${
                selectedVehicle === null ? 'cursor-not-allowed opacity-50' : ''
              }`}
              onClick={() => setConfirmedRide(true)}
              disabled={selectedVehicle === null}
            >
              Confirm Ride
            </button>
          </div>
        </>
      )}
    </div>
  )
);

export default VehiclePanel;