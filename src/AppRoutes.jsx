import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Tasks from "./pages/Tasks";
import { AuthContext } from "./context/AuthProvider";

function AppRoutes() {
  const [userData] = useContext(AuthContext); // get userData from AuthContext

  if (!userData) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <Navigate
            to={
              userData.role === "admin"
                ? "/admin-dashboard"
                : "/employee-dashboard"
            }
            replace
          />
        }
      />
      <Route
        path="/admin-dashboard"
        element={
          userData.role === "admin" ? (
            <AdminDashboard />
          ) : (
            <Navigate to="/employee-dashboard" replace />
          )
        }
      />
      <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route
        path="*"
        element={
          <Navigate
            to={
              userData.role === "admin"
                ? "/admin-dashboard"
                : "/employee-dashboard"
            }
            replace
          />
        }
      />
    </Routes>
  );
}

export default AppRoutes;
