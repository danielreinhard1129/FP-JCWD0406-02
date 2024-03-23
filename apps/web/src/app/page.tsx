'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '@/app/utils/database'; // Adjust the import path as necessary
import Carousel from '@/components/Carousel';
import FilterCategory from '@/components/FilterCategory';
import ProductCard, { Category } from './products/components/ProductCard';
import { Banner } from '@/components/Banner';
import { IStock } from '@/types/warehouse.types';
import ProductSecurity from '@/components/ProductBySecurity';
import BannerInfo from '@/components/BannerInfo';
import ProductLighting from '@/components/ProductByLighting';

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
  Category: Category;
  weight: number;
  stock: number;
  isActive: boolean;
  Stock: IStock[];
  quantity: number;
  product: IProduct;
  totalQuantity: number;
}
export default function Home() {
  const [randomProducts, setRandomProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchRandomProducts = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/warehouses/random-products`,
        );
        setRandomProducts(response.data.data);
      } catch (error) {
        console.error('Failed to fetch random products:', error);
      }
    };

    fetchRandomProducts();
  }, []);

  return (
    <div className=" w-full mx-auto">
      <Carousel />
      <Banner />
      <FilterCategory />
      <div className="w-full px-2 md:px-0 h-fit space-y-10">
        <div className="bg-amber-100 p-2 md:p-8 ">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-lg font-bold tracking-tight text-gray-900">
              SECURITY
            </h2>
            <div className="items-center mt-4 flex gap-y-8 w-full">
              <ProductSecurity />
            </div>
          </div>
        </div>
        <div>
          <div className="max-w-7xl mx-auto">
            <div className="items-center mt-4 flex gap-y-8 w-full">
              <BannerInfo />
            </div>
          </div>
        </div>
        <div className="bg-teal-50 p-2 md:p-8 ">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-lg font-bold tracking-tight text-gray-900">
              LIGHTING
            </h2>
            <div className="items-center mt-4 flex gap-y-8 w-full">
              <ProductLighting />
            </div>
          </div>
        </div>
        <div>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-lg font-bold tracking-tight text-gray-900">
              MORE PRODUCTS
            </h2>
            <div className="items-center mt-4 flex gap-y-8 w-full">
              <ProductCard productsData={randomProducts} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
