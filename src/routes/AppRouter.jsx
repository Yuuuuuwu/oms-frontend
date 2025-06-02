// src/routes/AppRouter.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProductsPage from "../pages/ProductsPage";
import ProductForm from "../pages/ProductForm";
import OrdersPage from "../pages/OrdersPage";
import CreateOrderPage from "../pages/CreateOrderPage";
import DashboardPage from "../pages/DashboardPage";

export default function AppRouter() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        {/* 公開頁面：登入、註冊 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* 受保護頁面，需先登入才進入
        <Route
          element={token ? <AppLayout /> : <Navigate to="/login" replace />}
        > */}
        {/* 先全部都直接顯示 AppLayout，暫時跳過登入 */}
        <Route element={<AppLayout />}>
          {/* 這裡所有路由都會在 AppLayout 內渲染 */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/new" element={<ProductForm />} />
          <Route path="/products/:id/edit" element={<ProductForm />} />

          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/new" element={<CreateOrderPage />} />

          {/* 根路由導向產品列表 */}
          <Route path="/" element={<Navigate to="/products" replace />} />
        </Route>

        {/* 其他 URL 一律依 token 重導向 */}
        <Route
          path="*"
          element={
            token ? (
              <Navigate to="/products" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
