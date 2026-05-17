import { useState } from "react";
import "./App.css";

import Dashboard from "./frontend/dashboard";
import AdminLogin from "./frontend/AdminLogin";

function App() {

  // 🔐 Tracks whether admin is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>

      {isLoggedIn ? (

        // ✅ DASHBOARD
        <Dashboard
          handleLogout={() => setIsLoggedIn(false)}
        />

      ) : (

        // 🔒 LOGIN PAGE
        <AdminLogin
          onLogin={() => setIsLoggedIn(true)}
        />

      )}

    </>
  );
}

export default App;