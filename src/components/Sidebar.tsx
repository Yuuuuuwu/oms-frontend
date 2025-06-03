import React from "react";
import { NavLink } from "react-router-dom";
// 同樣改為命名空間 import，並且後面做型別斷言
import * as Icons from "react-icons/fa";
import "../index.css"; // 確保載入全域 CSS

/**
 * 側邊選單元件 (Sidebar)
 */
const Sidebar: React.FC = () => {
  // 強制斷言：WrappedIcon 回傳的確是合法的 React 元件
  const FaTachometerAlt = Icons.FaTachometerAlt as React.FC<
    React.SVGProps<SVGSVGElement>
  >;
  const FaBox = Icons.FaBox as React.FC<React.SVGProps<SVGSVGElement>>;
  const FaPlus = Icons.FaPlus as React.FC<React.SVGProps<SVGSVGElement>>;
  const FaShoppingCart = Icons.FaShoppingCart as React.FC<
    React.SVGProps<SVGSVGElement>
  >;
  const FaUser = Icons.FaUser as React.FC<React.SVGProps<SVGSVGElement>>;

  return (
    <aside
      className="sidebar"
      style={{
        width: "240px",
        backgroundColor: "var(--color-secondary)",
        color: "#ffffff",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          padding: "16px",
          textAlign: "center",
          fontSize: "1.25rem",
          fontWeight: 600,
        }}
      >
        訂單管理系統
      </div>
      <nav>
        <ul style={{ listStyle: "none", marginTop: "16px", padding: 0 }}>
          <li>
            <NavLink
              to="/dashboard"
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                height: "48px",
                padding: "0 16px",
                color: "#ffffff",
                textDecoration: "none",
                backgroundColor: isActive
                  ? "var(--color-primary)"
                  : "transparent",
              })}
            >
              <FaTachometerAlt style={{ marginRight: "12px" }} />
              儀表板
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                height: "48px",
                padding: "0 16px",
                color: "#ffffff",
                textDecoration: "none",
                backgroundColor: isActive
                  ? "var(--color-primary)"
                  : "transparent",
              })}
            >
              <FaBox style={{ marginRight: "12px" }} />
              商品列表
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products/new"
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                height: "48px",
                padding: "0 16px",
                color: "#ffffff",
                textDecoration: "none",
                backgroundColor: isActive
                  ? "var(--color-primary)"
                  : "transparent",
              })}
            >
              <FaPlus style={{ marginRight: "12px" }} />
              新增商品
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/orders"
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                height: "48px",
                padding: "0 16px",
                color: "#ffffff",
                textDecoration: "none",
                backgroundColor: isActive
                  ? "var(--color-primary)"
                  : "transparent",
              })}
            >
              <FaShoppingCart style={{ marginRight: "12px" }} />
              訂單管理
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/orders/new"
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                height: "48px",
                padding: "0 16px",
                color: "#ffffff",
                textDecoration: "none",
                backgroundColor: isActive
                  ? "var(--color-primary)"
                  : "transparent",
              })}
            >
              <FaPlus style={{ marginRight: "12px" }} />
              建立訂單
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                height: "48px",
                padding: "0 16px",
                color: "#ffffff",
                textDecoration: "none",
                backgroundColor: isActive
                  ? "var(--color-primary)"
                  : "transparent",
              })}
            >
              <FaUser style={{ marginRight: "12px" }} />
              個人檔案
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
