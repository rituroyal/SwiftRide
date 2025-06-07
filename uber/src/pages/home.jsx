import React, { use, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import LocationPanelSearch from '../components/LocationPanelSearch';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import axios from 'axios';
// import WaitingForDriver from '../components/WaitingForDriver';

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

function Home() {
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
  const [activeInput, setActiveInput] = useState(null); // 'pickup' or 'dropoff'
  const [lookingForDriver, setLookingForDriver] = useState(false);
  const [suggestions, setSuggestions] = useState([]); // State for suggestions
  
  // Animate location panel
  useGSAP(() => {
    gsap.to(panelRef.current, {
      height: panelOpen ? "62%" : "0%",
      duration: 0.5,
      opacity: panelOpen ? 1 : 0,
      display: panelOpen ? "block" : "hidden", 
     
    })
    gsap.to(panelCloseRef.current, {
      rotate: panelOpen ? 0 : 180,
      duration: 0.2,

    });
  }, [panelOpen]);

  // Animate vehicle panel
  useGSAP(() => {
    if (!vehiclePanelRef.current) return;
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)',
        duration: 0.4,
        ease: 'power2.inOut',
         // Ensure it's visible
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)',
        duration: 0.4,
        ease: 'power2.inOut',
      });
    }
  }, [vehiclePanelOpen]);

  // Animate confirm ride panel
  useGSAP(() => {
    if (!confirmRidePanelRef.current) return;
    if (confirmedRide) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)',
        duration: 0.4,
        ease: 'power2.inOut',
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)',
        duration: 0.4,
        ease: 'power2.inOut',
      });
    }
  }, [confirmedRide]);



  // Function to fetch suggestions
  const fetchSuggestions = async (input, type) => {
    if (input.length < 2) { // Only fetch if input is at least 2 characters
      setSuggestions([]);
      return;
    }
    try {
       const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODQyNTgwYTI5NmFiYmE4ODQ0MDI0ZDMiLCJpYXQiOjE3NDkyODcyMzYsImV4cCI6MTc0OTM3MzYzNn0.ujEc66Pw4WF2rpSc_FikuKo0egfBVTDLofyVqcVv66M'; // Replace with your actual token
     
      const response = await axios.get('http://localhost:4000/maps/get-suggestions', {
        params: {
          input: input  // Replace `userInput` with your actual input variable
        },
        headers: {
          Authorization:`Bearer ${token}`  // Use token from localStorage
        },
        
      });
      
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]); // Clear suggestions on error
    }
  };

  // Handle input change for pickup location
  const handlePickupChange = (e) => {
    const value = e.target.value;
    setpickupLocation(value);
    fetchSuggestions(value, 'pickup');
  };

  // Handle input change for dropoff location
  const handleDropoffChange = (e) => {
    const value = e.target.value;
    setdropoffLocation(value);
    fetchSuggestions(value, 'dropoff');
  };

  // Handle suggestion selection
  const handleSelectSuggestion = (suggestion) => {
    if (activeInput === 'pickup') {
      setpickupLocation(suggestion);
    } else if (activeInput === 'dropoff') {
      setdropoffLocation(suggestion);
    }
    setSuggestions([]); // Clear suggestions after selection
    setpanelOpen(false); // Close the suggestion panel
  };




  // Form submit: open vehicle panel
  const sumbithandler = (e) => {
    e.preventDefault();
    if (!pickupLocation || !dropoffLocation) {
      alert('Please enter both pickup and dropoff locations.');
      return;
    }
    if (pickupLocation === dropoffLocation) {
      alert('Please enter different pickup and dropoff locations.');
      return;
    }
    setVehiclePanelOpen(true);
    setpanelOpen(false);
    setSelectedVehicle(null); // Reset selection on new search
    setConfirmedRide(false);  // Reset confirm on new search
  };

  // Reset all for Back to Home
  const handleBackToHome = () => {
    
    setConfirmedRide(false);
    setVehiclePanelOpen(false);
    setpanelOpen(false);
    setSelectedVehicle(null);
    setpickupLocation('');
    setdropoffLocation('');
    setSuggestions([]);
  };

  // ...existing code...

