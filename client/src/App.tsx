import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Ask from "./pages/Ask";
import About from "./pages/About";
import QuestionDetails from "./pages/QuestionDetails";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

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
    <Routes>

      {/* LOGIN ROUTE */}
      <Route path="/login" element={<Login />} />

      {/* MAIN LAYOUT */}
      <Route path="/" element={<Layout />}>

        <Route index element={<Home />} />
        <Route path="ask" element={<Ask />} />
        <Route path="about" element={<About />} />
        <Route path="profile" element={<Profile />} />
        <Route path="questions/:id" element={<QuestionDetails />} />
        <Route path="*" element={<NotFound />} />

      </Route>

    </Routes>
  );
}
