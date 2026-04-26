 import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Layout() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [profileImage, setProfileImage] = useState("");
  const [scrolled, setScrolled] = useState(false);

  /* ================= AUTH ================= */

  useEffect(() => {
    const stored = localStorage.getItem("username");

    if (!stored) {
      navigate("/login");
    } else {
      setUsername(stored);
    }

    setCheckingAuth(false);
  }, [navigate]);

  /* ================= PROFILE ================= */

  useEffect(() => {
    const saved = localStorage.getItem("profileImage");
    if (saved) setProfileImage(saved);
  }, []);

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

  /* ================= SCROLL EFFECT ================= */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-indigo-950 text-white flex flex-col">

      {/* ================= COOL NAVBAR ================= */}
      <header
        className={`fixed top-0 w-full z-50 flex justify-center transition-all duration-500 ${
          scrolled ? "py-3" : "py-6"
        }`}
      >
        <div
          className={`w-[95%] max-w-7xl px-8 py-4 rounded-3xl border border-white/10
          backdrop-blur-2xl bg-white/5
          shadow-[0_0_40px_rgba(99,102,241,0.3)]
          transition-all duration-500`}
        >

          <div className="flex justify-between items-center">

            {/* LOGO */}
            <div
              onClick={() => navigate("/")}
              className="cursor-pointer text-2xl font-extrabold tracking-wide 
              bg-gradient-to-r from-indigo-400 via-pink-500 to-purple-500 
              bg-clip-text text-transparent 
              hover:scale-110 transition duration-300"
            >
              Opal Zeta
            </div>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-10 text-sm font-medium">

              {["/", "/ask", "/about"].map((path, index) => {
                const labels = ["Home", "Ask", "About"];
                return (
                  <NavLink
                    key={path}
                    to={path}
                    className={({ isActive }) =>
                      `relative group ${
                        isActive ? "text-indigo-400" : ""
                      }`
                    }
                  >
                    {labels[index]}
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] 
                    bg-gradient-to-r from-indigo-400 to-pink-500
                    transition-all duration-300 group-hover:w-full"></span>
                  </NavLink>
                );
              })}

              {/* THEME BUTTON */}
              <button
                onClick={() => setDark(!dark)}
                className="px-4 py-2 rounded-xl 
                bg-gradient-to-r from-indigo-500 to-pink-500
                hover:scale-110 transition duration-300
                shadow-lg shadow-indigo-500/40"
              >
                {dark ? "☀" : "🌙"}
              </button>

              {/* PROFILE */}
              <NavLink to="/profile">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover 
                    border-2 border-indigo-500 
                    hover:scale-110 transition duration-300"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full 
                  bg-gradient-to-r from-indigo-500 to-pink-500
                  flex items-center justify-center font-bold
                  hover:scale-110 transition duration-300">
                    {username.charAt(0).toUpperCase()}
                  </div>
                )}
              </NavLink>

              {/* LOGOUT */}
              <button
                onClick={logout}
                className="px-4 py-2 rounded-xl bg-red-600 
                hover:bg-red-700 hover:scale-105 
                transition duration-300"
              >
                Logout
              </button>

            </nav>

            {/* MOBILE MENU BUTTON */}
            <button
              className="md:hidden text-2xl"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              ☰
            </button>

          </div>
        </div>

        {/* MOBILE DROPDOWN */}
        {mobileOpen && (
          <div className="md:hidden absolute top-full mt-3 w-[90%] 
          bg-slate-900/95 backdrop-blur-xl border border-white/10 
          rounded-2xl p-6 space-y-4 text-center">

            <NavLink to="/" onClick={() => setMobileOpen(false)}>Home</NavLink>
            <NavLink to="/ask" onClick={() => setMobileOpen(false)}>Ask</NavLink>
            <NavLink to="/about" onClick={() => setMobileOpen(false)}>About</NavLink>
            <NavLink to="/profile" onClick={() => setMobileOpen(false)}>Profile</NavLink>

            <button
              onClick={logout}
              className="block w-full bg-red-600 py-2 rounded-xl"
            >
              Logout
            </button>

          </div>
        )}
      </header>

      {/* CONTENT */}
      <main className="flex-grow max-w-6xl mx-auto px-6 pt-40 pb-16 w-full">
        <Outlet context={{ setProfileImage }} />
      </main>

      {/* FOOTER */}
      <footer className="text-center text-gray-400 py-6 border-t border-white/10">
        © {new Date().getFullYear()} Opal Zeta
      </footer>

    </div>
  );
}