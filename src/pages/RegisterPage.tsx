// src/pages/RegisterPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../index.css"; // 全域 CSS

/**
 * 會員註冊頁面（RegisterPage）
 */
const RegisterPage: React.FC = () => {
  // 使用者輸入的名稱、電子郵件、密碼
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // 錯誤訊息
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  /**
   * 提交註冊表單
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 呼叫後端註冊 API
      await api.post("/register", { name, email, password });
      // 註冊完成後導向登入頁
      navigate("/login");
    } catch {
      setError("註冊失敗，請檢查輸入資料是否正確。");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "80px auto" }}>
      <div className="card-custom">
        <div className="card-body">
          <h4 className="card-title mb-4">會員註冊</h4>

          {error && <p className="text-error">{error}</p>}

          <form onSubmit={handleSubmit} noValidate>
            {/* 使用者名稱 */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                使用者名稱：
              </label>
              <input
                id="name"
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* 電子郵件 */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                電子郵件：
              </label>
              <input
                id="email"
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* 密碼 */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                密碼：
              </label>
              <input
                id="password"
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* 註冊按鈕 */}
            <button type="submit" className="btn btn-primary w-100">
              註冊
            </button>
          </form>

          {/* 已有帳號導向登入 */}
          <div
            className="mt-3 text-center"
            style={{
              fontSize: "0.875rem",
              color: "var(--color-text-secondary)",
            }}
          >
            已有帳號？<a href="/login">前往登入</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
