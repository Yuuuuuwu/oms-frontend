// src/pages/OrdersPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { Order } from "../types";
import "../index.css"; // 全域 CSS

/**
 * 訂單管理頁面（OrdersPage）
 */
const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  // 載入訂單列表
  const fetchOrders = async () => {
    try {
      const res = await api.get<Order[]>("/orders");
      setOrders(res.data);
    } catch {
      setError("載入訂單失敗，請稍後再試。");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 刪除訂單
  const handleDelete = async (id: number) => {
    if (!window.confirm("確定要刪除此訂單？")) return;
    try {
      await api.delete(`/orders/${id}`);
      fetchOrders();
    } catch {
      setError("刪除訂單失敗，請稍後再試。");
    }
  };

  return (
    <div>
      <div className="card-custom">
        <div className="card-body">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <h4 style={{ margin: 0 }}>訂單管理</h4>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => navigate("/orders/new")}
            >
              建立訂單
            </button>
          </div>

          {error && <p className="text-error">{error}</p>}

          {orders.length === 0 ? (
            <p className="text-center text-muted">目前沒有訂單。</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>用戶</th>
                    <th>狀態</th>
                    <th>金額</th>
                    <th>時間</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((ord) => (
                    <tr key={ord.id}>
                      <td>{ord.id}</td>
                      <td>{ord.user}</td>
                      <td>{ord.status}</td>
                      <td>${ord.sum}</td>
                      <td>{ord.createdAt}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-info me-2"
                          onClick={() => navigate(`/orders/${ord.id}`)}
                        >
                          查看
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(ord.id)}
                        >
                          刪除
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
