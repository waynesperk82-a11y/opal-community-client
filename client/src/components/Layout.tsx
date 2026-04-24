import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* Navbar */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            Opal Community
          </Link>

          <div className="space-x-6">
            <Link to="/" className="text-gray-700 hover:text-indigo-600">
              Home
            </Link>
            <Link to="/ask" className="text-gray-700 hover:text-indigo-600">
              Ask
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-indigo-600">
              About
            </Link>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-8 w-full">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Opal Zeta. All rights reserved.
          <br />
          Contact:{" "}
          <a
            href="mailto:opalzeta172@gmail.com"
            className="text-indigo-600 hover:underline"
          >
            opalzeta172@gmail.com
          </a>
        </div>
      </footer>

    </div>
  );
}
