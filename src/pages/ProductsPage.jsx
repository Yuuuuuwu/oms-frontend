// src/pages/ProductsPage.jsx

import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("抓產品列表失敗：", err);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("確定要刪除？")) {
      try {
        await api.delete(`/products/${id}`);
        fetchProducts();
      } catch (err) {
        console.error("刪除失敗：", err);
        alert("刪除失敗");
      }
    }
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "24px 16px" }}>
      {/* 1. Page Heading */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "24px",
        }}
      >
        <h2 style={{ fontSize: "1.5rem", color: "var(--color-text-main)" }}>
          商品列表
        </h2>
        <Link to="/products/new" className="btn btn-primary">
          新增商品
        </Link>
      </div>

      {/* 2. 商品表格 Card */}
      <div className="card" style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th style={{ width: "10%" }}>ID</th>
                  <th>名稱</th>
                  <th style={{ width: "15%" }}>價格</th>
                  <th style={{ width: "25%" }}>操作</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center py-3">
                      暫無商品
                    </td>
                  </tr>
                )}
                {products.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.name}</td>
                    <td>${p.price}</td>
                    <td>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <Link
                          to={`/products/${p.id}/edit`}
                          className="btn btn-sm btn-outline-secondary"
                        >
                          編輯
                        </Link>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="btn btn-sm btn-outline-danger"
                        >
                          刪除
                        </button>
                      </div>
                    </td>
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
