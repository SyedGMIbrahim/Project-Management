import React from "react";
import { BrowserRouter } from "react-router-dom";
// import AppRoutes from "./AppRoutes";
// import AuthProvider from "./context/AuthProvider";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-blue-500 text-white p-4 rounded-md text-center mb-4">HELLO</div>
      {/* <AuthProvider>
        <AppRoutes />
      </AuthProvider> */}
    </BrowserRouter>
  );
}

export default App;
