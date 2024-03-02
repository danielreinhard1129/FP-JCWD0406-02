// SelectOptionCategory.tsx
'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '@/app/utils/database';

interface ICategory {
  id: number;
  category_name: string;
}

interface SelectOptionCategoryProps {
  onCategoryChange: (selectedCategoryId: string) => void;
  className?: string;
}

const SelectOptionCategory: React.FC<SelectOptionCategoryProps> = ({
  onCategoryChange,
  className,
}) => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${baseUrl}/warehouses/categories`);
        setCategories(response.data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <select
      onChange={(e) => onCategoryChange(e.target.value)}
      className={
        className ||
        'mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md'
      }
    >
      <option value="">Select a category</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.category_name}
        </option>
      ))}
    </select>
  );
};

export default SelectOptionCategory;
