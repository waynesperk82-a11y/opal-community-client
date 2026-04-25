import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative ${
      isActive
        ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg"
        : "hover:bg-white/10 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300"
    }`;

  return (
    <aside
      className={`hidden md:flex flex-col ${
        collapsed ? "w-20" : "w-64"
      } transition-all duration-500 border-r border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-xl min-h-screen`}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-white/10">
        {!collapsed && (
          <h2 className="text-lg font-bold tracking-wide">
            Dashboard
          </h2>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-sm px-2 py-1 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition"
        >
          {collapsed ? "➤" : "◀"}
        </button>
      </div>

      {/* NAVIGATION */}
      <nav className="flex flex-col gap-3 p-4 text-sm font-medium">

        <NavLink to="/" className={linkStyle}>
          <span>🏠</span>
          {!collapsed && "Home"}
        </NavLink>

        <NavLink to="/ask" className={linkStyle}>
          <span>❓</span>
          {!collapsed && "Ask Question"}
        </NavLink>

        <NavLink to="/about" className={linkStyle}>
          <span>ℹ</span>
          {!collapsed && "About"}
        </NavLink>

        <NavLink to="/profile" className={linkStyle}>
          <span>👤</span>
          {!collapsed && "Profile"}
        </NavLink>

      </nav>

      {/* FOOTER */}
      <div className="mt-auto p-4 text-xs text-gray-400 border-t border-gray-200 dark:border-white/10">
        {!collapsed ? "Opal Zeta Admin v1.0" : "OZ"}
      </div>
    </aside>
  );
}
