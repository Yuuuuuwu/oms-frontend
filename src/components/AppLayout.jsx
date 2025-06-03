// src/components/AppLayout.jsx

import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function AppLayout({ setToken }) {
  return (
    <div
      id="wrapper"
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "var(--color-bg-layout)",
      }}
    >
      {/* 側邊欄 (固定 240px) */}
      <Sidebar />

      {/* 右側：頂部導航 + 內容區 */}
      <div
        id="content-wrapper"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* 頂部 Navbar */}
        <Navbar setToken={setToken} />

        {/* 內容主體 (路由顯示區) */}
        <main
          style={{
            flex: 1,
            padding: "24px 32px",
            overflowY: "auto",
            maxWidth: "1200px" /* 設定最大寬度，置中顯示 */,
            margin: "0 auto",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
