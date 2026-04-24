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

  const [answerAuthor, setAnswerAuthor] = useState("");
  const [answerContent, setAnswerContent] = useState("");

  const fetchQuestion = () => {
    fetch(`https://opal-community-zeta.onrender.com/questions/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setQuestion(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchQuestion();
  }, [id]);

  const handleAnswerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch(
      `https://opal-community-zeta.onrender.com/questions/${id}/answers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          author: answerAuthor,
          content: answerContent,
        }),
      }
    );

    setAnswerAuthor("");
    setAnswerContent("");

    fetchQuestion(); // refresh answers
  };

  if (loading) {
    return <p className="text-gray-600">Loading question...</p>;
  }

  if (!question) {
    return <p className="text-red-500">Question not found</p>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">

      {/* Question Card */}
      <div className="bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-bold text-gray-800">
          {question.title}
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Asked by {question.author}
        </p>
      </div>

      {/* Answers Section */}
      <div className="bg-white p-8 rounded-2xl shadow">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          {question.answers.length} Answers
        </h3>

        {question.answers.length === 0 && (
          <p className="text-gray-500">No answers yet. Be the first!</p>
        )}

        <div className="space-y-6">
          {question.answers.map((answer) => (
            <div
              key={answer.id}
              className="border-b pb-4"
            >
              <p className="text-gray-800">{answer.content}</p>
              <p className="text-sm text-gray-500 mt-2">
                — {answer.author}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Add Answer Form */}
      <div className="bg-white p-8 rounded-2xl shadow">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          Submit Your Answer
        </h3>

        <form onSubmit={handleAnswerSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Your name"
            value={answerAuthor}
            onChange={(e) => setAnswerAuthor(e.target.value)}
            className="w-full border p-3 rounded-lg"
            required
          />

          <textarea
            placeholder="Write your answer..."
            value={answerContent}
            onChange={(e) => setAnswerContent(e.target.value)}
            className="w-full border p-3 rounded-lg"
            rows={4}
            required
          />

          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            Post Answer
          </button>

        </form>
      </div>

    </div>
  );
}
