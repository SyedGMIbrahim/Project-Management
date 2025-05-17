import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import Tasks from './pages/Tasks';
import {AuthContext} from './context/AuthProvider';

function App() {
  const [user, setUser] = useState (null);
  const [loggedInUserData, setLoggedInUserData] = useState (null);
  const [userData, SetUserData] = useContext (AuthContext);

  useEffect (() => {
    const loggedInUser = localStorage.getItem ('loggedInUser');
    if (loggedInUser) {
      const userData = JSON.parse (loggedInUser);
      setUser (userData.role);
      setLoggedInUserData (userData.data);
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
