import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to Opal Community 🚀</h1>
      <p>This is your fresh Vite + React app.</p>
      <Link to="/login">Go to Login</Link>
    </div>
  );
}

function Login() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Login Page</h1>
      <Link to="/">Back Home</Link>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
