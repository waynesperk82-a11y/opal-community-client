import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config";

type Question = {
  _id: string;
  title: string;
  author: string;
  image?: string;
  answers: any[];
};

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/questions`)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) =>
      q.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [questions, search]);

  const totalAnswers = questions.reduce(
    (acc, q) => acc + q.answers.length,
    0
  );

  return (
    <div className="space-y-16">

      {/* HERO SECTION */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-12 shadow-2xl">
        <div className="relative z-10 text-white max-w-2xl">
          <h1 className="text-5xl font-bold leading-tight">
            Welcome to Opal Zeta Community
          </h1>
          <p className="mt-4 text-lg opacity-90">
            Ask questions. Share knowledge. Grow together.
          </p>

          <Link
            to="/ask"
            className="inline-block mt-6 px-8 py-3 bg-white text-black font-semibold rounded-2xl shadow-lg hover:scale-105 transition"
          >
            Ask Your First Question
          </Link>
        </div>

        {/* Background blur circles */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-pink-400/30 rounded-full blur-3xl"></div>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-3xl border border-white/10 text-center shadow-lg">
          <h3 className="text-3xl font-bold text-indigo-400">
            {questions.length}
          </h3>
          <p className="text-gray-300 mt-2">Total Questions</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-3xl border border-white/10 text-center shadow-lg">
          <h3 className="text-3xl font-bold text-pink-400">
            {totalAnswers}
          </h3>
          <p className="text-gray-300 mt-2">Total Answers</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-3xl border border-white/10 text-center shadow-lg">
          <h3 className="text-3xl font-bold text-purple-400">
            {filteredQuestions.length}
          </h3>
          <p className="text-gray-300 mt-2">Search Results</p>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white/10 backdrop-blur-lg border border-white/10 text-white p-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 shadow-lg"
        />
      </div>

      {/* QUESTIONS GRID */}
      {loading ? (
        <p className="text-gray-300 animate-pulse text-center">
          Loading questions...
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredQuestions.map((q) => (
            <div
              key={q._id}
              className="group bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-xl hover:-translate-y-2 hover:shadow-indigo-500/20 transition-all duration-300"
            >
              <Link
                to={`/questions/${q._id}`}
                className="text-xl font-semibold text-indigo-300 group-hover:text-pink-300 transition"
              >
                {q.title}
              </Link>

              {q.image && (
                <img
                  src={q.image}
                  alt="Question"
                  onClick={() => setSelectedImage(q.image!)}
                  className="mt-4 w-full h-48 object-cover rounded-2xl border border-white/10 cursor-pointer hover:scale-105 transition"
                />
              )}

              <div className="flex justify-between items-center mt-4 text-sm text-gray-300">
                <span>By {q.author}</span>
                <span>{q.answers.length} Answers</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FULLSCREEN MODAL */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-4 -right-4 bg-white text-black w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition"
            >
              ✕
            </button>

            <img
              src={selectedImage}
              alt="Fullscreen"
              className="max-w-[90vw] max-h-[85vh] rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
      }                  
