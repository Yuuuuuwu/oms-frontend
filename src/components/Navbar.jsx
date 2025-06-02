// src/components/Navbar.jsx

import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ setToken }) {
  const navigate = useNavigate();

  // 1. 儲存使用者名稱
  const [username, setUsername] = useState("");
  // 2. 控制「使用者下拉」是否打開
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // 3. 控制「通知下拉」是否打開
  const [notifOpen, setNotifOpen] = useState(false);

  // 4. 參考「使用者下拉」DOM
  const dropdownRef = useRef(null);
  // 5. 參考「通知下拉」DOM
  const notifRef = useRef(null);

  // 讀 localStorage 裡的 username，若沒有就顯示「使用者」
  useEffect(() => {
    const savedUsername = localStorage.getItem("username") || "使用者";
    setUsername(savedUsername);
  }, []);

  // 點擊畫面外側就關閉下拉
  useEffect(() => {
    const handleClickOutside = (e) => {
      // 使用者下拉
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      // 通知下拉
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 按下登出
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken(null);
    navigate("/", { replace: true });
  };

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar shadow">
      <div className="container-fluid px-4">
        {/* —— 品牌：點擊回 /dashboard —— */}
        <Link className="navbar-brand" to="/dashboard">
          <span className="font-weight-bold text-primary">訂單管理系統</span>
        </Link>

        {/* —— 右側：通知鈴鐺 + 使用者下拉 —— */}
        <ul className="navbar-nav ml-auto">
          {/* —— (A) 通知鈴鐺 —— */}
          <li
            className="nav-item dropdown no-arrow mx-2 position-relative"
            ref={notifRef}
          >
            <button
              className="nav-link btn border-0 bg-transparent p-0"
              onClick={() => setNotifOpen(!notifOpen)}
            >
              <i className="fas fa-bell fa-lg text-gray-600"></i>
              {/* 紅點：一定要 position absolute，並且父層有 position-relative */}
              <span
                className="badge badge-danger badge-counter"
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-5px",
                  fontSize: "0.6rem",
                  padding: "2px 4px",
                  lineHeight: "1",
                }}
              >
                3
              </span>
            </button>

            {notifOpen && (
              <div
                className="position-absolute bg-white shadow rounded"
                style={{
                  top: "100%",
                  right: "0",
                  width: "300px", // 比之前更寬
                  zIndex: 1000,
                  marginTop: "0.5rem",
                  maxHeight: "400px",
                  overflowY: "auto",
                }}
              >
                {/* 通知標題 */}
                <div
                  className="px-3 py-2 border-bottom"
                  style={{ backgroundColor: "#f8f9fc" }}
                >
                  <span className="small font-weight-bold text-gray-700">
                    通知列表
                  </span>
                </div>
                {/* 範例通知 1 */}
                <Link
                  to="#!"
                  className="d-flex align-items-start px-3 py-2 text-decoration-none border-bottom hover-bg-light"
                  style={{ backgroundColor: "white" }}
                >
                  <i className="fas fa-circle fa-xs text-primary mr-2 mt-1"></i>
                  <div>
                    <div className="small text-gray-500">2025-06-02</div>
                    <span className="text-sm text-gray-800">
                      範例通知：訂單 #12345 已出貨
                    </span>
                  </div>
                </Link>
                {/* 範例通知 2 */}
                <Link
                  to="#!"
                  className="d-flex align-items-start px-3 py-2 text-decoration-none border-bottom hover-bg-light"
                  style={{ backgroundColor: "white" }}
                >
                  <i className="fas fa-circle fa-xs text-warning mr-2 mt-1"></i>
                  <div>
                    <div className="small text-gray-500">2025-06-01</div>
                    <span className="text-sm text-gray-800">
                      範例通知：商品 XYZ 庫存不足
                    </span>
                  </div>
                </Link>
                {/* 更多通知... */}

                {/* 查看所有通知 */}
                <Link
                  to="#!"
                  className="d-block text-center small text-gray-600 py-2 text-decoration-none hover-bg-light"
                  style={{ backgroundColor: "white" }}
                >
                  查看所有通知
                </Link>
              </div>
            )}
          </li>

          {/* —— (B) 使用者大頭貼 + 下拉 —— */}
          <li
            className="nav-item dropdown no-arrow ml-3 position-relative"
            ref={dropdownRef}
          >
            <button
              className="nav-link btn border-0 bg-transparent d-flex align-items-center p-0"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                {username}
              </span>
              <i className="fas fa-user-circle fa-2x text-gray-600"></i>
            </button>
            {dropdownOpen && (
              <div
                className="position-absolute bg-white shadow rounded"
                style={{
                  top: "100%",
                  right: "0",
                  width: "180px",
                  zIndex: 1000,
                  marginTop: "0.5rem",
                }}
              >
                {/* —— 個人檔案 連結，要填 /profile —— */}
                <Link
                  className="dropdown-item d-flex align-items-center py-2 px-3 hover-bg-light"
                  to="/profile"
                >
                  <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                  <span className="small text-gray-800">個人檔案</span>
                </Link>

                <div className="dropdown-divider"></div>
                <button
                  className="dropdown-item d-flex align-items-center py-2 px-3 hover-bg-light w-100"
                  onClick={handleLogout}
                  style={{ backgroundColor: "white", border: "none" }}
                >
                  <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                  <span className="small text-gray-800">登出</span>
                </button>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
