import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import LoginModal from "./components/LoginModal";
import { getCurrentUser } from "./apis/user.api";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen bg-[#050816] text-white">

      <Navbar
        user={user}
        openLogin={() => setShowLogin(true)}
      />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />

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