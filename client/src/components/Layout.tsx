import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function Layout() {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  /* ================= DROPDOWN ================= */

  const [openDropdown, setOpenDropdown] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= MOBILE ================= */

  const [mobileOpen, setMobileOpen] = useState(false);

  /* ================= LOGOUT ================= */

  const logout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  const firstLetter =
    username?.length > 0 ? username.charAt(0).toUpperCase() : "U";

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white text-xl">
        Loading Opal Zeta...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white">

      {/* ================= COOL NAVBAR ================= */}
      <header className="sticky top-4 z-50 flex justify-center">
        <div className="w-[95%] max-w-7xl backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl px-8 py-4 flex justify-between items-center">

          {/* LOGO */}
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer text-2xl font-extrabold tracking-wide bg-gradient-to-r from-indigo-400 via-pink-500 to-purple-500 bg-clip-text text-transparent hover:scale-110 transition duration-300"
          >
            Opal Zeta
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">

            {["/", "/ask", "/about"].map((path, i) => {
              const labels = ["Home", "Ask", "About"];
              return (
                <NavLink
                  key={i}
                  to={path}
                  className={({ isActive }) =>
                    `relative group transition ${
                      isActive ? "text-indigo-400" : ""
                    }`
                  }
                >
                  {labels[i]}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-indigo-400 to-pink-500 transition-all group-hover:w-full"></span>
                </NavLink>
              );
            })}

            {/* THEME BUTTON */}
            <button
              onClick={() => setDark(!dark)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg hover:scale-105 transition"
            >
              {dark ? "☀" : "🌙"}
            </button>

            {/* PROFILE DROPDOWN */}
            <div className="relative" ref={dropdownRef}>
              <div
                onClick={() => setOpenDropdown(!openDropdown)}
                className="cursor-pointer"
              >
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
              </div>

              {openDropdown && (
                <div className="absolute right-0 mt-4 w-48 bg-slate-800 border border-white/10 rounded-xl shadow-xl p-3 space-y-2 animate-fadeIn">
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setOpenDropdown(false);
                    }}
                    className="block w-full text-left hover:text-indigo-400"
                  >
                    Profile
                  </button>

                  <button
                    onClick={logout}
                    className="block w-full text-left text-red-400 hover:text-red-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

          </nav>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            ☰
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-xl flex flex-col items-center justify-center space-y-6 text-xl z-40">
          <NavLink to="/" onClick={() => setMobileOpen(false)}>Home</NavLink>
          <NavLink to="/ask" onClick={() => setMobileOpen(false)}>Ask</NavLink>
          <NavLink to="/about" onClick={() => setMobileOpen(false)}>About</NavLink>
          <NavLink to="/profile" onClick={() => setMobileOpen(false)}>Profile</NavLink>

          <button onClick={logout} className="text-red-400">
            Logout
          </button>

          <button
            onClick={() => {
              setDark(!dark);
              setMobileOpen(false);
            }}
          >
            Toggle Theme
          </button>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="flex-grow max-w-6xl mx-auto px-6 py-16 w-full">
        {isAuthenticated && <Outlet context={{ setProfileImage }} />}
      </main>

      {/* FOOTER */}
      <footer className="text-center py-6 text-gray-400 text-sm border-t border-white/10">
        © {new Date().getFullYear()} Opal Zeta • Next Generation Community
      </footer>

    </div>
  );
}