import { LOW_STOCK_THRESHOLD } from '../constants/index.js';
import { cartState } from '../state/cartState.js';

export function updateStockStatusMessage() {
  const { stockStatusMessage, products } = cartState;
  const infoMessage = products
    .filter((product) => product.quantity < LOW_STOCK_THRESHOLD)
    .map(
      (product) =>
        `${product.name}: ${product.quantity > 0 ? `재고 부족 (${product.quantity}개 남음)` : '품절'}`,
    )
    .join('\n');
  stockStatusMessage.textContent = infoMessage;
}
