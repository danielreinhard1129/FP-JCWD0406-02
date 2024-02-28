'use client';
import React, { useState } from 'react';
import {
  FaToggleOn,
  FaToggleOff,
  FaCaretDown,
  FaRegEdit,
  FaRegTrashAlt,
} from 'react-icons/fa';
import DeleteProduct from './DeleteProduct';
import EditProduct from './EditProduct';

interface ProductPhoto {
  url: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  weight: number; // Add weight here
  stock: number;
  isActive: boolean;
  productPhoto: ProductPhoto[];
}

interface CardProductManagementProps {
  productsData: Product[];
  parseProduct: () => void;
}

const CardProductManagement: React.FC<CardProductManagementProps> = ({
  productsData,
  parseProduct,
}) => {
  const [openDropdowns, setOpenDropdowns] = useState<number[]>([]);

  const toggleDropdown = (productId: number) => {
    setOpenDropdowns((currentOpenDropdowns) =>
      currentOpenDropdowns.includes(productId)
        ? currentOpenDropdowns.filter((id) => id !== productId)
        : [...currentOpenDropdowns, productId],
    );
  };

  return (
    <div className="bg-white w-full">
      <div className="mx-auto">
        <div className="mt-4 flex flex-col gap-2">
          {productsData.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between border pr-5  rounded-lg bg-white shadow"
            >
              <img
                src={product.productPhoto[0]?.url || '/default-product.webp'}
                alt={product.title}
                className="h-28 w-28 object-cover rounded-l-lg mr-4"
              />
              <div className="flex-grow">
                <h3 className="text-md font-medium mr-4">{product.title}</h3>
                <p className="text-sm text-gray-500">
                  Rp{product.price.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  Weight: {product.weight} gram
                </p>
              </div>
              <div className="mr-4">
                <p className="text-sm text-gray-500">Stock: {product.stock}</p>
              </div>

              <div className="relative">
                <button
                  className="border px-3 py-1 rounded-lg shadow-sm text-xs bg-white flex items-center"
                  onClick={() => toggleDropdown(product.id)}
                >
                  Manage <FaCaretDown className="ml-2" />
                </button>
                {openDropdowns.includes(product.id) && (
                  <div className="absolute right-0 mt-1 w-24 bg-white border rounded shadow-xl z-10">
                    <ul className="text-xs text-gray-700">
                      <EditProduct product={product} onSuccess={parseProduct} />
                      <DeleteProduct
                        productId={product.id}
                        onSuccess={parseProduct}
                      />
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardProductManagement;
