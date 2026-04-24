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
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchQuestion = () => {
    fetch(`https://opal-community-zeta.onrender.com/questions/${id}`)
      .then((res) => res.json())
      .then((data) => setQuestion(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchQuestion();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await fetch(
      `https://opal-community-zeta.onrender.com/questions/${id}/answers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ author, content }),
      }
    );

    setAuthor("");
    setContent("");
    fetchQuestion();
    setLoading(false);
  };

  if (!question) return <p>Loading...</p>;

  return (
    <div className="space-y-8">

      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-bold">{question.title}</h2>
        <p className="text-sm text-gray-500 mt-2">
          Asked by {question.author}
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">
          {question.answers.length} Answer(s)
        </h3>

        {question.answers.length === 0 && (
          <p className="text-gray-500">Be the first to answer.</p>
        )}

        <div className="space-y-4">
          {question.answers.map((answer) => (
            <div
              key={answer.id}
              className="bg-white p-4 rounded-xl shadow"
            >
              <p>{answer.content}</p>
              <p className="text-sm text-gray-500 mt-2">
                — {answer.author}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="text-lg font-semibold mb-4">Write an Answer</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />

          <textarea
            placeholder="Your answer..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border rounded-lg h-32"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Posting..." : "Post Answer"}
          </button>
        </form>
      </div>

    </div>
  );
}
