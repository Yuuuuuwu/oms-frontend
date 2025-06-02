import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <ul
      id="accordionSidebar"
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    >
      {/* Logo + 系統名稱，點擊回到儀表板 */}
      <Link
        to="/dashboard"
        className="sidebar-brand d-flex align-items-center justify-content-center mb-2"
      >
        <div className="sidebar-brand-text">訂單管理系統</div>
      </Link>

      {/* 分隔線 */}
      <hr className="sidebar-divider" />

      {/* 儀表板 */}
      <li
        className={`nav-item${
          pathname.startsWith("/dashboard") ? " active" : ""
        }`}
      >
        <Link className="nav-link" to="/dashboard">
          <i className="fas fa-tachometer-alt fa-lg"></i>
          <span className="ml-2">儀表板</span>
        </Link>
      </li>

      {/* 商品列表 */}
      <li
        className={`nav-item${
          pathname.startsWith("/products") &&
          !pathname.startsWith("/products/new")
            ? " active"
            : ""
        }`}
      >
        <Link className="nav-link" to="/products">
          <i className="fas fa-box fa-lg"></i>
          <span className="ml-2">商品列表</span>
        </Link>
      </li>

      {/* 新增商品 */}
      <li
        className={`nav-item${
          pathname.startsWith("/products/new") ? " active" : ""
        }`}
      >
        <Link className="nav-link" to="/products/new">
          <i className="fas fa-plus-circle fa-lg"></i>
          <span className="ml-2">新增商品</span>
        </Link>
      </li>

      {/* 訂單管理 */}
      <li
        className={`nav-item${
          pathname.startsWith("/orders") &&
          !pathname.startsWith("/orders/create")
            ? " active"
            : ""
        }`}
      >
        <Link className="nav-link" to="/orders">
          <i className="fas fa-shopping-cart fa-lg"></i>
          <span className="ml-2">訂單管理</span>
        </Link>
      </li>

      {/* 建立訂單 */}
      <li
        className={`nav-item${
          pathname.startsWith("/orders/new") ? " active" : ""
        }`}
      >
        <Link className="nav-link" to="/orders/new">
          <i className="fas fa-plus fa-lg"></i>
          <span className="ml-2">建立訂單</span>
        </Link>
      </li>

      {/* 最後再加一條分隔線 */}
      <hr className="sidebar-divider d-none d-md-block" />
    </ul>
  );
}
