
import React, { useState, useEffect, createContext } from 'react'
import axios from 'axios'

export const UserDataContext = createContext()



const UserContext = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:4000/users/profile', {
          withCredentials: true // Ensure cookies are sent with the request
        })
        setUser(res.data)
      } catch (err) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  // Optional: don't render app until user is checked
  if (loading) return <div>Loading...</div>

  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  )
}

export default UserContext
