import { useState } from 'react';

import CartProductSelector from './CartProductSelector';
import CartItem from './CartItem';

import { calculateFinalDiscount, getStockMessage, calculateCartTotals } from './utils/cart';
import { type CartItemData, type ProductItemData } from './types';

import { BONUS_POINT_UNIT } from './constants';
import { PRODUCTS as INITIAL_PRODUCTS } from './data/product';
import { useFlashSale } from './hooks/useFlashSale';
import { useRecommendation } from './hooks/useRecommendation';

function CartContainer() {
  const [cartItems, setCartItems] = useState<CartItemData[]>([]);
  const [products, setProducts] = useState<ProductItemData[]>(INITIAL_PRODUCTS);
  const [lastSelectedId, setLastSelectedId] = useState<string | null>(null);

  // 계산 관련 로직
  const { subTotal, itemCount, totalAmount } = calculateCartTotals(cartItems);
  const { discountRate, discountedAmount } = calculateFinalDiscount(
    subTotal,
    itemCount,
    totalAmount,
  );
  const bonusPoints = Math.floor(discountedAmount / BONUS_POINT_UNIT);

  // 사이드 이펙트
  useFlashSale(products, setProducts);
  useRecommendation(lastSelectedId, setProducts);

  // 장바구니 관련 핸들러
  const handleCartToAdd = (newItem: ProductItemData) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === newItem.id);

      if (existingItem) {
        // 기존에 있으면 수량만 증가
        return prev.map((item) =>
          item.id === newItem.id
            ? { ...item, count: item.count + 1 } // 수량을 1 증가
            : item,
        );
      } else {
        // 없으면 새 항목 추가
        return [...prev, { ...newItem, count: 1 }];
      }
    });

    // 제품의 수량도 업데이트
    setProducts((prev) =>
      prev.map((p) => (p.id === newItem.id ? { ...p, quantity: p.quantity - 1 } : p)),
    );

    setLastSelectedId(newItem.id);
  };

  const handleCartItemRemove = (id: string) => {
    const removedItem = cartItems.find((item) => item.id === id);
    if (removedItem) {
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, quantity: p.quantity + removedItem.count } : p)),
      );
    }
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCartItemIncrease = (id: string) => {
    const targetProduct = products.find((p) => p.id === id);
    if (!targetProduct) return;

    if (targetProduct.quantity <= 0) {
      alert('재고가 부족합니다.');
      return;
    }

    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, count: item.count + 1 } : item)),
    );
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, quantity: p.quantity - 1 } : p)));
  };

  const handleCartItemDecrease = (id: string) => {
    const target = cartItems.find((item) => item.id === id);
    if (target?.count === 1) {
      handleCartItemRemove(id);
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, count: item.count - 1 } : item)),
      );
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p)),
      );
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
      <h1 className="text-2xl font-bold mb-4">장바구니</h1>
      {cartItems.map((cartItem) => (
        <CartItem
          key={cartItem.id}
          cartItem={cartItem}
          onIncrease={handleCartItemIncrease}
          onDecrease={handleCartItemDecrease}
          onDelete={handleCartItemRemove}
        />
      ))}
      <div className="text-xl font-bold my-4">
        {`총액: ${Math.round(discountedAmount)}원`}
        {discountRate > 0 && (
          <span className="text-green-500 ml-2">
            {`(${(discountRate * 100).toFixed(1)}% 할인 적용)`}
          </span>
        )}
        <span className="text-blue-500 ml-2">{`(포인트: ${bonusPoints})`}</span>
      </div>
      <CartProductSelector products={products} onAddToCart={handleCartToAdd} />
      {products.map((product) => {
        const message = getStockMessage(product);
        return (
          message && (
            <div key={product.id} className="text-sm text-gray-500 mt-2">
              {message}
            </div>
          )
        );
      })}
    </div>
  );
}

export default CartContainer;
