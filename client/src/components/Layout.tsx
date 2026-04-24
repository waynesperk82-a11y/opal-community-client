import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 text-white">

      {/* NAVBAR */}
      <nav className="backdrop-blur-lg bg-white/10 border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <Link
            to="/"
            className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent"
          >
            Opal Zeta
          </Link>

          <div className="flex gap-6 text-sm font-medium">
            <Link to="/" className="hover:text-indigo-300 transition">
              Home
            </Link>
            <Link to="/ask" className="hover:text-indigo-300 transition">
              Ask
            </Link>
            <Link to="/about" className="hover:text-indigo-300 transition">
              About
            </Link>
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <main className="flex-grow max-w-6xl mx-auto px-6 py-10 w-full">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-white/5 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center text-sm text-gray-300">
          © {new Date().getFullYear()} Opal Zeta. All rights reserved.
          <br />
          Contact:{" "}
          <a
            href="mailto:opalzeta172@gmail.com"
            className="text-indigo-400 hover:text-pink-400 transition"
          >
            opalzeta172@gmail.com
          </a>
        </div>
      </footer>

    </div>
  );
}
