import { BONUS_POINT_UNIT } from '../constants/index.js';
import { cartState } from '../state/cartState.js';

export function renderBonusPoints() {
  const { cartTotalPrice, totalAmount } = cartState;
  const bonusPoints = Math.floor(totalAmount / BONUS_POINT_UNIT);
  let pointsTag = document.getElementById('loyalty-points');

  if (!pointsTag) {
    pointsTag = document.createElement('span');
    pointsTag.id = 'loyalty-points';
    pointsTag.className = 'text-blue-500 ml-2';
    cartTotalPrice.appendChild(pointsTag);
  }

  pointsTag.textContent = `(포인트: ${bonusPoints})`;
}
