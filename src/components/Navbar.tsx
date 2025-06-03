import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// 命名空間方式 import (把所有 FontAwesome 圖示都放在 Icons 裡)
import * as Icons from "react-icons/fa";
// 從 react-icons 裡面取 IconType 型別，用來斷言
import { IconType } from "react-icons";
import "../index.css"; // 載入全域 CSS

/**
 * 頂部導覽列元件 (Navbar)
 */
const Navbar: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // 把 Icons.FaBell 斷言成 IconType，才會包含 size、color 等自訂屬性
  const FaBell = Icons.FaBell as IconType;

  const handleLogout = () => {
    // 登出動作：清除 token、user，並導回首頁
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav
      style={{
        height: "56px",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e3e6f0",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        justifyContent: "flex-end",
      }}
    >
      {/* 通知鈴鐺 */}
      <div
        style={{ position: "relative", marginRight: "24px", cursor: "pointer" }}
      >
        {/* 現在可以正確使用 size 屬性 */}
        {/* <FaBell size={20} /> */}
        {/* 紅色徽章 */}
        <span
          style={{
            position: "absolute",
            top: "-4px",
            right: "-4px",
            width: "8px",
            height: "8px",
            backgroundColor: "#e74a3b",
            borderRadius: "50%",
          }}
        ></span>
      </div>

      {/* 使用者名稱與下拉選單 */}
      <div style={{ position: "relative" }}>
        <div
          onClick={() => setShowDropdown((prev) => !prev)}
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <img
            src="https://via.placeholder.com/32"
            alt="avatar"
            style={{ width: "32px", height: "32px", borderRadius: "50%" }}
          />
          <span
            style={{
              marginLeft: "8px",
              fontSize: "1rem",
              color: "var(--color-text-main)",
            }}
          >
            {JSON.parse(localStorage.getItem("user") || "{}").name || "訪客"}
          </span>
        </div>
        {showDropdown && (
          <div
            style={{
              position: "absolute",
              top: "40px",
              right: "0",
              backgroundColor: "#ffffff",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              borderRadius: "4px",
              minWidth: "160px",
              zIndex: 1000,
            }}
          >
            <ul style={{ listStyle: "none", padding: "8px 0", margin: 0 }}>
              <li
                style={{ padding: "8px 16px", cursor: "pointer" }}
                onClick={() => {
                  setShowDropdown(false);
                  navigate("/profile");
                }}
              >
                個人檔案
              </li>
              <li
                style={{ padding: "8px 16px", cursor: "pointer" }}
                onClick={handleLogout}
              >
                登出
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
