let products, productDropdown, addToCartButton, cartList, cartTotalPrice, stockStatusMessage;
let lastSelectedProductId,
  bonusPoints = 0,
  totalAmount = 0,
  itemCount = 0;

function renderProductDropdown() {
  productDropdown.innerHTML = '';
  products.forEach(function (product) {
    const option = document.createElement('option');
    option.value = product.id;
    option.textContent = product.name + ' - ' + product.price + '원';
    if (product.quantity === 0) {
      option.disabled = true;
    }
    productDropdown.appendChild(option);
  });
}

function renderBonusPoints() {
  bonusPoints = Math.floor(totalAmount / 1000);
  let pointsTag = document.getElementById('loyalty-points');

  if (!pointsTag) {
    pointsTag = document.createElement('span');
    pointsTag.id = 'loyalty-points';
    pointsTag.className = 'text-blue-500 ml-2';
    cartTotalPrice.appendChild(pointsTag);
  }

  pointsTag.textContent = '(포인트: ' + bonusPoints + ')';
}

function updateStockStatusMessage() {
  let infoMessage = '';

  products.forEach(function (product) {
    if (product.quantity < 5) {
      infoMessage +=
        product.name +
        ': ' +
        (product.quantity > 0 ? '재고 부족 (' + product.quantity + '개 남음)' : '품절') +
        '\n';
    }
  });

  stockStatusMessage.textContent = infoMessage;
}

function calculateCart() {
  totalAmount = 0;
  itemCount = 0;

  const cartItems = cartList.children;
  let subTotal = 0;

  for (let i = 0; i < cartItems.length; i++) {
    (function () {
      let currentProduct;
      for (let j = 0; j < products.length; j++) {
        if (products[j].id === cartItems[i].id) {
          currentProduct = products[j];
          break;
        }
      }
      const quantity = parseInt(cartItems[i].querySelector('span').textContent.split('x ')[1]);
      const itemTotal = currentProduct.price * quantity;
      let discount = 0;
      itemCount += quantity;
      subTotal += itemTotal;
      if (quantity >= 10) {
        const discountRates = {
          p1: 0.1,
          p2: 0.15,
          p3: 0.2,
          p4: 0.05,
          p5: 0.25,
        };
        discount = discountRates[currentProduct.id] || 0;
      }
      totalAmount += itemTotal * (1 - discount);
    })();
  }

  let discountRate = 0;

  if (itemCount >= 30) {
    const bulkDiscount = totalAmount * 0.25;
    const itemDiscount = subTotal - totalAmount;
    if (bulkDiscount > itemDiscount) {
      totalAmount = subTotal * (1 - 0.25);
      discountRate = 0.25;
    } else {
      discountRate = (subTotal - totalAmount) / subTotal;
    }
  } else {
    discountRate = (subTotal - totalAmount) / subTotal;
  }

  if (new Date().getDay() === 2) {
    totalAmount *= 1 - 0.1;
    discountRate = Math.max(discountRate, 0.1);
  }
  cartTotalPrice.textContent = '총액: ' + Math.round(totalAmount) + '원';

  if (discountRate > 0) {
    const span = document.createElement('span');
    span.className = 'text-green-500 ml-2';
    span.textContent = '(' + (discountRate * 100).toFixed(1) + '% 할인 적용)';
    cartTotalPrice.appendChild(span);
  }

  updateStockStatusMessage();
  renderBonusPoints();
}

