import React, { createContext, useEffect, useState } from 'react'
import { getLocalStorage, setLocalStorage } from '../utils/localStorage'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  

    const [userData, setUserData] = useState(null)

    useEffect(() => {
        setLocalStorage()
        const data = getLocalStorage()
        if(data.currentUser)
        {
            setUserData(data.currentUser)
        }
       
    }, [])
    
    

    return (
        <div>
            <AuthContext.Provider value={[userData,setUserData]}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}

export default AuthProvider