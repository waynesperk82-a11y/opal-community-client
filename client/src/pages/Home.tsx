export default function Home() {
  const questions = [
    {
      title: "How do I connect React to a backend?",
      author: "Wayne",
      answers: 4,
    },
    {
      title: "What is the best way to structure a full-stack app?",
      author: "OpalUser",
      answers: 2,
    },
    {
      title: "How does JWT authentication work?",
      author: "DevMaster",
      answers: 7,
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Community Questions
          </h2>
          <button className="bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700 transition">
            Ask Question
          </button>
        </div>

        <div className="space-y-6">
          {questions.map((q, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-gray-900">
                {q.title}
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Asked by {q.author} • {q.answers} answers
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
