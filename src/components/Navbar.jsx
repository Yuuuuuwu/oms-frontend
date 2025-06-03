// src/components/Navbar.jsx

import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ setToken }) {
  const navigate = useNavigate();

  // 1. 儲存使用者名稱
  const [username, setUsername] = useState("");
  // 2. 是否打開「使用者下拉」
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // 3. 是否打開「通知下拉」
  const [notifOpen, setNotifOpen] = useState(false);

  // 4. 參考「使用者下拉」DOM
  const dropdownRef = useRef(null);
  // 5. 參考「通知下拉」DOM
  const notifRef = useRef(null);

  // 讀 localStorage 裡的 username，若沒就顯示「使用者」
  useEffect(() => {
    const savedUsername = localStorage.getItem("username") || "使用者";
    setUsername(savedUsername);
  }, []);

  // 點擊畫面空白處，若點擊在下拉外面就關閉下拉
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 點擊「登出」：清除 localStorage，跳回登入頁
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken(null);
    navigate("/", { replace: true });
  };

  return (
    <nav
      className="navbar"
      style={{
        backgroundColor: "#FFFFFF", // 白底
        borderBottom: "1px solid var(--color-border)", // 底線分隔
        height: "64px",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        /* 若要讓 navbar 固定在最上方，可加：
           position: sticky; top: 0; z-index: 100; */
      }}
    >
      {/* 左側：系統名稱 (點擊回到 /dashboard) */}
      <div>
        <Link
          to="/dashboard"
          style={{
            fontSize: "1.25rem", // 約 20px
            fontWeight: "600",
            color: "var(--color-primary)", // 主色
            textDecoration: "none",
          }}
        >
          訂單管理系統
        </Link>
      </div>

      {/* 右側：通知鈴鐺 + 使用者下拉 */}
      <div
        style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}
      >
        {/* 通知鈴鐺 */}
        <div
          ref={notifRef}
          style={{ position: "relative", marginRight: "24px" }}
        >
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "1.2rem",
              color: "var(--color-text-secondary)", // 字串裡帶 CSS var
              position: "relative",
            }}
          >
            <i className="fas fa-bell"></i>
            {/* 紅點 */}
            <span
              style={{
                position: "absolute",
                top: "-4px",
                right: "-4px",
                backgroundColor: "#E74C3C",
                color: "#FFF",
                borderRadius: "50%",
                fontSize: "0.6rem",
                width: "16px",
                height: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              3
            </span>
          </button>

          {notifOpen && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                right: "0",
                width: "300px",
                backgroundColor: "#FFF",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                borderRadius: "8px",
                marginTop: "0.5rem",
                zIndex: 1000,
                maxHeight: "400px",
                overflowY: "auto",
              }}
            >
              {/* 通知標題 */}
              <div
                style={{
                  padding: "8px 12px",
                  borderBottom: "1px solid var(--color-border)",
                  backgroundColor: "#f8f9fc",
                }}
              >
                <span
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    color: "#555",
                  }}
                >
                  通知列表
                </span>
              </div>

              {/* 範例通知 1 */}
              <Link
                to="#!"
                className="d-flex align-items-start px-3 py-2 hover-bg-light"
                style={{
                  textDecoration: "none",
                  borderBottom: "1px solid var(--color-border)",
                }}
              >
                <i
                  className="fas fa-circle fa-xs text-primary mr-2 mt-1"
                  style={{ fontSize: "0.6rem" }}
                ></i>
                <div>
                  <div style={{ fontSize: "0.8rem", color: "#999" }}>
                    2025-06-02
                  </div>
                  <span style={{ fontSize: "0.9rem", color: "#333" }}>
                    範例通知：訂單 #12345 已出貨
                  </span>
                </div>
              </Link>

              {/* 範例通知 2 */}
              <Link
                to="#!"
                className="d-flex align-items-start px-3 py-2 hover-bg-light"
                style={{
                  textDecoration: "none",
                  borderBottom: "1px solid var(--color-border)",
                }}
              >
                <i
                  className="fas fa-circle fa-xs text-warning mr-2 mt-1"
                  style={{ fontSize: "0.6rem" }}
                ></i>
                <div>
                  <div style={{ fontSize: "0.8rem", color: "#999" }}>
                    2025-06-01
                  </div>
                  <span style={{ fontSize: "0.9rem", color: "#333" }}>
                    範例通知：商品 XYZ 庫存不足
                  </span>
                </div>
              </Link>

              {/* 「查看所有通知」連結 */}
              <Link
                to="#!"
                className="d-block text-center py-2 hover-bg-light"
                style={{
                  fontSize: "0.85rem",
                  color: "var(--color-text-secondary)",
                  textDecoration: "none",
                }}
              >
                查看所有通知
              </Link>
            </div>
          )}
        </div>

        {/* 使用者頭像 + 下拉 */}
        <div ref={dropdownRef} style={{ position: "relative" }}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: "0.95rem",
                color: "var(--color-text-secondary)",
                marginRight: "8px",
              }}
            >
              {username}
            </span>
            <i
              className="fas fa-user-circle"
              style={{ fontSize: "1.5rem", color: "#888" }}
            ></i>
          </button>

          {dropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                right: "0",
                width: "180px",
                backgroundColor: "#FFF",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                borderRadius: "8px",
                marginTop: "0.5rem",
                zIndex: 1000,
              }}
            >
              {/* 個人檔案 連結 */}
              <Link
                to="/profile"
                className="d-flex align-items-center px-3 py-2 hover-bg-light"
                style={{
                  textDecoration: "none",
                  color: "var(--color-text-main)",
                  fontSize: "0.9rem",
                }}
              >
                <i
                  className="fas fa-user fa-sm fa-fw mr-2"
                  style={{ color: "#888" }}
                ></i>
                個人檔案
              </Link>

              <div
                style={{
                  height: "1px",
                  backgroundColor: "var(--color-border)",
                  margin: "4px 0",
                }}
              ></div>

              <button
                onClick={handleLogout}
                className="d-flex align-items-center w-100 px-3 py-2 hover-bg-light"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  color: "var(--color-text-main)",
                  textAlign: "left",
                }}
              >
                <i
                  className="fas fa-sign-out-alt fa-sm fa-fw mr-2"
                  style={{ color: "#888" }}
                ></i>
                登出
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
