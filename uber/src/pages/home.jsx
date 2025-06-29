

import React, { useContext, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import LocationPanelSearch from '../components/LocationPanelSearch';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import { SocketContext } from '../context/SocketContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
import WaitingForDriver from '../components/WaitingForDriver';

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

function Home() {
  const navigate = useNavigate();
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [panelOpen, setpanelOpen] = useState(false);
  const [pickupLocation, setpickupLocation] = useState('');
  const [dropoffLocation, setdropoffLocation] = useState('');
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmedRide, setConfirmedRide] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const [rideConfirm, setRideConfirm] = useState(null);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [activeInput, setActiveInput] = useState(null);
  const [lookingForDriver, setLookingForDriver] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [fare, setFare] = useState({});
  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);
  const lookingForDriverRef = useRef(null);

  useGSAP(() => {
    gsap.to(panelRef.current, {
      height: panelOpen ? "62%" : "0%",
      duration: 0.5,
      opacity: panelOpen ? 1 : 0,
      display: panelOpen ? "block" : "hidden",
    });
    gsap.to(panelCloseRef.current, {
      rotate: panelOpen ? 0 : 180,
      duration: 0.2,
    });
  }, [panelOpen]);

  useGSAP(() => {
    if (!vehiclePanelRef.current) return;
    gsap.to(vehiclePanelRef.current, {
      transform: vehiclePanelOpen ? 'translateY(0)' : 'translateY(100%)',
      duration: 0.4,
      ease: 'power2.inOut',
    });
  }, [vehiclePanelOpen]);

  useGSAP(() => {
    if (!confirmRidePanelRef.current) return;
    gsap.to(confirmRidePanelRef.current, {
      transform: confirmedRide ? 'translateY(0)' : 'translateY(100%)',
      duration: 0.4,
      ease: 'power2.inOut',
    });
  }, [confirmedRide]);

  useGSAP(() => {
    if (!lookingForDriverRef.current) return;
    gsap.to(lookingForDriverRef.current, {
      transform: lookingForDriver ? 'translateY(0)' : 'translateY(100%)',
      duration: 0.4,
      ease: 'power2.inOut',
    });
  }, [lookingForDriver]);

  useGSAP(() => {
    gsap.to(waitingForDriverRef.current, {
      transform: waitingForDriver ? 'translateY(0)' : 'translateY(100%)',
    });
  }, [waitingForDriver]);

  useEffect(() => {
    socket.emit('join', { role: 'user', userId: user._id });
  }, [user]);

  const fetchSuggestions = async (input) => {
    if (input.length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input },
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };

  const handlePickupChange = (e) => {
    const value = e.target.value;
    setpickupLocation(value);
    fetchSuggestions(value);
  };

  const handleDropoffChange = (e) => {
    const value = e.target.value;
    setdropoffLocation(value);
    fetchSuggestions(value);
  };

  const handleSelectSuggestion = (suggestion) => {
    if (activeInput === 'pickup') {
      setpickupLocation(suggestion);
    } else {
      setdropoffLocation(suggestion);
    }
    setSuggestions([]);
    setpanelOpen(false);
  };

  useEffect(() => {
    if (!socket || !user?._id) return;

    socket.emit('join', { role: 'user', userId: user._id });

    socket.on('ride-confirmed', (data) => {
      setRideConfirm(data);
      setLookingForDriver(false);
      setWaitingForDriver(true);
    });

    socket.on('ride-started', (data) => {
      localStorage.setItem('currentRide', JSON.stringify(data));
      navigate('/riding');
      const locationInterval = setInterval(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          socket.emit('user-location-update', {
            userId: user._id,
            latitude,
            longitude,
          });
        });
      }, 5000);
    });

    return () => {
      socket.off('ride-confirmed');
      socket.off('ride-started');
    };
  }, [socket, user]);

  const sumbithandler = async (e) => {
    e.preventDefault();
    if (!pickupLocation || !dropoffLocation || pickupLocation === dropoffLocation) {
      alert('Please enter valid pickup and dropoff locations.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/rides/calculate-Fare`, {
        params: { pickup: pickupLocation, destination: dropoffLocation },
        headers: { Authorization: `Bearer ${token}` },
      });
      setFare(response.data.fares);
      setVehiclePanelOpen(true);
      setpanelOpen(false);
      setSelectedVehicle(null);
      setConfirmedRide(false);
    } catch (error) {
      console.error('Error fetching fare:', error);
    }
  };

  const handleBackToHome = () => {
    setConfirmedRide(false);
    setVehiclePanelOpen(true);
    setSuggestions([]);
  };

  const handleConfirmRide = () => {
    setVehiclePanelOpen(false);
    setConfirmedRide(true);
  };

  const handleFinalConfirmRide = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/rides/create`, {
        pickup: pickupLocation,
        destination: dropoffLocation,
        vehicleType: vehicles[selectedVehicle].type,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setConfirmedRide(false);
      setLookingForDriver(true);
    } catch (error) {
      console.error('Error confirming ride:', error);
    }
  };

  return (
    <div className='h-screen relative overflow-hidden'>
      <h2 className='absolute left-5 top-5 text-3xl font-bold font-sans text-black drop-shadow-md'>RideUrWay</h2>
      <div className='h-screen w-screen'>
        <img src="https://t3.ftcdn.net/jpg/07/28/30/26/240_F_728302620_Xddnf5Cl0K1ACZurd6yByUzHiHMMIoe6.jpg" alt="RideUrWay" className="w-full h-full object-cover" />
      </div>
      {!vehiclePanelOpen && !confirmedRide && (
        <div className='absolute h-screen top-0 flex flex-col justify-end w-full'>
          {/* <div className='h-[38%] p-6 bg-white/80 backdrop-blur-md rounded-t-2xl relative shadow-xl'> */}
          <div className='h-[38%] p-6 bg-white rounded-t-2xl relative shadow-xl'>

            <h5 ref={panelCloseRef} onClick={() => setpanelOpen(!panelOpen)} className='absolute right-6 top-6 text-2xl'><i className='ri-arrow-down-wide-line'></i></h5>
            <h4 className='text-2xl font-semibold'>Find a Trip</h4>
            <form onSubmit={sumbithandler} className='mt-2'>
              <input className="w-full px-4 py-3 rounded-xl bg-white/90 shadow-inner border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 mt-5" type="text" onClick={() => { setpanelOpen(true); setActiveInput('pickup'); }} value={pickupLocation} onChange={handlePickupChange} placeholder="Enter pickup location" />
              <input className="w-full px-4 py-3 rounded-xl bg-white/90 shadow-inner border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 mt-3" type="text" onClick={() => { setpanelOpen(true); setActiveInput('dropoff'); }} value={dropoffLocation} onChange={handleDropoffChange} placeholder="Enter dropoff location" />
              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg mt-4 w-full">Find a Ride</button>
            </form>
          </div>
          <div ref={panelRef} className="bg-white overflow-hidden">
            <LocationPanelSearch setPanelOpen={setpanelOpen} setVehiclePanelOpen={setVehiclePanelOpen} pickupLocation={pickupLocation} dropoffLocation={dropoffLocation} setPickupLocation={setpickupLocation} setDropoffLocation={setdropoffLocation} activeInput={activeInput} suggestions={suggestions} onSelectSuggestion={handleSelectSuggestion} />
          </div>
        </div>
      )}
      <VehiclePanel ref={vehiclePanelRef} open={vehiclePanelOpen} setOpen={setVehiclePanelOpen} setConfirmedRide={handleConfirmRide} confirmedRide={confirmedRide} selectedVehicle={selectedVehicle} setSelectedVehicle={setSelectedVehicle} vehicles={vehicles} fare={fare} />
      {lookingForDriver && <LookingForDriver ref={lookingForDriverRef} selectedVehicle={selectedVehicle !== null ? vehicles[selectedVehicle] : null} pickupLocation={pickupLocation} dropoffLocation={dropoffLocation} fare={fare} onBackToHome={handleBackToHome} />}
      <ConfirmRide ref={confirmRidePanelRef} open={confirmedRide} selectedVehicle={selectedVehicle !== null ? vehicles[selectedVehicle] : null} pickupLocation={pickupLocation} dropoffLocation={dropoffLocation} onBackToHome={handleBackToHome} onConfirm={handleFinalConfirmRide} fare={fare} />
      {waitingForDriver && <WaitingForDriver ref={waitingForDriverRef} rideConfirm={rideConfirm} waitingForDriver={waitingForDriver} setWaitingForDriver={setWaitingForDriver} selectedVehicle={selectedVehicle !== null ? vehicles[selectedVehicle] : null} />}
    </div>
  );
}

export default Home;
