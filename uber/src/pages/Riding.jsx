
import React from 'react'
import { Link } from 'react-router-dom';

const carImg = '/image/car1.jpg';

const pickupAddresses = [
  "562/11-A, Kaikondrahalli, Bengaluru, Karnataka",
  "24B, Near Kapoor’s cafe, Sheryians Coding School, Bhopal",
  "14A, Opposite DB Mall, MP Nagar, Bhopal"
];

const Riding = () => {
  return (
    <div className="h-screen w-full flex flex-col">
          {/* Home Button */}
      <Link to ='/home' className='fixed top-4 left-4 z-40 h-10 w-10 bg-white flex items-center justify-center rounded-full shadow'>
        <i className='ri-home-5-line text-2xl text-gray-800'></i>
      </Link>
          
      {/* Top Section: Background Image */}
      <div className="h-[50vh] w-full flex-shrink-0">
        <img
          src="https://t3.ftcdn.net/jpg/07/28/30/26/240_F_728302620_Xddnf5Cl0K1ACZurd6yByUzHiHMMIoe6.jpg"
          alt="RideUrWay"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Bottom Section: Ride Info */}
      <div className="h-[50vh] w-full bg-white z-30 p-6 flex flex-col items-center rounded-t-2xl shadow-lg">
        {/* Content area */}
        <div className="flex-1 w-full flex flex-col items-center overflow-hidden">
          {/* Car Image Centered */}
          <div className="flex flex-col items-center w-full max-w-md mb-4 relative" style={{ height: 100 }}>
            <img
              src={carImg}
              alt="Suzuki S-Presso"
              className="h-20 w-36 object-contain rounded-full bg-gray-100 p-1 shadow-lg mx-auto"
            />
          </div>

          {/* Car Details */}
          <div className="flex flex-col items-center mb-2">
            <span className="font-bold text-lg text-gray-800">KA15AK00-0</span>
          </div>
          <div className="flex flex-col items-center mb-4">
            <span className="text-gray-700 font-medium">White Suzuki S-Presso LXI</span>
            <span className="flex items-center text-yellow-500 font-semibold text-base mt-1">
              <i className="ri-star-fill mr-1"></i> 4.9
            </span>
          </div>

          {/* Pickup Addresses List */}
          <div className="w-full max-w-md mt-2 flex-1 overflow-y-auto">
            <h4 className="text-base font-semibold mb-2 text-gray-800">Pickup Addresses</h4>
            <ul className="space-y-2">
              {pickupAddresses.map((address, idx) => (
                <li key={idx} className="flex items-center bg-gray-100 rounded-lg px-4 py-3">
                  <i className="ri-map-pin-2-fill text-green-600 text-xl mr-3"></i>
                  <span className="text-gray-800 font-medium text-sm">{address}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Payment Button at the bottom */}
        <button className="w-full max-w-md mt-4 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow flex-shrink-0">
          Make a Payment
        </button>
      </div>
    </div>
  )
}

export default Riding


