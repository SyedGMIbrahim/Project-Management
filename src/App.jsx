import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Tasks from "./pages/Tasks";
import AuthProvider, { AuthContext } from "./context/AuthProvider";

function AppRoutes() {
  const [userData] = useContext(AuthContext);

  // If not logged in, only allow access to login page
  if (!userData) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // If logged in, show role-specific routes
  return (
    <Routes>
      <Route path="/login" element={<Navigate to={userData.role === 'admin' ? '/admin-dashboard' : '/employee-dashboard'} />} />
      <Route 
        path="/admin-dashboard" 
        element={userData.role === 'admin' ? <AdminDashboard /> : <Navigate to="/employee-dashboard" />} 
      />
      <Route 
        path="/employee-dashboard" 
        element={<EmployeeDashboard />} 
      />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="*" element={<Navigate to={userData.role === 'admin' ? '/admin-dashboard' : '/employee-dashboard'} />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
