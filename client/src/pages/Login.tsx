import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  /* 🔁 Auto Redirect If Already Logged In */
  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = () => {
    if (!username.trim()) {
      alert("Username required");
      return;
    }

    localStorage.setItem("username", username.trim());
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 text-white">

      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-96 border border-white/20">

        <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
          Login to Opal Zeta
        </h1>

        <input
          type="text"
          placeholder="Enter username"
          className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 py-3 rounded-xl font-semibold hover:scale-105 transition-transform"
        >
          Login
        </button>

      </div>

    </div>
  );
        }
