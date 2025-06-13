import React from 'react';

const driverImg = '/image/male.jpg'; 
const vehicles = [
  {
    type: 'car',
    people: 6,
    eta: '1:29pm',
    price: 'Rs193.20',
    img: '/image/car1.jpg',
  },
  {
    type: 'auto',
    people: 4,
    eta: '1:27pm',
    price: 'Rs193.20',
    img: '/image/auto.jpg',
  },
  {
    type: 'moto',
    people: 2,
    eta: '1:29pm',
    price: 'Rs270.40',
    img: '/image/moto.jpg',
  },
];   

const WaitingForDriver = (props) => {
  //console.log(props.rideConfirm,props.selectedVehicle)
  return (
    <div className="absolute bottom-0 left-0 w-full bg-white z-30 p-6 flex flex-col items-center min-h-[70vh] rounded-t-2xl shadow-lg">
      {/* Driver and Car Info */}
      <div className="flex items-center w-full max-w-md mb-6">
        {/* Driver Photo */}
        <img
          src={driverImg}
          alt="Driver"
          className="h-16 w-16 rounded-full object-cover border-2 border-green-500 shadow"
        />
        {/* Car Image */}
        <img
          src={vehicles[props.selectedVehicle].img}
          alt="Suzuki S-Presso"
          className="h-16 w-28 object-contain ml-4 rounded-lg bg-gray-100 p-1"
        />
        {/* Driver & Car Details */}
        <div className="ml-4 flex flex-col flex-1">
          <span className="font-bold text-lg text-gray-800">{props.rideConfirm.captain.fullname.firstname + " " + props.rideConfirm.captain.fullname.lastname}</span>
          <span className="font-semibold text-base tracking-wider text-gray-700">{props.rideConfirm.captain.vehicle.plate}</span>
        </div>
      </div>

      {/* Car Model & Rating */}
      <div className="flex flex-col items-center mb-4">
        <span className="text-gray-700 font-medium">{props.rideConfirm.captain.vehicle.color + " " + props.rideConfirm.captain.vehicle.vehicleType}</span>
        <span className="flex items-center text-yellow-500 font-semibold text-base mt-1">
          <i className="ri-star-fill mr-1"></i> 4.9
        </span>
        <h1 className='text-lg'>Otp:{props.rideConfirm?.otp} </h1>
      </div>

      {/* Message Box */}
      <div className="w-full max-w-md mb-6">
        <input
          type="text"
          placeholder="Send a message..."
          className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-6 mb-8 w-full max-w-md">
        <button className="flex flex-col items-center justify-center bg-gray-100 hover:bg-green-100 rounded-full w-16 h-16 shadow text-green-700 font-semibold text-xs">
          <i className="ri-shield-user-line text-2xl mb-1"></i>
          Safety
        </button>
        <button className="flex flex-col items-center justify-center bg-gray-100 hover:bg-green-100 rounded-full w-16 h-16 shadow text-green-700 font-semibold text-xs">
          <i className="ri-share-forward-line text-2xl mb-1"></i>
          Share my trip
        </button>
        <button className="flex flex-col items-center justify-center bg-gray-100 hover:bg-green-100 rounded-full w-16 h-16 shadow text-green-700 font-semibold text-xs">
          <i className="ri-phone-line text-2xl mb-1"></i>
          Call driver
        </button>
      </div>

      {/* Pickup Address */}
      <div className="w-full max-w-md mt-auto">
        <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3">
          <i className="ri-map-pin-2-fill text-green-600 text-xl mr-3"></i>
          <span className="text-gray-800 font-medium text-sm">
            {props.rideConfirm.pickup}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;