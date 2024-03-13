export interface ProductPhoto {
  id: number;
  photo_product: string;
}
interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  Product: {
    title: string;
    price: number;
    weight: number;
    productPhotos: ProductPhoto[];
  };
}

export interface CartState {
  cartItems: CartItem[];
}
