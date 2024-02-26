'use client';
import React, { useState } from 'react';
import {
  FaToggleOn,
  FaToggleOff,
  FaCaretDown,
  FaRegEdit,
  FaRegTrashAlt,
} from 'react-icons/fa';

// Define the product type
interface Product {
  id: number;
  imageUrl: string;
  productName: string;
  price: number;
  stock: number;
  isActive: boolean;
  isDropdownOpen?: boolean;
}

const CardProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      imageUrl: '/product/airPurifierBRDL.jpg',
      productName: 'BORDL Smart Air Purifier',
      price: 460000,
      stock: 2,
      isActive: true,
    },
    {
      id: 2,
      imageUrl: '/product/BOKLAMBRDL12W.png',
      productName: 'BORDL Smart Boklam 12W',
      price: 1589000,
      stock: 1,
      isActive: false,
    },
    {
      id: 3,
      imageUrl: '/product/BOKLAMBRDL12W.png',
      productName: 'BORDL Smart Boklam 12W',
      price: 1589000,
      stock: 1,
      isActive: false,
    },
    // ... other products
  ]);

  // Function to handle dropdown toggle
  const toggleDropdown = (id: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, isDropdownOpen: !product.isDropdownOpen }
          : product,
      ),
    );
  };

  // Function to handle "Edit" action
  const editProduct = (id: number) => {
    console.log('Edit product', id);
    // Add your edit logic here
  };

  // Function to handle "Delete" action
  const deleteProduct = (id: number) => {
    console.log('Delete product', id);
    // Add your delete logic here
  };

  return (
    <div className="bg-white w-full">
      <div className="mx-auto ">
        <div className="mt-4 flex flex-col gap-2">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between border px-4 py-3 rounded-lg bg-white shadow"
            >
              <img
                src={product.imageUrl}
                alt={product.productName}
                className="h-20 w-20 object-cover rounded mr-4"
              />
              <div className="flex-grow">
                <h3 className="text-md font-medium mr-4">
                  {product.productName}
                </h3>
                <p className="text-sm text-gray-500">
                  Rp{product.price.toLocaleString()}
                </p>
              </div>
              <div className="mr-4">
                <p className="text-sm text-gray-500">Stock: {product.stock}</p>
              </div>
              <div className="mr-4">
                {product.isActive ? (
                  <FaToggleOn className="text-green-500 text-4xl cursor-pointer" />
                ) : (
                  <FaToggleOff className="text-gray-300 text-4xl cursor-pointer" />
                )}
              </div>
              <div className="relative">
                <button
                  className="border px-3 py-1 rounded-lg shadow-sm text-xs bg-white flex items-center"
                  onClick={() => toggleDropdown(product.id)}
                >
                  Manage <FaCaretDown className="ml-2" />
                </button>
                {product.isDropdownOpen && (
                  <div className="absolute right-0 mt-1 w-24 bg-white border rounded shadow-xl z-10">
                    <ul className="text-xs text-gray-700">
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                        onClick={() => editProduct(product.id)}
                      >
                        <FaRegEdit className="mr-2" /> Edit
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                        onClick={() => deleteProduct(product.id)}
                      >
                        <FaRegTrashAlt className="mr-2" /> Delete
                      </li>
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
