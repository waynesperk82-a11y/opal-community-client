import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Question = {
  id: number;
  title: string;
  author: string;
  answers: any[];
};

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://opal-community-zeta.onrender.com/questions")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching questions:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Community Questions
          </h2>

          <Link
            to="/ask"
            className="bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700 transition"
          >
            Ask Question
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-600">Loading questions...</p>
        ) : (
          <div className="space-y-6">
            {questions.map((q) => (
              <div
                key={q.id}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-gray-900">
                  {q.title}
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  Asked by {q.author} • {q.answers.length} answers
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
