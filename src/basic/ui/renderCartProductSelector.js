import { cartState } from '../state/cartState';

export function renderCartProductSelector() {
  const { cartProductSelector, products } = cartState;
  cartProductSelector.innerHTML = '';
  products.forEach((product) => {
    const option = document.createElement('option');
    option.value = product.id;
    option.textContent = `${product.name} - ${product.price}원`;
    if (product.quantity === 0) {
      option.disabled = true;
    }
    cartProductSelector.appendChild(option);
  });
}
