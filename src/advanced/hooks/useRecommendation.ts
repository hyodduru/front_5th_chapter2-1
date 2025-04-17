import { useEffect } from 'react';
import { type ProductItemData } from '../types';
import { RECOMMENDATION_INTERVAL, RECOMMENDATION_DISCOUNT } from '../constants';

export function useRecommendation(
  products: ProductItemData[],
  lastSelectedProductId: string | null,
  setProducts: (callback: (prev: ProductItemData[]) => ProductItemData[]) => void,
) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (!lastSelectedProductId) return;

        const suggestion = products.find((p) => p.id !== lastSelectedProductId && p.quantity > 0);

        if (suggestion) {
          setProducts((prev) =>
            prev.map((p) =>
              p.id === suggestion.id
                ? { ...p, price: Math.round(p.price * (1 - RECOMMENDATION_DISCOUNT)) }
                : p,
            ),
          );
          alert(`${suggestion.name}은(는) 어떠세요? 지금 구매하시면 추가 할인!`);
        }
      }, RECOMMENDATION_INTERVAL);

      return () => clearInterval(interval);
    }, Math.random() * 20000);

    return () => clearTimeout(timeout);
  }, [products, lastSelectedProductId, setProducts]);
}
