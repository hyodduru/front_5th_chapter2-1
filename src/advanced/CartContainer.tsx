import { useState } from 'react';
import CartItemList from './CartItemList';

function CartContainer() {
  const [totalTotalAmount, setTotalTotalAmount] = useState(0);

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
      <h1 className="text-2xl font-bold mb-4">장바구니</h1>
      <CartItemList />
      <div>
        <span className="text-green-500 ml-2">총액: {Math.round(totalTotalAmount)}원</span>
      </div>

      {/* 총액 / 포인트 정보  */}
      {/* CartProductSelector */}
      {/* 품절 메세지  */}
    </div>
  );
}

export default CartContainer;
