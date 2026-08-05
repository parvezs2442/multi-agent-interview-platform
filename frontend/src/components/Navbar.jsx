import { useNavigate } from "react-router-dom";
import api from "../utilis/axios.js";
import { ArrowRight, LogOut, LayoutDashboard } from "lucide-react";

const Navbar = ({ user, openLogin }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/50 backdrop-blur-xl bg-white/80">
      <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-6 md:px-12">
        
        {/* Logo */}
        <div 
          onClick={() => navigate("/home")} 
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          <div className="bg-black text-white p-2.5 rounded-xl flex items-center justify-center shadow-md">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 font-sans">
            FresherAI
          </span>
        </div>

        {/* Action Button */}
        {user ? (
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 rounded-xl bg-slate-100 hover:bg-slate-200 px-5 py-2.5 font-semibold text-slate-800 transition duration-300 shadow-sm"
            >
              <LayoutDashboard size={18} />
              <span className="hidden sm:inline">Dashboard</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl bg-red-50 hover:bg-red-100 px-5 py-2.5 font-semibold text-red-600 transition duration-300"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        ) : (
          <button
            onClick={openLogin}
            className="flex items-center gap-2 rounded-xl bg-[#18181b] hover:bg-[#27272a] px-5 py-2.5 font-semibold text-white transition duration-300 shadow-lg shadow-black/10 text-sm md:text-base font-sans"
          >
            <span>Log In</span>
            <ArrowRight size={16} strokeWidth={2.5} />
          </button>
        )}

      </div>
    </header>
  );
};

export default Navbar;