import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Ask() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setImage(reader.result as string);
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("https://opal-community-zeta.onrender.com/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        author,
        image,
      }),
    });

    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-xl">

      <h2 className="text-3xl font-bold text-white mb-6">
        Ask a Question
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        <input
          type="text"
          placeholder="Your Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300"
          required
        />

        <input
          type="text"
          placeholder="Question Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="text-white"
        />

        {image && (
          <img
            src={image}
            alt="Preview"
            className="mt-4 rounded-2xl max-h-60"
          />
        )}

        <button
          type="submit"
          className="bg-gradient-to-r from-indigo-500 to-pink-500 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform"
        >
          Post Question
        </button>

      </form>
    </div>
  );
}
