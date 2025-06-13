

import React ,{useEffect, useState,useContext} from 'react';
import { Link } from 'react-router-dom';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';
import { CaptainDataContext } from '../context/CaptainContext';
import { SocketContext } from '../context/SocketContext';
import axios from 'axios';

const CaptainHome = () => {
  const [ridePopPanel, setRidePopPanel] = useState(false);
  const [confirmRidePopPanel, setConfirmRidePopPanel] = useState(false);
  const ridePopPanelRef = React.useRef(null);
  const confirmRidePopPanelRef = React.useRef(null);
  const { captain } = useContext(CaptainDataContext);
  const { socket } = useContext(SocketContext);
  const [rideData, setRideData] = useState(null);
  const [confirmRideData, setConfirmRideData] = useState(null);

  useEffect(() => {
     
     socket.emit('join', {userId: captain._id, role: "captain"});

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          //console.log('Current Location:',captain, latitude, longitude);
          socket.emit('updateLocation', {
            userId: captain._id,
            location: { ltd: latitude, lng: longitude }
          });
        }, (error) => {
          console.error('Error getting location:', error);
        });
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    }

    const locationInterval = setInterval(updateLocation, 10000); // Update location every 5 seconds
    updateLocation(); // Initial location update
    // return () => {
    //   clearInterval(locationInterval);
    // };
  });

  socket.on('new-ride', (data) => {
    console.log('Ride request received:', data);
    setRideData(data);
    setRidePopPanel(true);
    
    // You can also set the ride data in state if needed
  });

  const confirmRide = async() => {
    const token=localStorage.getItem('token');
    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/rides/confirm`, {
      rideId: rideData._id,
      captainId: captain._id,
    },
    {
       headers: {
          Authorization:`Bearer ${token}`  // Use token from localStorage
        },
    }
  );

  console.log("efidvfovjo9",response)
  setConfirmRideData(response.data);

    setConfirmRidePopPanel(true);
    setRidePopPanel(false);
  };

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
        <RidePopUp 
        rideData={rideData}
        setRideData={setRideData}
        setRidePopPanel={setRidePopPanel} 
        setConfirmRidePopPanel={setConfirmRidePopPanel}
        confirmRide={confirmRide}
      />
      </div>
      <div ref={confirmRidePopPanelRef} className='flex-1 absolute bottom-0 py-4 min-h-[50%] w-screen bg-white z-30  flex flex-col items-center rounded-t-2xl shadow-lg'>
        <ConfirmRidePopUp confirmRideData={confirmRideData} setConfirmRidePopPanel={setConfirmRidePopPanel} setRidePopPanel={setRidePopPanel} />
      </div>
    </div>
  );
};

export default CaptainHome;