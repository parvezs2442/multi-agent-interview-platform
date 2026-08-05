import React, { useState } from "react";
import { 
  FileText, Mic, BarChart3, Map, Coins, LogOut, 
  Menu, X, ChevronLeft, ChevronRight, Plus, Info 
} from "lucide-react";
import api from "../utilis/axios.js";

// Helper function to map value (0 to 100) and angle to coordinates (cx, cy)
const getCoordinates = (index, total, value, radius, centerX, centerY) => {
  const angle = (Math.PI * 2 / total) * index - Math.PI / 2; // Offset by -90 deg to start at the top
  const x = centerX + Math.cos(angle) * radius * (value / 100);
  const y = centerY + Math.sin(angle) * radius * (value / 100);
  return { x, y };
};

// Reusable SVG Radar Chart Component
const RadarChart = ({ data, size = 260 }) => {
  const labels = [
    "Correctness", "Clarity", "Relevance", "Detail", 
    "Efficiency", "Communication", "Problem solving", "Creativity"
  ];
  
  const total = labels.length;
  const centerX = size / 2;
  const centerY = size / 2;
  const maxRadius = (size / 2) - 40; // leave padding for labels
  
  // Concentric grids (4 rings)
  const rings = [25, 50, 75, 100];
  
  const getRingPoints = (percentage) => {
    return Array.from({ length: total }).map((_, i) => {
      const { x, y } = getCoordinates(i, total, percentage, maxRadius, centerX, centerY);
      return `${x},${y}`;
    }).join(" ");
  };

  const dataPoints = data.map((val, i) => {
    const { x, y } = getCoordinates(i, total, val, maxRadius, centerX, centerY);
    return `${x},${y}`;
  }).join(" ");
  
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
      {/* Grid rings */}
      {rings.map((ring, index) => (
        <polygon
          key={index}
          points={getRingPoints(ring)}
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="1"
        />
      ))}
      
      {/* Axis lines */}
      {Array.from({ length: total }).map((_, i) => {
        const outerPoint = getCoordinates(i, total, 100, maxRadius, centerX, centerY);
        return (
          <line
            key={i}
            x1={centerX}
            y1={centerY}
            x2={outerPoint.x}
            y2={outerPoint.y}
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1"
          />
        );
      })}
      
      {/* Data Polygon */}
      <polygon
        points={dataPoints}
        fill="rgba(6, 182, 212, 0.15)" // Translucent cyan fill
        stroke="rgba(6, 182, 212, 0.8)"  // Solid cyan border
        strokeWidth="2"
      />
      
      {/* Dots on data points */}
      {data.map((val, i) => {
        const { x, y } = getCoordinates(i, total, val, maxRadius, centerX, centerY);
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="3.5"
            fill="rgba(6, 182, 212, 1)"
            className="hover:scale-150 transition-transform duration-200 cursor-pointer"
          />
        );
      })}
      
      {/* Labels */}
      {labels.map((label, i) => {
        const { x, y } = getCoordinates(i, total, 115, maxRadius, centerX, centerY);
        
        let textAnchor = "middle";
        if (x > centerX + 10) textAnchor = "start";
        if (x < centerX - 10) textAnchor = "end";
        
        return (
          <text
            key={i}
            x={x}
            y={y + 4}
            fill="#94a3b8"
            fontSize="10"
            fontWeight="500"
            textAnchor={textAnchor}
            className="select-none font-sans font-medium"
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
};

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
    <div className="h-full flex flex-col justify-between py-5 px-4 font-sans select-none">
      <div>
        {/* Header / Logo */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-white text-black p-2.5 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            {(!sidebarCollapsed || isMobile) && (
              <span className="text-lg font-bold text-white tracking-tight">Fresher.AI</span>
            )}
          </div>

          {!isMobile && (
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center hover:bg-white/5 text-gray-400 hover:text-white transition duration-200"
            >
              {sidebarCollapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
            </button>
          )}

          {isMobile && (
            <button 
              onClick={() => setMobileSidebarOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Action Button */}
        <button className={`w-full bg-white hover:bg-slate-100 text-black rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer transition duration-200 mb-8 ${sidebarCollapsed && !isMobile ? "py-3 px-0" : "py-3.5 px-4 text-sm"}`}>
          <Plus size={16} strokeWidth={3} />
          {(!sidebarCollapsed || isMobile) && <span>Create Interview</span>}
        </button>

        {/* Navigation list */}
        <div className="space-y-6">
          <div>
            {(!sidebarCollapsed || isMobile) && (
              <span className="text-[10px] text-gray-500 font-extrabold tracking-wider block mb-3 px-1">AGENTS</span>
            )}
            <div className="space-y-1.5">
              <div className={`flex items-center gap-3.5 py-3 px-3.5 rounded-xl bg-white/5 text-white font-semibold cursor-pointer border border-white/5 ${sidebarCollapsed && !isMobile ? "justify-center" : "text-sm"}`}>
                <FileText size={18} className="text-cyan-400" />
                {(!sidebarCollapsed || isMobile) && <span>Resume Builder</span>}
              </div>
              <div className={`flex items-center gap-3.5 py-3 px-3.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 font-semibold cursor-pointer border border-transparent hover:border-white/5 transition duration-200 ${sidebarCollapsed && !isMobile ? "justify-center" : "text-sm"}`}>
                <Map size={18} />
                {(!sidebarCollapsed || isMobile) && <span>Roadmap Builder</span>}
              </div>
              <div className={`flex items-center gap-3.5 py-3 px-3.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 font-semibold cursor-pointer border border-transparent hover:border-white/5 transition duration-200 ${sidebarCollapsed && !isMobile ? "justify-center" : "text-sm"}`}>
                <BarChart3 size={18} />
                {(!sidebarCollapsed || isMobile) && <span>Resume Scorer</span>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Footer */}
      <div>
        {/* Coins indicator */}
        <div className={`bg-[#1c1c1f] rounded-xl border border-white/5 flex items-center justify-between mb-4 shadow-md ${sidebarCollapsed && !isMobile ? "p-2 justify-center flex-col gap-2" : "p-3"}`}>
          <div className={`${sidebarCollapsed && !isMobile ? "text-center" : ""}`}>
            {(!sidebarCollapsed || isMobile) && (
              <span className="text-[9px] text-gray-400 font-bold block uppercase tracking-wide">Interview Coins</span>
            )}
            <span className="text-sm font-black text-white flex items-center gap-1">
              <Coins size={14} className="text-yellow-500" />
              {coins}
            </span>
          </div>
          <button className="w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs font-bold transition duration-200">
            +
          </button>
        </div>

        {/* User Card */}
        <div className={`flex items-center justify-between border-t border-white/5 pt-4 ${sidebarCollapsed && !isMobile ? "justify-center" : ""}`}>
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-xs font-black shrink-0">
              {getUserInitials(name)}
            </div>
            {(!sidebarCollapsed || isMobile) && (
              <div className="min-w-0">
                <span className="text-xs font-extrabold text-white block truncate leading-tight">{name}</span>
                <span className="text-[10px] text-gray-500 block truncate leading-none mt-0.5">{email}</span>
              </div>
            )}
          </div>
          {(!sidebarCollapsed || isMobile) && (
            <button 
              onClick={handleLogout}
              className="text-gray-500 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition duration-200"
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
    <div className="min-h-screen flex bg-[#09090b] text-white overflow-hidden font-sans">
      
      {/* Desktop Sidebar */}
      <aside 
        className={`bg-[#121214] border-r border-white/5 transition-all duration-300 hidden md:block shrink-0 ${
          sidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
        {sidebarContent(false)}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {mobileSidebarOpen && (
        <div 
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Mobile Sidebar */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 w-64 bg-[#121214] border-r border-white/5 z-50 transition-transform duration-300 md:hidden ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent(true)}
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto bg-[#09090b]">
        
        {/* Mobile Header Bar */}
        <header className="h-16 border-b border-white/5 px-6 flex items-center justify-between md:hidden shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-white text-black p-2 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="text-base font-bold text-white tracking-tight">Fresher.AI</span>
          </div>

          <button 
            onClick={() => setMobileSidebarOpen(true)}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5"
          >
            <Menu size={22} />
          </button>
        </header>

        {/* Content body */}
        <main className="flex-1 p-6 md:p-10 max-w-7xl w-full mx-auto flex flex-col justify-start">
          
          {/* Greeting */}
          <div className="mb-8">
            <span className="text-xs text-gray-500 font-extrabold tracking-wider block uppercase mb-1">Overview</span>
            <h1 className="text-2xl md:text-3xl font-black text-white flex items-center gap-2">
              Hello, {name.split(" ")[0]} 👋
            </h1>
          </div>

          {/* Stats Box Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {/* Stat 1 */}
            <div className="bg-[#121214] border border-white/5 p-5 rounded-2xl shadow-lg relative group overflow-hidden">
              <span className="text-[10px] text-gray-500 font-extrabold block uppercase tracking-wider mb-2">Total Interviews</span>
              <span className="text-3xl font-black text-white block">21</span>
              <span className="text-xs text-gray-400 block mt-2 font-medium">
                <span className="text-slate-200 font-semibold">All Time</span> Interviews Created
              </span>
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/2 blur-2xl rounded-full pointer-events-none group-hover:bg-cyan-500/5 transition duration-300" />
            </div>

            {/* Stat 2 */}
            <div className="bg-[#121214] border border-white/5 p-5 rounded-2xl shadow-lg relative group overflow-hidden">
              <span className="text-[10px] text-gray-500 font-extrabold block uppercase tracking-wider mb-2">Questions Solved</span>
              <span className="text-3xl font-black text-white block">126</span>
              <span className="text-xs text-gray-400 block mt-2 font-medium">
                <span className="text-slate-200 font-semibold">Answered</span> Across Interviews
              </span>
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/2 blur-2xl rounded-full pointer-events-none group-hover:bg-cyan-500/5 transition duration-300" />
            </div>

            {/* Stat 3 */}
            <div className="bg-[#121214] border border-white/5 p-5 rounded-2xl shadow-lg relative group overflow-hidden">
              <span className="text-[10px] text-gray-500 font-extrabold block uppercase tracking-wider mb-2">Completed</span>
              <span className="text-3xl font-black text-white block">15</span>
              <span className="text-xs text-gray-400 block mt-2 font-medium">
                <span className="text-slate-200 font-semibold">21 Total</span> Interviews Finished
              </span>
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/2 blur-2xl rounded-full pointer-events-none group-hover:bg-cyan-500/5 transition duration-300" />
            </div>

            {/* Stat 4 */}
            <div className="bg-[#121214] border border-white/5 p-5 rounded-2xl shadow-lg relative group overflow-hidden">
              <span className="text-[10px] text-gray-500 font-extrabold block uppercase tracking-wider mb-2">Average Score</span>
              <span className="text-3xl font-black text-white block">23/100</span>
              <span className="text-xs text-gray-400 block mt-2 font-medium">
                <span className="text-slate-200 font-semibold">Completed Only</span> Average Performance
              </span>
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/2 blur-2xl rounded-full pointer-events-none group-hover:bg-cyan-500/5 transition duration-300" />
            </div>
          </div>

          {/* Performance Grid */}
          <div className="flex-1 min-h-0 flex flex-col justify-start">
            <div className="mb-4">
              <span className="text-xs text-gray-500 font-extrabold tracking-wider block uppercase mb-1">Performance</span>
              <h2 className="text-xl font-bold text-white">Interview History</h2>
            </div>

            {/* Radar Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 w-full">
              {/* Chart Box 1 */}
              <div className="bg-[#121214] border border-white/5 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center relative min-h-[360px] overflow-hidden">
                <span className="text-sm font-extrabold text-slate-300 absolute top-5 left-6 leading-none">
                  Technical Interviews (15)
                </span>
                <div className="w-full max-w-[280px] flex items-center justify-center mt-8">
                  <RadarChart data={[85, 75, 90, 65, 80, 70, 85, 90]} size={280} />
                </div>
              </div>

              {/* Chart Box 2 */}
              <div className="bg-[#121214] border border-white/5 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center relative min-h-[360px] overflow-hidden">
                <span className="text-sm font-extrabold text-slate-300 absolute top-5 left-6 leading-none">
                  HR Interviews (2)
                </span>
                <div className="w-full max-w-[280px] flex items-center justify-center mt-8">
                  <RadarChart data={[60, 85, 75, 90, 70, 80, 65, 75]} size={280} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;