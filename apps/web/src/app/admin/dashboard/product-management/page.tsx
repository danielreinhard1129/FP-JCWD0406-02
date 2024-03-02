// ProductManagementSuperAdmin.tsx
'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSidebar from '../../components/SidebarDashboard';
import CardProductManagement from './components/CardProductManagement';
import HeaderProductManagement from './components/HeaderProductDashboard';
import { baseUrl } from '@/app/utils/database';

interface ProductPhoto {
  url: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  weight: number;
  stock: number;
  isActive: boolean;
  productPhoto: ProductPhoto[];
}

const ProductManagementSuperAdmin = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/warehouses/products`);
      setProducts(response.data.data);
    } catch (err) {
      console.error('Error fetching products:', err);
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

export default ProductManagementSuperAdmin;
