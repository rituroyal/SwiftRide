import React ,{useContext}from 'react'
import {CaptainDataContext} from '../context/CaptainContext.jsx';

const CaptainDetails = () => {
  
 const { captain } = useContext(CaptainDataContext);
  // Fallback to localStorage if captain context is not available
 
  
 
    

  return (
    <div className="w-full max-w-md border border-gray-300 rounded-xl p-6 bg-gray-50 " style={{height: '260px'}}>
      {/* Profile and Earnings */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <img
            src="/image/male.jpg"
            alt="Profile"
            className="h-14 w-14 rounded-full object-cover border-2 border-gray-400"
          />
          <h3 className="text-xl font-semibold text-gray-900 capitalize">{captain.fullname.firstname + " " + captain.fullname.lastname }</h3>
        </div>
        <div className="text-right">
          <h4 className="text-2xl font-bold text-gray-900">₹295.20</h4>
          <p className="text-sm text-gray-500">Earned</p>
        </div>
      </div>

      {/* Online Stats */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-center flex-1">
          <i className="ri-time-line text-2xl mb-1 text-gray-700"></i>
          <p className="text-lg font-semibold text-gray-900">10.2</p>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="flex flex-col items-center flex-1">
          <i className="ri-speed-up-line text-2xl mb-1 text-gray-700"></i>
          <p className="text-lg font-semibold text-gray-900">24</p>
          <p className="text-sm text-gray-600">Trips</p>
        </div>
        <div className="flex flex-col items-center flex-1">
          <i className="ri-booklet-line text-2xl mb-1 text-gray-700"></i>
          <p className="text-lg font-semibold text-gray-900">4.9</p>
          <p className="text-sm text-gray-600">Rating</p>
        </div>
      </div>
    </div>
  )
}

export default CaptainDetails