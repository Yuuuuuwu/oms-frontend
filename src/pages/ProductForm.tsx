// src/pages/ProductForm.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import { Product } from "../types";
import "../index.css"; // 全域 CSS

/**
 * 新增／編輯商品表單（ProductForm）
 */
const ProductForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  // 載入既有商品資訊（編輯模式）
  useEffect(() => {
    if (isEdit && id) {
      api
        .get<Product>(`/products/${id}`)
        .then((res) => {
          setName(res.data.name);
          setPrice(res.data.price);
        })
        .catch(() => {
          setError("載入商品資料失敗");
        });
    }
  }, [isEdit, id]);

  // 提交表單
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || price < 0) {
      setError("請輸入正確的名稱與價格");
      return;
    }
    try {
      if (isEdit && id) {
        await api.put(`/products/${id}`, { name, price });
      } else {
        await api.post("/products", { name, price });
      }
      navigate("/products");
    } catch {
      setError(isEdit ? "更新商品失敗" : "新增商品失敗");
    }
  };

  return (
    <div>
      <div
        className="card-custom"
        style={{ maxWidth: "600px", margin: "0 auto" }}
      >
        <div className="card-body">
          <h5 className="card-title mb-4">
            {isEdit ? "編輯商品" : "新增商品"}
          </h5>
          {error && <p className="text-error">{error}</p>}
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                名稱：
              </label>
              <input
                id="name"
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                價格：
              </label>
              <input
                id="price"
                type="number"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
              />
            </div>
            <button type="submit" className="btn btn-success">
              {isEdit ? "更新" : "新增"}
            </button>
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => navigate("/products")}
            >
              取消
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
