import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Setup from "./pages/Setup";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "sonner";
import { useAuth } from "./context/AuthContext";

function App() {
  const { token } = useAuth();

  return (
    <>
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/setup"
          element={
            <ProtectedRoute>
              <Setup />
            </ProtectedRoute>
          }
        />
        {/* Default route */}
        <Route
          path="/"
          element={<Navigate to={token ? "/dashboard" : "/login"} replace />}
        />
        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
