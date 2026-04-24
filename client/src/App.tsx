import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Ask from "./pages/Ask";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import QuestionDetails from "./pages/QuestionDetails";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">

        {/* Navbar */}
        <nav className="flex justify-between items-center p-6 max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold">Opal Community</h1>
          <div className="space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 border border-white rounded-lg hover:bg-white hover:text-indigo-600 transition"
            >
              Sign Up
            </Link>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/ask" element={<Ask />} />
          <Route path="/questions/:id" element={<QuestionDetails />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}
