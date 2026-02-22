// src/pages/auth/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { successAlert, errorAlert } from "../../utils/alert";
import api from "../../api/axios";
export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    navigate(role === "admin" ? "/" : "/user/my-card", { replace: true });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      errorAlert("Login Failed", "Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/org-login", {
        username: email,
        password: password,
        role: role === "admin" ? "employeer" : "employee",
      });

      const token = res.data.token;
      const user = res.data.user;

      console.log("token", token);
      // Save token
      localStorage.setItem("token", token);

      // Save user info (optional)
      localStorage.setItem("user", JSON.stringify(user));

      // Update auth context
      login(user, token);

      successAlert("Welcome", `Hello ${user.name}`);

      // Redirect
      if (user.role === "employeer") {
        navigate("/", { replace: true });
      } else {
        navigate("/user/my-card", { replace: true });
      }
    } catch (error) {
      console.log(error);

      const message =
        error.response?.data?.message || "Invalid credentials fggfgfg";

      errorAlert("Login Failed", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 px-4">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/30">
        <div className="text-center mb-6">
          <div className="mx-auto mb-3 h-14 w-14 flex items-center justify-center rounded-full bg-white text-indigo-600 text-2xl font-bold shadow">
            OD
          </div>
          <h1 className="text-3xl font-bold text-white">
            {role === "admin" ? "Organization Login" : "User Login"}
          </h1>
        </div>

        <div className="flex bg-white/20 rounded-xl p-1 mb-6">
          <button
            onClick={() => setRole("admin")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
              role === "admin"
                ? "bg-white text-indigo-600 shadow"
                : "text-white/80"
            }`}
          >
            Organization
          </button>
          <button
            onClick={() => setRole("user")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
              role === "user"
                ? "bg-white text-indigo-600 shadow"
                : "text-white/80"
            }`}
          >
            User
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-white text-sm mb-1 block">
              Email or Phone
            </label>
            <input
              type="text"
              placeholder="admin@onedesk.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/90 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-white text-sm mb-1 block">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/90 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold transition shadow-lg"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-white/70 mt-6 text-sm">
          © {new Date().getFullYear()} OneDesk
        </p>
      </div>
    </div>
  );
}
