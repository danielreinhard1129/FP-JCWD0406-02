'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSidebar from '../../components/SidebarDashboard';
import { baseUrl } from '@/app/utils/database';
import CategoryCard from './components/CategoryCard';
import HeaderCategoryManagement from './components/HeaderCategoryManagement';
import SelectOptionCategory from './components/SelectOptionCategory';
import { AuthGuard } from '@/components/protected-route/components/AuthGuard';

interface Category {
  id: number;
  category_name: string;
  // Add other category properties as needed
}

interface CategoriesDisplayProps {
  categories: Category[];
}
const CategoryManagement = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${baseUrl}/warehouses/categories`);
      setCategories(response.data.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to fetch categories');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const refreshCategories = async () => {
    fetchCategories(); // Corrected the function call here
  };

  return (
    <div className="flex gap-4 mx-auto max-w-7xl mt-8">
      <AdminSidebar />
      <div className="flex-1">
        <h2 className="text-xl font-semibold mb-4">
          <HeaderCategoryManagement refreshCategories={fetchCategories} />
        </h2>
        <CategoryCard
          categories={categories}
          refreshCategories={refreshCategories}
        />
        {/* <SelectOptionCategory /> */}
      </div>
    </div>
  );
};

export default AuthGuard(CategoryManagement);
