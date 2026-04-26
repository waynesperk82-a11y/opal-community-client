import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

interface Answer {
  author: string;
  content: string;
}

interface Question {
  _id: string;
  title: string;
  author: string;
  image?: string;
  likes: number;
  views: number;
  answers: Answer[];
  tags?: string[];
  createdAt: string;
}

const API = "https://opal-community-zeta.onrender.com";

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [trending, setTrending] = useState<Question[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ---------------- FETCH ---------------- */

  const fetchAll = async () => {
    try {
      setLoading(true);

      const [qRes, tRes] = await Promise.all([
        fetch(`${API}/questions`),
        fetch(`${API}/questions/trending`)
      ]);

      const qData = await qRes.json();
      const tData = await tRes.json();

      setQuestions(qData);
      setTrending(tData);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load questions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
    const interval = setInterval(fetchAll, 60000); // auto refresh every 60s
    return () => clearInterval(interval);
  }, []);

  /* ---------------- LIKE (Optimistic) ---------------- */

  const handleLike = async (id: string) => {
    setQuestions(prev =>
      prev.map(q =>
        q._id === id ? { ...q, likes: q.likes + 1 } : q
      )
    );

    try {
      await fetch(`${API}/questions/${id}/like`, {
        method: "PUT"
      });
    } catch (err) {
      console.error("Like failed:", err);
    }
  };

  /* ---------------- FILTER + SORT ---------------- */

  const filtered = useMemo(() => {
    let data = questions.filter(q =>
      q.title.toLowerCase().includes(search.toLowerCase())
    );

    if (sortBy === "liked") {
      data.sort((a, b) => b.likes - a.likes);
    } else if (sortBy === "views") {
      data.sort((a, b) => b.views - a.views);
    } else {
      data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      );
    }

    return data;
  }, [questions, search, sortBy]);

  /* ---------------- UI ---------------- */

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">

      {/* MAIN */}
      <div className="lg:col-span-3 space-y-6">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-3xl font-bold">All Questions</h1>

          <Link
            to="/ask"
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition shadow-md"
          >
            + Ask Question
          </Link>
        </div>

        {/* SEARCH + SORT */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search questions..."
            className="flex-1 px-4 py-3 rounded-xl border dark:bg-slate-800 dark:border-white/10 focus:ring-2 focus:ring-indigo-500 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="px-4 py-3 rounded-xl border dark:bg-slate-800 dark:border-white/10"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="liked">Most Liked</option>
            <option value="views">Most Viewed</option>
          </select>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-xl">
            {error}
          </div>
        )}

        {/* LOADING SKELETON */}
        {loading && (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-24 bg-gray-200 dark:bg-slate-700 rounded-xl"
              />
            ))}
          </div>
        )}

        {/* QUESTIONS */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            No questions found.
          </div>
        )}

        {!loading &&
          filtered.map((q) => (
            <div
              key={q._id}
              className="flex gap-6 p-6 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition group border dark:border-white/10"
            >
              {/* STATS */}
              <div className="flex flex-col items-center text-sm text-gray-500 min-w-[80px]">

                <button
                  onClick={() => handleLike(q._id)}
                  className="font-bold text-lg text-gray-800 dark:text-white group-hover:text-indigo-500 transition"
                >
                  👍 {q.likes}
                </button>
                <span>votes</span>

                <div className="mt-3 font-semibold text-lg text-gray-800 dark:text-white">
                  {q.answers.length}
                </div>
                <span>answers</span>

                <div className="mt-3">{q.views}</div>
                <span>views</span>
              </div>

              {/* CONTENT */}
              <div className="flex-1 space-y-3">

                <Link
                  to={`/questions/${q._id}`}
                  className="text-xl font-semibold text-indigo-600 hover:underline"
                >
                  {q.title}
                </Link>

                {q.image && (
                  <img
                    src={q.image}
                    alt="Question"
                    className="max-h-60 rounded-xl border dark:border-white/10 shadow"
                  />
                )}

                <div className="flex flex-wrap gap-2">
                  {q.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="text-xs text-gray-500 dark:text-gray-400 flex justify-between">
                  <span>
                    asked by <span className="font-medium">{q.author}</span>
                  </span>

                  {new Date(q.createdAt).toDateString() ===
                    new Date().toDateString() && (
                    <span className="text-green-500 font-semibold">
                      NEW
                    </span>
                  )}
                </div>

              </div>
            </div>
          ))}
      </div>

      {/* SIDEBAR */}
      <aside className="hidden lg:block space-y-6">

        <div className="bg-white dark:bg-slate-900 border dark:border-white/10 rounded-xl p-5 shadow">
          <h2 className="font-semibold mb-4 text-lg">
            🔥 Trending
          </h2>

          <div className="space-y-3 text-sm">
            {trending.map((q) => (
              <Link
                key={q._id}
                to={`/questions/${q._id}`}
                className="block hover:text-indigo-500 transition"
              >
                {q.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border dark:border-white/10 rounded-xl p-5 shadow text-sm text-gray-600 dark:text-gray-400">
          <h2 className="font-semibold mb-2">
            About Opal Zeta
          </h2>
          <p>
            A community-driven Q&A platform to ask questions,
            share knowledge, and grow together.
          </p>
        </div>

      </aside>
    </div>
  );
}
