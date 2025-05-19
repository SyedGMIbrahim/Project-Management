import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { getLocalStorage } from "../../utils/localStorage";

const Logout = () => {
  const [userData, setUserData] = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    const data = getLocalStorage();

    if (data) {
      delete data.currentUser;
      localStorage.setItem("data", JSON.stringify(data));
      setUserData(null);
      alert("Logout successful");
      navigate("/login");
    } else {
      alert("No user session found");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end", padding: "1rem" }}>
      <button
        onClick={handleLogout}
        style={{
          backgroundColor: "#ef4444",
          color: "white",
          padding: "8px 16px",
          borderRadius: "4px",
          border: "none",
          cursor: "pointer"
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
