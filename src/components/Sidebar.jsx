// src/components/Sidebar.jsx

import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside
      style={{
        width: "240px",
        backgroundColor: "var(--color-primary)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        color: "#FFFFFF",
      }}
    >
      {/* Logo + 系統名稱 */}
      <Link
        to="/dashboard"
        style={{
          textDecoration: "none",
          color: "#FFFFFF",
          textAlign: "center",
          padding: "16px 0",
          fontSize: "1.25rem",
          fontWeight: "600",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        訂單管理系統
      </Link>

      {/* 選單列表 */}
      <nav style={{ flex: 1, paddingTop: "12px" }}>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {/* 儀表板 */}
          <li style={{ margin: "4px 0" }}>
            <Link
              to="/dashboard"
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 24px",
                color: pathname.startsWith("/dashboard")
                  ? "var(--color-secondary)"
                  : "#FFFFFF",
                textDecoration: "none",
                backgroundColor: pathname.startsWith("/dashboard")
                  ? "rgba(255, 255, 255, 0.1)"
                  : "transparent",
                borderRadius: "4px",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!pathname.startsWith("/dashboard"))
                  e.currentTarget.style.backgroundColor =
                    "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                if (!pathname.startsWith("/dashboard"))
                  e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <i className="fas fa-tachometer-alt fa-lg"></i>
              <span style={{ marginLeft: "12px", fontSize: "1rem" }}>
                儀表板
              </span>
            </Link>
          </li>

          {/* 商品列表 */}
          <li style={{ margin: "4px 0" }}>
            <Link
              to="/products"
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 24px",
                color:
                  pathname.startsWith("/products") &&
                  !pathname.startsWith("/products/new")
                    ? "var(--color-secondary)"
                    : "#FFFFFF",
                textDecoration: "none",
                backgroundColor:
                  pathname.startsWith("/products") &&
                  !pathname.startsWith("/products/new")
                    ? "rgba(255, 255, 255, 0.1)"
                    : "transparent",
                borderRadius: "4px",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => {
                if (
                  !(
                    pathname.startsWith("/products") &&
                    !pathname.startsWith("/products/new")
                  )
                )
                  e.currentTarget.style.backgroundColor =
                    "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                if (
                  !(
                    pathname.startsWith("/products") &&
                    !pathname.startsWith("/products/new")
                  )
                )
                  e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <i className="fas fa-box fa-lg"></i>
              <span style={{ marginLeft: "12px", fontSize: "1rem" }}>
                商品列表
              </span>
            </Link>
          </li>

          {/* 新增商品 */}
          <li style={{ margin: "4px 0" }}>
            <Link
              to="/products/new"
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 24px",
                color: pathname.startsWith("/products/new")
                  ? "var(--color-secondary)"
                  : "#FFFFFF",
                textDecoration: "none",
                backgroundColor: pathname.startsWith("/products/new")
                  ? "rgba(255, 255, 255, 0.1)"
                  : "transparent",
                borderRadius: "4px",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!pathname.startsWith("/products/new"))
                  e.currentTarget.style.backgroundColor =
                    "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                if (!pathname.startsWith("/products/new"))
                  e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <i className="fas fa-plus-circle fa-lg"></i>
              <span style={{ marginLeft: "12px", fontSize: "1rem" }}>
                新增商品
              </span>
            </Link>
          </li>

          {/* 訂單管理 */}
          <li style={{ margin: "4px 0" }}>
            <Link
              to="/orders"
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 24px",
                color:
                  pathname.startsWith("/orders") &&
                  !pathname.startsWith("/orders/new")
                    ? "var(--color-secondary)"
                    : "#FFFFFF",
                textDecoration: "none",
                backgroundColor:
                  pathname.startsWith("/orders") &&
                  !pathname.startsWith("/orders/new")
                    ? "rgba(255, 255, 255, 0.1)"
                    : "transparent",
                borderRadius: "4px",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => {
                if (
                  !(
                    pathname.startsWith("/orders") &&
                    !pathname.startsWith("/orders/new")
                  )
                )
                  e.currentTarget.style.backgroundColor =
                    "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                if (
                  !(
                    pathname.startsWith("/orders") &&
                    !pathname.startsWith("/orders/new")
                  )
                )
                  e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <i className="fas fa-shopping-cart fa-lg"></i>
              <span style={{ marginLeft: "12px", fontSize: "1rem" }}>
                訂單管理
              </span>
            </Link>
          </li>

          {/* 建立訂單 */}
          <li style={{ margin: "4px 0" }}>
            <Link
              to="/orders/new"
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 24px",
                color: pathname.startsWith("/orders/new")
                  ? "var(--color-secondary)"
                  : "#FFFFFF",
                textDecoration: "none",
                backgroundColor: pathname.startsWith("/orders/new")
                  ? "rgba(255, 255, 255, 0.1)"
                  : "transparent",
                borderRadius: "4px",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!pathname.startsWith("/orders/new"))
                  e.currentTarget.style.backgroundColor =
                    "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                if (!pathname.startsWith("/orders/new"))
                  e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <i className="fas fa-plus fa-lg"></i>
              <span style={{ marginLeft: "12px", fontSize: "1rem" }}>
                建立訂單
              </span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* 底部分隔線 */}
      <div
        style={{
          height: "1px",
          backgroundColor: "rgba(255,255,255,0.2)",
          margin: "12px 0",
        }}
      ></div>
    </aside>
  );
}
