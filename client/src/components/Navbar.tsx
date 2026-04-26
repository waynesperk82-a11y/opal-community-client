 import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const navStyle = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-indigo-400 font-semibold"
      : "text-gray-300 hover:text-indigo-400 transition";

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/70 border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer text-2xl font-extrabold tracking-wide bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent hover:scale-105 transition-transform"
        >
          Opal Zeta
        </div>

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

          <NavLink to="/profile" className={navStyle}>
            Profile
          </NavLink>

        </div>
      </div>
    </nav>
  );
}