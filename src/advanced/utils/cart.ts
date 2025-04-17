import { type CartItemData, type ProductItemData } from '../types';

import {
  BULK_PURCHASE_THRESHOLD,
  BULK_DISCOUNT_RATE,
  DISCOUNT_DAY_TUESDAY,
  WEEKDAY_DISCOUNT_RATE,
  DISCOUNT_RATES,
} from '../constants';

export const getStockMessage = (product: ProductItemData): string | null => {
  const { quantity, name } = product;

  if (quantity <= 0) return `${name}: 품절`;
  if (quantity < 5) return `${name}: 재고 부족 (${quantity}개 남음)`;
  return null;
};

export function calculateCartTotals(cartItems: CartItemData[]) {
  let subTotal = 0;
  let totalAmount = 0;
  let itemCount = 0;

  cartItems.forEach((item) => {
    const { price, count, id } = item;
    const itemTotal = price * count;
    const productDiscount = count >= 10 ? DISCOUNT_RATES[id] || 0 : 0;

    subTotal += itemTotal;
    totalAmount += itemTotal * (1 - productDiscount);
    itemCount += count;
  });

  return { subTotal, totalAmount, itemCount };
}

export function calculateFinalDiscount(subTotal: number, itemCount: number, totalAmount: number) {
  let discountRate = 0;

  // 대량 구매 할인
  if (itemCount >= BULK_PURCHASE_THRESHOLD) {
    const bulkDiscount = subTotal * BULK_DISCOUNT_RATE;
    const itemLevelDiscount = subTotal - totalAmount;

    if (bulkDiscount > itemLevelDiscount) {
      totalAmount = subTotal * (1 - BULK_DISCOUNT_RATE);
      discountRate = BULK_DISCOUNT_RATE;
    } else {
      discountRate = itemLevelDiscount / subTotal;
    }
  } else {
    discountRate = (subTotal - totalAmount) / subTotal;
  }

  // 화요일 추가 할인
  const isTuesday = new Date().getDay() === DISCOUNT_DAY_TUESDAY;
  if (isTuesday) {
    totalAmount *= 1 - WEEKDAY_DISCOUNT_RATE;
    discountRate = Math.max(discountRate, WEEKDAY_DISCOUNT_RATE);
  }

  const discountedAmount = totalAmount;

  return { discountRate, discountedAmount };
}

export function getProductWithRemainingQuantity(
  products: ProductItemData[],
  cartItems: CartItemData[],
): (ProductItemData & { remainingQuantity: number })[] {
  return products.map((product) => {
    const inCartCount = cartItems.find((item) => item.id === product.id)?.count ?? 0;
    const remainingQuantity = product.quantity - inCartCount;

    return {
      ...product,
      remainingQuantity,
    };
  });
}
