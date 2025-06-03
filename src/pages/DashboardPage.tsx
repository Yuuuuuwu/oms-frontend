// src/pages/DashboardPage.tsx
import React, { useEffect, useState } from "react";
import "../index.css"; // 全域 CSS

interface KPI {
  label: string;
  value: number;
  color: string;
}

/**
 * 儀表板（DashboardPage）
 */
const DashboardPage: React.FC = () => {
  // 範例 KPI 資料
  const [kpis, setKpis] = useState<KPI[]>([
    { label: "總產品數", value: 0, color: "#007bff" },
    { label: "總訂單數", value: 0, color: "#28a745" },
    { label: "營收 (NT$)", value: 0, color: "#17a2b8" },
    { label: "活躍用戶數", value: 0, color: "#ffc107" },
  ]);

  // 模擬從 API 撈取統計
  useEffect(() => {
    // TODO: 實際改為 API 呼叫
    setKpis([
      { label: "總產品數", value: 25, color: "#007bff" },
      { label: "總訂單數", value: 123, color: "#28a745" },
      { label: "營收 (NT$)", value: 45600, color: "#17a2b8" },
      { label: "活躍用戶數", value: 78, color: "#ffc107" },
    ]);
  }, []);

  return (
    <div>
      {/* KPI 卡片區 */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "2rem",
        }}
      >
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            className="card-custom p-3"
            style={{
              flexGrow: 1,
              minWidth: "200px",
              borderLeft: `4px solid ${kpi.color}`,
            }}
          >
            <div style={{ fontSize: "1.25rem", fontWeight: 600 }}>
              {kpi.label}
            </div>
            <div style={{ marginTop: "0.5rem", fontSize: "1.75rem" }}>
              {kpi.value}
            </div>
          </div>
        ))}
      </div>

      {/* 圖表區（範例 placeholder） */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        {/* 銷售趨勢 */}
        <div
          className="card-custom"
          style={{ flex: "1 1 480px", padding: "1rem" }}
        >
          <div
            style={{
              fontSize: "1.1rem",
              fontWeight: 600,
              marginBottom: "0.5rem",
            }}
          >
            銷售趨勢
          </div>
          <div
            style={{ borderBottom: "1px solid #e9ecef", marginBottom: "1rem" }}
          ></div>
          {/* TODO: 在此放置圖表 (如 Recharts / Chart.js 等) */}
          <div
            style={{
              height: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--color-text-secondary)",
            }}
          >
            圖表區域
          </div>
        </div>

        {/* 訂單來源 */}
        <div
          className="card-custom"
          style={{ flex: "1 1 480px", padding: "1rem" }}
        >
          <div
            style={{
              fontSize: "1.1rem",
              fontWeight: 600,
              marginBottom: "0.5rem",
            }}
          >
            訂單來源
          </div>
          <div
            style={{ borderBottom: "1px solid #e9ecef", marginBottom: "1rem" }}
          ></div>
          {/* TODO: 在此放置圓餅圖或其他圖表 */}
          <div
            style={{
              height: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--color-text-secondary)",
            }}
          >
            圖表區域
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
