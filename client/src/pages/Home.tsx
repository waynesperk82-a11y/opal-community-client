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
  createdAt: string;
}

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [search, setSearch] = useState("");

  /* ---------------- FETCH QUESTIONS ---------------- */

  useEffect(() => {
    fetch("http://localhost:5000/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error(err));
  }, []);

  /* ---------------- FILTERED ---------------- */

  const filtered = questions.filter((q) =>
    q.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10">

      {/* HERO SECTION */}
      <section className="text-center py-10">
        <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
          Welcome to Opal Zeta
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
          Ask questions. Share knowledge. Explore trending discussions.
        </p>
      </section>

      {/* SEARCH */}
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="🔍 Search questions..."
          className="w-full max-w-2xl px-4 py-3 rounded-xl border dark:bg-slate-800 dark:border-white/10 focus:ring-2 focus:ring-indigo-500 outline-none transition"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* QUESTIONS LIST */}
      <div className="grid gap-6">

        {filtered.length === 0 && (
          <div className="text-center text-gray-400 py-20">
            No questions found.
          </div>
        )}

        {filtered.map((q) => (
          <Link
            key={q._id}
            to={`/questions/${q._id}`}
            className="group block p-6 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >

            {/* Title */}
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-lg font-semibold group-hover:text-indigo-500 transition">
                {q.title}
              </h2>

              {q.likes > 5 && (
                <span className="text-xs bg-pink-500 text-white px-2 py-1 rounded-full">
                  🔥 Trending
                </span>
              )}
            </div>

            {/* Image */}
            {q.image && (
              <img
                src={q.image}
                alt=""
                className="w-full max-h-60 object-cover rounded-xl mb-4"
              />
            )}

            {/* Meta Info */}
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">

              <div className="flex gap-4">
                <span>❤️ {q.likes}</span>
                <span>👁 {q.views}</span>
                <span>💬 {q.answers.length}</span>
              </div>

              <span>by {q.author}</span>

            </div>

          </Link>
        ))}
      </div>

    </div>
  );
            }
