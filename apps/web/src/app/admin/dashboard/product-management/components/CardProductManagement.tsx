'use client';
import React, { useState } from 'react';
import { FaCaretDown, FaEdit } from 'react-icons/fa';
import { PiArchiveBoxBold } from 'react-icons/pi';
import DeleteProduct from './DeleteProduct';
import EditProduct from './EditProduct';
import { baseUrll } from '@/app/utils/database';
import Image from 'next/image';
import NewStockCreationModal from './CreateStockSuperAdmin';
import UpdateStockModal from '../../warehouse/[warehouse]/components/UpdateStock';
import UpdateStockWithWarehouseModal from './UpdateStockSuperAdmin';

interface ProductPhoto {
  id: number;
  photo_product: string;
}
interface IStock {
  id: number;
  warehouseId: number;
  productId: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  weight: number;
  stock: number;
  isActive: boolean;
  productPhotos: ProductPhoto[];
  totalQuantity: number;
  Stock: IStock[];
}

interface CardProductManagementProps {
  productsData: IProduct[];
  parseProduct: () => void;
}

const CardProductManagement: React.FC<CardProductManagementProps> = ({
  productsData,
  parseProduct,
}) => {
  const [openDropdowns, setOpenDropdowns] = useState<number[]>([]);
  const [isCreateStockModalOpen, setIsCreateStockModalOpen] =
    useState<boolean>(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );

  const toggleDropdown = (productId: number) => {
    if (openDropdowns.includes(productId)) {
      setOpenDropdowns(openDropdowns.filter((id) => id !== productId));
    } else {
      setOpenDropdowns([...openDropdowns, productId]);
    }
  };

  const openCreateStockModal = (productId: number) => {
    setSelectedProductId(productId);
    setIsCreateStockModalOpen(true);
    toggleDropdown(productId); // Close the dropdown when opening the modal
  };

  const closeCreateStockModal = () => {
    setIsCreateStockModalOpen(false);
    setSelectedProductId(null);
  };

  const handleStockCreated = () => {
    closeCreateStockModal();
    parseProduct();
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
              <Image
                src={
                  product.productPhotos && product.productPhotos[0]
                    ? `${baseUrll}/photo-product/${product.productPhotos[0].photo_product}` // Adjusted path to match your folder structure
                    : '/default-product.webp'
                }
                alt={product.title}
                width={112} // Set desired width (in pixels)
                height={112} // Set desired height (in pixels)
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
                <p className="text-sm text-gray-500">
                  Stock: {product.totalQuantity}
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
                  <div className="absolute right-0 mt-1 w-40 bg-white border rounded shadow-xl z-10">
                    <ul className="text-xs text-gray-700">
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                        onClick={() => openCreateStockModal(product.id)}
                      >
                        <PiArchiveBoxBold className="mr-2 text-sm " /> Create
                        Stock
                      </li>

                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                        <PiArchiveBoxBold className="mr-2 text-sm " /> Update
                        Stock
                      </li>

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
      {isCreateStockModalOpen &&
        selectedProductId &&
        productsData.find((p) => p.id === selectedProductId) && (
          <NewStockCreationModal
            product={productsData.find((p) => p.id === selectedProductId)!}
            onClose={closeCreateStockModal}
            onStockCreated={handleStockCreated}
          />
        )}
    </div>
  );
};

export default CardProductManagement;
