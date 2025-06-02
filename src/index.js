// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";

// --- 全域樣式 ---
// 1. Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// 4. 你自己寫的全域 CSS（如果有）
import "./index.css";
// --- 全域互動腳本 ---
// Bootstrap Bundle（含 Popper.js）
import "bootstrap/dist/js/bootstrap.bundle.min";

// Chart.js（如果你在 DashboardPage 裡有 new Chart(...)）
import { Chart, registerables } from "chart.js";

// --- React 啟動 ---
import AppRouter from "./routes/AppRouter";
import reportWebVitals from "./reportWebVitals";

Chart.register(...registerables);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);

reportWebVitals();
