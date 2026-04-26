export default function About() {
  return (
    <div className="space-y-16">

      {/* HEADER */}
      <section className="text-center space-y-6">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">
          About Opal Zeta
        </h1>

        <p className="text-gray-300 max-w-3xl mx-auto">
          Opal Zeta is a modern community-driven Q&A platform designed
          to empower developers, students, and thinkers to collaborate,
          learn, and grow together.
        </p>
      </section>

      {/* MISSION */}
      <section className="bg-white/5 backdrop-blur-xl p-10 rounded-3xl border border-white/10 shadow-xl">
        <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
        <p className="text-gray-300 leading-relaxed">
          Our mission is to create a powerful, elegant, and scalable
          question-and-answer ecosystem that promotes open learning,
          community interaction, and modern web technologies.
        </p>
      </section>

      {/* TECH STACK */}
      <section className="grid md:grid-cols-3 gap-8">

        <div className="bg-indigo-600/20 p-6 rounded-2xl">
          <h3 className="text-xl font-bold mb-2">Frontend</h3>
          <p className="text-gray-300">
            Built with React, TypeScript, Tailwind CSS.
          </p>
        </div>

        <div className="bg-pink-600/20 p-6 rounded-2xl">
          <h3 className="text-xl font-bold mb-2">Backend</h3>
          <p className="text-gray-300">
            Node.js API deployed on Render.
          </p>
        </div>

        <div className="bg-purple-600/20 p-6 rounded-2xl">
          <h3 className="text-xl font-bold mb-2">Deployment</h3>
          <p className="text-gray-300">
            Hosted on Vercel with continuous integration.
          </p>
        </div>

      </section>

      {/* FUTURE ROADMAP */}
      <section className="bg-gradient-to-r from-indigo-700/30 to-pink-700/30 p-10 rounded-3xl shadow-xl">
        <h2 className="text-3xl font-bold mb-4">Future Vision</h2>
        <ul className="space-y-3 text-gray-300">
          <li>• Real-time chat between users</li>
          <li>• Voting & reputation system</li>
          <li>• AI-powered answer suggestions</li>
          <li>• Verified expert profiles</li>
        </ul>
      </section>

    </div>
  );
}
