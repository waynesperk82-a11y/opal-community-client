        import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Ask() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5MB");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setImage(reader.result as string);
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !author.trim()) {
      setError("Name and Title are required");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        "https://opal-community-zeta.onrender.com/questions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            author,
            image,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to post question");
      }

      navigate("/");
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/10">

      <h2 className="text-3xl font-bold text-white mb-6">
        Ask a Question
      </h2>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-500/20 text-red-300 border border-red-400/30">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">

        <input
          type="text"
          placeholder="Your Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
          required
        />

        <input
          type="text"
          placeholder="Question Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
          required
        />

        <div>
          <label className="text-gray-300 text-sm">
            Optional Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="text-white mt-2"
          />
        </div>

        {image && (
          <img
            src={image}
            alt="Preview"
            className="mt-4 rounded-2xl max-h-60 border border-white/10 shadow-lg"
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl font-semibold transition-transform ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-indigo-500 to-pink-500 hover:scale-105"
          }`}
        >
          {loading ? "Posting..." : "Post Question"}
        </button>

      </form>
    </div>
  );
            }
