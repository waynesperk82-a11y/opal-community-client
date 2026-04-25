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

  /* ---------------- AUTH STATE ---------------- */

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [username, setUsername] = useState<string>("");

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
    return null; // prevents flashing before auth check
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  /* ---------------- STATE ---------------- */

  const [dark, setDark] = useState(true);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  /* ---------------- LOAD SETTINGS ---------------- */

  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    const savedTheme = localStorage.getItem("theme");

    if (savedImage) setProfileImage(savedImage);
    if (savedTheme === "light") setDark(false);
  }, []);

  /* ---------------- DARK MODE ---------------- */

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  /* ---------------- CLOSE DROPDOWN ---------------- */

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

  /* ---------------- USER INITIALS ---------------- */

  const initials = username
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  /* ---------------- LOGOUT ---------------- */

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("profileImage");
    setProfileImage(null);
    setMenuOpen(false);
    navigate("/login");
  };

  /* ---------------- NAV STYLE ---------------- */

  const navStyle = ({ isActive }: { isActive: boolean }) =>
    `relative px-2 py-1 transition ${
      isActive
        ? "text-indigo-500 font-semibold after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-indigo-500 after:to-pink-500"
        : "hover:text-indigo-400"
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gradient-to-br dark:from-slate-900 dark:via-indigo-900 dark:to-slate-800 text-gray-900 dark:text-white transition-colors duration-500">

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-white/5 border-b border-gray-200 dark:border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* LOGO */}
          <NavLink
            to="/"
            className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent hover:scale-105 transition-transform"
          >
            Opal Zeta
          </NavLink>

          {/* NAVIGATION */}
          <nav className="flex items-center gap-8 text-sm font-medium relative">

            <NavLink to="/" className={navStyle}>
              Home
            </NavLink>

            <NavLink to="/ask" className={navStyle}>
              Ask
            </NavLink>

            <NavLink to="/about" className={navStyle}>
              About
            </NavLink>

            {/* DARK MODE */}
            <button
              onClick={() => setDark(!dark)}
              className="px-3 py-2 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition text-xs shadow-md"
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
                    className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500 hover:scale-105 transition"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold hover:scale-105 transition">
                    {initials}
                  </div>
                )}
              </div>

              {/* DROPDOWN */}
              {menuOpen && (
                <div className="absolute right-0 mt-3 w-44 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden">
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
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-grow max-w-6xl mx-auto px-6 py-10 w-full">
        <Outlet context={{ setProfileImage }} />
      </main>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center text-sm">
          © {new Date().getFullYear()} Opal Zeta. All rights reserved.
          <br />
          Contact:{" "}
          <a
            href="mailto:opalzeta172@gmail.com"
            className="text-indigo-500 hover:text-pink-500 transition"
          >
            opalzeta172@gmail.com
          </a>
        </div>
      </footer>

    </div>
  );
    }
