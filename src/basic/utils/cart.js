import {
  DISCOUNT_RATES,
  BULK_PURCHASE_THRESHOLD,
  BULK_DISCOUNT_RATE,
  DISCOUNT_DAY_TUESDAY,
  WEEKDAY_DISCOUNT_RATE,
} from '../constants/index.js';
import { cartState } from '../state/cartState.js';
import { renderBonusPoints } from '../ui/renderBonusPoints.js';
import { renderCartTotal } from '../ui/renderCartTotal.js';
import { updateStockStatusMessage } from '../ui/updateStockMessage.js';

export function calculateCartTotals(cartItems) {
  let itemCount = 0,
    totalAmount = 0,
    subTotal = 0;

  [...cartItems].forEach((cartItem) => {
    const quantity = parseInt(cartItem.querySelector('span').textContent.split('x ')[1]);
    const product = cartState.products.find((p) => p.id === cartItem.id);
    if (!product) {
      return;
    }

    const itemTotal = product.price * quantity;
    const discount = quantity >= 10 ? DISCOUNT_RATES[product.id] || 0 : 0;

    itemCount += quantity;
    subTotal += itemTotal;
    totalAmount += itemTotal * (1 - discount);
  });

  return { subTotal, itemCount, totalAmount };
}

export function getFinalDiscountRate(subTotal, totalAmount, itemCount) {
  let discountRate = 0;

  if (itemCount >= BULK_PURCHASE_THRESHOLD) {
    const bulkDiscount = subTotal * BULK_DISCOUNT_RATE;
    const itemDiscount = subTotal - totalAmount;
    if (bulkDiscount > itemDiscount) {
      totalAmount = subTotal * (1 - BULK_DISCOUNT_RATE);
      discountRate = BULK_DISCOUNT_RATE;
    } else {
      discountRate = itemDiscount / subTotal;
    }
  } else {
    discountRate = (subTotal - totalAmount) / subTotal;
  }

  if (new Date().getDay() === DISCOUNT_DAY_TUESDAY) {
    totalAmount *= 1 - WEEKDAY_DISCOUNT_RATE;
    discountRate = Math.max(discountRate, WEEKDAY_DISCOUNT_RATE);
  }

  cartState.totalAmount = totalAmount;
  return discountRate;
}

export function calculateCart() {
  const cartItems = cartState.cartList.children;
  const { subTotal, itemCount, totalAmount } = calculateCartTotals(cartItems);

  cartState.itemCount = itemCount;
  cartState.totalAmount = totalAmount;

  const discountRate = getFinalDiscountRate(subTotal, totalAmount, itemCount);

  renderCartTotal(cartState.totalAmount, discountRate);
  updateStockStatusMessage();
  renderBonusPoints();
}
