import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import FinishRide from '../components/FinishRide';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';


function CaptainRiding() {
    const [finishRide, setFinishRide] = useState(false)
    const FinishRideRef = React.useRef(null);
    useGSAP(() => {
    // GSAP animations can be added here if needed
    if(finishRide){
      gsap.to(FinishRideRef.current, {
        transform: 'translateY(0)',
        
      }); 

  }else {
      gsap.to(FinishRideRef.current, {
        transform: 'translateY(100%)',
        
      });
    }
  },[finishRide]);

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
      <div className="h-full w-full flex-shrink-0 relative">
        <img
          src="https://t3.ftcdn.net/jpg/07/28/30/26/240_F_728302620_Xddnf5Cl0K1ACZurd6yByUzHiHMMIoe6.jpg"
          alt="Map"
          className="w-full h-full object-cover"
        />
        <div onClick={()=>{setFinishRide(!finishRide)}} className='h-1/5 p-6 w-full flex items-center absolute bottom-0 justify-between bg-green-300'>

          <h2 className="text-xl font-semibold text-gray-800 mb-4">4km Away</h2>
          <button className='bg-green-800 text-white font-semibold p-3 px-10 rounded-lg '>Complete Ride</button>
          
        </div>
      </div>
      <div ref={FinishRideRef} className='flex-1 absolute bottom-0 py-4 min-h-[50%] w-screen bg-white z-30  flex flex-col items-center rounded-t-2xl shadow-lg'>
        <FinishRide setFinishRide={setFinishRide}/>
      </div>

    </div>
  )
}

export default CaptainRiding
