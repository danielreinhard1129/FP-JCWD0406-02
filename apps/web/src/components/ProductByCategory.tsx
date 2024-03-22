// components/ProductGrid.tsx
import ProductCardByCategory from '@/app/products/components/ProductCardByCategory';
import { baseUrl } from '@/app/utils/database';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export interface Category {
  id: number;
  category_name: string;
}
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
  quantity: number;
  product: IProduct;
  totalQuantity: number;
}

const ProductSecurity: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  //   console.log('securoty', products);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await axios.get(
          `${baseUrl}/warehouses/catalog?category=Security`,
        );

        console.log('checkkk Seciueuytey', responseData.data.data);

        setProducts(responseData.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const displayedProducts = products.slice(0, 3);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {displayedProducts.map((product, index) => {
        // If it's the first item, make it larger using col-span to take up more columns.
        const colSpan =
          index === 0
            ? ' sm:col-span-2 lg:col-span-2'
            : ' sm:col-span-2 lg:col-span-1';
        return (
          <div
            key={index}
            className={`bg-white rounded-lg overflow-hidden shadow-lg${colSpan}`}
          >
            <ProductCardByCategory key={product.id} product={product} />
          </div>
        );
      })}
    </div>
  );
};

export default ProductSecurity;
