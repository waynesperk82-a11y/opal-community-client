import {
  NavLink,
  Outlet,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function Layout() {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  /* ================= AUTH ================= */

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white text-xl">
        Loading Opal Zeta...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  /* ================= UI STATE ================= */

  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* ================= LOAD THEME ================= */

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") setDark(false);
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  /* ================= CLOSE DROPDOWN ================= */

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= LOGOUT ================= */

  const logout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  const navLinkStyle = ({ isActive }: { isActive: boolean }) =>
    `relative group transition ${
      isActive ? "text-white" : "text-gray-400"
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 text-white transition-all duration-500">

      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-slate-900/60 border-b border-white/10 shadow-lg">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* LOGO */}
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer text-2xl font-extrabold tracking-wide 
            bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 
            bg-clip-text text-transparent hover:scale-105 transition duration-300"
          >
            Opal Zeta
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">

            <NavLink to="/" className={navLinkStyle}>
              Home
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-indigo-400 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
            </NavLink>

            <NavLink to="/ask" className={navLinkStyle}>
              Ask
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-indigo-400 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
            </NavLink>

            <NavLink to="/about" className={navLinkStyle}>
              About
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-indigo-400 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
            </NavLink>

            <NavLink to="/profile" className={navLinkStyle}>
              Profile
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-indigo-400 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
            </NavLink>

            {/* DARK MODE */}
            <button
              onClick={() => setDark(!dark)}
              className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition text-xs shadow-md"
            >
              {dark ? "☀ Light" : " Dark"}
            </button>

            {/* NOTIFICATIONS */}
            <div className="relative cursor-pointer text-xl">
              🔔
              <span className="absolute -top-2 -right-2 bg-pink-500 text-xs px-1 rounded-full">
                3
              </span>
            </div>

            {/* PROFILE */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 flex items-center justify-center font-bold hover:scale-105 transition"
              >
                {username.charAt(0).toUpperCase()}
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-slate-800/90 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 overflow-hidden animate-fadeIn">
                  <button
                    onClick={() => navigate("/profile")}
                    className="w-full text-left px-4 py-3 hover:bg-indigo-600 transition"
                  >
                    Profile
                  </button>

                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-3 hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

          </nav>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-2xl"
          >
            ☰
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-xl px-6 py-6 space-y-4 animate-fadeIn border-t border-white/10">
            <NavLink to="/" className="block">Home</NavLink>
            <NavLink to="/ask" className="block">Ask</NavLink>
            <NavLink to="/about" className="block">About</NavLink>
            <NavLink to="/profile" className="block">Profile</NavLink>
            <button onClick={logout} className="block text-red-400">
              Logout
            </button>
          </div>
        )}
      </header>

      {/* ================= MAIN ================= */}
      <main className="flex-grow max-w-6xl mx-auto px-6 py-12 w-full animate-fadeIn">
        <Outlet />
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 bg-white/5 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Opal Zeta. Built with 
        </div>
      </footer>

    </div>
  );
}
