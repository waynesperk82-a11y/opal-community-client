import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Ask() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result as string);
    };

    reader.readAsDataURL(file);
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
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Ask a Question</h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        <input
          type="text"
          placeholder="Your Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-3 rounded-lg border dark:bg-slate-700"
          required
        />

        <textarea
          placeholder="What is your question?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-lg border dark:bg-slate-700"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />

        {image && (
          <img
            src={image}
            alt="Preview"
            className="w-40 rounded-lg mt-4"
          />
        )}

        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
        >
          Post Question
        </button>

      </form>
    </div>
  );
}
