import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="flex max-w-7xl mx-auto">

        {/* Left Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>

        {/* Right Panel */}
        <aside className="w-64 hidden lg:block p-6">
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-bold mb-4">Trending</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li># React</li>
              <li># Backend</li>
              <li># AI</li>
              <li># Startups</li>
            </ul>
          </div>
        </aside>

      </div>
    </div>
  );
}
