

import React from 'react';
import { Link } from 'react-router-dom';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';

const CaptainHome = () => {
  return (
    <div className="h-screen w-full flex flex-col">

      {/* Logout Button - Top Right */}
      <Link
        to="/home"
        className="fixed top-4 right-4 z-40 h-10 w-10 bg-white flex items-center justify-center rounded-full shadow"
        title="Logout"
      >
        <i className="ri-logout-box-r-line text-2xl text-gray-800"></i>
      </Link>
      {/* Top Section - Map with Arrival Time */}
      <div className="h-[50vh] w-full flex-shrink-0 relative">
        <img
          src="https://t3.ftcdn.net/jpg/07/28/30/26/240_F_728302620_Xddnf5Cl0K1ACZurd6yByUzHiHMMIoe6.jpg"
          alt="Map"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-10 left-10 bg-white px-3 py-1 rounded shadow text-sm font-medium">
          Arrival <br /> <span className="text-lg font-semibold">6 min</span>
        </div>
      </div>

      <div className="h-[50vh] w-full bg-white flex flex-col justify-center items-center">
  <CaptainDetails />
</div>
      <div className='flex-1 w-full bg-white z-30 p-6 flex flex-col items-center rounded-t-2xl shadow-lg'>
        <RidePopUp />
      </div>
    </div>
  );
};

export default CaptainHome;