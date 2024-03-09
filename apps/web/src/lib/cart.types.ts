export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  Product: {
    title: string;
    price: number;
    imageUrl: string;
    weight: number;
  };
}

export interface CartState {
  cartItems: CartItem[];
}
