import { ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Top Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-600">
          Opal Zeta
        </h1>

        <div className="space-x-6">
          <Link to="/" className="text-gray-700 hover:text-indigo-600">
            Home
          </Link>
          <Link to="/ask" className="text-gray-700 hover:text-indigo-600">
            Ask
          </Link>
          <Link to="/login" className="text-gray-700 hover:text-indigo-600">
            Login
          </Link>
        </div>
      </nav>

      {/* Main Layout Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 mt-6 px-4">

        {/* Left Sidebar */}
        <aside className="col-span-2 bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Navigation</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-indigo-600">All Questions</Link></li>
            <li><Link to="/ask" className="hover:text-indigo-600">Ask Question</Link></li>
            <li><Link to="/signup" className="hover:text-indigo-600">Sign Up</Link></li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="col-span-7">
          {children}
        </main>

        {/* Right Panel */}
        <aside className="col-span-3 bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Trending</h2>
          <p className="text-sm text-gray-500">
            🔥 Most answered questions will appear here.
          </p>
        </aside>

      </div>
    </div>
  );
}
