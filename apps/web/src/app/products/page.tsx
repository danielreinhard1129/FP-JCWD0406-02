'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '@/app/utils/database'; // Adjust this import based on your project structure
import ProductCard, { Category } from './components/ProductCard';
import CategorySelector from './components/CategoryCardDiscovery';
import { Spinner } from 'flowbite-react';
import Loading from '@/components/Loading';
import Carousel from '@/components/Carousel';
import { IStock } from '@/types/warehouse.types';

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
  const [allProducts, setAllProducts] = useState<IProduct[]>([]); // Store all products
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]); // Products to display
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [product, setProduct] = useState<IProduct[]>([]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/warehouses/products`);

      console.log('allproducts', response.data.data);

      setAllProducts(response.data.data); // Save all products
      setFilteredProducts(response.data.data); // Initially display all products
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${baseUrl}/warehouses/categories`);
      setCategories(response.data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Filter products based on selected category
    if (categoryId === '') {
      setFilteredProducts(allProducts); // No category selected, show all products
    } else {
      const filtered = allProducts.filter(
        (product) => product.categoryId.toString() === categoryId,
      );
      setFilteredProducts(filtered);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('chekch before fetchh', category);

        const responseData = await axios.get(
          `${baseUrl}/warehouses/catalog?category=${category}`,
        );
        console.log('checkkk response catalogg', responseData.data.data);

        setProduct(responseData.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [category]);

  //kode diatas dari line 91 - 108 untuk fetch catalog

  return (
    <>
      <div>
        <div className="carousel bg-gray-300">
          <Carousel />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-5 gap-4 mt-4 max-w-7xl mx-auto">
          {/* Category Selector */}
          <CategorySelector
            setCategory={(category) => setCategory(category)}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={handleCategoryChange}
          />

          {/* Products Grid */}
          <section className="col-span-4 p-4">
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <Spinner aria-label="Loading products..." />
              </div>
            ) : (
              <div>
                <ProductCard productsData={filteredProducts} />
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
