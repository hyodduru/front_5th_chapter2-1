import { cartState } from '../state/cartState.js';
import { calculateCart } from '../utils/cart.js';

function handleCartAdd() {
  const { cartProductSelector, products, cartList } = cartState;

  const selectedProductId = cartProductSelector.value;
  const selectedProduct = products.find((p) => p.id === selectedProductId);

  if (selectedProduct && selectedProduct.quantity > 0) {
    const cartItem = document.getElementById(selectedProduct.id);
    if (cartItem) {
      const newQuantity = parseInt(cartItem.querySelector('span').textContent.split('x ')[1]) + 1;
      if (newQuantity <= selectedProduct.quantity) {
        cartItem.querySelector('span').textContent =
          `${selectedProduct.name} - ${selectedProduct.price}원 x ${newQuantity}`;
        selectedProduct.quantity--;
      } else {
        alert('재고가 부족합니다.');
      }
    } else {
      const newCartItem = document.createElement('div');
      newCartItem.id = selectedProduct.id;
      newCartItem.className = 'flex justify-between items-center mb-2';
      newCartItem.innerHTML = `<span>${selectedProduct.name} - ${selectedProduct.price}원 x 1</span>
        <div>
          <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${selectedProduct.id}" data-change="-1">-</button>
          <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${selectedProduct.id}" data-change="1">+</button>
          <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${selectedProduct.id}">삭제</button>
        </div>`;
      cartList.appendChild(newCartItem);
      selectedProduct.quantity--;
    }
    calculateCart();
    cartState.lastSelectedProductId = selectedProductId;
  }
}

function handleCartRemove(cartItem, product) {
  const removedQuantity = parseInt(cartItem.querySelector('span').textContent.split('x ')[1]);
  product.quantity += removedQuantity;
  cartItem.remove();
}

function handleQuantityChange(cartItem, product, quantityDiff) {
  const currentQuantity = parseInt(cartItem.querySelector('span').textContent.split('x ')[1]);
  const newQuantity = currentQuantity + quantityDiff;

  if (newQuantity > 0 && newQuantity <= product.quantity + currentQuantity) {
    cartItem.querySelector('span').textContent =
      cartItem.querySelector('span').textContent.split('x ')[0] + 'x ' + newQuantity;
    product.quantity -= quantityDiff;
  } else if (newQuantity <= 0) {
    handleCartRemove(cartItem, product);
    product.quantity -= quantityDiff;
  } else {
    alert('재고가 부족합니다.');
  }
}

function handleCartClick(event) {
  const target = event.target;
  if (!target.classList.contains('quantity-change') && !target.classList.contains('remove-item')) {
    return;
  }

  const productId = target.dataset.productId;
  const cartItem = document.getElementById(productId);
  const product = cartState.products.find((p) => p.id === productId);
  if (!product || !cartItem) {
    return;
  }

  const quantityDiff = parseInt(target.dataset.change);

  if (target.classList.contains('quantity-change')) {
    handleQuantityChange(cartItem, product, quantityDiff);
  } else if (target.classList.contains('remove-item')) {
    handleCartRemove(cartItem, product);
  }

  calculateCart();
}

export function setupEventListeners() {
  const { addToCartButton, cartList } = cartState;

  addToCartButton.addEventListener('click', handleCartAdd);
  cartList.addEventListener('click', handleCartClick);
}
