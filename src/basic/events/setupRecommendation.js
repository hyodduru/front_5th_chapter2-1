import { RECOMMENDATION_INTERVAL, RECOMMENDATION_DISCOUNT } from '../constants/index.js';
import { cartState } from '../state/cartState.js';
import { renderCartProductSelector } from '../ui/renderCartProductSelector.js';

export function setupRecommendation(products) {
  setTimeout(() => {
    setInterval(() => {
      if (cartState.lastSelectedProductId) {
        const suggest = products.find(
          (p) => p.id !== cartState.lastSelectedProductId && p.quantity > 0,
        );
        if (suggest) {
          alert(`${suggest.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);
          suggest.price = Math.round(suggest.price * (1 - RECOMMENDATION_DISCOUNT));
          renderCartProductSelector();
        }
      }
    }, RECOMMENDATION_INTERVAL);
  }, Math.random() * 20000);
}
