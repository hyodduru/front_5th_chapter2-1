import { cartState } from '../state/cartState';

export function renderProductDropdown() {
  const { productDropdown, products } = cartState;
  productDropdown.innerHTML = '';
  products.forEach((product) => {
    const option = document.createElement('option');
    option.value = product.id;
    option.textContent = `${product.name} - ${product.price}원`;
    if (product.quantity === 0) {
      option.disabled = true;
    }
    productDropdown.appendChild(option);
  });
}
