import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";

interface Question {
  _id: string;
  title: string;
  author: string;
  createdAt?: string;
}

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [posting, setPosting] = useState(false);
  const [search, setSearch] = useState("");

  /* ================= FETCH ================= */

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        "https://opal-community-zeta.onrender.com/questions"
      );

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      setQuestions(Array.isArray(data) ? data.reverse() : []);
    } catch (err) {
      console.error(err);
      setError("Failed to load questions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  /* ================= POST ================= */

  const handleQuickPost = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !author.trim()) {
      alert("Fill all fields");
      return;
    }

    try {
      setPosting(true);

      const res = await fetch(
        "https://opal-community-zeta.onrender.com/questions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            username: author,
          },
          body: JSON.stringify({ title }),
        }
      );

      if (!res.ok) throw new Error("Post failed");

      setTitle("");
      fetchQuestions();
    } catch (err) {
      alert("Failed to post");
    } finally {
      setPosting(false);
    }
  };

  /* ================= FILTER ================= */

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) =>
      q.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [questions, search]);

  /* ================= UI ================= */

  return (
    <div className="space-y-16">

      {/* HERO */}
      <section className="text-center space-y-6 px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
          Opal Zeta Community
        </h1>

        <p className="text-gray-300 max-w-xl mx-auto text-base md:text-lg">
          A modern space to ask, explore, and share knowledge.
        </p>

        {/* LIVE STATS */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 pt-6">
          <div className="bg-white/5 px-8 py-6 rounded-2xl border border-white/10 backdrop-blur-xl w-40">
            <p className="text-3xl font-bold">{questions.length}</p>
            <p className="text-gray-400 text-sm">Questions</p>
          </div>

          <div className="bg-white/5 px-8 py-6 rounded-2xl border border-white/10 backdrop-blur-xl w-40">
            <p className="text-3xl font-bold">
              {new Set(questions.map((q) => q.author)).size}
            </p>
            <p className="text-gray-400 text-sm">Contributors</p>
          </div>
        </div>
      </section>

      {/* POST SECTION */}
      <section className="bg-gradient-to-br from-indigo-700/20 to-purple-700/20 p-6 md:p-10 rounded-3xl shadow-2xl border border-white/10 backdrop-blur-xl">

        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          Ask a Question
        </h2>

        <form onSubmit={handleQuickPost} className="space-y-6 max-w-2xl mx-auto">

          <input
            type="text"
            placeholder="Your Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-4 rounded-xl bg-white/10 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />

          <textarea
            placeholder="What would you like to ask?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            rows={4}
            className="w-full p-4 rounded-xl bg-white/10 text-white outline-none focus:ring-2 focus:ring-pink-500 transition"
          />

          <button
            type="submit"
            disabled={posting}
            className={`w-full py-4 rounded-xl font-bold text-lg transition duration-300 ${
              posting
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 to-pink-500 hover:scale-105"
            }`}
          >
            {posting ? "Posting..." : "Post Question"}
          </button>

        </form>
      </section>

      {/* SEARCH */}
      <section className="max-w-xl mx-auto px-4">
        <input
          type="text"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-xl transition"
        />
      </section>

      {/* FEED */}
      <section className="space-y-6 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center md:text-left">
          Latest Questions
        </h2>

        {loading ? (
          <p className="text-gray-400 text-center">Loading...</p>
        ) : error ? (
          <p className="text-red-400 text-center">{error}</p>
        ) : filteredQuestions.length === 0 ? (
          <p className="text-gray-400 text-center">No questions found.</p>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuestions.map((q) => (
              <Link
                key={q._id}
                to={`/questions/${q._id}`}
                className="group bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-xl hover:shadow-xl hover:-translate-y-2 transition duration-300"
              >
                <h3 className="text-lg md:text-xl font-bold mb-2 group-hover:text-pink-400 transition">
                  {q.title}
                </h3>

                <p className="text-gray-400 text-sm">
                  Asked by {q.author}
                </p>

                {q.createdAt && (
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(q.createdAt).toLocaleDateString()}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}