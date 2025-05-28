import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      // handle success
      if (response.status === 200) {
        localStorage.removeItem('token'); // Clear the token from local storage
        navigate('/login'); // Redirect to login page
      }
    })
    .catch(error => {
      // handle error
      console.error(error);
    });

  return (
    <div>
      UserLogout
    </div>
  )
}

export default UserLogout
