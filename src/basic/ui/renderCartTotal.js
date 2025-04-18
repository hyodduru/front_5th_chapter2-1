import { cartState } from '../state/cartState';

export function renderCartTotal(total, discountRate) {
  const { cartTotalPrice } = cartState;
  cartTotalPrice.textContent = `총액: ${Math.round(total)}원`;
  if (discountRate > 0) {
    const span = document.createElement('span');
    span.className = 'text-green-500 ml-2';
    span.textContent = `(${(discountRate * 100).toFixed(1)}% 할인 적용)`;
    cartTotalPrice.appendChild(span);
  }
}
