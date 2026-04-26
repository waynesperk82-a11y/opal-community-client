
import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";

type ContextType = {
  setProfileImage: (img: string) => void;
};

export default function Profile() {
  const { setProfileImage } = useOutletContext<ContextType>();

  const [preview, setPreview] = useState<string | null>(null);
  const [username, setUsername] = useState("");

  /* ================= LOAD SAVED DATA ================= */

  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    const savedName = localStorage.getItem("username");

    if (savedImage) {
      setPreview(savedImage);
      setProfileImage(savedImage);
    }

    if (savedName) {
      setUsername(savedName);
    }
  }, [setProfileImage]);

  /* ================= IMAGE UPLOAD ================= */

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPreview(base64);
      localStorage.setItem("profileImage", base64);
      setProfileImage(base64);
    };

    reader.readAsDataURL(file);
  };

  /* ================= REMOVE IMAGE ================= */

  const removeImage = () => {
    setPreview(null);
    localStorage.removeItem("profileImage");
    setProfileImage("");
  };

  /* ================= SAVE NAME ================= */

  const saveUsername = () => {
    localStorage.setItem("username", username);
    alert("Profile updated ✅");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/10 space-y-8">

      <h2 className="text-3xl font-bold text-center">
        Your Profile
      </h2>

      {/* PROFILE IMAGE */}
      <div className="flex flex-col items-center space-y-4">

        {preview ? (
          <img
            src={preview}
            alt="Profile"
            className="w-36 h-36 rounded-full object-cover border-4 border-indigo-500 shadow-xl transition hover:scale-105"
          />
        ) : (
          <div className="w-36 h-36 rounded-full bg-gray-700 flex items-center justify-center text-5xl font-bold text-gray-400">
            ?
          </div>
        )}

        <div className="flex gap-4">
          <label className="cursor-pointer bg-indigo-500 px-5 py-2 rounded-xl hover:bg-indigo-600 transition font-semibold">
            Change Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
            />
          </label>

          {preview && (
            <button
              onClick={removeImage}
              className="bg-red-500 px-5 py-2 rounded-xl hover:bg-red-600 transition font-semibold"
            >
              Remove
            </button>
          )}
        </div>

      </div>

      {/* USERNAME */}
      <div className="space-y-4">
        <label className="block text-gray-300 font-semibold">
          Display Name
        </label>

        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your name"
          className="w-full p-4 rounded-xl bg-white/10 text-white outline-none focus:ring-2 focus:ring-pink-500"
        />

        <button
          onClick={saveUsername}
          className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-indigo-500 to-pink-500 hover:scale-105 transition"
        >
          Save Changes
        </button>
      </div>

    </div>
  );
}