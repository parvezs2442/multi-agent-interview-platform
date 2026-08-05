import { NavLink } from "react-router-dom";
import api from "../utilis/axios.js";

const navItems = [
  { title: "Home", path: "/home" },
  { title: "Dashboard", path: "/dashboard" },
];

const Navbar = ({ user, openLogin }) => {

  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 backdrop-blur-xl bg-[#050816]/70">

      <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-6">

        <h2 className="text-2xl font-bold">
          Fresher<span className="text-cyan-400">AI</span>
        </h2>

        <nav className="flex gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg ${
                  isActive
                    ? "bg-cyan-500 text-black"
                    : "hover:bg-white/10"
                }`
              }
            >
              {item.title}
            </NavLink>
          ))}
        </nav>

        {user ? (
          <div className="flex items-center gap-4">

            <div className="text-right">
              <p className="text-sm font-semibold">
                {user.name || "User"}
              </p>

              <p className="text-xs text-gray-400">
                {user.email || ""}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-xl bg-red-500 px-5 py-2 font-semibold text-white hover:scale-105 duration-300"
            >
              Logout
            </button>

          </div>
        ) : (
          <button
            onClick={openLogin}
            className="rounded-xl bg-cyan-500 px-5 py-2 font-semibold text-black hover:scale-105 duration-300"
          >
            Sign In
          </button>
        )}

      </div>

    </header>
  );
};

export default Navbar;