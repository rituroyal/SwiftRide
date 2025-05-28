import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'  


function CaptainLogout() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      // handle success
      if (response.status === 200) {
        localStorage.removeItem('token'); // Clear the token from local storage
        navigate('/CaptainLogin'); // Redirect to login page of captain
      }
    })
    .catch(error => {
      // handle error
      console.error(error);
    });

  return (
    <div>
      Captain Logout
    </div>
  )
}

export default CaptainLogout
