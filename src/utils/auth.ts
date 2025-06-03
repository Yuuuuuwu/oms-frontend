// src/utils/auth.ts
import api from "../api";

/**
 * 嘗試呼叫 /auth/me 拿 userId，
 * 若任何狀況無法拿到，就回傳 null
 *
 * @returns Promise<number | null> - 成功回傳 userId（數字），失敗或無 token 則回傳 null
 */
export async function fetchCurrentUser(): Promise<number | null> {
  // 從 localStorage 拿 token
  const token = localStorage.getItem("token");
  if (!token) {
    // 如果沒有 token，就直接回傳 null
    return null;
  }

  try {
    // 呼叫後端 /auth/me 端點，預期回傳 { id: number, ... }
    const res = await api.get<{ id: number }>("/auth/me");
    // 回傳後端回來的 id
    return res.data.id;
  } catch (err) {
    console.error("fetchCurrentUser 發生錯誤，將清除 token 並回傳 null：", err);
    // 若請求失敗或 token 已失效，清除 localStorage 內的 token
    localStorage.removeItem("token");
    return null;
  }
}
