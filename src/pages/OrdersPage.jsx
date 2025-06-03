// src/pages/OrdersPage.jsx

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import { fetchCurrentUser } from "../utils/auth";

export default function OrdersPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [expanded, setExpanded] = useState({});

  // 初始化：確認登入並載入訂單與商品
  useEffect(() => {
    async function init() {
      const uid = await fetchCurrentUser();
      if (!uid) return navigate("/login", { replace: true });

      try {
        const [oRes, pRes] = await Promise.all([
          api.get("/orders"),
          api.get("/products"),
        ]);
        setOrders(oRes.data);
        setProducts(pRes.data);
      } catch (err) {
        console.error("初始化失敗：", err);
        alert("載入訂單或商品失敗，請稍後再試");
      }
    }
    init();
  }, [navigate]);

  // 切換展開明細
  const toggleExpand = (orderId) => {
    setExpanded((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  // 刪除訂單
  const handleDelete = async (orderId) => {
    if (!window.confirm(`確定要刪除訂單 #${orderId}？`)) return;
    try {
      await api.delete(`/orders/${orderId}`);
      alert(`訂單 #${orderId} 已刪除`);
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
    } catch (err) {
      console.error("刪除失敗：", err);
      alert("刪除訂單失敗");
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "24px 16px" }}>
      {/* 標題與建立訂單按鈕 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h2 style={{ fontSize: "1.5rem", color: "var(--color-text-main)" }}>
          訂單管理
        </h2>
        <Link to="/orders/new" className="btn btn-primary">
          建立訂單
        </Link>
      </div>

      {orders.length === 0 ? (
        <div
          className="alert alert-info"
          style={{ fontSize: "1rem", textAlign: "center" }}
        >
          目前沒有訂單。
        </div>
      ) : (
        <ul className="list-group">
          {orders.map((o) => (
            <li key={o.id} className="list-group-item mb-3">
              {/* 訂單主要資訊 */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <strong>訂單 #{o.id}</strong> — 狀態：{o.status}
                </div>
                <div>
                  <button
                    className="btn btn-sm btn-outline-secondary me-2"
                    onClick={() => toggleExpand(o.id)}
                  >
                    {expanded[o.id] ? "收合明細" : "顯示明細"}
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(o.id)}
                  >
                    刪除
                  </button>
                </div>
              </div>

              {/* 展開後的商品明細 */}
              {expanded[o.id] && (
                <div
                  style={{
                    marginTop: "16px",
                    padding: "16px",
                    backgroundColor: "#F8F9FA",
                    borderRadius: "6px",
                  }}
                >
                  <h5
                    style={{
                      marginBottom: "12px",
                      color: "var(--color-text-main)",
                    }}
                  >
                    商品明細
                  </h5>

                  <div className="table-responsive">
                    <table className="table table-bordered table-sm mb-3">
                      <thead className="table-light">
                        <tr>
                          <th>商品名稱</th>
                          <th>數量</th>
                          <th>單價</th>
                          <th>小計</th>
                        </tr>
                      </thead>
                      <tbody>
                        {o.items.map((it, idx) => {
                          const prod = products.find(
                            (p) => p.id === it.product_id
                          );
                          const name = prod ? prod.name : "未知";
                          const subtotal = it.quantity * it.price;
                          return (
                            <tr key={idx}>
                              <td>{name}</td>
                              <td>{it.quantity}</td>
                              <td>${it.price}</td>
                              <td>${subtotal}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* 總計 */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      fontWeight: "600",
                      fontSize: "1rem",
                    }}
                  >
                    {(() => {
                      const totalQty = o.items.reduce(
                        (sum, it) => sum + it.quantity,
                        0
                      );
                      const totalAmt = o.items.reduce(
                        (sum, it) => sum + it.quantity * it.price,
                        0
                      );
                      return (
                        <>
                          <div style={{ marginRight: "24px" }}>
                            總數量：{totalQty}
                          </div>
                          <div>總金額：${totalAmt}</div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
