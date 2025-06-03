// src/pages/ProductsPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { Product } from "../types";
import "../index.css"; // 全域 CSS

/**
 * 商品列表頁面（ProductsPage）
 */
const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  // 載入商品列表
  const fetchProducts = async () => {
    try {
      const res = await api.get<Product[]>("/products");
      setProducts(res.data);
    } catch (err) {
      setError("載入商品失敗，請稍後再試。");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 刪除商品
  const handleDelete = async (id: number) => {
    if (!window.confirm("確定要刪除此商品？")) return;
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      setError("刪除商品失敗，請稍後再試。");
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
            <h4 style={{ margin: 0 }}>商品列表</h4>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => navigate("/products/new")}
            >
              新增商品
            </button>
          </div>

          {error && <p className="text-error">{error}</p>}

          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>名稱</th>
                  <th>價格</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {products.map((prod) => (
                  <tr key={prod.id}>
                    <td>{prod.id}</td>
                    <td>{prod.name}</td>
                    <td>${prod.price}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-info me-2"
                        onClick={() => navigate(`/products/${prod.id}/edit`)}
                      >
                        編輯
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(prod.id)}
                      >
                        刪除
                      </button>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan={4} style={{ textAlign: "center" }}>
                      暫無商品資料
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
