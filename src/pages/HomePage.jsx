// src/pages/HomePage.jsx

import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "24px 16px",
        textAlign: "center",
      }}
    >
      {/* 上方大標題 */}
      <div className="mb-5">
        <h1 style={{ fontSize: "2rem", color: "var(--color-text-main)" }}>
          歡迎使用訂單管理系統
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: "var(--color-text-secondary)",
            marginTop: "16px",
          }}
        >
          這是一個簡易的後台管理介面，您可以在此建立、編輯商品，並管理訂單。
        </p>
      </div>

      {/* 中間卡片區塊 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <div className="card" style={{ maxWidth: "360px" }}>
          <div className="card-body text-center">
            <h2
              className="card-title mb-4"
              style={{ fontSize: "1.25rem", color: "var(--color-text-main)" }}
            >
              請先登入或註冊
            </h2>
            <p
              className="card-text mb-4"
              style={{ fontSize: "1rem", color: "var(--color-text-secondary)" }}
            >
              請使用以下按鈕進行登入或註冊，之後即可進入系統開始管理商品與訂單。
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <Link to="/login" className="btn btn-primary btn-lg">
                前往登入
              </Link>
              <Link to="/register" className="btn btn-outline-secondary btn-lg">
                立即註冊
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 底部說明文字 */}
      <div style={{ marginTop: "40px", color: "var(--color-text-secondary)" }}>
        <small>還沒有帳號？請點擊「立即註冊」來建立新帳戶。</small>
      </div>
    </div>
  );
}
