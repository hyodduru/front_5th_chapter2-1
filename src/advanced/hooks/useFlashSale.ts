import { useEffect } from 'react';
import { ProductItemData } from '../types';
import { FLASH_SALE_DISCOUNT, FLASH_SALE_INTERVAL } from '../constants';

export function useFlashSale(
  products: ProductItemData[],
  setProducts: React.Dispatch<React.SetStateAction<ProductItemData[]>>,
) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const intervalId = setInterval(() => {
        const availableProducts = products.filter((p) => p.quantity > 0);

        if (availableProducts.length === 0) return;

        const luckyItem = availableProducts[Math.floor(Math.random() * availableProducts.length)];

        if (Math.random() < 0.3) {
          alert(`번개세일! ${luckyItem.name}이(가) 20% 할인 중입니다!`);
          setProducts((prev) =>
            prev.map((p) =>
              p.id === luckyItem.id
                ? { ...p, price: Math.round(p.price * (1 - FLASH_SALE_DISCOUNT)) }
                : p,
            ),
          );
        }
      }, FLASH_SALE_INTERVAL);

      return () => clearInterval(intervalId);
    }, Math.random() * 10000);

    return () => clearTimeout(timeoutId);
  }, [products, setProducts]);
}
