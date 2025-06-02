// src/utils/auth.js
import api from "../api";

/**
 * 嘗試呼叫 /auth/me 拿 userId，
 * 若任何狀況無法拿到，就回傳 null
 */
export async function fetchCurrentUser() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const res = await api.get("/auth/me");
    return res.data.id;
  } catch (err) {
    console.error("fetchCurrentUser 發生錯誤，將清除 token 並回傳 null：", err);
    // 這裡清掉舊的、無效的 token
    localStorage.removeItem("token");
    return null;
  }
}
