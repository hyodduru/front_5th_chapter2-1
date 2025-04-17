import { type CartItemData, type ProductItemData } from '../types';

export const calculateCartTotalPrice = (items: CartItemData[]) =>
  items.reduce((total, item) => total + item.price * item.count, 0);

export const getStockMessage = (
  product: ProductItemData,
  cartItems: CartItemData[],
): string | null => {
  const inCartCount = cartItems.find((item) => item.id === product.id)?.count ?? 0;
  const remainingQuantity = product.quantity - inCartCount;

  if (remainingQuantity <= 0) return `${product.name}: 품절`;
  if (remainingQuantity < 5) return `${product.name}: 재고 부족 (${remainingQuantity}개 남음)`;
  return null;
};
