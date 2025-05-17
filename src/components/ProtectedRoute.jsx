import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const [userData] = useContext(AuthContext);

  if (!userData) {
    // Not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userData.role)) {
    // User's role is not authorized, redirect to appropriate dashboard
    return <Navigate to={userData.role === 'admin' ? '/admin-dashboard' : '/employee-dashboard'} replace />;
  }

  return children;
};

export default ProtectedRoute; 