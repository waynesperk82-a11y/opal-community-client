import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>

      <footer className="bg-white border-t mt-10">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Opal Zeta. All rights reserved.
          <br />
          Contact:{" "}
          <a
            href="mailto:opalzeta172@gmail.com"
            className="text-indigo-600 hover:underline"
          >
            opalzeta172@gmail.com
          </a>
        </div>
      </footer>

    </div>
  );
}
