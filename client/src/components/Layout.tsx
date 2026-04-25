import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Layout() {
  const [dark, setDark] = useState(true);
  const [username] = useState("Opal User");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  const initials = username
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("profileImage");
    setProfileImage(null);
    setMenuOpen(false);
    navigate("/");
  };

  const navStyle = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-indigo-500 font-semibold"
      : "hover:text-indigo-400 transition";

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

          {/* NAV LINKS */}
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

            {/* PROFILE AVATAR */}
            <div className="relative">

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
                <div className="absolute right-0 mt-3 w-40 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-200 dark:border-white/10 overflow-hidden animate-fade-in">
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-indigo-500 hover:text-white transition"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white transition"
                  >
                    Logout
                  </button>
                </div>
              )}

            </div>

          </nav>
        </div>
      </header>

      {/* MAIN CONTENT */}
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
