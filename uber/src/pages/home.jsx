import React from 'react'
import  { useState } from 'react'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import 'remixicon/fonts/remixicon.css'
import LocationPanelSearch from '../components/LocationPanelSearch'

const Home = () => {
  const [pickupLocation, setpickupLocation] = useState("");
  const [dropoffLocation, setdropoffLocation] = useState("");
  const [panelOpen, setpanelOpen] = useState(false);
  const panelRef=useRef(null)
  const panelCloseRef=useRef(null)

  useGSAP(() => {
    gsap.to(panelRef.current, {
      height: panelOpen ? "70%" : "30%",
      duration: 0.5,
      ease: "power2.inOut",
      opacity: panelOpen ? 1 : 0,
      display: panelOpen ? "block" : "none", 
     
    })
    gsap.to(panelCloseRef.current, {
      rotate: panelOpen ? 0 : 180,
      duration: 0.2,
      ease: "power2.inOut",
      
    });
  }, [panelOpen]);


  const sumbithandler = (e) => {
    e.preventDefault();
    // Get the values from the input fields
    if (!pickupLocation || !dropoffLocation) {
      alert("Please enter both pickup and dropoff locations.");
      return;
    }

    // Here you can handle the form submission, like sending the data to an API
    console.log("Pickup Location:", pickupLocation);
    console.log("Dropoff Location:", dropoffLocation);

    // Reset the form fields
    e.target.reset();
  }
  return (
    <div className='h-screen relative'>
      <h2 className=' w-16 font-bold text-2xl absolute left-5 top-5 font-mono'>RideUrWay</h2>
      <div className='h-screen w-screen' >
        <img src="https://t3.ftcdn.net/jpg/07/28/30/26/240_F_728302620_Xddnf5Cl0K1ACZurd6yByUzHiHMMIoe6.jpg" alt="RideUrWay" className="w-full h-full object-cover" />
      </div>
      <div className='absolute h-screen top-0 flex flex-col justify-end w-full '>
        <div className='h-[30%] p-6 bg-white relative'>
          <h5 ref={panelCloseRef} onClick={() => setpanelOpen(!panelOpen)} className='absolute right-6 top-6 text-2xl '><i className='ri-arrow-down-wide-line'></i></h5>
          <h4 className='text-2xl font-semibold'>Find a Trip</h4>
        <form onSubmit={(e) => sumbithandler(e)} className='mt-2'>
          <div className='line absolute h-16 w-1 top-[53%] left-12 bg-black rounded-full'></div>

          <input 
          className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5" 
          type="text"
          onClick={() => setpanelOpen(true)} 
          value={pickupLocation} 
          onChange={(e) => setpickupLocation(e.target.value)} 
          placeholder="Enter pickup location" />


          <input 
          className="bg-[#eee] px-12 py-2 text-base rounded-lg mt-3 w-full" 
          type="text" 
          onClick={() => setpanelOpen(true)}
          value={dropoffLocation} 
          onChange={(e) => setdropoffLocation(e.target.value)} 
          placeholder="Enter dropoff location" />


        </form>
        </div>

        <div ref={panelRef} className=' bg-zinc-100 hidden '> <LocationPanelSearch/></div>
      </div>
      <div className='fixed'></div>
    </div>
  )
}

export default Home
