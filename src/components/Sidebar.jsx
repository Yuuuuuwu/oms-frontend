// src/components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <ul
      id="accordionSidebar"
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    >
      {/* Logo + 系統名稱 */}
      <Link
        to="/dashboard"
        className="sidebar-brand d-flex align-items-center justify-content-center mb-2"
      >
        {/* <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
        </div> */}
        <div className="sidebar-brand-text">訂單管理系統</div>
      </Link>

      {/* 分隔線 */}
      <hr className="sidebar-divider" />

      {/* 商品列表 */}
      <li
        className={`nav-item${
          pathname.startsWith("/products") ? " active" : ""
        }`}
      >
        <Link className="nav-link" to="/products">
          <i className="fas fa-box fa-lg"></i>
          <span className="ml-2">商品列表</span>
        </Link>
      </li>

      {/* 訂單管理 */}
      <li
        className={`nav-item${pathname.startsWith("/orders") ? " active" : ""}`}
      >
        <Link className="nav-link" to="/orders">
          <i className="fas fa-shopping-cart fa-lg"></i>
          <span className="ml-2">訂單管理</span>
        </Link>
      </li>

      <hr className="sidebar-divider d-none d-md-block" />
    </ul>
  );
}