const handleConfirmRide = () => {
  setLookingForDriver(true);
  setVehiclePanelOpen(false);
  setConfirmedRide(false);
};

  return (
     <div className='h-screen relative overflow-hidden'>
      {/* Header */}
      <h2 className=' w-16 font-bold text-2xl absolute left-5 top-5 font-mono'>RideUrWay</h2>

      {/* Background Image */}
      <div className='h-screen w-screen' >
        <img src="https://t3.ftcdn.net/jpg/07/28/30/26/240_F_728302620_Xddnf5Cl0K1ACZurd6yByUzHiHMMIoe6.jpg" alt="RideUrWay" className="w-full h-full object-cover" />
      </div>

      {/* Find a Trip Panel */}
      {!vehiclePanelOpen && !confirmedRide && (
         <div className='absolute h-screen top-0 flex flex-col justify-end w-full '>
        <div className='h-[38%] p-6 bg-white relative'>
          <h5 ref={panelCloseRef} onClick={() => setpanelOpen(!panelOpen)} className='absolute right-6 top-6 text-2xl '><i className='ri-arrow-down-wide-line'></i></h5>
          <h4 className='text-2xl font-semibold'>Find a Trip</h4>
            
          
          <form onSubmit={(e) => sumbithandler(e)} className='mt-2'>
          <input 
            className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5" 
            type="text"
            onClick={() => { setpanelOpen(true); setActiveInput('pickup'); }} 
            value={pickupLocation} 
                // onChange={(e) => setpickupLocation(e.target.value)} 
                onChange={handlePickupChange}  
            placeholder="Enter pickup location" />

          <input 
            className="bg-[#eee] px-12 py-2 text-base rounded-lg mt-3 w-full" 
            type="text" 
            onClick={() => { setpanelOpen(true); setActiveInput('dropoff'); }}
            value={dropoffLocation} 
                // onChange={(e) => setdropoffLocation(e.target.value)} 
                onChange={handleDropoffChange}  
            placeholder="Enter dropoff location" />
              
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-lg mt-4 w-full font-semibold"
            >
              Find a Ride
            </button>
          </form>

      </div>


      {/* Animated Location Panel */}
      <div
        ref={panelRef}
        className=" bg-white overflow-hidden"
      >
        <LocationPanelSearch
          setPanelOpen={setpanelOpen}
          setVehiclePanelOpen={setVehiclePanelOpen}
          pickupLocation={pickupLocation}
          dropoffLocation={dropoffLocation}
          setPickupLocation={setpickupLocation}
          setDropoffLocation={setdropoffLocation}
              activeInput={activeInput}
              suggestions={suggestions} // Pass suggestions
          onSelectSuggestion={handleSelectSuggestion} // Pass selection handler
        />
      </div>
      </div>

       )} 
      

      
      <VehiclePanel
        ref={vehiclePanelRef}
        open={vehiclePanelOpen}
        setOpen={setVehiclePanelOpen}
        // setConfirmedRide={setConfirmedRide}
        setConfirmedRide={handleConfirmRide} 
        confirmedRide={confirmedRide}
        selectedVehicle={selectedVehicle}
        setSelectedVehicle={setSelectedVehicle}
        vehicles={vehicles}
      />

{lookingForDriver && (
      <LookingForDriver
        selectedVehicle={selectedVehicle !== null ? vehicles[selectedVehicle] : null}
        pickupLocation={pickupLocation}
        dropoffLocation={dropoffLocation}
        onBackToHome={handleBackToHome}
      />
    )}

     {/* <ConfirmRide
        ref={confirmRidePanelRef}
        open={confirmedRide}
        selectedVehicle={selectedVehicle !== null ? vehicles[selectedVehicle] : null}
        pickupLocation={pickupLocation}
        dropoffLocation={dropoffLocation}
        onBackToHome={handleBackToHome}
      />  */}
    </div>
  );
}

export default Home;