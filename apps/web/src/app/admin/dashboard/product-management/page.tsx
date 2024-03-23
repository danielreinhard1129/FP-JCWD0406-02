// ProductManagementSuperAdmin.tsx
'use client';

import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import AdminSidebar from '../../components/SidebarDashboard';
import CardProductManagement from './components/CardProductManagement';
import HeaderProductManagement from './components/HeaderProductDashboard';
import { baseUrl } from '@/app/utils/database';
import { toast } from 'sonner';

import { IStock } from '@/types/warehouse.types';
import { AuthGuard } from '@/components/protected-route/components/AuthGuard';

interface ProductPhoto {
  id: number;
  photo_product: string;
  productPhotos: string;
}

interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  weight: number;
  stock: number;
  isActive: boolean;
  productPhotos: ProductPhoto[];
  totalQuantity: number;
  Stock: IStock[];
}

const ProductManagementSuperAdmin = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/warehouses/products`);
      const fetchProducts = response.data.data;

      setProducts(fetchProducts);
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMsg = error.response?.data || error.message;
        toast.error(errorMsg);
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const refreshProductList = async () => {
    fetchProducts();
  };

  return (
    <div className="flex gap-4 mx-auto max-w-7xl mt-8">
      <AdminSidebar />
      <div className="w-full space-y-10">
        <HeaderProductManagement />
        <CardProductManagement
          productsData={products}
          parseProduct={refreshProductList}
        />
      </div>
    </div>
  );
};

export default AuthGuard(ProductManagementSuperAdmin);
