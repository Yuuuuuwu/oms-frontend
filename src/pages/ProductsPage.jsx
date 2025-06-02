/*
  src/pages/ProductsPage.jsx
  ----
  顯示商品列表，包含編輯與刪除功能
*/
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
    }
  };

  useEffect(() => {
    api
      .get("/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("載入商品失敗，顯示空列表", err);
        // 500 時先給空陣列，讓畫面顯示「暫無商品」
        setProducts([]);
      });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("確定要刪除？")) {
      await api.delete(`/products/${id}`);
      fetchProducts();
    }
  };

  return (
    <div className="container-fluid">
      {/* 1. Page Heading */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">商品列表</h1>
        <Link to="/products/new" className="btn btn-primary">
          新增商品
        </Link>
      </div>

      {/* 2. 商品表格 Card */}
      <div className="card shadow mb-4">
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
                {products.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.name}</td>
                    <td>${p.price}</td>
                    <td>
                      <div className="d-flex gap-2">
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
                {products.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center py-3">
                      暫無商品
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
}
