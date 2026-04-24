import { useEffect, useState } from "react";

export default function App() {
  const [message, setMessage] = useState("Connecting...");

  useEffect(() => {
    fetch("https://opal-community-zeta.onrender.com")
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch(() => setMessage("Backend connection failed"));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white flex flex-col">

      {/* Navbar */}
      <nav className="flex justify-between items-center p-6">
        <h1 className="text-2xl font-bold tracking-wide">Opal Community</h1>
        <div className="space-x-4">
          <button className="px-4 py-2 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-200 transition">
            Login
          </button>
          <button className="px-4 py-2 border border-white rounded-lg hover:bg-white hover:text-indigo-600 transition">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-1 flex-col items-center justify-center text-center px-6">
        <h2 className="text-5xl font-extrabold mb-6">
          Build. Connect. Grow.
        </h2>
        <p className="text-lg max-w-xl mb-8">
          A modern full-stack community platform powered by React, Vercel, and Render.
        </p>

        <div className="space-x-4">
          <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl shadow-lg hover:scale-105 transition">
            Get Started
          </button>
          <button className="px-6 py-3 border border-white rounded-xl hover:bg-white hover:text-indigo-600 transition">
            Learn More
          </button>
        </div>

        {/* Backend Status */}
        <div className="mt-12 bg-white/20 backdrop-blur-md px-6 py-4 rounded-xl">
          <p className="text-sm uppercase tracking-wide opacity-80">
            Backend Status
          </p>
          <p className="text-lg font-semibold">{message}</p>
        </div>
      </div>

    </div>
  );
}
