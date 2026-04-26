import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (!storedUser) {
      navigate("/login");
    } else {
      setUsername(storedUser);
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  const navStyle = ({ isActive }: any) =>
    `block px-4 py-2 rounded-xl transition ${
      isActive
        ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white"
        : "text-gray-300 hover:bg-white/10"
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white">

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">

          {/* LOGO */}
          <h1
            onClick={() => navigate("/")}
            className="text-2xl font-extrabold cursor-pointer bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent"
          >
            Opal Zeta
          </h1>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center space-x-4">
            <NavLink to="/" className={navStyle}>Home</NavLink>
            <NavLink to="/ask" className={navStyle}>Ask</NavLink>
            <NavLink to="/about" className={navStyle}>About</NavLink>
            <NavLink to="/profile" className={navStyle}>Profile</NavLink>
          </nav>

          {/* PROFILE AREA */}
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-sm text-gray-400">
              Hi, {username}
            </span>

            <button
              onClick={logout}
              className="px-4 py-2 rounded-xl bg-red-600/70 hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl"
          >
            ☰
          </button>
        </div>

        {/* MOBILE DROPDOWN */}
        {menuOpen && (
          <div className="md:hidden px-6 pb-6 space-y-3 animate-fadeIn">
            <NavLink to="/" className={navStyle} onClick={() => setMenuOpen(false)}>Home</NavLink>
            <NavLink to="/ask" className={navStyle} onClick={() => setMenuOpen(false)}>Ask</NavLink>
            <NavLink to="/about" className={navStyle} onClick={() => setMenuOpen(false)}>About</NavLink>
            <NavLink to="/profile" className={navStyle} onClick={() => setMenuOpen(false)}>Profile</NavLink>

            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 rounded-xl bg-red-600/70"
            >
              Logout
            </button>
          </div>
        )}
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-white/5 backdrop-blur-xl mt-16">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Opal Zeta</p>

          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer">Privacy</span>
            <span className="hover:text-white cursor-pointer">Terms</span>
            <span className="hover:text-white cursor-pointer">Support</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
