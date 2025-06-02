// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar shadow">
      <div className="container-fluid px-4">
        {/* 品牌/標題 */}
        <Link className="navbar-brand" to="/dashboard">
          訂單管理系統
        </Link>

        {/* 搜尋框 */}
        <form className="d-none d-sm-inline-block form-inline mr-auto ml-4 navbar-search">
          <div className="input-group">
            <input
              type="text"
              className="form-control bg-light border-0 small"
              placeholder="搜尋訂單、商品…"
              aria-label="Search"
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button">
                <i className="fas fa-search fa-sm"></i>
              </button>
            </div>
          </div>
        </form>

        {/* 右側圖示區 */}
        <ul className="navbar-nav ml-auto">
          {/* 通知 */}
          <li className="nav-item dropdown no-arrow mx-2">
            <a
              className="nav-link dropdown-toggle"
              href="#!"
              id="alertsDropdown"
              role="button"
              data-toggle="dropdown"
            >
              <i className="fas fa-bell fa-fw"></i>
              <span className="badge badge-danger badge-counter">3</span>
            </a>
            <div
              className="dropdown-list dropdown-menu dropdown-menu-right shadow"
              aria-labelledby="alertsDropdown"
            >
              <h6 className="dropdown-header">通知中心</h6>
              {/* 範例通知 */}
              <Link className="dropdown-item d-flex align-items-center" to="#">
                <div>
                  <div className="small text-gray-500">2025-05-20</div>
                  <span className="font-weight-bold">新訂單 #1005 已產生</span>
                </div>
              </Link>
              <Link
                className="dropdown-item text-center small text-gray-500"
                to="#"
              >
                查看所有通知
              </Link>
            </div>
          </li>

          {/* 使用者大頭貼 */}
          <li className="nav-item dropdown no-arrow">
            <a
              className="nav-link dropdown-toggle"
              href="#!"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
            >
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                test
              </span>
              <img
                className="img-profile rounded-circle"
                src="https://via.placeholder.com/40"
                alt="avatar"
              />
            </a>
            <div
              className="dropdown-menu dropdown-menu-right shadow"
              aria-labelledby="userDropdown"
            >
              <Link className="dropdown-item" to="/profile">
                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                個人檔案
              </Link>
              <div className="dropdown-divider"></div>
              <Link
                className="dropdown-item"
                to="/login"
                onClick={() => localStorage.removeItem("token")}
              >
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                登出
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
