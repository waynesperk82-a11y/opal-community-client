import { useEffect, useState } from "react";
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

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [trending, setTrending] = useState<Question[]>([]);
  const [search, setSearch] = useState("");

  /* ---------------- FETCH ---------------- */

  useEffect(() => {
    fetch("http://localhost:5000/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data));

    fetch("http://localhost:5000/questions/trending")
      .then((res) => res.json())
      .then((data) => setTrending(data));
  }, []);

  const filtered = questions.filter((q) =>
    q.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">

      {/* MAIN SECTION */}
      <div className="lg:col-span-3 space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">All Questions</h1>

          <Link
            to="/ask"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Ask Question
          </Link>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search questions..."
          className="w-full px-4 py-3 rounded-lg border dark:bg-slate-800 dark:border-white/10 focus:ring-2 focus:ring-indigo-500 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Question List */}
        <div className="divide-y dark:divide-white/10">

          {filtered.length === 0 && (
            <div className="py-10 text-gray-400 text-center">
              No questions found.
            </div>
          )}

          {filtered.map((q) => (
            <Link
              key={q._id}
              to={`/questions/${q._id}`}
              className="flex gap-6 py-6 hover:bg-gray-50 dark:hover:bg-white/5 transition"
            >

              {/* LEFT STATS COLUMN */}
              <div className="flex flex-col items-center text-sm text-gray-500 dark:text-gray-400 min-w-[80px]">

                <div className="font-semibold text-lg text-gray-800 dark:text-white">
                  {q.likes}
                </div>
                <span>votes</span>

                <div className="mt-3 font-semibold text-lg text-gray-800 dark:text-white">
                  {q.answers.length}
                </div>
                <span>answers</span>

                <div className="mt-3">
                  {q.views}
                </div>
                <span>views</span>

              </div>

              {/* RIGHT CONTENT */}
              <div className="flex-1 space-y-2">

                <h2 className="text-lg font-medium text-indigo-600 hover:underline">
                  {q.title}
                </h2>

                {/* TAGS */}
                <div className="flex flex-wrap gap-2">
                  {q.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* META */}
                <div className="text-xs text-gray-500 dark:text-gray-400 flex justify-between">

                  <span>
                    asked by <span className="font-medium">{q.author}</span>
                  </span>

                  {new Date(q.createdAt).toDateString() ===
                    new Date().toDateString() && (
                    <span className="text-green-500 font-semibold">
                      New
                    </span>
                  )}

                </div>

              </div>

            </Link>
          ))}

        </div>

      </div>

      {/* SIDEBAR */}
      <aside className="hidden lg:block space-y-6">

        {/* Trending */}
        <div className="bg-white dark:bg-slate-900 border dark:border-white/10 rounded-xl p-4 shadow-sm">

          <h2 className="font-semibold mb-4">🔥 Trending</h2>

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

        {/* About Card */}
        <div className="bg-white dark:bg-slate-900 border dark:border-white/10 rounded-xl p-4 shadow-sm text-sm text-gray-600 dark:text-gray-400">

          <h2 className="font-semibold mb-2">About Opal Zeta</h2>

          <p>
            A community-driven Q&A platform to ask questions,
            share knowledge, and grow together.
          </p>

        </div>

      </aside>

    </div>
  );
        }