function main() {
  products = [
    { id: 'p1', name: '상품1', price: 10000, quantity: 50 },
    { id: 'p2', name: '상품2', price: 20000, quantity: 30 },
    { id: 'p3', name: '상품3', price: 30000, quantity: 20 },
    { id: 'p4', name: '상품4', price: 15000, quantity: 0 },
    { id: 'p5', name: '상품5', price: 25000, quantity: 10 },
  ];

  const root = document.getElementById('app');
  const container = document.createElement('div');
  const productWrapper = document.createElement('div');
  const heading = document.createElement('h1');

  cartList = document.createElement('div');
  cartTotalPrice = document.createElement('div');
  productDropdown = document.createElement('select');
  addToCartButton = document.createElement('button');
  stockStatusMessage = document.createElement('div');

  cartList.id = 'cart-items';
  cartTotalPrice.id = 'cart-total';
  productDropdown.id = 'product-select';
  addToCartButton.id = 'add-to-cart';
  stockStatusMessage.id = 'stock-status';

  container.className = 'bg-gray-100 p-8';
  productWrapper.className =
    'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';
  heading.className = 'text-2xl font-bold mb-4';
  cartTotalPrice.className = 'text-xl font-bold my-4';
  productDropdown.className = 'border rounded p-2 mr-2';
  addToCartButton.className = 'bg-blue-500 text-white px-4 py-2 rounded';
  stockStatusMessage.className = 'text-sm text-gray-500 mt-2';

  heading.textContent = '장바구니';
  addToCartButton.textContent = '추가';

  renderProductDropdown();

  productWrapper.appendChild(heading);
  productWrapper.appendChild(cartList);
  productWrapper.appendChild(cartTotalPrice);
  productWrapper.appendChild(productDropdown);
  productWrapper.appendChild(addToCartButton);
  productWrapper.appendChild(stockStatusMessage);
  container.appendChild(productWrapper);
  root.appendChild(container);
  calculateCart();

  addToCartButton.addEventListener('click', function () {
    const selectedProductId = productDropdown.value;
    const selectedProduct = products.find((product) => product.id === selectedProductId);

    if (selectedProduct && selectedProduct.quantity > 0) {
      const cartItem = document.getElementById(selectedProduct.id);
      if (cartItem) {
        const newQuantity = parseInt(cartItem.querySelector('span').textContent.split('x ')[1]) + 1;
        if (newQuantity <= selectedProduct.quantity) {
          cartItem.querySelector('span').textContent =
            selectedProduct.name + ' - ' + selectedProduct.price + '원 x ' + newQuantity;
          selectedProduct.quantity--;
        } else {
          alert('재고가 부족합니다.');
        }
      } else {
        const newCartItem = document.createElement('div');
        newCartItem.id = selectedProduct.id;
        newCartItem.className = 'flex justify-between items-center mb-2';
        newCartItem.innerHTML =
          '<span>' +
          selectedProduct.name +
          ' - ' +
          selectedProduct.price +
          '원 x 1</span><div>' +
          '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
          selectedProduct.id +
          '" data-change="-1">-</button>' +
          '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
          selectedProduct.id +
          '" data-change="1">+</button>' +
          '<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="' +
          selectedProduct.id +
          '">삭제</button></div>';
        cartList.appendChild(newCartItem);
        selectedProduct.quantity--;
      }
      calculateCart();
      lastSelectedProductId = selectedProductId;
    }
  });

  cartList.addEventListener('click', function (event) {
    const target = event.target;
    if (target.classList.contains('quantity-change') || target.classList.contains('remove-item')) {
      const productId = target.dataset.productId;
      const cartItem = document.getElementById(productId);
      const product = products.find((product) => product.id === productId);
      if (!cartItem || !product) {
        return;
      }

      if (target.classList.contains('quantity-change')) {
        const quantityDiff = parseInt(target.dataset.change);
        const currentQuantity = parseInt(cartItem.querySelector('span').textContent.split('x ')[1]);
        const newQuantity = currentQuantity + quantityDiff;

        if (newQuantity > 0 && newQuantity <= product.quantity + currentQuantity) {
          cartItem.querySelector('span').textContent =
            cartItem.querySelector('span').textContent.split('x ')[0] + 'x ' + newQuantity;
          product.quantity -= quantityDiff;
        } else if (newQuantity <= 0) {
          cartItem.remove();
          product.quantity -= quantityDiff;
        } else {
          alert('재고가 부족합니다.');
        }
      } else if (target.classList.contains('remove-item')) {
        const removedQuantity = parseInt(cartItem.querySelector('span').textContent.split('x ')[1]);
        product.quantity += removedQuantity;
        cartItem.remove();
      }
      calculateCart();
    }
  });

  setTimeout(function () {
    setInterval(function () {
      const luckyItem = products[Math.floor(Math.random() * products.length)];
      if (Math.random() < 0.3 && luckyItem.quantity > 0) {
        luckyItem.price = Math.round(luckyItem.price * 0.8);
        alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');
        renderProductDropdown();
      }
    }, 30000);
  }, Math.random() * 10000);

  setTimeout(function () {
    setInterval(function () {
      if (lastSelectedProductId) {
        const suggest = products.find(function (product) {
          return product.id !== lastSelectedProductId && product.quantity > 0;
        });
        if (suggest) {
          alert(suggest.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!');
          suggest.price = Math.round(suggest.price * 0.95);
          renderProductDropdown();
        }
      }
    }, 60000);
  }, Math.random() * 20000);
}

main();
