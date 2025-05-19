import React, { useState } from "react";


const Login = ({handleLogin}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
const submitHandler = (e)=>{
        e.preventDefault()
        handleLogin(username,password)
        setUsername("")
        setPassword("")
        console.log("Login data", username, password);
    }

  return (
    <form onSubmit={(e)=>{submitHandler(e)}} style={{ maxWidth: "300px", margin: "auto" }}>
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
