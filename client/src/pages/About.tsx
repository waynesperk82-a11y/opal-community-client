export default function About() {
  return (
    <div className="bg-white p-8 rounded-2xl shadow space-y-8">

      <h2 className="text-3xl font-bold text-indigo-600">
        About Opal Zeta
      </h2>

      <p className="text-gray-700">
        Opal Zeta is a modern community platform where people
        ask questions and receive answers from others.
      </p>

      <p className="text-gray-700">
        Our mission is to create an open, interactive space
        where knowledge is shared freely and collaboration grows.
      </p>

      <div className="bg-indigo-50 p-6 rounded-xl">
        <h3 className="font-semibold text-lg mb-3">
          Platform Features
        </h3>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li>Ask unlimited questions</li>
          <li>Answer freely</li>
          <li>Community-driven knowledge</li>
          <li>Clean and modern interface</li>
        </ul>
      </div>

      {/* Contact Section */}
      <div className="border-t pt-6">
        <h3 className="text-xl font-semibold mb-3">
          Need More Help?
        </h3>

        <p className="text-gray-700 mb-2">
          If you have any questions, suggestions, or need support,
          feel free to contact us:
        </p>

        <a
          href="mailto:opalzeta172@gmail.com"
          className="text-indigo-600 font-semibold hover:underline"
        >
          opalzeta172@gmail.com
        </a>
      </div>

    </div>
  );
}
