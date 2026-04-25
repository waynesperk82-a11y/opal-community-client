import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg"
        : "hover:bg-white/10 dark:hover:bg-white/5"
    }`;

  return (
    <aside className="w-64 hidden md:flex flex-col p-6 border-r border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-xl min-h-screen transition-colors duration-500">

      {/* TITLE */}
      <div className="mb-8">
        <h2 className="text-lg font-bold tracking-wide text-gray-800 dark:text-white">
          Navigation
        </h2>
      </div>

      {/* LINKS */}
      <nav className="flex flex-col gap-3 text-sm font-medium text-gray-700 dark:text-gray-300">

        <NavLink to="/" className={linkStyle}>
          <span>🏠</span>
          Home
        </NavLink>

        <NavLink to="/ask" className={linkStyle}>
          <span>❓</span>
          Ask Question
        </NavLink>

        <NavLink to="/about" className={linkStyle}>
          <span>ℹ</span>
          About
        </NavLink>

      </nav>

      {/* FOOTER SECTION */}
      <div className="mt-auto pt-10 text-xs text-gray-400">
        Opal Zeta v1.0
      </div>

    </aside>
  );
}
