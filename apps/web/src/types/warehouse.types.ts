export interface IStock {
  id: number;
  warehouseId: number;
  productId: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  weight: number;
  stock: number;
  isActive: boolean;
  productPhotos: ProductPhoto[];
  totalQuantity: number;
  Stock: IStock[]; // Ensure this is defined as an array of IStock objects
}

export interface ProductPhoto {
  id: number;
  photo_product: string;
}

export interface Category {
  id: number;
  category_name: string;
}
