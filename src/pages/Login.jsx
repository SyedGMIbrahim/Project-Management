import React from "react";
import { getLocalStorage,setLocalStorage } from "../utils/localStorage";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

const Login = () => {



  const [userName,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [userData,setUserData] = useContext(AuthContext);
  const navigate = useNavigate();
 const handleLogin=(e)=>{
  e.preventDefault();
  const data=getLocalStorage();
  if (!data || !data.employees) {
    alert('No user data found');
    return;
  }
  const user = data.employees.find(
    (user) => user.username === userName && user.password === password
  );
if(user)
{
  data.currentUser=user;
  localStorage.setItem("data",JSON.stringify(data));
  alert("Login successful");
  setUserData(user);
  if(user.role==="admin")
  {
    navigate("/admin-dashboard");
  }
  else if(user.role==="employee")
  {
    navigate("/employee-dashboard");
  }
  else{
    alert("Invalid role");
  }
 

}
else{
  alert("Invalid username or password");
}
 }

return (
  <form onSubmit={handleLogin} style={{ maxWidth: '300px', margin: 'auto' }}>
    <h2>Login</h2>
    <div>
      <label>Username:</label><br />
      <input
        type="text"
        value={userName}
        onChange={(e) => setUsername(e.target.value)}
        required
        autoFocus
      />
    </div>
    <div>
      <label>Password:</label><br />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>
    <button type="submit" style={{ marginTop: '10px' }}>Login</button>
  </form>
);
};


export default Login;
