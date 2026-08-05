import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import LoginModal from "./components/LoginModal";
import { getCurrentUser } from "./apis/user.api";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await getCurrentUser();

        console.log("API Response:", data);

        if (data.status) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.log(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  if (loading) {
    return (
      <div className="w-full fixed top-0 left-0 z-[9999]">
        <div className="h-1 bg-black animate-pulse w-full"></div>
      </div>
    );
  }

  // Show Navbar on homepage / landing page and hide on the dashboard
  const showNavbar = location.pathname !== "/dashboard";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-200">
      {showNavbar && (
        <Navbar
          user={user}
          openLogin={() => setShowLogin(true)}
        />
      )}

      <main className="w-full">
        <Routes>
          <Route
            path="/"
            element={
              user ? <Navigate to="/dashboard" replace /> : <Navigate to="/home" replace />
            }
          />
          <Route
            path="/home"
            element={
              user ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Home openLogin={() => setShowLogin(true)} />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              user ? (
                <Dashboard user={user} />
              ) : (
                <Navigate to="/home" replace />
              )
            }
          />
        </Routes>
      </main>

      {showLogin && (
        <LoginModal closeModal={() => setShowLogin(false)} />
      )}
    </div>
  );
};

export default App;