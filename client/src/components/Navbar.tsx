import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [dark, setDark] = useState(true);
  const navigate = useNavigate();

  const navStyle = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-indigo-500 font-semibold"
      : "hover:text-indigo-400 transition";

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-white/5 border-b border-gray-200 dark:border-white/10 shadow-lg transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <NavLink
          to="/"
          className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent hover:scale-105 transition-transform"
        >
          Opal Zeta
        </NavLink>

        {/* NAV LINKS */}
        <div className="flex items-center gap-6 text-sm font-medium">

          <NavLink to="/" className={navStyle}>
            Home
          </NavLink>

          <NavLink
            to="/ask"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold shadow-md hover:scale-105 transition-transform"
          >
            + Ask Question
          </NavLink>

          <NavLink to="/about" className={navStyle}>
            About
          </NavLink>

          {/* DARK MODE BUTTON */}
          <button
            onClick={() => {
              setDark(!dark);
              document.documentElement.classList.toggle("dark");
            }}
            className="px-3 py-2 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition text-xs"
          >
            {dark ? "☀ Light" : "🌙 Dark"}
          </button>

        </div>

      </div>
    </nav>
  );
            }
