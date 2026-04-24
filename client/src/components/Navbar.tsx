import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link to="/" className="text-2xl font-bold text-indigo-600">
          Opal Zeta
        </Link>

        <div className="flex gap-4">
          <Link
            to="/ask"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Ask
          </Link>

          <Link
            to="/login"
            className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
          >
            Login
          </Link>
        </div>

      </div>
    </nav>
  );
}
