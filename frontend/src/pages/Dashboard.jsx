import React, { useState } from "react";
import { 
  FileText, Star, Map, Coins, LogOut, 
  Menu, X, ChevronLeft, ChevronRight, Plus 
} from "lucide-react";
import api from "../utilis/axios.js";

const Dashboard = ({ user }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // Get user initials for avatar (e.g. Ankush Sahu -> AS)
  const getUserInitials = (name) => {
    if (!name) return "U";
    const parts = name.split(" ");
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  const name = user?.name || "User";
  const email = user?.email || "user@gmail.com";
  const coins = user?.interviewCoin !== undefined ? user.interviewCoin : 150;

  const sidebarContent = (isMobile = false) => (
    <div className="h-full flex flex-col justify-between py-5 px-4 font-sans select-none bg-white text-slate-800">
      <div>
        {/* Header / Logo */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-black text-white p-2.5 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            {(!sidebarCollapsed || isMobile) && (
              <span className="text-lg font-bold text-slate-900 tracking-tight">FresherAI</span>
            )}
          </div>

          {!isMobile && (
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-400 hover:text-slate-800 transition duration-200"
            >
              {sidebarCollapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
            </button>
          )}

          {isMobile && (
            <button 
              onClick={() => setMobileSidebarOpen(false)}
              className="text-slate-400 hover:text-slate-800"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Action Button */}
        <button className={`w-full bg-black hover:bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer transition duration-200 mb-8 ${sidebarCollapsed && !isMobile ? "py-3 px-0" : "py-3.5 px-4 text-sm"}`}>
          <Plus size={16} strokeWidth={3} />
          {(!sidebarCollapsed || isMobile) && <span>Create Interview</span>}
        </button>

        {/* Navigation list */}
        <div className="space-y-6">
          <div>
            {(!sidebarCollapsed || isMobile) && (
              <span className="text-[10px] text-slate-400 font-extrabold tracking-wider block mb-3 px-1">AGENTS</span>
            )}
            <div className="space-y-1.5">
              {/* Resume Builder */}
              <div className={`flex items-center gap-3.5 py-3 px-3.5 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-semibold cursor-pointer border border-transparent transition duration-200 ${sidebarCollapsed && !isMobile ? "justify-center" : "text-sm"}`}>
                <FileText size={18} />
                {(!sidebarCollapsed || isMobile) && <span>Resume Builder</span>}
              </div>

              {/* Resume Scorer (Active as shown in screenshot) */}
              <div className={`flex items-center gap-3.5 py-3 px-3.5 rounded-xl bg-slate-100 text-slate-900 font-semibold cursor-pointer border border-slate-200/50 ${sidebarCollapsed && !isMobile ? "justify-center" : "text-sm"}`}>
                <Star size={18} className="text-slate-700" />
                {(!sidebarCollapsed || isMobile) && <span>Resume Scorer</span>}
              </div>

              {/* Roadmap Builder */}
              <div className={`flex items-center gap-3.5 py-3 px-3.5 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-semibold cursor-pointer border border-transparent transition duration-200 ${sidebarCollapsed && !isMobile ? "justify-center" : "text-sm"}`}>
                <Map size={18} />
                {(!sidebarCollapsed || isMobile) && <span>Roadmap Builder</span>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Footer */}
      <div>
        {/* Coins indicator */}
        <div className={`bg-slate-900 text-white rounded-xl flex items-center justify-between mb-4 shadow-md ${sidebarCollapsed && !isMobile ? "p-2 justify-center flex-col gap-2" : "p-3"}`}>
          <div className={`${sidebarCollapsed && !isMobile ? "text-center" : ""}`}>
            {(!sidebarCollapsed || isMobile) && (
              <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wide">Interview Coins</span>
            )}
            <span className="text-sm font-black text-white flex items-center gap-1.5">
              <Coins size={14} className="text-yellow-500" />
              {coins}
            </span>
          </div>
          <button className="w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs font-bold transition duration-200">
            +
          </button>
        </div>

        {/* User Card */}
        <div className={`flex items-center justify-between border-t border-slate-200 pt-4 ${sidebarCollapsed && !isMobile ? "justify-center" : ""}`}>
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-xs font-black shrink-0">
              {getUserInitials(name)}
            </div>
            {(!sidebarCollapsed || isMobile) && (
              <div className="min-w-0">
                <span className="text-xs font-extrabold text-slate-800 block truncate leading-tight">{name}</span>
                <span className="text-[10px] text-slate-500 block truncate leading-none mt-0.5">{email}</span>
              </div>
            )}
          </div>
          {(!sidebarCollapsed || isMobile) && (
            <button 
              onClick={handleLogout}
              className="text-slate-400 hover:text-slate-800 p-1.5 rounded-lg hover:bg-slate-50 transition duration-200"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-80px)] h-[calc(100vh-80px)] flex bg-white text-slate-900 overflow-hidden font-sans border-t border-slate-100">
      
      {/* Desktop Sidebar */}
      <aside 
        className={`bg-white border-r border-slate-200/50 transition-all duration-300 hidden md:block shrink-0 ${
          sidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
        {sidebarContent(false)}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {mobileSidebarOpen && (
        <div 
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-x-0 bottom-0 top-20 bg-black/60 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Mobile Sidebar */}
      <aside 
        className={`fixed top-20 bottom-0 left-0 w-64 bg-white border-r border-slate-200/50 z-50 transition-transform duration-300 md:hidden ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent(true)}
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto bg-white">
        
        {/* Mobile Header Bar */}
        <header className="h-16 border-b border-slate-200/50 px-6 flex items-center justify-between md:hidden shrink-0 bg-white">
          <div className="flex items-center gap-3">
            <div className="bg-black text-white p-2 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="text-base font-bold text-slate-900 tracking-tight">FresherAI</span>
          </div>

          <button 
            onClick={() => setMobileSidebarOpen(true)}
            className="text-slate-400 hover:text-slate-800 p-1 rounded-lg hover:bg-slate-50"
          >
            <Menu size={22} />
          </button>
        </header>

        {/* Content body */}
        <main className="flex-1 p-6 md:p-10 max-w-7xl w-full mx-auto flex flex-col justify-start bg-white">
          
          {/* Greeting */}
          <div className="mb-8">
            <span className="text-xs text-slate-400 font-extrabold tracking-wider block uppercase mb-1">Overview</span>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 flex items-center gap-2">
              Hello, {name} 👋
            </h1>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;