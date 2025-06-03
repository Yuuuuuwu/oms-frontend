// src/App.tsx
import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProductsPage from "./pages/ProductsPage";
import ProductForm from "./pages/ProductForm";
import OrdersPage from "./pages/OrdersPage";
import CreateOrderPage from "./pages/CreateOrderPage";
import ProfilePage from "./pages/ProfilePage";
import AppLayout from "./components/AppLayout";
import { useEffect } from "react";

/**
 * 動態變更頁面標題的 Hook
 */
const usePageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    let title = "訂單管理系統";
    switch (location.pathname) {
      case "/":
        title = "首頁 - 訂單管理系統";
        break;
      case "/register":
        title = "註冊 - 訂單管理系統";
        break;
      case "/login":
        title = "登入 - 訂單管理系統";
        break;
      case "/dashboard":
        title = "儀表板 - 訂單管理系統";
        break;
      case "/products":
        title = "商品列表 - 訂單管理系統";
        break;
      case "/products/new":
        title = "新增商品 - 訂單管理系統";
        break;
      case location.pathname.match(/^\/products\/\d+\/edit$/)?.[0]:
        title = "編輯商品 - 訂單管理系統";
        break;
      case "/orders":
        title = "訂單管理 - 訂單管理系統";
        break;
      case "/orders/new":
        title = "建立訂單 - 訂單管理系統";
        break;
      case "/profile":
        title = "個人檔案 - 訂單管理系統";
        break;
      default:
        break;
    }
    document.title = title;
  }, [location]);
};

const App: React.FC = () => {
  usePageTitle();
  const token = localStorage.getItem("token");

  return (
    <Routes>
      {/* 首頁 */}
      <Route path="/" element={<HomePage />} />

      {/* 註冊、登入，若已登入則導向儀表板 */}
      <Route
        path="/register"
        element={token ? <Navigate to="/dashboard" /> : <RegisterPage />}
      />
      <Route
        path="/login"
        element={token ? <Navigate to="/dashboard" /> : <LoginPage />}
      />

      {/* 需要登入才能存取的區域，包在 AppLayout 底下 */}
      <Route element={<AppLayout />}>
        <Route
          path="/dashboard"
          element={token ? <DashboardPage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/products"
          element={token ? <ProductsPage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/products/new"
          element={token ? <ProductForm /> : <Navigate to="/" replace />}
        />
        <Route
          path="/products/:id/edit"
          element={token ? <ProductForm /> : <Navigate to="/" replace />}
        />
        <Route
          path="/orders"
          element={token ? <OrdersPage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/orders/new"
          element={token ? <CreateOrderPage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/profile"
          element={token ? <ProfilePage /> : <Navigate to="/" replace />}
        />
      </Route>

      {/* 其他路由：若已登入導向儀表板，否則導向首頁 */}
      <Route
        path="*"
        element={
          token ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
    </Routes>
  );
};

export default App;
