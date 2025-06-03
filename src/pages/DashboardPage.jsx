// src/pages/DashboardPage.jsx

import { useEffect, useState } from "react";
import api from "../api";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    revenue: 0,
    users: 0,
  });

  useEffect(() => {
    api
      .get("/dashboard/stats")
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.error("載入統計失敗，顯示預設 0", err);
        setStats({
          products: 0,
          orders: 0,
          revenue: 0,
          users: 0,
        });
      });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      {/* ========== 1. 總覽卡片區 ========== */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap" /* 手機小螢幕會自動換行 */,
          gap: "16px" /* 卡片之間間距 */,
          justifyContent: "space-between",
        }}
      >
        {/* 總商品數 */}
        <div
          style={{
            flex: "1 1 240px" /* 最小寬度 240px，最多撐到剩下空間 */,
            maxWidth: "300px",
          }}
        >
          <div
            className="stat-card"
            style={{
              borderLeft: "4px solid var(--color-primary)",
            }}
          >
            <div
              className="stat-icon"
              style={{ fontSize: "1.8rem", color: "var(--color-primary)" }}
            >
              <i className="fas fa-box"></i>
            </div>
            <div className="stat-content" style={{ marginLeft: "12px" }}>
              <div
                style={{
                  fontSize: "0.875rem",
                  color: "var(--color-text-secondary)",
                  textTransform: "uppercase",
                  marginBottom: "4px",
                }}
              >
                總商品數
              </div>
              <h3
                style={{ fontSize: "1.5rem", color: "var(--color-text-main)" }}
              >
                {stats.products}
              </h3>
            </div>
          </div>
        </div>

        {/* 總訂單數 */}
        <div style={{ flex: "1 1 240px", maxWidth: "300px" }}>
          <div
            className="stat-card"
            style={{
              borderLeft: "4px solid var(--color-secondary)",
            }}
          >
            <div
              className="stat-icon"
              style={{ fontSize: "1.8rem", color: "var(--color-secondary)" }}
            >
              <i className="fas fa-shopping-cart"></i>
            </div>
            <div className="stat-content" style={{ marginLeft: "12px" }}>
              <div
                style={{
                  fontSize: "0.875rem",
                  color: "var(--color-text-secondary)",
                  textTransform: "uppercase",
                  marginBottom: "4px",
                }}
              >
                總訂單數
              </div>
              <h3
                style={{ fontSize: "1.5rem", color: "var(--color-text-main)" }}
              >
                {stats.orders}
              </h3>
            </div>
          </div>
        </div>

        {/* 營收 (NT$) */}
        <div style={{ flex: "1 1 240px", maxWidth: "300px" }}>
          <div
            className="stat-card"
            style={{
              borderLeft: "4px solid var(--color-secondary)",
            }}
          >
            <div
              className="stat-icon"
              style={{ fontSize: "1.8rem", color: "var(--color-secondary)" }}
            >
              <i className="fas fa-dollar-sign"></i>
            </div>
            <div className="stat-content" style={{ marginLeft: "12px" }}>
              <div
                style={{
                  fontSize: "0.875rem",
                  color: "var(--color-text-secondary)",
                  textTransform: "uppercase",
                  marginBottom: "4px",
                }}
              >
                營收 (NT$)
              </div>
              <h3
                style={{ fontSize: "1.5rem", color: "var(--color-text-main)" }}
              >
                ${stats.revenue}
              </h3>
            </div>
          </div>
        </div>

        {/* 活躍用戶 */}
        <div style={{ flex: "1 1 240px", maxWidth: "300px" }}>
          <div
            className="stat-card"
            style={{
              borderLeft: "4px solid var(--color-secondary)",
            }}
          >
            <div
              className="stat-icon"
              style={{ fontSize: "1.8rem", color: "var(--color-secondary)" }}
            >
              <i className="fas fa-users"></i>
            </div>
            <div className="stat-content" style={{ marginLeft: "12px" }}>
              <div
                style={{
                  fontSize: "0.875rem",
                  color: "var(--color-text-secondary)",
                  textTransform: "uppercase",
                  marginBottom: "4px",
                }}
              >
                活躍用戶
              </div>
              <h3
                style={{ fontSize: "1.5rem", color: "var(--color-text-main)" }}
              >
                {stats.users}
              </h3>
            </div>
          </div>
        </div>
      </div>
      {/* ========== 1. 總覽卡片區結束 ========== */}

      {/* ========== 2. 圖表區 (左 2/3 右 1/3，手機自動堆疊) ========== */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap" /* 手機小螢幕自動換行 */,
          gap: "16px",
        }}
      >
        {/* 左：銷售趨勢 (約 66% 寬度) */}
        <div style={{ flex: "2 1 480px", minWidth: "280px" }}>
          <div
            className="card"
            style={{ border: "0", boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}
          >
            <div
              className="card-header"
              style={{
                padding: "12px 16px",
                borderBottom: "1px solid var(--color-border)",
                backgroundColor: "var(--color-bg-card)",
              }}
            >
              <h6
                style={{
                  margin: 0,
                  fontSize: "1rem",
                  color: "var(--color-primary)",
                }}
              >
                銷售趨勢
              </h6>
            </div>
            <div className="card-body" style={{ padding: "16px" }}>
              <div
                className="chart-area"
                style={{ position: "relative", height: "300px" }}
              >
                {/* 
                  1. 這裡預留給你用 Chart.js、Recharts 等繪圖 
                  2. 確保在 useEffect 中呼叫 new Chart(...) 或 React component 
                */}
                <canvas
                  id="myAreaChart"
                  style={{ width: "100%", height: "100%" }}
                ></canvas>
              </div>
            </div>
          </div>
        </div>

        {/* 右：訂單來源 (約 33% 寬度) */}
        <div style={{ flex: "1 1 240px", minWidth: "240px" }}>
          <div
            className="card"
            style={{ border: "0", boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}
          >
            <div
              className="card-header"
              style={{
                padding: "12px 16px",
                borderBottom: "1px solid var(--color-border)",
                backgroundColor: "var(--color-bg-card)",
              }}
            >
              <h6
                style={{
                  margin: 0,
                  fontSize: "1rem",
                  color: "var(--color-primary)",
                }}
              >
                訂單來源
              </h6>
            </div>
            <div className="card-body" style={{ padding: "16px" }}>
              <div
                className="chart-pie"
                style={{ position: "relative", height: "260px" }}
              >
                {/* 
                  1. 這裡預留給你用 Chart.js、Recharts 等繪圖 
                */}
                <canvas
                  id="myPieChart"
                  style={{ width: "100%", height: "100%" }}
                ></canvas>
              </div>
              <div
                style={{
                  marginTop: "12px",
                  textAlign: "center",
                  fontSize: "0.85rem",
                  color: "var(--color-text-secondary)",
                }}
              >
                <span style={{ marginRight: "12px" }}>
                  <i className="fas fa-circle text-primary"></i> 直客
                </span>
                <span style={{ marginRight: "12px" }}>
                  <i className="fas fa-circle text-success"></i> 社群
                </span>
                <span>
                  <i className="fas fa-circle text-info"></i> 推薦
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ========== 2. 圖表區結束 ========== */}

      {/* ========== 3. 最新訂單清單 (放在卡片裡面，置中) ========== */}
      <div style={{ maxWidth: "1000px", margin: "0 auto", width: "100%" }}>
        <div
          className="card"
          style={{ border: "0", boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}
        >
          {/* 標題 */}
          <div
            className="card-header"
            style={{
              padding: "12px 16px",
              borderBottom: "1px solid var(--color-border)",
              backgroundColor: "var(--color-bg-card)",
            }}
          >
            <h6
              style={{
                margin: 0,
                fontSize: "1rem",
                color: "var(--color-primary)",
              }}
            >
              最新訂單
            </h6>
          </div>

          {/* 表格內容 */}
          <div className="card-body" style={{ padding: "0" }}>
            <div className="table-responsive">
              <table
                className="table"
                style={{ marginBottom: 0, minWidth: "100%" }}
              >
                <thead style={{ backgroundColor: "#F8F9FC" }}>
                  <tr>
                    <th style={{ padding: "12px" }}>ID</th>
                    <th style={{ padding: "12px" }}>用戶</th>
                    <th style={{ padding: "12px" }}>狀態</th>
                    <th style={{ padding: "12px" }}>金額</th>
                    <th style={{ padding: "12px" }}>時間</th>
                  </tr>
                </thead>
                <tbody>
                  {/* 
                    這裡示範 5 筆範例訂單，實際需串 api 拿資料 
                    可自行取代為動態資料 
                  */}
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr
                      key={i}
                      style={{
                        backgroundColor: i % 2 === 0 ? "#FAFBFC" : "#FFFFFF",
                      }}
                    >
                      <td style={{ padding: "12px" }}>{1000 + i}</td>
                      <td style={{ padding: "12px" }}>user{i}</td>
                      <td style={{ padding: "12px" }}>pending</td>
                      <td style={{ padding: "12px" }}>${i * 100}</td>
                      <td style={{ padding: "12px" }}>2025-05-2{i}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* ========== 3. 最新訂單清單結束 ========== */}
    </div>
  );
}
