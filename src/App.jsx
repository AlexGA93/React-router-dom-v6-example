import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar, ProtectedRoute } from "./components/index";
import { Home, Landing, Dashboard, Analytics, Admin } from "./pages/index";
import "./App.css";

function App() {
  // initial state
  const [user, setUser] = useState(null);

  // function login and logout
  const login = () => {
    // set state's info
    setUser({
      id: 1,
      name: "John",
      permissions: ["analize"],
      roles: ["admin"],
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <BrowserRouter>
      {/* Common Navbar */}
      <Navbar />

      {/* Buttons to login and logout */}
      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={login}>Login</button>
      )}

      <Routes>
        {/* Public Pages - First site's page */}
        <Route index element={<Landing />} />
        <Route path="/landing" element={<Landing />} />
        {/* common user page - Private Pages by react router dom's Outlet*/}
        <Route element={<ProtectedRoute isAllowed={!!user} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        {/* root user page(roles) - Private and permissions */}
        <Route
          path="/analytics"
          element={
            <ProtectedRoute
              isAllowed={!!user && user.permissions.includes("analize")}
              redirectTo="/home"
            >
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              isAllowed={!!user && user.roles.includes("admin")}
              redirectTo="/home"
            >
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
