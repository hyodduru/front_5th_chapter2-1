import { INITIAL_PRODUCTS } from './data/products';
import { setupEventListeners } from './events/setupEventListeners';
import { setupFlashSale } from './events/setupFlashSale';
import { setupRecommendation } from './events/setupRecommendation';
import { cartState } from './state/cartState';
import { createUIElements } from './ui/createUIElements';
import { renderCartProductSelector } from './ui/renderCartProductSelector';
import { calculateCart } from './utils/cart';

function main() {
  cartState.products = INITIAL_PRODUCTS;
  const root = document.getElementById('app');
  const elements = createUIElements();

  // 상태 연결
  Object.assign(cartState, elements);

  renderCartProductSelector();

  elements.productWrapper.append(
    elements.heading,
    cartState.cartList,
    cartState.cartTotalPrice,
    cartState.cartProductSelector,
    cartState.addToCartButton,
    cartState.stockStatusMessage,
  );
  elements.container.appendChild(elements.productWrapper);
  root.appendChild(elements.container);

  calculateCart();
  setupEventListeners(elements);
  setupFlashSale(cartState.products);
  setupRecommendation(cartState.products);
}

main();
