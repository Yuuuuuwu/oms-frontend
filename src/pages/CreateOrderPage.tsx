// src/pages/CreateOrderPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { Product, OrderItem } from "../types";
import "../index.css"; // 全域 CSS

/**
 * 建立訂單頁面（CreateOrderPage）
 */
const CreateOrderPage: React.FC = () => {
  // 1. 商品列表，用來填充下拉選單
  const [products, setProducts] = useState<Product[]>([]);
  // 2. 下拉選單選中的商品 ID（空字串代表尚未選擇）
  const [selectedId, setSelectedId] = useState<number | "">("");
  // 3. 該商品的數量
  const [quantity, setQuantity] = useState<number>(1);
  // 4. 訂單裡的所有項目
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  // 5. 備註文字
  const [remark, setRemark] = useState<string>("");
  // 6. 錯誤訊息顯示
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  /**
   * 載入 API 上的商品列表
   */
  const fetchProducts = async () => {
    try {
      const res = await api.get<Product[]>("/products");
      setProducts(res.data);
    } catch {
      setError("載入商品列表失敗，請稍後重試。");
    }
  };

  // 元件一開始就載入商品
  useEffect(() => {
    fetchProducts();
  }, []);

  /**
   * 處理「加入商品項目」按鈕
   */
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();

    // 驗證：必須先選擇商品，而且數量要 >= 1
    if (selectedId === "" || quantity < 1) {
      setError("請先選擇商品並輸入正確數量。");
      return;
    }

    // 找到商品物件
    const found = products.find((p) => p.id === Number(selectedId));
    if (!found) {
      setError("所選商品不存在。");
      return;
    }

    // 如果該商品已在清單中，提醒使用者
    const exists = orderItems.find((it) => it.productId === found.id);
    if (exists) {
      setError("該商品已經加入，若要改變數量請先移除此商品再重新加入。");
      return;
    }

    // 新增項目到 orderItems
    setOrderItems([
      ...orderItems,
      {
        productId: found.id,
        name: found.name,
        quantity,
        price: found.price,
      },
    ]);

    // 清空選擇與數量、清除錯誤訊息
    setSelectedId("");
    setQuantity(1);
    setError("");
  };

  /**
   * 處理「移除」按鈕，將該 idx 的項目從 orderItems 移除
   */
  const handleRemoveItem = (idx: number) => {
    const newItems = [...orderItems];
    newItems.splice(idx, 1);
    setOrderItems(newItems);
  };

  /**
   * 提交整張訂單到後端
   */
  const handleSubmitOrder = async () => {
    // 至少要有一筆商品
    if (orderItems.length === 0) {
      setError("請先加入至少一個商品項目。");
      return;
    }

    // 準備後端所需的 payload
    const payload = {
      items: orderItems.map((it) => ({
        productId: it.productId,
        quantity: it.quantity,
        price: it.price,
      })),
      remark,
    };

    try {
      await api.post("/orders", payload);
      // 提交成功後導回訂單列表
      navigate("/orders");
    } catch {
      setError("建立訂單失敗，請稍後再試。");
    }
  };

  return (
    <div>
      <div
        className="card-custom"
        style={{ maxWidth: "800px", margin: "0 auto" }}
      >
        <div className="card-body">
          <h5 className="card-title mb-4">建立新訂單</h5>
          {/* 若有錯誤訊息則顯示 */}
          {error && <p className="text-error">{error}</p>}

          {/* 商品選擇 + 數量輸入 + 加入按鈕 */}
          <form className="row g-3 mb-4" onSubmit={handleAddItem}>
            {/* 選擇商品下拉 */}
            <div className="col-md-6">
              <label htmlFor="product" className="form-label">
                選擇商品：
              </label>
              <select
                id="product"
                className="form-select"
                value={selectedId}
                onChange={(e) =>
                  setSelectedId(e.target.value ? Number(e.target.value) : "")
                }
              >
                <option value="">-- 請選擇 --</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} - ${p.price}
                  </option>
                ))}
              </select>
            </div>

            {/* 數量輸入框 */}
            <div className="col-md-2">
              <label htmlFor="quantity" className="form-label">
                數量：
              </label>
              <input
                id="quantity"
                type="number"
                className="form-control"
                value={quantity}
                min={1}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>

            {/* 加入商品按鈕 */}
            <div className="col-md-4 d-flex align-items-end">
              <button type="submit" className="btn btn-secondary">
                加入商品項目
              </button>
            </div>
          </form>

          {/* 訂單明細表格 */}
          <div className="table-responsive mb-4">
            {orderItems.length === 0 ? (
              <p className="text-center text-muted">尚未加入任何商品。</p>
            ) : (
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>商品</th>
                    <th>數量</th>
                    <th>單價</th>
                    <th>小計</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems.map((it, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{it.name}</td>
                      <td>{it.quantity}</td>
                      <td>${it.price}</td>
                      <td>${it.quantity * it.price}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleRemoveItem(idx)}
                        >
                          移除
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* 備註輸入 + 提交訂單按鈕 */}
          <div className="mb-3">
            <label htmlFor="remark" className="form-label">
              備註：
            </label>
            <textarea
              id="remark"
              className="form-control"
              rows={3}
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmitOrder}
          >
            提交訂單
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateOrderPage;
