export interface IProduct {
  id: number;
  userId: number;
  title: string;
  description: string;
  price: number;
  weight: number;
  qty: number;
  categoryId: number;
  isDeleted: boolean;
  created_at: Date;
  updatedAt: Date;
}

export interface ICategory {
  id: number;
  category_name: string;
  isDeleted: boolean;
  created_at: Date;
  updatedAt: Date;
}

export interface IProductPhoto {
  id: number;
  photo_product: string;
  productId: number;
}
