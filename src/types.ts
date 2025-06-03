// src/types.ts

/**
 * 商品介面
 */
export interface Product {
  id: number;
  name: string;
  price: number;
}

/**
 * 訂單項目介面
 */
export interface OrderItem {
  productId: number;
  name: string;
  quantity: number;
  price: number;
}

/**
 * 訂單介面
 */
export interface Order {
  id: number;
  user: string;
  status: string;
  sum: number;
  createdAt: string;
  items: OrderItem[];
}

/**
 * 使用者介面
 */
export interface User {
  id: number;
  name: string;
  email: string;
}
