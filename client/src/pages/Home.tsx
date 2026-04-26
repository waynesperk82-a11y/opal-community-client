import { useEffect, useState } from "react";

export default function Home() {
  const [time, setTime] = useState(new Date());
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(true);

  const quotes = [
    "Success starts with self-belief.",
    "Consistency beats motivation.",
    "Your only limit is your mind.",
    "Build. Break. Improve. Repeat.",
    "Dream big. Start small. Act now."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    const randomQuote =
      quotes[Math.floor(Math.random() * quotes.length)];

    setTimeout(() => {
      setQuote(randomQuote);
      setLoading(false);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-10">

      {/* HERO SECTION */}
      <section className="text-center space-y-6">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">
          Welcome to Opal Zeta 
        </h1>

        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Your intelligent web platform built with modern React, 
          Tailwind, and deployed on Vercel.
        </p>

        <div className="text-2xl font-mono bg-white/10 px-6 py-3 rounded-xl inline-block shadow-lg">
          {time.toLocaleTimeString()}
        </div>
      </section>

      {/* QUOTE SECTION */}
      <section className="bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/10 text-center">
        <h2 className="text-2xl font-bold mb-4">Daily Inspiration</h2>

        {loading ? (
          <p className="animate-pulse text-gray-400">
            Loading inspiration...
          </p>
        ) : (
          <p className="text-lg text-indigo-300 font-medium">
            "{quote}"
          </p>
        )}
      </section>

      {/* FEATURE GRID */}
      <section className="grid md:grid-cols-3 gap-8">

        <div className="bg-gradient-to-br from-indigo-600/30 to-indigo-900/40 p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <h3 className="text-xl font-bold mb-2"> Fast</h3>
          <p className="text-gray-300">
            Optimized performance and smooth navigation experience.
          </p>
        </div>

        <div className="bg-gradient-to-br from-pink-600/30 to-pink-900/40 p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <h3 className="text-xl font-bold mb-2">Secure</h3>
          <p className="text-gray-300">
            Authentication powered with protected routes.
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-600/30 to-purple-900/40 p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <h3 className="text-xl font-bold mb-2">Modern</h3>
          <p className="text-gray-300">
            Beautiful UI built using Tailwind CSS.
          </p>
        </div>

      </section>

    </div>
  );
      }
