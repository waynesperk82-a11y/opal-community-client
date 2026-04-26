import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /* 🔁 Auto Redirect If Already Logged In */
  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleLogin = () => {
    if (!username.trim()) {
      setError("Username is required");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      localStorage.setItem("username", username.trim());
      navigate("/", { replace: true });
    }, 800);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-slate-950 text-white">

      {/* 🌌 Animated Background Blobs */}
      <div className="absolute w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-30 animate-pulse -top-20 -left-20"></div>
      <div className="absolute w-96 h-96 bg-pink-600 rounded-full blur-3xl opacity-30 animate-pulse bottom-0 right-0"></div>

      {/* 🌟 Floating Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-900/40 to-slate-900/60 backdrop-blur-3xl"></div>

      {/* 🔐 Login Card */}
      <div className="relative z-10 w-96 p-10 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:scale-[1.02]">

        {/* Logo */}
        <h1 className="text-4xl font-extrabold text-center mb-2 bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
          Opal Zeta
        </h1>

        <p className="text-center text-gray-400 mb-8 text-sm">
          Enter the community and start sharing knowledge
        </p>

        {/* Input */}
        <div className="space-y-4">

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />

          {error && (
            <div className="text-sm text-red-400 bg-red-500/10 p-2 rounded-lg border border-red-500/30">
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full py-3 rounded-2xl font-semibold shadow-lg transition-all duration-300 ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 to-pink-500 hover:scale-105 hover:shadow-indigo-500/40"
            }`}
          >
            {loading ? "Authenticating..." : "Login"}
          </button>

        </div>

        {/* Footer */}
        <p className="text-xs text-gray-500 text-center mt-6">
          Secure • Fast • Community Driven
        </p>

      </div>

    </div>
  );
      }
