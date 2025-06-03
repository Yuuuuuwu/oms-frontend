// src/pages/LoginPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { User } from "../types";
import "../index.css"; // 全域 CSS

/**
 * 會員登入頁面（LoginPage）
 */
const LoginPage: React.FC = () => {
  // 儲存輸入的電子郵件與密碼
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // 錯誤訊息
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  /**
   * 提交登入表單
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 呼叫後端登入 API，預期回傳 { token, user }
      const res = await api.post<{ token: string; user: User }>("/login", {
        email,
        password,
      });

      // 儲存 token 及 user 資訊到 localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // 導到儀表板
      navigate("/dashboard");
    } catch {
      setError("登入失敗，請檢查帳號或密碼。");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "80px auto" }}>
      <div className="card-custom">
        <div className="card-body">
          <h4 className="card-title mb-4">會員登入</h4>

          {error && <p className="text-error">{error}</p>}

          <form onSubmit={handleSubmit} noValidate>
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

            {/* 登入按鈕 */}
            <button type="submit" className="btn btn-primary w-100">
              登入
            </button>
          </form>

          {/* 提示註冊連結 */}
          <div
            className="mt-3 text-center"
            style={{
              fontSize: "0.875rem",
              color: "var(--color-text-secondary)",
            }}
          >
            還沒有帳號？<a href="/register">立即註冊</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
