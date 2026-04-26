import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Layout() {
  const navigate = useNavigate();

  /* ================= AUTH ================= */

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");

    if (storedUsername && storedUsername.trim() !== "") {
      setUsername(storedUsername);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      navigate("/login");
    }

    setCheckingAuth(false);
  }, [navigate]);

  /* ================= PROFILE IMAGE ================= */

  const [profileImage, setProfileImage] = useState<string>("");

  useEffect(() => {
    const saved = localStorage.getItem("profileImage");
    if (saved) setProfileImage(saved);
  }, []);

  /* ================= THEME ================= */

  const [dark, setDark] = useState(true);

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

  /* ================= SCROLL ANIMATION ================= */

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= MOBILE ================= */

  const [mobileOpen, setMobileOpen] = useState(false);

  /* ================= LOGOUT ================= */

  const logout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  const firstLetter =
    username && username.length > 0
      ? username.charAt(0).toUpperCase()
      : "U";

  /* ================= LOADING ================= */

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white text-xl">
        Loading Opal Zeta...
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 text-white">

      {/* NAVBAR */}
      <header
        className={`fixed top-0 left-0 w-full z-50 flex justify-center transition-all duration-500 ${
          scrolled
            ? "py-3 backdrop-blur-2xl bg-slate-900/80 shadow-2xl"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="w-[95%] max-w-7xl border border-white/10 rounded-2xl px-8 flex justify-between items-center transition-all duration-500">

          {/* LOGO */}
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer text-2xl font-extrabold tracking-wide bg-gradient-to-r from-indigo-400 via-pink-500 to-purple-500 bg-clip-text text-transparent hover:scale-110 transition duration-300"
          >
            Opal Zeta
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">

            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative group ${
                  isActive ? "text-indigo-400" : ""
                }`
              }
            >
              Home
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-indigo-400 to-pink-500 transition-all group-hover:w-full"></span>
            </NavLink>

            <NavLink
              to="/ask"
              className={({ isActive }) =>
                `relative group ${
                  isActive ? "text-indigo-400" : ""
                }`
              }
            >
              Ask
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-indigo-400 to-pink-500 transition-all group-hover:w-full"></span>
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `relative group ${
                  isActive ? "text-indigo-400" : ""
                }`
              }
            >
              About
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-indigo-400 to-pink-500 transition-all group-hover:w-full"></span>
            </NavLink>

            {/* THEME */}
            <button
              onClick={() => setDark(!dark)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg hover:scale-105 transition"
            >
              {dark ? "☀" : "🌙"}
            </button>

            {/* LOGOUT */}
            <button
              onClick={logout}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition"
            >
              Logout
            </button>

            {/* PROFILE */}
            <NavLink to="/profile">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500 hover:scale-110 transition"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 flex items-center justify-center font-bold hover:scale-110 transition">
                  {firstLetter}
                </div>
              )}
            </NavLink>

          </nav>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            ☰
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="md:hidden w-full bg-slate-900/95 backdrop-blur-xl border-t border-white/10 mt-3 p-6 space-y-4 text-center">

            <NavLink to="/" onClick={() => setMobileOpen(false)}>
              Home
            </NavLink>

            <NavLink to="/ask" onClick={() => setMobileOpen(false)}>
              Ask
            </NavLink>

            <NavLink to="/about" onClick={() => setMobileOpen(false)}>
              About
            </NavLink>

            <NavLink to="/profile" onClick={() => setMobileOpen(false)}>
              Profile
            </NavLink>

            <button
              onClick={logout}
              className="block w-full bg-red-600 py-2 rounded-xl"
            >
              Logout
            </button>
          </div>
        )}
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-grow max-w-6xl mx-auto px-6 pt-32 pb-16 w-full">
        {isAuthenticated && (
          <Outlet context={{ setProfileImage }} />
        )}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-white/5 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} Opal Zeta
      </footer>

    </div>
  );
}