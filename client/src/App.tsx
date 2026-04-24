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
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold">Opal Community</h1>
        <div className="space-x-4">
          <button className="px-4 py-2 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-200 transition">
            Login
          </button>
          <button className="px-4 py-2 border border-white rounded-lg hover:bg-white hover:text-indigo-600 transition">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="text-center py-20 px-6">
        <h2 className="text-5xl font-extrabold mb-6">
          Build. Connect. Grow.
        </h2>
        <p className="text-lg max-w-2xl mx-auto mb-8">
          A powerful full-stack community platform built with modern technologies.
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
        <div className="mt-12 bg-white/20 backdrop-blur-md px-6 py-4 rounded-xl inline-block">
          <p className="text-sm uppercase tracking-wide opacity-80">
            Backend Status
          </p>
          <p className="text-lg font-semibold">{message}</p>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-white text-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-12">Why Choose Opal?</h3>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
              <h4 className="text-xl font-semibold mb-4"> Fast Performance</h4>
              <p>
                Built with Vite and optimized for lightning-fast loading.
              </p>
            </div>

            <div className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
              <h4 className="text-xl font-semibold mb-4"> Secure Backend</h4>
              <p>
                Connected to a powerful backend running on Render.
              </p>
            </div>

            <div className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
              <h4 className="text-xl font-semibold mb-4">🚀 Scalable</h4>
              <p>
                Designed to scale into a full production-ready platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 bg-gray-900 text-gray-400">
        <p>© {new Date().getFullYear()} Opal Community. All rights reserved.</p>
      </footer>

    </div>
  );
}
