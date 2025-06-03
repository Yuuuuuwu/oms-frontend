// src/App.test.tsx

import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders 系統標題", () => {
  render(<App />);
  // 假設你的 App 組件裡面最終會渲染出「訂單管理系統」這段文字
  const linkElement = screen.getByText(/訂單管理系統/i);
  expect(linkElement).toBeInTheDocument();
});
