import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Answer = {
  id: number;
  author: string;
  content: string;
};

type Question = {
  id: number;
  title: string;
  author: string;
  answers: Answer[];
};

export default function QuestionDetails() {
  const { id } = useParams();
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://opal-community-zeta.onrender.com/questions`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((q: Question) => q.id === Number(id));
        setQuestion(found);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching question:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="p-10">Loading...</p>;

  if (!question)
    return <p className="p-10 text-red-500">Question not found</p>;

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-bold text-gray-800">
          {question.title}
        </h2>

        <p className="text-gray-500 mt-2">
          Asked by {question.author}
        </p>

        <hr className="my-6" />

        <h3 className="text-lg font-semibold mb-4">
          Answers ({question.answers.length})
        </h3>

        {question.answers.length === 0 ? (
          <p className="text-gray-500">No answers yet.</p>
        ) : (
          question.answers.map((answer) => (
            <div
              key={answer.id}
              className="bg-gray-50 p-4 rounded-xl mb-4"
            >
              <p className="text-gray-800">{answer.content}</p>
              <p className="text-sm text-gray-500 mt-2">
                — {answer.author}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
