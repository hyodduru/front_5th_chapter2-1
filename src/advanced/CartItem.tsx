import { type CartItemData } from './types';

interface CartItemProps {
  cartItem: CartItemData;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onDelete: (id: string) => void;
}

function CartItem({ cartItem, onIncrease, onDecrease, onDelete }: CartItemProps) {
  const { id, name, price } = cartItem;

  return (
    <div className="flex justify-between items-center mb-2">
      <span>{`${name} - ${price}원 x ${cartItem.count}`}</span>
      <div>
        <button
          className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
          data-product-id="${selectedProduct.id}"
          data-change="-1"
          onClick={() => onDecrease(id)}
        >
          -
        </button>
        <button
          className="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1"
          data-product-id="${selectedProduct.id}"
          data-change="1"
          onClick={() => onIncrease(id)}
        >
          +
        </button>
        <button
          className="remove-item bg-red-500 text-white px-2 py-1 rounded"
          data-product-id="${selectedProduct.id}"
          onClick={() => onDelete(id)}
        >
          삭제
        </button>
      </div>
    </div>
  );
}

export default CartItem;
