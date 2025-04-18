import { FLASH_SALE_INTERVAL, FLASH_SALE_DISCOUNT } from '../constants/index.js';
import { renderCartProductSelector } from '../ui/renderCartProductSelector.js';

export function setupFlashSale(products) {
  setTimeout(() => {
    setInterval(() => {
      const luckyItem = products[Math.floor(Math.random() * products.length)];
      if (Math.random() < 0.3 && luckyItem.quantity > 0) {
        luckyItem.price = Math.round(luckyItem.price * (1 - FLASH_SALE_DISCOUNT));
        alert(`번개세일! ${luckyItem.name}이(가) 20% 할인 중입니다!`);
        renderCartProductSelector();
      }
    }, FLASH_SALE_INTERVAL);
  }, Math.random() * 10000);
}
