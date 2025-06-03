// src/pages/ProfilePage.jsx

import React, { useEffect, useState } from "react";

export default function ProfilePage() {
  // 定義 state：userId、username、email、password（從 localStorage 讀）
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 編輯模式判斷
  const [isEditing, setIsEditing] = useState(false);

  // 編輯時的暫存
  const [tempUsername, setTempUsername] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [tempPassword, setTempPassword] = useState("");

  // 初始化：從 localStorage 讀
  useEffect(() => {
    const savedUserId = localStorage.getItem("userId") || "無 ID";
    const savedUsername = localStorage.getItem("username") || "使用者";
    const savedEmail = localStorage.getItem("email") || "example@example.com";
    const savedPassword = localStorage.getItem("password") || "";

    setUserId(savedUserId);
    setUsername(savedUsername);
    setEmail(savedEmail);
    setPassword(savedPassword);
  }, []);

  // 按「編輯個人檔案」
  const handleEditClick = () => {
    setTempUsername(username);
    setTempEmail(email);
    setTempPassword(password);
    setIsEditing(true);
  };

  // 按「取消」
  const handleCancelClick = () => {
    setIsEditing(false);
  };

  // 按「儲存」
  const handleSaveClick = () => {
    if (tempUsername.trim() === "") {
      alert("使用者名稱不可為空");
      return;
    }
    if (tempEmail.trim() === "") {
      alert("電子郵件不可為空");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(tempEmail)) {
      alert("電子郵件格式不正確");
      return;
    }
    if (tempPassword.trim() === "") {
      alert("密碼不可為空");
      return;
    }

    localStorage.setItem("userId", userId);
    localStorage.setItem("username", tempUsername);
    localStorage.setItem("email", tempEmail);
    localStorage.setItem("password", tempPassword);

    setUsername(tempUsername);
    setEmail(tempEmail);
    setPassword(tempPassword);
    setIsEditing(false);

    alert("個人檔案已更新");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "24px 16px" }}>
      <h2
        style={{
          fontSize: "1.5rem",
          marginBottom: "24px",
          color: "var(--color-text-main)",
        }}
      >
        個人檔案
      </h2>

      <div className="card" style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
        <div className="card-body">
          {/* 大頭照 (FontAwesome 的 user-circle) */}
          <div className="text-center mb-4">
            <i
              className="fas fa-user-circle fa-5x"
              style={{ color: "#999" }}
            ></i>
          </div>

          {/* 瀏覽模式 */}
          {!isEditing && (
            <div>
              {/* 使用者 ID (read-only) */}
              <div className="mb-3">
                <label
                  style={{ fontWeight: "600", color: "var(--color-text-main)" }}
                >
                  使用者 ID：
                </label>
                <p style={{ margin: 0 }}>{userId}</p>
              </div>

              {/* 使用者名稱 */}
              <div className="mb-3">
                <label
                  style={{ fontWeight: "600", color: "var(--color-text-main)" }}
                >
                  使用者名稱：
                </label>
                <p style={{ margin: 0 }}>{username}</p>
              </div>

              {/* 電子郵件 */}
              <div className="mb-3">
                <label
                  style={{ fontWeight: "600", color: "var(--color-text-main)" }}
                >
                  電子郵件：
                </label>
                <p style={{ margin: 0 }}>{email}</p>
              </div>

              {/* 密碼遮蔽 */}
              <div className="mb-3">
                <label
                  style={{ fontWeight: "600", color: "var(--color-text-main)" }}
                >
                  密碼：
                </label>
                <p style={{ margin: 0 }}>{"●".repeat(8)}</p>
              </div>

              {/* 編輯按鈕 */}
              <div style={{ textAlign: "right" }}>
                <button className="btn btn-primary" onClick={handleEditClick}>
                  編輯個人檔案
                </button>
              </div>
            </div>
          )}

          {/* 編輯模式 */}
          {isEditing && (
            <div>
              {/* 使用者 ID (不可編輯) */}
              <div className="form-group mb-3">
                <label
                  style={{ fontWeight: "600", color: "var(--color-text-main)" }}
                >
                  使用者 ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={userId}
                  readOnly
                  style={{ backgroundColor: "#e9ecef", cursor: "not-allowed" }}
                />
                <small style={{ color: "var(--color-text-secondary)" }}>
                  使用者 ID 不可更改
                </small>
              </div>

              {/* 編輯 使用者名稱 */}
              <div className="form-group mb-3">
                <label
                  style={{ fontWeight: "600", color: "var(--color-text-main)" }}
                >
                  使用者名稱
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={tempUsername}
                  onChange={(e) => setTempUsername(e.target.value)}
                />
              </div>

              {/* 編輯 電子郵件 */}
              <div className="form-group mb-3">
                <label
                  style={{ fontWeight: "600", color: "var(--color-text-main)" }}
                >
                  電子郵件
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={tempEmail}
                  onChange={(e) => setTempEmail(e.target.value)}
                />
                <small style={{ color: "var(--color-text-secondary)" }}>
                  請輸入有效的電子郵件地址
                </small>
              </div>

              {/* 編輯 密碼 */}
              <div className="form-group mb-3">
                <label
                  style={{ fontWeight: "600", color: "var(--color-text-main)" }}
                >
                  密碼
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={tempPassword}
                  onChange={(e) => setTempPassword(e.target.value)}
                />
                <small style={{ color: "var(--color-text-secondary)" }}>
                  新密碼需至少 8 個字元
                </small>
              </div>

              {/* 儲存／取消 按鈕 */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "12px",
                }}
              >
                <button
                  className="btn btn-secondary"
                  onClick={handleCancelClick}
                >
                  取消
                </button>
                <button className="btn btn-success" onClick={handleSaveClick}>
                  儲存
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
