'use client';
import React, { useState } from 'react';
import {
  FaRegEye,
  FaRegEdit,
  FaRegTrashAlt,
  FaToggleOn,
  FaToggleOff,
} from 'react-icons/fa';

type ProductCardProps = {
  imageUrl: string;
  productName: string;
  price: number;
  stock: number;
  isActive: boolean;
};

const CardAllProduct: React.FC<ProductCardProps> = ({
  imageUrl,
  productName,
  price,
  stock,
  isActive,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex items-center justify-between border p-4 rounded-lg bg-white shadow mb-2">
      <div className="flex items-center">
        {/* Product Image */}
        <img
          src={imageUrl}
          alt={productName}
          className="w-12 h-12 object-cover rounded mr-4"
        />
        {/* Product Details */}
        <div>
          <div className="font-bold">Bardi Lampu</div>
          <div className="text-sm text-gray-500">
            {/* Rp{price.toLocaleString()} */}
          </div>
        </div>
      </div>
      {/* Stock and Active Status */}
      <div className="flex items-center">
        <div className="text-sm text-gray-500 mr-4">Stock: 40</div>
        {isActive ? (
          <FaToggleOn className="text-green-500 text-xl mr-4" />
        ) : (
          <FaToggleOff className="text-gray-500 text-xl mr-4" />
        )}
        {/* Dropdown Button */}
        <div className="relative">
          <button
            className="border p-1 rounded-lg shadow-sm bg-white"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            Manage
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-1 w-24 bg-white border rounded shadow-xl">
              <ul className="text-sm text-gray-700">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                  <FaRegEdit className="mr-2" /> Edit
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                  <FaRegTrashAlt className="mr-2" /> Delete
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardAllProduct;
