import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const [userData, setUserData] = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        const data = localStorage.getItem("data")
        if(data) {
            const parsedData = JSON.parse(data)
            parsedData.currentUser = null
            localStorage.setItem("data", JSON.stringify(parsedData))
            setUserData(null)
            navigate('/login')
            alert("Logout successful")
        } else {
            alert("No user data found")
        }
    }

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            padding: '1rem' 
        }}>
            <button 
                onClick={handleLogout}
                style={{
                    backgroundColor: '#ef4444',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    border: 'none',
                  
                }}
            >
                Logout
            </button>
        </div>
    )
}

export default Logout