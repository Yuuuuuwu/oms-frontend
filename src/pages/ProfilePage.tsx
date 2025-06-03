// src/pages/ProfilePage.tsx
import React, { useState, useEffect } from "react";
import { User } from "../types";
import "../index.css"; // 全域 CSS

/**
 * 個人檔案頁面（ProfilePage）
 */
const ProfilePage: React.FC = () => {
  // 從 localStorage 取出 user 物件（如未登入，則空物件）
  const storedUser = JSON.parse(
    localStorage.getItem("user") || "{}"
  ) as Partial<User>;
  // 用 state 管理個人資料
  const [profile, setProfile] = useState<{
    id?: number;
    name: string;
    email: string;
    password: string;
  }>({
    id: storedUser.id,
    name: storedUser.name || "",
    email: storedUser.email || "",
    password: "password", // 實際應從 API 載入，但此處示範使用 placeholder
  });

  // 如果後端可以提供即時更新，這邊可以加上 useEffect 呼叫 API
  useEffect(() => {
    // TODO: 如需真正從後端獲取資料，請在此呼叫 API
  }, []);

  return (
    <div>
      <div
        className="card-custom"
        style={{ maxWidth: "360px", margin: "0 auto" }}
      >
        <div className="card-body text-center">
          {/* 使用者頭像 */}
          <img
            src="https://via.placeholder.com/64"
            alt="avatar"
            style={{ width: "64px", height: "64px", borderRadius: "50%" }}
          />
          {/* 使用者名稱 */}
          <h5 style={{ marginTop: "1rem", marginBottom: "1rem" }}>
            {profile.name}
          </h5>

          {/* ID */}
          <p style={{ marginBottom: "0.5rem" }}>
            <strong>使用者 ID：</strong>
            {profile.id ?? "無 ID"}
          </p>
          {/* 名稱 */}
          <p style={{ marginBottom: "0.5rem" }}>
            <strong>使用者名稱：</strong>
            {profile.name}
          </p>
          {/* 電子郵件 */}
          <p style={{ marginBottom: "0.5rem" }}>
            <strong>電子郵件：</strong>
            {profile.email}
          </p>
          {/* 密碼（以「••••••••」顯示） */}
          <p style={{ marginBottom: "1rem" }}>
            <strong>密碼：</strong>
            ••••••••
          </p>

          {/* 編輯按鈕（可導向編輯頁，或開啟 Modal 編輯等） */}
          <button className="btn btn-outline-primary">編輯個人檔案</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
