import React, { useContext, useEffect, useState } from 'react';
import Login from './components/Auth/Login';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import { AuthContext } from './context/AuthProvider';

const App = () => {
  const [user, setUser] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const { userData, setUserData } = useContext(AuthContext); // Correct destructuring

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      try {
        const { role, data } = JSON.parse(loggedInUser);
        setUser(role);
        setLoggedInUserData(data);
      } catch (error) {
        console.error('Error parsing localStorage data:', error);
        localStorage.removeItem('loggedInUser');
      }
    }
  }, []);

  const handleLogin = async (email, password) => {
    try {
      // Mock API call (replace with real backend API)
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();

      if (response.ok) {
        const { role, userData } = result;
        setUser(role);
        setLoggedInUserData(userData);
        localStorage.setItem('loggedInUser', JSON.stringify({ role, data: userData }));
      } else {
        throw new Error(result.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      return { error: error.message };
    }
  };

  const handleLogout = () => {
    setUser(null);
    setLoggedInUserData(null);
    localStorage.removeItem('loggedInUser');
  };

  const renderDashboard = () => {
    switch (user) {
      case 'admin':
        return <AdminDashboard logout={handleLogout} />;
      case 'employee':
        return <EmployeeDashboard logout={handleLogout} data={loggedInUserData} />;
      default:
        return null;
    }
  };

  return (
    <>
      {!user ? <Login handleLogin={handleLogin} /> : renderDashboard()}
    </>
  );
};

export default App;