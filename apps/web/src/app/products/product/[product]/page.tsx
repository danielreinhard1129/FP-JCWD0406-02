// pages/products/[productId].tsx
'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { baseUrl } from '@/app/utils/database';
import { toast } from 'sonner';
import ProductImageGallery from './components/ProductImageGalery';
import ProductDetails from './components/ProductDetail';
import AddToCartButton from './components/AddToCartButton';
import { Spinner } from 'flowbite-react';

export interface Category {
  id: number;
  category_name: string;
}
interface ProductPhoto {
  id: number;
  photo_product: string;
}

interface Stock {
  totalStock: number;
}

interface IProduct {
  id: number;
  title: string;
  description: string;
  productPhotos: ProductPhoto[];
  price: number;
  weight: number;
  Category: Category;
  Stock: Stock;
  totalStock: number;
}

const ProductDetailPage: React.FC = () => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [randomProducts, setRandomProducts] = useState<IProduct[]>([]);
  const params = useParams();

  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${baseUrl}/warehouses/product/${params.product}`,
        );

        setProduct(response.data.data);
      } catch (error) {
        toast.error('Error fetching product details');
      }
    };

    if (params.product) {
      fetchProductDetails();
    }
  }, [params.product]);

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

  if (!product) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner aria-label="Loading products..." />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 min-h-screen sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-12 py-8">
        <ProductImageGallery product={product} />

        <ProductDetails detailProduct={product} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
