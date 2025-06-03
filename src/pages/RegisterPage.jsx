// src/pages/RegisterPage.jsx

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) nav("/products");
  }, [nav]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { username, email, password });
      alert("註冊成功，請登入");
      nav("/login");
    } catch (err) {
      console.error(err);
      const status = err.response?.status;
      const data = err.response?.data;
      alert(`註冊失敗！\nStatus：${status}\nResponse：${JSON.stringify(data)}`);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "24px 16px" }}>
      <h2
        style={{
          fontSize: "1.5rem",
          marginBottom: "24px",
          color: "var(--color-text-main)",
        }}
      >
        會員註冊
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label
            className="form-label"
            style={{ fontSize: "1rem", color: "var(--color-text-main)" }}
          >
            使用者名稱：
          </label>
          <input
            className="form-control"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label
            className="form-label"
            style={{ fontSize: "1rem", color: "var(--color-text-main)" }}
          >
            Email：
          </label>
          <input
            className="form-control"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label
            className="form-label"
            style={{ fontSize: "1rem", color: "var(--color-text-main)" }}
          >
            密碼：
          </label>
          <input
            className="form-control"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          註冊
        </button>
        <p
          className="mt-3 text-center"
          style={{ color: "var(--color-text-secondary)" }}
        >
          已有帳號？<Link to="/login"> 點此登入</Link>
        </p>
      </form>
    </div>
  );
}
