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
  image?: string;
  answers: Answer[];
};

export default function QuestionDetails() {
  const { id } = useParams();
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);

  const [answerAuthor, setAnswerAuthor] = useState("");
  const [answerContent, setAnswerContent] = useState("");

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [zoomed, setZoomed] = useState(false);

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
    fetchQuestion();
  };

  if (loading) {
    return <p className="text-gray-400">Loading question...</p>;
  }

  if (!question) {
    return <p className="text-red-500">Question not found</p>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10">

      {/* QUESTION CARD */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-xl">
        <h2 className="text-3xl font-bold text-white">
          {question.title}
        </h2>

        <p className="text-sm text-gray-300 mt-3">
          Asked by {question.author}
        </p>

        {/* IMAGE (BASE64 SAFE) */}
        {question.image && (
          <img
            src={question.image}
            alt="Question"
            onClick={() => {
              setSelectedImage(question.image!);
              setZoomed(false);
            }}
            className="mt-6 rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>

      {/* ANSWERS */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-xl">
        <h3 className="text-xl font-semibold text-white mb-6">
          {question.answers.length} Answers
        </h3>

        {question.answers.length === 0 && (
          <p className="text-gray-400">No answers yet. Be the first!</p>
        )}

        <div className="space-y-6">
          {question.answers.map((answer) => (
            <div key={answer.id} className="border-b border-white/10 pb-4">
              <p className="text-gray-200">{answer.content}</p>
              <p className="text-sm text-gray-400 mt-2">
                — {answer.author}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ADD ANSWER */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-xl">
        <h3 className="text-xl font-semibold text-white mb-6">
          Submit Your Answer
        </h3>

        <form onSubmit={handleAnswerSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Your name"
            value={answerAuthor}
            onChange={(e) => setAnswerAuthor(e.target.value)}
            className="w-full bg-white/20 text-white placeholder-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <textarea
            placeholder="Write your answer..."
            value={answerContent}
            onChange={(e) => setAnswerContent(e.target.value)}
            className="w-full bg-white/20 text-white placeholder-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
            rows={4}
            required
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-pink-500 px-6 py-2 rounded-xl font-semibold hover:scale-105 transition-transform"
          >
            Post Answer
          </button>

        </form>
      </div>

      {/* FULLSCREEN IMAGE MODAL */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">

          {/* CLOSE BUTTON */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white text-4xl font-bold hover:text-red-400 transition"
          >
            ✕
          </button>

          {/* IMAGE WITH ZOOM */}
          <img
            src={selectedImage}
            alt="Full"
            onClick={() => setZoomed(!zoomed)}
            className={`max-h-[90%] max-w-[90%] rounded-3xl cursor-zoom-in transition-transform duration-300 ${
              zoomed ? "scale-125 cursor-zoom-out" : "scale-100"
            }`}
          />

        </div>
      )}

    </div>
  );
}
