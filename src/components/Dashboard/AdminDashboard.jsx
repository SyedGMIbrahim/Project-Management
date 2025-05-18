import React from "react";
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button 
          onClick={() => navigate('/tasks')}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '4px',
            border: 'none'
          }}
        >
          Manage Tasks
        </button>
        <Logout />
      </div>
    </div>
  );
};

export default AdminDashboard;
