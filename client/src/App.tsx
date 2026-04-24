import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Ask from "./pages/Ask";
import About from "./pages/About";
import QuestionDetails from "./pages/QuestionDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout />}>

          <Route index element={<Home />} />
          <Route path="ask" element={<Ask />} />
          <Route path="about" element={<About />} />
          <Route path="questions/:id" element={<QuestionDetails />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

