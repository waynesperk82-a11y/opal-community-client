import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 hidden md:block p-6 border-r bg-white min-h-screen">
      <div className="space-y-4">

        <Link
          to="/"
          className="block px-4 py-2 rounded-lg hover:bg-gray-100"
        >
          Home
        </Link>

        <Link
          to="/ask"
          className="block px-4 py-2 rounded-lg hover:bg-gray-100"
        >
          Ask Question
        </Link>

        <Link
          to="/login"
          className="block px-4 py-2 rounded-lg hover:bg-gray-100"
        >
          Login
        </Link>

      </div>
    </aside>
  );
}
