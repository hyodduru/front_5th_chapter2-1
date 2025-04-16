import { type CartItemData, type ProductItemData } from '../types';

export const calculateCartTotalPrice = (items: CartItemData[]) =>
  items.reduce((total, item) => total + item.price * item.count, 0);

export const getStockMessage = (product: ProductItemData): string | null => {
  if (product.quantity === 0) return `${product.name}: 품절`;
  if (product.quantity < 5) return `재고 부족 (${product.quantity}개 남음)`;
  return null;
};
