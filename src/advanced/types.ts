export interface ProductItemData {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CartItemData extends ProductItemData {
  count: number; // 장바구니에 담긴 수량
}
