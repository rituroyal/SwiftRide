import React, { useState,createContext } from 'react'

export const UserDataContext=createContext()
//pure application ko wrap karna hai
const UserContext = ({children}) => {
    const [user, setuser] = useState({
        email:'',
        fullName:{
            firstName:'',
            lastName:''
        }
    })
  return (
    <div>
        
      <UserDataContext.Provider value={[user,setuser]}>{children}</UserDataContext.Provider>
    </div>
  )
}

export default UserContext
