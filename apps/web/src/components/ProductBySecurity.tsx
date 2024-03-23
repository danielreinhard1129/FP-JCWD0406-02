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

        setProducts(responseData.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const displayedProducts = products.slice(0, 5);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 md:gap-4 gap-y-4 gap-x-1 md:items-center">
      {displayedProducts.map((product, index) => {
        // Apply different spans for different screen sizes
        const spanClasses =
          index === 0
            ? 'md:col-span-3 md:row-span-2 sm:col-span-2 col-span-4 row-span-1'
            : 'col-span-1 row-span-1';

        return (
          <div
            key={product.id}
            className={`bg-white rounded-lg overflow-hidden shadow-sm transform transition-all hover:scale-105 duration-300 ${spanClasses}`}
          >
            <ProductCardByCategory key={product.id} product={product} />
          </div>
        );
      })}
    </div>
  );
};

export default ProductSecurity;
