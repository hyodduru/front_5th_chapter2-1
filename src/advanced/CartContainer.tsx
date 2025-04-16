import { useState } from 'react';

import CartProductSelector from './CartProductSelector';
import CartItem from './CartItem';

import { type CartItemData, type ProductItemData } from './types';

import { BONUS_POINT_UNIT } from './constants';
import { INITIAL_PRODUCTS } from './data/product';

function CartContainer() {
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState<CartItemData[]>([]);

  const bonusPoints = Math.floor(cartTotalPrice / BONUS_POINT_UNIT);

  const getStockMessage = (product: ProductItemData): string | null => {
    if (product.quantity === 0) return `${product.name}: 품절`;
    if (product.quantity < 5) return `재고 부족 (${product.quantity}개 남음)`;
    return null;
  };

  const handleCartToAdd = (newItem: ProductItemData) => {
    setCartItems((prev) => [...prev, { ...newItem, count: 1 }]);
  };

  const handleCartItemRemove = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCartItemIncrease = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, count: item.count + 1 } : item)),
    );
  };

  const handleCartItemDecrease = (id: string) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, count: item.count - 1 } : item))
        .filter((item) => item.count > 0),
    );
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
      <h1 className="text-2xl font-bold mb-4">장바구니</h1>
      {cartItems.map((cartItem) => (
        <CartItem
          cartItem={cartItem}
          onIncrease={handleCartItemIncrease}
          onDecrease={handleCartItemDecrease}
          onDelete={handleCartItemRemove}
        />
      ))}
      <div className="text-xl font-bold mb-4">
        총액: {Math.round(cartTotalPrice)}원
        <span className="text-blue-500 ml-2">(포인트: {bonusPoints})</span>
      </div>
      <CartProductSelector products={INITIAL_PRODUCTS} onAddToCart={handleCartToAdd} />
      {INITIAL_PRODUCTS.map((product) => {
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
