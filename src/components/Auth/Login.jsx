import React, { useState, useContext } from "react";
import { getLocalStorage } from "../utils/localStorage";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const data = getLocalStorage();

    if (!data?.employees?.length) {
      alert("No user data found");
      return;
    }

    const user = data.employees.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      const updatedData = { ...data, currentUser: user };
      localStorage.setItem("data", JSON.stringify(updatedData));
      setUserData(user);
      alert("Login successful");

      if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else if (user.role === "employee") {
        navigate("/employee-dashboard");
      } else {
        alert("Unknown role");
      }
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ maxWidth: "300px", margin: "auto" }}>
      <h2>Login</h2>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoFocus
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" style={{ marginTop: "10px" }}>
        Login
      </button>
    </form>
  );
};

export default Login;
