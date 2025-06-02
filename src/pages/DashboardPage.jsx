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
          totalProducts: 0,
          totalOrders: 0,
          revenue: 0,
          activeUsers: 0,
        });
      });
  }, []);

  return (
    // 這個 container-fluid 已經在 AppLayout.jsx 的 #content-wrapper > #content 下
    <div className="container-fluid">
      {/* Page Heading */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">儀表板</h1>
      </div>

      {/* 1. 統計卡片 */}
      <div className="row mb-4">
        {/* 總商品數 */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                總商品數
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                {stats.products}
              </div>
            </div>
          </div>
        </div>
        {/* 總訂單數 */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                總訂單數
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                {stats.orders}
              </div>
            </div>
          </div>
        </div>
        {/* 營收 */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                營收 (NT$)
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                ${stats.revenue}
              </div>
            </div>
          </div>
        </div>
        {/* 活躍用戶 */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                活躍用戶
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                {stats.users}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 圖表區 */}
      <div className="row mb-4">
        {/* 銷售趨勢 Area Chart */}
        <div className="col-xl-8 col-lg-7 mb-4">
          <div className="card shadow h-100">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">銷售趨勢</h6>
            </div>
            <div className="card-body">
              <div className="chart-area">
                <canvas id="myAreaChart"></canvas>
              </div>
            </div>
          </div>
        </div>
        {/* 訂單來源 Pie Chart */}
        <div className="col-xl-4 col-lg-5 mb-4">
          <div className="card shadow h-100">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">訂單來源</h6>
            </div>
            <div className="card-body">
              <div className="chart-pie pt-4 pb-2">
                <canvas id="myPieChart"></canvas>
              </div>
              <div className="mt-4 text-center small">
                <span className="mr-2">
                  <i className="fas fa-circle text-primary"></i> 直客
                </span>
                <span className="mr-2">
                  <i className="fas fa-circle text-success"></i> 社群
                </span>
                <span className="mr-2">
                  <i className="fas fa-circle text-info"></i> 推薦
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 最新訂單清單 */}
      <div className="card shadow mb-4">
        {/* 清單標題 */}
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">最新訂單</h6>
        </div>
        {/* 清單內容 */}
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped mb-0">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>用戶</th>
                  <th>狀態</th>
                  <th>金額</th>
                  <th>時間</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i}>
                    <td>{1000 + i}</td>
                    <td>user{i}</td>
                    <td>pending</td>
                    <td>${i * 100}</td>
                    <td>2025-05-2{i}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
