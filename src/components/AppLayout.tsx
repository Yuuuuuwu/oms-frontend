// src/components/AppLayout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "../index.css"; // 全域 CSS

/**
 * App 的主框架元件，包含 Sidebar、Navbar，以及動態內容 Outlet
 */
const AppLayout: React.FC = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Navbar />
        <main
          style={{
            padding: "2rem",
            backgroundColor: "var(--color-bg-layout)",
            flexGrow: 1,
            maxWidth: "1200px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
