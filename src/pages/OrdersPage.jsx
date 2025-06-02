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

  // 1️⃣ 初始化：確認登入並載入訂單與商品
  useEffect(() => {
    async function init() {
      const uid = await fetchCurrentUser();
      if (!uid) return navigate("/login", { replace: true });

      try {
        // 並行拿訂單與商品
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

  // 2️⃣ 切換展開明細
  const toggleExpand = (orderId) => {
    setExpanded((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  // 3️⃣ 刪除訂單
  const handleDelete = async (orderId) => {
    if (!window.confirm(`確定要刪除訂單 #${orderId}？`)) return;
    try {
      await api.delete(`/orders/${orderId}`);
      alert(`訂單 #${orderId} 已刪除`);
      // 重新載入
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
    } catch (err) {
      console.error("刪除失敗：", err);
      alert("刪除訂單失敗");
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: 900 }}>
      {/* 標題與建立訂單按鈕 */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>訂單管理</h2>
        <Link to="/orders/new" className="btn btn-primary">
          建立訂單
        </Link>
      </div>

      {/* 如果沒有訂單，顯示提示 */}
      {orders.length === 0 ? (
        <div className="alert alert-info">目前沒有訂單。</div>
      ) : (
        <ul className="list-group">
          {orders.map((o) => (
            <li key={o.id} className="list-group-item">
              {/* 訂單主要資訊 */}
              <div className="d-flex justify-content-between align-items-center">
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
                <div className="mt-3 p-3 bg-light rounded">
                  <h5 className="mb-3">商品明細</h5>

                  <table className="table table-bordered table-sm">
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

                  {/* 總計 */}
                  <div className="d-flex justify-content-end fw-bold">
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
                          <div className="me-4">總數量：{totalQty}</div>
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
