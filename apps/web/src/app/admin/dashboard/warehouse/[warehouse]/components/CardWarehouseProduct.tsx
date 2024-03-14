'use client';
import { baseUrll } from '@/app/utils/database';
import { IStock } from '@/types/warehouse.types';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaCaretDown, FaEdit, FaTrashAlt } from 'react-icons/fa';
import UpdateStockModal from './UpdateStock';

interface ProductPhoto {
  id: number;
  photo_product: string;
}
interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  weight: number; // Add weight here
  stock: number;
  isActive: boolean;
  productPhotos: ProductPhoto[];
  Stock: IStock[];
  quantity: number;
  product: IProduct;
  totalQuantity: number;
}

interface CardProductManagementProps {
  productsData: IProduct[];
}

const CardWarehouseProduct: React.FC<CardProductManagementProps> = ({
  productsData,
}) => {
  const [openDropdowns, setOpenDropdowns] = useState<number[]>([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedProductForUpdate, setSelectedProductForUpdate] =
    useState<IProduct | null>(null);

  const toggleDropdown = (productId: number) => {
    setOpenDropdowns((currentOpenDropdowns) =>
      currentOpenDropdowns.includes(productId)
        ? currentOpenDropdowns.filter((id) => id !== productId)
        : [...currentOpenDropdowns, productId],
    );
  };

  const handleUpdateStockClick = (product: IProduct) => {
    setSelectedProductForUpdate(product);
    setIsUpdateModalOpen(true);
    toggleDropdown(product.id); // Close the dropdown menu
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedProductForUpdate(null);
  };

  const handleStockUpdated = () => {
    // Refresh your product list here if needed
    handleCloseUpdateModal();
  };

  return (
    <div className="bg-white w-full">
      <div className="mx-auto">
        <div className="mt-4 flex flex-col gap-2">
          {productsData.map((product) => (
            <div
              key={product.id}
              className="flex items-center  justify-between border pr-5  rounded-lg bg-white shadow"
            >
              <Image
                src={
                  product.product.productPhotos &&
                  product.product.productPhotos.length > 0
                    ? `${baseUrll}/photo-product/${product.product.productPhotos[0].photo_product}`
                    : '/default-product.webp'
                }
                alt={product.product.title}
                className="h-28 w-28 object-cover rounded-l-lg mr-4"
                width={100}
                height={100}
              />
              <div className="flex-grow">
                <h3 className="text-md font-medium mr-4">
                  {product.product.title}
                </h3>
                <p className="text-sm text-gray-500">
                  Rp {product.product.price.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  Weight: {product.product.weight} gram
                </p>
              </div>
              <div className="mr-4">
                <p className="text-sm text-gray-500">
                  Stock: {product.quantity}
                </p>
              </div>

              <div className="relative">
                <button
                  className="border px-3 py-1 rounded-lg shadow-sm text-xs bg-white flex items-center"
                  onClick={() => toggleDropdown(product.id)}
                >
                  Manage <FaCaretDown className="ml-2" />
                </button>
                {openDropdowns.includes(product.id) && (
                  <div className="absolute w-36 right-2 mt-1 bg-white border rounded shadow-xl z-10">
                    <li
                      onClick={() => handleUpdateStockClick(product)}
                      className="px-4 py-2 w-full hover:bg-gray-100 cursor-pointer flex items-center"
                    >
                      <FaEdit className="mr-2" />
                      <h5 className="text-xs w-full">Update Stock</h5>
                    </li>
                    <li
                      className="px-4 py-2 w-full hover:bg-gray-100 cursor-pointer flex items-center"
                      //   onClick={() => setIsModalOpen(true)}
                    >
                      <FaTrashAlt className="mr-2" />
                      <h5 className="text-xs w-full">Delete Stock</h5>
                    </li>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {isUpdateModalOpen && selectedProductForUpdate && (
        <UpdateStockModal
          stockId={selectedProductForUpdate.id} // Assuming stock ID is the same as product ID; adjust as needed
          currentQuantity={selectedProductForUpdate.totalQuantity}
          onClose={handleCloseUpdateModal}
          onStockUpdated={handleStockUpdated}
        />
      )}
    </div>
  );
};

export default CardWarehouseProduct;
