

import React ,{useState} from 'react';
import { Link } from 'react-router-dom';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';

const CaptainHome = () => {
  const [ridePopPanel, setRidePopPanel] = useState(true);
  const [confirmRidePopPanel, setConfirmRidePopPanel] = useState(false);
  const ridePopPanelRef = React.useRef(null);
  const confirmRidePopPanelRef = React.useRef(null);

  useGSAP(() => {
    // GSAP animations can be added here if needed
    if(ridePopPanel){
      gsap.to(ridePopPanelRef.current, {
        transform: 'translateY(0)',
        
      }); 

  }else {
      gsap.to(ridePopPanelRef.current, {
        transform: 'translateY(100%)',
        
      });
    }
  },[ridePopPanel]);

  useGSAP(() => {
    // GSAP animations for confirm ride panel
    if(confirmRidePopPanel){
      gsap.to(confirmRidePopPanelRef.current, {
        transform: 'translateY(0)',
       
      });
    } else {
      gsap.to(confirmRidePopPanelRef.current, {
        transform: 'translateY(100%)',
        
      });
    }
  }, [confirmRidePopPanel]);
  return (
    <div className="h-screen w-full relative overflow-hidden flex flex-col">

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

      <div className="h-[50vh] w-screen bg-white flex flex-col justify-center my-7 items-center">
        <CaptainDetails />
      </div>
      <div ref={ridePopPanelRef} className='flex-1 absolute bottom-0 py-4 min-h-[50%] w-screen bg-white z-30  flex flex-col items-center rounded-t-2xl shadow-lg'>
        <RidePopUp setRidePopPanel={setRidePopPanel} setConfirmRidePopPanel={setConfirmRidePopPanel} />
      </div>
      <div ref={confirmRidePopPanelRef} className='flex-1 absolute bottom-0 py-4 min-h-[50%] w-screen bg-white z-30  flex flex-col items-center rounded-t-2xl shadow-lg'>
        <ConfirmRidePopUp setConfirmRidePopPanel={setConfirmRidePopPanel} setRidePopPanel={setRidePopPanel} />
      </div>
    </div>
  );
};

export default CaptainHome;