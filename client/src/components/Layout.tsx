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

  /* ================= AUTH (SYNC FIX) ================= */

  const storedUsername = localStorage.getItem("username");

  if (!storedUsername) {
    return <Navigate to="/login" replace />;
  }

  const username = storedUsername;

  /* ================= UI STATE ================= */

  const [dark, setDark] = useState(true);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* ================= LOAD SETTINGS ================= */

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedImage = localStorage.getItem("profileImage");

    if (savedTheme === "light") setDark(false);
    if (savedImage) setProfileImage(savedImage);
  }, []);

  /* ================= DARK MODE ================= */

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

  /* ================= USER INITIALS ================= */

  const initials = username
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  /* ================= LOGOUT ================= */

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("profileImage");
    navigate("/login");
  };

  const navStyle = ({ isActive }: { isActive: boolean }) =>
    `relative px-3 py-2 rounded-lg transition-all duration-300 ${
      isActive
        ? "text-white bg-gradient-to-r from-indigo-500 to-pink-500 shadow-lg"
        : "hover:text-indigo-400"
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 text-white transition-all duration-500">

      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* LOGO */}
          <NavLink
            to="/"
            className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent hover:scale-105 transition"
          >
            Opal Zeta
          </NavLink>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">

            <NavLink to="/" className={navStyle}>Home</NavLink>
            <NavLink to="/ask" className={navStyle}>Ask</NavLink>
            <NavLink to="/about" className={navStyle}>About</NavLink>

            <button
              onClick={() => setDark(!dark)}
              className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition text-xs shadow-md"
            >
              {dark ? "☀ Light" : "🌙 Dark"}
            </button>

            {/* PROFILE */}
            <div className="relative" ref={dropdownRef}>
              <div
                onClick={() => setMenuOpen(!menuOpen)}
                className="cursor-pointer"
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-indigo-400 hover:scale-105 transition"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 flex items-center justify-center font-bold hover:scale-105 transition">
                    {initials}
                  </div>
                )}
              </div>

              {menuOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-slate-800 rounded-xl shadow-2xl border border-white/10 overflow-hidden">
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-indigo-500 hover:text-white transition"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 hover:bg-red-500 hover:text-white transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white text-2xl"
          >
            ☰
          </button>
        </div>

        {/* MOBILE NAV */}
        {mobileOpen && (
          <div className="md:hidden bg-slate-800 border-t border-white/10 px-6 py-4 space-y-4">
            <NavLink to="/" className="block">Home</NavLink>
            <NavLink to="/ask" className="block">Ask</NavLink>
            <NavLink to="/about" className="block">About</NavLink>
            <button onClick={handleLogout} className="block text-red-400">
              Logout
            </button>
          </div>
        )}
      </header>

      {/* ================= MAIN ================= */}
      <main className="flex-grow max-w-6xl mx-auto px-6 py-12 w-full">
        <Outlet context={{ setProfileImage }} />
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 bg-white/5 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Opal Zeta. Built with ❤️
        </div>
      </footer>

    </div>
  );
  }
