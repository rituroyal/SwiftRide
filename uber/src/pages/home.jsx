
import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import LocationPanelSearch from '../components/LocationPanelSearch';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';

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
  const [panelOpen, setPanelOpen] = useState(false);
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmedRide, setConfirmedRide] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);

  // Animate location panel
  useGSAP(() => {
    if (!panelRef.current) return;
    if (panelOpen) {
      panelRef.current.style.display = 'block';
      gsap.to(panelRef.current, {
        height: '60%',
        opacity: 1,
        duration: 0.4,
        ease: 'power2.inOut',
      });
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        opacity: 0,
        duration: 0.4,
        ease: 'power2.inOut',
        onComplete: () => {
          if (panelRef.current) panelRef.current.style.display = 'none';
        },
      });
    }
    if (panelCloseRef.current) {
      gsap.to(panelCloseRef.current, {
        rotate: panelOpen ? 0 : 180,
        duration: 0.3,
        ease: 'power2.inOut',
      });
    }
  }, [panelOpen]);

  // Animate vehicle panel
  useGSAP(() => {
    if (!vehiclePanelRef.current) return;
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)',
        duration: 0.4,
        ease: 'power2.inOut',
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

  // Form submit: open vehicle panel
  const submitHandler = (e) => {
    e.preventDefault();
    if (!pickupLocation || !dropoffLocation) {
      alert('Please enter both pickup and dropoff locations.');
      return;
    }
    setVehiclePanelOpen(true);
    setPanelOpen(false);
    setSelectedVehicle(null); // Reset selection on new search
    setConfirmedRide(false);  // Reset confirm on new search
  };

  // Reset all for Back to Home
  const handleBackToHome = () => {
    setConfirmedRide(false);
    setVehiclePanelOpen(false);
    setSelectedVehicle(null);
    setPickupLocation('');
    setDropoffLocation('');
  };

  return (
    <div className="relative w-full h-screen bg-gray-100 font-sans overflow-hidden">
      {/* Header */}
      <header className="absolute top-4 left-4 text-xl font-bold z-10">RideUrWay</header>

      {/* Background Image */}
      <img
        src="https://t3.ftcdn.net/jpg/07/28/30/26/240_F_728302620_Xddnf5Cl0K1ACZurd6yByUzHiHMMIoe6.jpg"
        alt="background"
        className="w-full h-full object-cover absolute inset-0"
      />

      {/* Find a Trip Panel */}
      {!vehiclePanelOpen && !confirmedRide && (
        <div className="absolute bottom-40 w-full bg-white px-4 py-6 shadow-lg rounded-t-2xl z-20">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">Find a Trip</h3>
            <button
              ref={panelCloseRef}
              onClick={() => setPanelOpen(!panelOpen)}
              className="text-xl transform transition-transform"
            >
              <i className="ri-arrow-down-wide-line"></i>
            </button>
          </div>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Enter pickup location"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              onClick={() => setPanelOpen(true)}
              className="w-full px-4 py-2 rounded-md bg-gray-100 mb-3"
            />
            <input
              type="text"
              placeholder="Enter dropoff location"
              value={dropoffLocation}
              onChange={(e) => setDropoffLocation(e.target.value)}
              onClick={() => setPanelOpen(true)}
              className="w-full px-4 py-2 rounded-md bg-gray-100"
            />
            <button
              type="submit"
              className="mt-4 w-full bg-black text-white py-2 rounded-md font-semibold"
            >
              Search Rides
            </button>
          </form>
        </div>
      )}

      {/* Animated Location Panel */}
      <div
        ref={panelRef}
        className="absolute bottom-[200px] w-full bg-white z-30 px-4 py-3 rounded-t-2xl shadow-lg overflow-hidden"
        style={{ display: 'none', height: '0%', opacity: 0 }}
      >
        <div className="flex justify-between items-center mb-3">
          <p className="text-gray-800 font-medium">Suggestions</p>
          <button onClick={() => setPanelOpen(false)}>
            <i
              ref={panelCloseRef}
              className="ri-arrow-down-s-line text-2xl text-gray-700"
            ></i>
          </button>
        </div>
        <LocationPanelSearch setPanelOpen={setPanelOpen} setVehiclePanelOpen={setVehiclePanelOpen} />
      </div>

      {/* Vehicle Panel (always in DOM for GSAP) */}
      <VehiclePanel
        ref={vehiclePanelRef}
        open={vehiclePanelOpen}
        setOpen={setVehiclePanelOpen}
        setConfirmedRide={setConfirmedRide}
        confirmedRide={confirmedRide}
        selectedVehicle={selectedVehicle}
        setSelectedVehicle={setSelectedVehicle}
        vehicles={vehicles}
      />

      {/* Confirm Ride Panel (always in DOM for GSAP) */}
      <ConfirmRide
        ref={confirmRidePanelRef}
        open={confirmedRide}
        selectedVehicle={selectedVehicle !== null ? vehicles[selectedVehicle] : null}
        pickupLocation={pickupLocation}
        dropoffLocation={dropoffLocation}
        onBackToHome={handleBackToHome}
      />
    </div>
  );
}

export default Home;