import { useOutletContext } from "react-router-dom";
import { useState } from "react";

type ContextType = {
  setProfileImage: (img: string) => void;
};

export default function Profile() {
  const { setProfileImage } = useOutletContext<ContextType>();
  const [preview, setPreview] = useState<string | null>(null);

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

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Your Profile</h2>

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-32 h-32 rounded-full object-cover mb-6 border-4 border-indigo-500"
        />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="block w-full text-sm text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-500 file:text-white hover:file:bg-indigo-600"
      />
    </div>
  );
}
