import { useEffect } from 'react';
import { type ProductItemData } from '../types';
import { RECOMMENDATION_DISCOUNT, RECOMMENDATION_INTERVAL } from '../constants';

export function useRecommendation(
  lastSelectedId: string | null,
  setProducts: (callback: (prev: ProductItemData[]) => ProductItemData[]) => void,
) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const intervalId = setInterval(() => {
        if (!lastSelectedId) return;

        setProducts((prev) => {
          const available = prev.filter((p) => p.id !== lastSelectedId && p.quantity > 0);
          if (available.length === 0) return prev;

          const randomProduct = available[Math.floor(Math.random() * available.length)];

          const updated = prev.map((p) =>
            p.id === randomProduct.id
              ? {
                  ...p,
                  price: Math.round(p.price * (1 - RECOMMENDATION_DISCOUNT)),
                }
              : p,
          );

          alert(`추천! ${randomProduct.name} 지금 구매하면 5% 할인!`);
          return updated;
        });
      }, RECOMMENDATION_INTERVAL);

      return () => clearInterval(intervalId);
    }, Math.random() * 10000);

    return () => clearTimeout(timeoutId);
  }, [lastSelectedId, setProducts]);
}
