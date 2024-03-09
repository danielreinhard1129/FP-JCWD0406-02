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
interface IProduct {
  id: number;
  title: string;
  description: string;
  productPhotos: string[];
  price: number;
  weight: number;
  Category: Category;
}
const sampleImages = [
  '/default-product.webp',
  '/default-avatar.png',
  '/default-product.webp',
  '/default-avatar.png',
  '/default-product.webp',
];

const ProductDetailPage: React.FC = () => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const altText = 'Sample Product Image';
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
  console.log('itemmmmmm', product?.productPhotos);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner aria-label="Loading products..." />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-28 py-8">
        <ProductImageGallery images={product.productPhotos} altText={altText} />

        <ProductDetails detailProduct={product} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
