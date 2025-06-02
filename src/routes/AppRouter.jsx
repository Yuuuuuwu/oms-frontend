// src/routes/AppRouter.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProductsPage from "../pages/ProductsPage";
import ProductForm from "../pages/ProductForm";
import OrdersPage from "../pages/OrdersPage";
import CreateOrderPage from "../pages/CreateOrderPage";
import DashboardPage from "../pages/DashboardPage";
import ProfilePage from "../pages/ProfilePage";

export default function AppRouter() {
  // ── 1. 在 AppRouter 裡面宣告 token 與 setToken
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleStorage = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* 根路由：未登入就到 HomePage，有 token 就導到 /products */}
        <Route
          path="/"
          element={token ? <Navigate to="/products" replace /> : <HomePage />}
        />

        {/* 公開頁：Login、Register */}
        <Route
          path="/login"
          element={
            token ? (
              <Navigate to="/products" replace />
            ) : (
              <LoginPage setToken={setToken} />
            )
          }
        />
        <Route
          path="/register"
          element={
            token ? <Navigate to="/products" replace /> : <RegisterPage />
          }
        />

        {/* 需要登入的頁面：整個 AppLayout 會收到 setToken，Navbar 再從 AppLayout 拿 */}
        <Route
          element={
            token ? (
              <AppLayout setToken={setToken} /> // ← 把 setToken 傳進 AppLayout
            ) : (
              <Navigate to="/" replace />
            )
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/new" element={<ProductForm />} />
          <Route path="/products/:id/edit" element={<ProductForm />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/new" element={<CreateOrderPage />} />
          {/* 如果你有 /profile 頁面，也要在這裡加上 */}
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* 其他未知路由都導回 */}
        <Route
          path="*"
          element={
            token ? (
              <Navigate to="/products" replace />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
