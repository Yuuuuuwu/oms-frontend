// src/pages/CreateOrderPage.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { fetchCurrentUser } from "../utils/auth";

export default function CreateOrderPage() {
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [items, setItems] = useState([
    { product_id: "", quantity: 1, price: 0 },
  ]);
  const [remark, setRemark] = useState("");
  const navigate = useNavigate();

  // 初始化：抓商品清單 + 取得 current user
  useEffect(() => {
    async function init() {
      try {
        const [pu, uid] = await Promise.all([
          api.get("/products"),
          fetchCurrentUser(),
        ]);
        setProducts(pu.data);
        if (!uid) return navigate("/login", { replace: true });
        setUserId(uid);
      } catch (err) {
        console.error("初始化失敗", err);
        alert("初始化時發生錯誤，請稍後再試");
      }
    }
    init();
  }, [navigate]);

  // 更新 items array
  const handleItemChange = (idx, field, val) => {
    setItems((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: val };
      if (field === "product_id") {
        const prod = products.find((p) => p.id === +val);
        copy[idx].price = prod ? prod.price : 0;
      }
      return copy;
    });
  };

  // 新增一行
  const addItem = () =>
    setItems((prev) => [...prev, { product_id: "", quantity: 1, price: 0 }]);

  // 刪除一行
  const removeItem = (idx) =>
    setItems((prev) => prev.filter((_, i) => i !== idx));

  // 提交訂單
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/orders", {
        user_id: userId,
        remark,
        items,
      });
      alert("訂單建立成功！");
      navigate("/orders");
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.description ||
        err.response?.data?.message ||
        err.message;
      alert("建立訂單失敗：\n" + msg);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "24px 16px" }}>
      <h2
        style={{
          fontSize: "1.5rem",
          marginBottom: "24px",
          color: "var(--color-text-main)",
        }}
      >
        建立新訂單
      </h2>

      <form onSubmit={handleSubmit}>
        {items.map((it, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            {/* 商品下拉 */}
            <div style={{ flex: "2 1 200px", minWidth: "160px" }}>
              <select
                className="form-select"
                value={it.product_id}
                onChange={(e) =>
                  handleItemChange(idx, "product_id", e.target.value)
                }
                required
              >
                <option value="">選擇商品</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} （${p.price}）
                  </option>
                ))}
              </select>
            </div>

            {/* 數量 */}
            <div style={{ flex: "1 1 80px", minWidth: "60px" }}>
              <input
                type="number"
                min="1"
                className="form-control"
                value={it.quantity}
                onChange={(e) =>
                  handleItemChange(idx, "quantity", e.target.value)
                }
                required
              />
            </div>

            {/* 單價顯示 */}
            <div
              style={{
                flex: "1 1 100px",
                minWidth: "80px",
                fontSize: "1rem",
                color: "var(--color-text-secondary)",
              }}
            >
              單價：{it.price}
            </div>

            {/* 刪除按鈕 */}
            {items.length > 1 && (
              <div style={{ flex: "0 0 auto" }}>
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => removeItem(idx)}
                >
                  刪除
                </button>
              </div>
            )}
          </div>
        ))}

        {/* 新增商品項目 */}
        <button
          type="button"
          className="btn btn-outline-primary mb-4"
          onClick={addItem}
        >
          新增商品項目
        </button>

        {/* 備註 */}
        <div style={{ marginBottom: "24px" }}>
          <label
            className="form-label"
            style={{ fontSize: "1rem", color: "var(--color-text-main)" }}
          >
            備註：
          </label>
          <textarea
            className="form-control"
            rows={4}
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          />
        </div>

        {/* 提交按鈕 */}
        <button type="submit" className="btn btn-primary">
          提交訂單
        </button>
      </form>
    </div>
  );
}
