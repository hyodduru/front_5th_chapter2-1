import { useState } from 'react';
import { type ProductItemData } from './types';

interface CartProductSelectorProps {
  products: ProductItemData[];
  onAddToCart: (newItem: ProductItemData) => void;
}

export default function CartProductSelector({ products, onAddToCart }: CartProductSelectorProps) {
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || '');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProductId(e.target.value);
  };

  const handleAddClick = () => {
    const product = products.find((p) => p.id === selectedProductId);
    if (product) onAddToCart(product);
  };

  return (
    <>
      <select
        id="product-select"
        className="border rounded p-2 mr-2"
        value={selectedProductId}
        onChange={handleChange}
      >
        {products.map((product) => (
          <option key={product.id} value={product.id} disabled={product.quantity === 0}>
            {`${product.name} - ${product.price}원`}
          </option>
        ))}
      </select>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleAddClick}
        disabled={!selectedProductId}
      >
        추가
      </button>
    </>
  );
}
