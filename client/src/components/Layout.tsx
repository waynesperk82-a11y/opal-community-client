import {
  NavLink,
  Outlet,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function Layout() {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  /* ================= AUTH ================= */

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    try {
      const storedUsername = localStorage.getItem("username");

      if (storedUsername && storedUsername.trim() !== "") {
        setUsername(storedUsername);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Auth error:", error);
      setIsAuthenticated(false);
    }
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white text-xl">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  /* ================= UI STATE ================= */

  const [dark, setDark] = useState<boolean>(true);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  /* ================= THEME ================= */

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

  /* ================= LOGOUT ================= */

  const logout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  const firstLetter =
    username && username.length > 0
      ? username.charAt(0).toUpperCase()
      : "U";

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 text-white">

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-slate-900/70 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <div
            onClick={() => navigate("/")}
            className="cursor-pointer text-2xl font-bold bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent"
          >
            Opal Zeta
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm">

            <NavLink to="/">Home</NavLink>
            <NavLink to="/ask">Ask</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/profile">Profile</NavLink>

            <button
              onClick={() => setDark(!dark)}
              className="px-3 py-1 bg-indigo-600 rounded"
            >
              {dark ? "Light" : "Dark"}
            </button>

            <button
              onClick={logout}
              className="px-3 py-1 bg-red-600 rounded"
            >
              Logout
            </button>

            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 flex items-center justify-center font-bold">
              {firstLetter}
            </div>

          </nav>

          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            ☰
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden px-6 py-4 bg-slate-900 space-y-3">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/ask">Ask</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            <button onClick={logout} className="text-red-400">
              Logout
            </button>
          </div>
        )}
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-grow max-w-6xl mx-auto px-6 py-10 w-full">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-white/5 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} Opal Zeta
      </footer>

    </div>
  );
    } 
