'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '@/app/utils/database'; // Adjust this import based on your project structure
import CategorySelector from './components/CategoryCardDiscovery';
import Carousel from '@/components/Carousel';
import { Category, IStock } from '@/types/warehouse.types';
import AllProductCard from './components/AllProductCard';
import MobileCategorySelector from './components/MobileCategorySelection';

export interface ProductPhoto {
  id: number;
  photo_product: string;
}

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  productPhotos: ProductPhoto[];
  categoryId: number;
  Category: Category;
  weight: number;
  stock: number;
  isActive: boolean;
  Stock: IStock[];
  quantity: number;
  product: IProduct;
  totalQuantity: number;
}

export interface ICategory {
  id: number;
  category_name: string;
}

const ProductPage = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [category, setCategory] = useState('');
  const [products, setProducts] = useState<IProduct[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${baseUrl}/warehouses/categories`);
      setCategories(response.data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (typeof category === 'string') {
      setCategory(category);
    }
  }, [category]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('chekch before fetchh', category);

        const responseData = await axios.get(
          `${baseUrl}/warehouses/catalog?category=${category}`,
        );

        console.log('checkkk response catalogg', responseData.data.data);

        setProducts(responseData.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [category]);

  return (
    <>
      <div>
        <div className="carousel bg-gray-300">
          <Carousel />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-5 gap-4 mt-4 max-w-7xl mx-auto">
          {/* Category Selector */}
          <div className="block md:hidden col-span-5">
            <MobileCategorySelector
              selectedCategory={category}
              setCategory={setCategory}
              categories={categories}
            />
          </div>
          <div className="hidden md:block col-span-1">
            <CategorySelector
              selectedCategory={category}
              setCategory={setCategory}
              categories={categories}
            />
          </div>
          {/* Products Grid */}
          <section className="md:col-span-4 col-span-5 p-4">
            <div>
              <AllProductCard productsData={products} />
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
