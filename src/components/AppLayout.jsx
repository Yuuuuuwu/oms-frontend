// src/components/AppLayout.jsx
import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div id="wrapper">
      {/* 側邊欄永遠顯示 */}
      <Sidebar />

      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          {/* 上方導覽列 */}
          <Navbar />

          {/* 主要內容：左右置中，頂底留白 */}
          <main className="container-xl">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
