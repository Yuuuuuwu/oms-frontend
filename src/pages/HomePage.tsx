// src/pages/HomePage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css"; // 全域 CSS

/**
 * 首頁（HomePage）
 */
const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "80px auto",
        textAlign: "center",
        padding: "0 16px",
      }}
    >
      <div className="card-custom">
        <div style={{ padding: "2rem" }}>
          <h1>歡迎使用訂單管理系統</h1>
          <p
            style={{ marginTop: "1rem", color: "var(--color-text-secondary)" }}
          >
            這是一個簡易的後台管理介面，您可以在此建立、編輯商品，並管理訂單。
          </p>
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <button
              className="btn btn-primary"
              onClick={() => navigate("/login")}
            >
              前往登入
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/register")}
            >
              立即註冊
            </button>
          </div>
          <p
            style={{
              marginTop: "1rem",
              fontSize: "0.875rem",
              color: "var(--color-text-secondary)",
            }}
          >
            還沒有帳號？請點擊「立即註冊」來建立新帳戶。
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
