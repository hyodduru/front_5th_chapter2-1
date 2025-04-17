import { useEffect } from 'react';
import { ProductItemData } from '../types';
import { FLASH_SALE_INTERVAL, FLASH_SALE_DISCOUNT } from '../constants';

export function useFlashSale(products: ProductItemData[]) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        const available = products.filter((p) => p.quantity > 0);
        const luckyItem = available[Math.floor(Math.random() * available.length)];
        if (luckyItem.quantity > 0 && Math.random() < 0.3) {
          luckyItem.price = Math.round(luckyItem.price * (1 - FLASH_SALE_DISCOUNT));
          alert(`번개세일! ${luckyItem.name}이(가) 20% 할인 중입니다!`);
        }
      }, FLASH_SALE_INTERVAL);

      return () => clearInterval(interval);
    }, Math.random() * 10000);

    return () => clearTimeout(timeout);
  }, [products]);
}
