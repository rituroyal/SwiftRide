import React, { useState,createContext } from 'react'

export const UserDataContext=createContext()
//pure application ko wrap karna hai
const UserContext = ({children}) => {
    const [user, setUser] = useState({
        email:'',
        fullName:{
            firstName:'',
            lastName:''
        }
    })
  return (
    
        
      <UserDataContext.Provider value={{user, setUser}}>{children}</UserDataContext.Provider>
    
  )
}

export default UserContext
