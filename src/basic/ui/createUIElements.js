export function createUIElements() {
  const elements = {
    container: document.createElement('div'),
    productWrapper: document.createElement('div'),
    heading: document.createElement('h1'),
    cartList: document.createElement('div'),
    cartTotalPrice: document.createElement('div'),
    cartProductSelector: document.createElement('select'),
    addToCartButton: document.createElement('button'),
    stockStatusMessage: document.createElement('div'),
  };

  elements.cartList.id = 'cart-items';
  elements.cartTotalPrice.id = 'cart-total';
  elements.cartProductSelector.id = 'product-select';
  elements.addToCartButton.id = 'add-to-cart';
  elements.stockStatusMessage.id = 'stock-status';

  elements.container.className = 'bg-gray-100 p-8';
  elements.productWrapper.className =
    'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';
  elements.heading.className = 'text-2xl font-bold mb-4';
  elements.cartTotalPrice.className = 'text-xl font-bold my-4';
  elements.cartProductSelector.className = 'border rounded p-2 mr-2';
  elements.addToCartButton.className = 'bg-blue-500 text-white px-4 py-2 rounded';
  elements.stockStatusMessage.className = 'text-sm text-gray-500 mt-2';

  elements.heading.textContent = '장바구니';
  elements.addToCartButton.textContent = '추가';

  return elements;
}
