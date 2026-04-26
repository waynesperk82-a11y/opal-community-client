import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Question {
  _id: string;
  title: string;
  author: string;
  image?: string;
  createdAt?: string;
}

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const fetchQuestions = async () => {
    try {
      const res = await fetch(
        "https://opal-community-zeta.onrender.com/questions"
      );
      const data = await res.json();
      setQuestions(data.reverse());
    } catch (err) {
      console.log("Failed to fetch questions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleQuickPost = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !author) return;

    await fetch("https://opal-community-zeta.onrender.com/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author }),
    });

    setTitle("");
    setAuthor("");
    fetchQuestions();
  };

  return (
    <div className="space-y-16">

      {/* HERO */}
      <section className="text-center space-y-6">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">
          Opal Zeta Community 🚀
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Ask questions. Share knowledge. Build together.
        </p>
      </section>

      {/* QUICK POST */}
      <section className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/10">
        <h2 className="text-2xl font-bold mb-6">Post a Quick Question</h2>

        <form onSubmit={handleQuickPost} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/20 text-white"
          />

          <input
            type="text"
            placeholder="Your Question"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/20 text-white"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 font-semibold hover:scale-105 transition"
          >
            Post Now
          </button>
        </form>
      </section>

      {/* QUESTION FEED */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Latest Questions</h2>

        {loading ? (
          <p className="text-gray-400">Loading questions...</p>
        ) : questions.length === 0 ? (
          <p className="text-gray-400">No questions yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {questions.map((q) => (
              <Link
                key={q._id}
                to={`/questions/${q._id}`}
                className="bg-gradient-to-br from-indigo-600/20 to-pink-600/20 p-6 rounded-2xl border border-white/10 shadow-lg hover:scale-105 transition"
              >
                <h3 className="text-xl font-bold mb-2">{q.title}</h3>
                <p className="text-gray-400 text-sm">
                  Asked by {q.author}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* PLATFORM INFO */}
      <section className="grid md:grid-cols-3 gap-8">

        <div className="bg-indigo-700/30 p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold mb-2">⚡ Fast</h3>
          <p className="text-gray-300">
            Real-time question updates and modern architecture.
          </p>
        </div>

        <div className="bg-pink-700/30 p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold mb-2">🔒 Secure</h3>
          <p className="text-gray-300">
            Authentication and protected routes enabled.
          </p>
        </div>

        <div className="bg-purple-700/30 p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold mb-2">🌍 Community</h3>
          <p className="text-gray-300">
            Built for collaboration and knowledge sharing.
          </p>
        </div>

      </section>

    </div>
  );
  }
