// 檔案路徑：src/pages/ProfilePage.jsx

import React, { useEffect, useState } from "react";

export default function ProfilePage() {
  // -------------------------------
  // 1. 定義 state：userId、username、email、password（從 localStorage 讀）
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 2. 控制是否進入「編輯模式」
  const [isEditing, setIsEditing] = useState(false);

  // 3. 編輯模式時，暫存輸入值用的 state
  const [tempUsername, setTempUsername] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [tempPassword, setTempPassword] = useState("");

  // 4. useEffect：一開始從 localStorage 讀出 userId、username、email、password
  useEffect(() => {
    // 從 localStorage 讀資料，如果沒有就放預設字串
    const savedUserId = localStorage.getItem("userId") || "無 ID";
    const savedUsername = localStorage.getItem("username") || "使用者";
    const savedEmail = localStorage.getItem("email") || "example@example.com";
    const savedPassword = localStorage.getItem("password") || "";

    // 更新到正式 state
    setUserId(savedUserId);
    setUsername(savedUsername);
    setEmail(savedEmail);
    setPassword(savedPassword);
  }, []);

  // 5. 按「編輯個人檔案」按鈕：同樣把現有的 userId、username、email、password 拷貝到暫存 state，然後進入編輯模式
  const handleEditClick = () => {
    setTempUsername(username);
    setTempEmail(email);
    setTempPassword(password);
    setIsEditing(true);
  };

  // 6. 按「取消」：放棄編輯，回到瀏覽模式
  const handleCancelClick = () => {
    setIsEditing(false);
    // 如果想清空暫存值，可在這裡做：
    // setTempUsername("");
    // setTempEmail("");
    // setTempPassword("");
  };

  // 7. 按「儲存」：先做簡單檢查，再存回 localStorage，更新正式 state，回到瀏覽模式
  const handleSaveClick = () => {
    // 檢查使用者名稱與 email、密碼不能為空
    if (tempUsername.trim() === "") {
      alert("使用者名稱不可為空");
      return;
    }
    if (tempEmail.trim() === "") {
      alert("電子郵件不可為空");
      return;
    }
    // 假設 email 也要做簡單格式檢查
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(tempEmail)) {
      alert("電子郵件格式不正確");
      return;
    }
    if (tempPassword.trim() === "") {
      alert("密碼不可為空");
      return;
    }
    // 如果以上檢查都通過，就把所有新資料存到 localStorage
    localStorage.setItem("userId", userId); // ID 通常不變，這裡只是示範
    localStorage.setItem("username", tempUsername);
    localStorage.setItem("email", tempEmail);
    localStorage.setItem("password", tempPassword);

    // 更新正式 state
    setUsername(tempUsername);
    setEmail(tempEmail);
    setPassword(tempPassword);

    // 結束編輯模式，回到瀏覽模式
    setIsEditing(false);

    alert("個人檔案已更新");
  };
  // -------------------------------

  return (
    <div className="container mt-4">
      {/* 頁面標題 */}
      <h2 className="mb-3">個人檔案</h2>

      <div className="card" style={{ maxWidth: "600px" }}>
        <div className="card-body">
          {/* 大頭照 (FontAwesome 的 user-circle) */}
          <div className="text-center mb-4">
            <i className="fas fa-user-circle fa-5x text-gray-600"></i>
          </div>

          {/* ===== 瀏覽模式 ===== */}
          {!isEditing && (
            <div>
              {/* 顯示 使用者 ID (read-only) */}
              <div className="mb-3">
                <label className="font-weight-bold">使用者 ID：</label>
                <p className="mb-0">{userId}</p>
              </div>

              {/* 顯示 使用者名稱 */}
              <div className="mb-3">
                <label className="font-weight-bold">使用者名稱：</label>
                <p className="mb-0">{username}</p>
              </div>

              {/* 顯示 Email */}
              <div className="mb-3">
                <label className="font-weight-bold">電子郵件：</label>
                <p className="mb-0">{email}</p>
              </div>

              {/* 顯示 密碼 (使用 ● 來遮蔽) */}
              <div className="mb-3">
                <label className="font-weight-bold">密碼：</label>
                <p className="mb-0">{"●".repeat(8)}</p>
                {/* 這裡固定顯示 8 個圓點，如果想顯示與密碼長度相符可以改成 repeat(password.length) */}
              </div>

              {/* 編輯按鈕 */}
              <div className="text-right">
                <button className="btn btn-primary" onClick={handleEditClick}>
                  編輯個人檔案
                </button>
              </div>
            </div>
          )}

          {/* ===== 編輯模式 ===== */}
          {isEditing && (
            <div>
              {/* 顯示 使用者 ID (不允許編輯) */}
              <div className="form-group">
                <label className="font-weight-bold">使用者 ID</label>
                <input
                  type="text"
                  className="form-control"
                  value={userId}
                  readOnly
                  style={{ backgroundColor: "#e9ecef", cursor: "not-allowed" }}
                />
                <small className="form-text text-muted">
                  使用者 ID 不可更改
                </small>
              </div>

              {/* 編輯 使用者名稱 */}
              <div className="form-group">
                <label className="font-weight-bold">使用者名稱</label>
                <input
                  type="text"
                  className="form-control"
                  value={tempUsername}
                  onChange={(e) => setTempUsername(e.target.value)}
                />
              </div>

              {/* 編輯 Email */}
              <div className="form-group">
                <label className="font-weight-bold">電子郵件</label>
                <input
                  type="email"
                  className="form-control"
                  value={tempEmail}
                  onChange={(e) => setTempEmail(e.target.value)}
                />
                <small className="form-text text-muted">
                  請輸入有效的電子郵件地址
                </small>
              </div>

              {/* 編輯 密碼 */}
              <div className="form-group">
                <label className="font-weight-bold">密碼</label>
                <input
                  type="password"
                  className="form-control"
                  value={tempPassword}
                  onChange={(e) => setTempPassword(e.target.value)}
                />
                <small className="form-text text-muted">
                  新密碼需至少 8 個字元
                </small>
              </div>

              {/* 儲存／取消 按鈕 */}
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-secondary mr-2"
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
