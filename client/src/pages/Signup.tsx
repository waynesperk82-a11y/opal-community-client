export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">
      <div className="bg-white/20 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md text-white border border-white/30">
        <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 mb-4 rounded-xl bg-white/10 border border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-xl bg-white/10 border border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 rounded-xl bg-white/10 border border-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
        />

        <button className="w-full bg-white text-indigo-600 py-3 rounded-xl font-semibold hover:scale-105 transition">
          Sign Up
        </button>
      </div>
    </div>
  );
}
