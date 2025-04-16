import { type Product } from './data/product';

interface CartProductSelectorProps {
  products: Product[];
}

function CartProductSelector({ products }: CartProductSelectorProps) {
  const handleCartToAdd = () => {};

  return (
    <>
      <select className="border rounded p-2 mr-2">
        {products.map((product) => (
          <option id={product.id} disabled={product.quantity === 0}>
            {`${product.name} - ${product.price}`}원
          </option>
        ))}
      </select>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">추가</button>
    </>
  );
}

export default CartProductSelector;
