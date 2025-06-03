// src/pages/LoginPage.jsx

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function LoginPage({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/products");
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("username", username);
      setToken(res.data.access_token);
      navigate("/products");
    } catch (err) {
      console.error(err);
      const status = err.response?.status;
      const data = err.response?.data;
      alert(`登入失敗！\nStatus：${status}\n回傳：${JSON.stringify(data)}`);
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
        會員登入
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
          登入
        </button>
        <p
          className="mt-3 text-center"
          style={{ color: "var(--color-text-secondary)" }}
        >
          還沒帳號？<Link to="/register"> 立即註冊</Link>
        </p>
      </form>
    </div>
  );
}
