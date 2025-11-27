import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Routes>
      
      {/* LOGIN PAGE */}
      <Route
        path="/"
        element={!user ? <Login /> : <Navigate to="/dashboard" />}
      />

      {/* REGISTER PAGE */}
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/dashboard" />}
      />

      {/* DASHBOARD (Protected Route) */}
      <Route
        path="/dashboard"
        element={user ? <Dashboard /> : <Navigate to="/" />}
      />

      {/* CATCH-ALL: Redirect unknown routes to login */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
