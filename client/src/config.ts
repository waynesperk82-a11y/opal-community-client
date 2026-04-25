export const API_URL =
  import.meta.env.MODE === "production"
    ? "https://opal-community-zeta.onrender.com"
    : "http://localhost:5000";
