import { Status } from '@prisma/client';

export interface IProduct {
  id: number;
  userId: number;
  title: string;
  description: string;
  price: number;
  weight: number;
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

export interface IStock {
  id: number;
  warehouseId: number;
  productId: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IStockMutation {
  id: number;
  reqWarehouseId: number;
  quantity: number;
  productId: number;
  warehouseId: number;
  createdAt: Date;
  updatedAt: Date;
  status: Status;
}

export interface IReqStock {
  id: number;
  warehouseId: number;
  productId: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  status: Status;
}
