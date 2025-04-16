import { useState } from 'react';

import CartProductSelector from './CartProductSelector';
import CartItem from './CartItem';

import { calculateCartTotalPrice, getStockMessage } from './utils/cart';
import { type CartItemData, type ProductItemData } from './types';

import { BONUS_POINT_UNIT } from './constants';
import { PRODUCTS } from './data/product';

function CartContainer() {
  const [cartItems, setCartItems] = useState<CartItemData[]>([]);

  const cartTotalPrice = calculateCartTotalPrice(cartItems);
  const bonusPoints = Math.floor(cartTotalPrice / BONUS_POINT_UNIT);

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
        {`총액: ${Math.round(cartTotalPrice)}원`}
        <span className="text-blue-500 ml-2">{`(포인트: ${bonusPoints})`}</span>
      </div>
      <CartProductSelector products={PRODUCTS} onAddToCart={handleCartToAdd} />
      {PRODUCTS.map((product) => {
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
