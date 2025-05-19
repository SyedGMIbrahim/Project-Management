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
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={submitHandler}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label className="block text-black font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow appearance-none border rounded-md w-full py-2 px-3 text-black"
            placeholder="Enter username"
          />
        </div>

        <div className="mb-6">
          <label className="block text-black font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
            placeholder="Enter password"
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
