import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Answer = {
  _id?: string;
  author: string;
  content: string;
};

type Question = {
  _id: string;
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
    return (
      <div className="text-center text-gray-400 animate-pulse">
        Loading question...
      </div>
    );
  }

  if (!question) {
    return <p className="text-red-500 text-center">Question not found</p>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-14">

      {/* HERO QUESTION SECTION */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-10 rounded-3xl shadow-2xl text-white overflow-hidden">

        <h2 className="text-4xl font-bold leading-tight">
          {question.title}
        </h2>

        <div className="flex items-center justify-between mt-6">
          <p className="text-white/80">
            Asked by <span className="font-semibold">{question.author}</span>
          </p>

          <span className="bg-white/20 px-4 py-1 rounded-full text-sm backdrop-blur">
            {question.answers.length} Answers
          </span>
        </div>

        {question.image && (
          <img
            src={question.image}
            alt="Question"
            onClick={() => {
              setSelectedImage(question.image!);
              setZoomed(false);
            }}
            className="mt-8 rounded-3xl shadow-xl cursor-pointer hover:scale-105 transition-transform duration-300 max-h-[400px] object-cover"
          />
        )}

        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
      </div>

      {/* ANSWERS SECTION */}
      <div className="space-y-8">
        <h3 className="text-2xl font-semibold text-white">
          Community Answers
        </h3>

        {question.answers.length === 0 && (
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-3xl border border-white/10 text-gray-400 text-center">
            No answers yet. Be the first to respond!
          </div>
        )}

        {question.answers.map((answer, index) => (
          <div
            key={answer._id || index}
            className="bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-lg hover:shadow-indigo-500/20 transition"
          >
            <p className="text-gray-200 leading-relaxed">
              {answer.content}
            </p>

            <div className="mt-4 text-sm text-gray-400">
              — {answer.author}
            </div>
          </div>
        ))}
      </div>

      {/* SUBMIT ANSWER */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-xl">
        <h3 className="text-2xl font-semibold text-white mb-6">
          Submit Your Answer
        </h3>

        <form onSubmit={handleAnswerSubmit} className="space-y-6">

          <input
            type="text"
            placeholder="Your name"
            value={answerAuthor}
            onChange={(e) => setAnswerAuthor(e.target.value)}
            className="w-full bg-white/20 text-white placeholder-gray-300 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <textarea
            placeholder="Write your answer..."
            value={answerContent}
            onChange={(e) => setAnswerContent(e.target.value)}
            className="w-full bg-white/20 text-white placeholder-gray-300 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500"
            rows={5}
            required
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-pink-500 px-8 py-3 rounded-2xl font-semibold hover:scale-105 transition-transform shadow-lg"
          >
            Post Answer
          </button>

        </form>
      </div>

      {/* FULLSCREEN IMAGE MODAL */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">

          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white text-4xl font-bold hover:text-red-400 transition"
          >
            ✕
          </button>

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
