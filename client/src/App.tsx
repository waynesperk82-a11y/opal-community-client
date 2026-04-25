import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Ask from "./pages/Ask";
import About from "./pages/About";
import QuestionDetails from "./pages/QuestionDetails";
import Profile from "./pages/Profile";

function NotFound() {
  return (
    <div className="text-center mt-20 text-white">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-gray-400">Page not found</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>

          {/* Main Pages */}
          <Route index element={<Home />} />
          <Route path="ask" element={<Ask />} />
          <Route path="about" element={<About />} />
          <Route path="profile" element={<Profile />} />

          {/* Question Details (MongoDB _id based) */}
          <Route path="questions/:id" element={<QuestionDetails />} />

          {/* 404 Catch All */}
          <Route path="*" element={<NotFound />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
