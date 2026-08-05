import React from "react";
import { ArrowRight, FileText, Mic, BarChart3, Map, Coins, LogOut, ChevronRight } from "lucide-react";

// Helper function to map value (0 to 100) and angle to coordinates (cx, cy)
const getCoordinates = (index, total, value, radius, centerX, centerY) => {
  const angle = (Math.PI * 2 / total) * index - Math.PI / 2; // Offset by -90 deg to start at the top
  const x = centerX + Math.cos(angle) * radius * (value / 100);
  const y = centerY + Math.sin(angle) * radius * (value / 100);
  return { x, y };
};

// Reusable SVG Radar Chart Component
const RadarChart = ({ data, size = 180 }) => {
  const labels = [
    "Correctness", "Clarity", "Relevance", "Detail", 
    "Efficiency", "Communication", "Problem solving", "Creativity"
  ];
  
  const total = labels.length;
  const centerX = size / 2;
  const centerY = size / 2;
  const maxRadius = (size / 2) - 30; // leave padding for labels
  
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
          stroke="rgba(255, 255, 255, 0.07)"
          strokeWidth="0.75"
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
            stroke="rgba(255, 255, 255, 0.07)"
            strokeWidth="0.75"
          />
        );
      })}
      
      {/* Data Polygon */}
      <polygon
        points={dataPoints}
        fill="rgba(6, 182, 212, 0.15)"
        stroke="rgba(6, 182, 212, 0.7)"
        strokeWidth="1.5"
      />
      
      {/* Dots on data points */}
      {data.map((val, i) => {
        const { x, y } = getCoordinates(i, total, val, maxRadius, centerX, centerY);
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="2"
            fill="rgba(6, 182, 212, 1)"
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
            y={y + 3}
            fill="#64748b"
            fontSize="7.5"
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

const Home = ({ openLogin }) => {
  return (
    <div className="relative min-h-screen bg-slate-50 overflow-hidden flex flex-col items-center justify-start font-sans">
      {/* Soft Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-200/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-2/3 right-1/4 w-[500px] h-[500px] bg-indigo-200/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0)_0%,#f8fafc_100%)] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-start pt-16 pb-12 px-6 max-w-7xl mx-auto w-full text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-200/50 border border-slate-200/75 text-slate-600 text-xs font-semibold tracking-wide mb-6 shadow-sm">
          Multi-Agent Interview Platform
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-[76px] font-extrabold text-slate-900 tracking-tight leading-[1.08] mb-6 font-sans">
          Job Interviews
          <br />
          <span className="text-slate-400 font-bold opacity-80 block py-1.5">Don't Have to Suck</span>
          Anymore!
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-slate-500 max-w-xl mx-auto mb-10 leading-relaxed font-sans font-medium">
          Fresher.AI is an innovative AI-powered interview preparation platform designed to help job seekers excel in their interviews.
        </p>

        {/* CTA Button */}
        <button
          onClick={openLogin}
          className="flex items-center gap-3 bg-[#18181b] hover:bg-[#27272a] text-white px-8 py-4 rounded-xl font-bold transition duration-300 shadow-xl shadow-black/10 text-base mb-20 select-none group cursor-pointer"
        >
          <span>Get Started For Free</span>
          <ArrowRight size={18} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Peaking Dashboard Mockup */}
        <div className="w-full max-w-5xl bg-[#09090b] rounded-2xl border border-slate-800/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden h-[340px] md:h-[420px] relative pointer-events-none select-none">
          
          {/* Peaking Fade Overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent z-20 pointer-events-none" />

          {/* Miniature Dashboard HTML Mock */}
          <div className="w-full h-full flex text-left font-sans">
            {/* Sidebar Mock */}
            <aside className="w-56 bg-[#121214] border-r border-white/5 p-4 flex flex-col justify-between hidden md:flex">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="bg-white text-black p-1.5 rounded-lg flex items-center justify-center">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <span className="text-sm font-bold text-white tracking-tight">Fresher.AI</span>
                  </div>
                  <div className="w-5 h-5 rounded-md border border-white/10 flex items-center justify-center">
                    <div className="w-1 h-3 bg-white/40 rounded-full" />
                  </div>
                </div>

                <div className="w-full bg-white text-black rounded-lg py-2 px-3 text-xs font-bold text-center mb-6">
                  + Create Interview
                </div>

                <span className="text-[10px] text-gray-500 font-bold tracking-wider block mb-2 px-1">AGENTS</span>
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg bg-white/5 text-white text-xs font-semibold">
                    <FileText size={14} className="text-gray-400" />
                    <span>Resume Builder</span>
                  </div>
                  <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg text-gray-400 text-xs font-semibold">
                    <Map size={14} />
                    <span>Roadmap Builder</span>
                  </div>
                  <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg text-gray-400 text-xs font-semibold">
                    <BarChart3 size={14} />
                    <span>Resume Scorer</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-[#1c1c1f] rounded-lg p-2.5 flex items-center justify-between border border-white/5 mb-3">
                  <div>
                    <span className="text-[8px] text-gray-400 font-semibold block uppercase">Interview Coins</span>
                    <span className="text-xs font-extrabold text-white">3590</span>
                  </div>
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white text-xs font-bold">+</div>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-xs font-bold font-sans">
                      AS
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block leading-tight">Ankush Sahu</span>
                      <span className="text-[9px] text-gray-500 block leading-none">ankush@gmail.com</span>
                    </div>
                  </div>
                  <LogOut size={12} className="text-gray-500" />
                </div>
              </div>
            </aside>

            {/* Main Content Mock */}
            <main className="flex-1 bg-[#09090b] p-6 overflow-hidden flex flex-col justify-start">
              <span className="text-[10px] text-gray-500 font-semibold uppercase block leading-none mb-1">Overview</span>
              <h2 className="text-lg font-extrabold text-white flex items-center gap-1.5 mb-5 leading-none">Hello, Ankush 👋</h2>

              {/* Stats Box Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
                <div className="bg-[#121214] border border-white/5 p-3.5 rounded-xl">
                  <span className="text-[9px] text-gray-500 font-bold block uppercase leading-none mb-1.5">Total Interviews</span>
                  <span className="text-lg font-black text-white block leading-tight">21</span>
                  <span className="text-[8px] text-gray-400 block mt-1 leading-none"><span className="text-white/60 font-semibold">All Time</span> Interviews Created</span>
                </div>
                <div className="bg-[#121214] border border-white/5 p-3.5 rounded-xl">
                  <span className="text-[9px] text-gray-500 font-bold block uppercase leading-none mb-1.5">Questions Solved</span>
                  <span className="text-lg font-black text-white block leading-tight">126</span>
                  <span className="text-[8px] text-gray-400 block mt-1 leading-none"><span className="text-white/60 font-semibold">Answered</span> Across Interviews</span>
                </div>
                <div className="bg-[#121214] border border-white/5 p-3.5 rounded-xl">
                  <span className="text-[9px] text-gray-500 font-bold block uppercase leading-none mb-1.5">Completed</span>
                  <span className="text-lg font-black text-white block leading-tight">15</span>
                  <span className="text-[8px] text-gray-400 block mt-1 leading-none"><span className="text-white/60 font-semibold">21 Total</span> Interviews Finished</span>
                </div>
                <div className="bg-[#121214] border border-white/5 p-3.5 rounded-xl">
                  <span className="text-[9px] text-gray-500 font-bold block uppercase leading-none mb-1.5">Average Score</span>
                  <span className="text-lg font-black text-white block leading-tight">23/100</span>
                  <span className="text-[8px] text-gray-400 block mt-1 leading-none"><span className="text-white/60 font-semibold">Completed Only</span> Average Performance</span>
                </div>
              </div>

              {/* Performance Section Mock */}
              <div className="flex-1 min-h-0 flex flex-col justify-start">
                <span className="text-[10px] text-gray-500 font-semibold uppercase block leading-none mb-1">Performance</span>
                <h3 className="text-xs font-bold text-white mb-4">Interview History</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                  <div className="bg-[#121214] border border-white/5 p-4 rounded-xl flex flex-col items-center justify-center relative overflow-hidden">
                    <span className="text-[10px] font-bold text-slate-300 absolute top-3 left-4 leading-none">Technical Interviews (15)</span>
                    <div className="w-full max-w-[130px] flex items-center justify-center mt-3">
                      <RadarChart data={[85, 70, 90, 65, 80, 75, 85, 90]} size={130} />
                    </div>
                  </div>
                  <div className="bg-[#121214] border border-white/5 p-4 rounded-xl flex flex-col items-center justify-center relative overflow-hidden">
                    <span className="text-[10px] font-bold text-slate-300 absolute top-3 left-4 leading-none">HR Interviews (2)</span>
                    <div className="w-full max-w-[130px] flex items-center justify-center mt-3">
                      <RadarChart data={[60, 85, 75, 90, 70, 80, 65, 75]} size={130} />
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* Agents Section */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 flex flex-col items-center justify-center text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-200/50 border border-slate-200/75 text-slate-600 text-xs font-semibold tracking-wide mb-6 shadow-sm">
          AI Powered Agents
        </div>

        {/* Title */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6 font-sans">
          Specialized Agents For
          <br />
          <span className="text-slate-400 font-bold opacity-80 block py-1">Every Interview Stage</span>
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-500 max-w-3xl mx-auto mb-16 leading-relaxed font-sans font-medium">
          Fresher.AI combines multiple AI agents that work together to help you build your resume, practice interviews, receive detailed feedback, and follow a personalized roadmap to land your dream job.
        </p>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full text-left">
          {/* Card 1 */}
          <div className="bg-[#18181b] border border-slate-800/60 p-7 rounded-2xl flex flex-col items-start shadow-xl hover:-translate-y-2.5 hover:shadow-2xl hover:border-slate-700/80 transition duration-300 group">
            <div className="bg-[#242427] text-white p-3.5 rounded-xl border border-slate-700/40 flex items-center justify-center mb-6 shadow-md transition duration-300 group-hover:bg-[#2e2e32] group-hover:border-slate-600">
              <FileText size={22} className="text-slate-200" />
            </div>
            <h3 className="text-white font-extrabold text-lg mb-2 font-sans">Resume Builder</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-sans">
              Analyze your current professional profile and generate an optimized, high-impact resume that parses through modern ATS systems.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#18181b] border border-slate-800/60 p-7 rounded-2xl flex flex-col items-start shadow-xl hover:-translate-y-2.5 hover:shadow-2xl hover:border-slate-700/80 transition duration-300 group">
            <div className="bg-[#242427] text-white p-3.5 rounded-xl border border-slate-700/40 flex items-center justify-center mb-6 shadow-md transition duration-300 group-hover:bg-[#2e2e32] group-hover:border-slate-600">
              <Mic size={22} className="text-slate-200" />
            </div>
            <h3 className="text-white font-extrabold text-lg mb-2 font-sans">Mock Interviews</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-sans">
              Conduct live, voice-interactive technical and behavioral practice interviews simulating actual company panels.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#18181b] border border-slate-800/60 p-7 rounded-2xl flex flex-col items-start shadow-xl hover:-translate-y-2.5 hover:shadow-2xl hover:border-slate-700/80 transition duration-300 group">
            <div className="bg-[#242427] text-white p-3.5 rounded-xl border border-slate-700/40 flex items-center justify-center mb-6 shadow-md transition duration-300 group-hover:bg-[#2e2e32] group-hover:border-slate-600">
              <BarChart3 size={22} className="text-slate-200" />
            </div>
            <h3 className="text-white font-extrabold text-lg mb-2 font-sans">Detailed Feedback</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-sans">
              Receive comprehensive performance evaluations covering clarity, communication style, technical accuracy, and domain relevance.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-[#18181b] border border-slate-800/60 p-7 rounded-2xl flex flex-col items-start shadow-xl hover:-translate-y-2.5 hover:shadow-2xl hover:border-slate-700/80 transition duration-300 group">
            <div className="bg-[#242427] text-white p-3.5 rounded-xl border border-slate-700/40 flex items-center justify-center mb-6 shadow-md transition duration-300 group-hover:bg-[#2e2e32] group-hover:border-slate-600">
              <Map size={22} className="text-slate-200" />
            </div>
            <h3 className="text-white font-extrabold text-lg mb-2 font-sans">Roadmap Builder</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-sans">
              Get customized topic roadmaps based on your target roles and current strengths to plug your conceptual knowledge gaps.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200/50 bg-white py-8 text-center text-slate-400 text-xs font-sans mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-semibold text-slate-500">© 2026 Fresher.AI. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-600 transition">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600 transition">Terms of Service</a>
            <a href="#" className="hover:text-slate-600 transition">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;