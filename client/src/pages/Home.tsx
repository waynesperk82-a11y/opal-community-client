import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Question = {
  id: number;
  title: string;
  author: string;
  image?: string;
  answers: any[];
};

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://opal-community-zeta.onrender.com/questions")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl font-bold tracking-tight">
          Explore Community Questions
        </h2>

        <Link
          to="/ask"
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-pink-500 font-semibold shadow-lg hover:scale-105 transition-transform"
        >
          + Ask Question
        </Link>
      </div>

      {/* QUESTIONS */}
      {loading ? (
        <p className="text-gray-300 animate-pulse">Loading questions...</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {questions.map((q) => (
            <div
              key={q.id}
              className="bg-white/10 backdrop-blur-lg border border-white/10 p-6 rounded-3xl shadow-xl hover:shadow-indigo-500/20 hover:-translate-y-1 transition-all duration-300"
            >
              <Link
                to={`/questions/${q.id}`}
                className="text-xl font-semibold text-indigo-300 hover:text-pink-300 transition"
              >
                {q.title}
              </Link>

              {/* IMAGE */}
              {q.image && (
                <img
                  src={q.image}
                  alt="Question"
                  onClick={() => setSelectedImage(q.image!)}
                  className="mt-4 w-full max-h-64 object-cover rounded-2xl border border-white/10 cursor-pointer hover:scale-105 transition"
                />
              )}

              <p className="text-sm text-gray-300 mt-3">
                Asked by <span className="font-medium">{q.author}</span>
              </p>

              <div className="mt-4 text-xs text-gray-400">
                {q.answers.length} Answers
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
    {/* IMAGE CONTAINER */}
    <div
      onClick={(e) => e.stopPropagation()}
      className="relative"
    >
      {/* CLOSE BUTTON */}
      <button
        onClick={() => setSelectedImage(null)}
        className="absolute -top-4 -right-4 bg-white text-black w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition"
      >
        ✕
      </button>

      {/* IMAGE */}
      <img
        src={selectedImage}
        alt="Fullscreen"
        className="max-w-[90vw] max-h-[85vh] rounded-2xl shadow-2xl"
      />
        </div>
      )}
    </div>
  );
}
