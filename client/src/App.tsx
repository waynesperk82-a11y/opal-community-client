import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Ask from "./pages/Ask";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import QuestionDetails from "./pages/QuestionDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="ask" element={<Ask />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="questions/:id" element={<QuestionDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
