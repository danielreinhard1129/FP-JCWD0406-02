'use client';
import { baseUrll } from '@/app/utils/database';
import { IStock } from '@/types/warehouse.types';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaCaretDown, FaEdit } from 'react-icons/fa';
import StockCreationModal from './CreateStock';
import { PiArchiveBoxBold, PiHandCoinsBold } from 'react-icons/pi';
import { fetchAllProducts } from '@/app/utils/helper/fetchAllProduct';
import RequestStockModal from './RequestStock';

interface ProductPhoto {
  id: number;
  photo_product: string;
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
  Stock: IStock[];
  quantity: number;
  product: IProduct;
  totalQuantity: number;
}

interface CardProductManagementProps {
  productsData: IProduct[];
  warehouseId: number;
  allStock: IStock[];
  refreshWarehouse: () => void;
}

const CardAllProductWarehouse: React.FC<CardProductManagementProps> = ({
  productsData,
  warehouseId,
  allStock,
  refreshWarehouse,
}) => {
  // console.log('this is data stock : ', allStock);

  const [openDropdowns, setOpenDropdowns] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );
  const [isRequestStockModalOpen, setIsRequestStockModalOpen] = useState(false);

  const toggleDropdown = (productId: number) => {
    setOpenDropdowns((currentOpenDropdowns) =>
      currentOpenDropdowns.includes(productId)
        ? currentOpenDropdowns.filter((id) => id !== productId)
        : [...currentOpenDropdowns, productId],
    );
  };

  const handleCreateStockClick = (productId: number) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
    toggleDropdown(productId);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProductId(null);
  };

  const handleRequestStockClick = (productId: number) => {
    setSelectedProductId(productId);
    setIsRequestStockModalOpen(true);
    toggleDropdown(productId); // Add this line to close the dropdown
  };
  const handleCloseRequestStockModal = () => {
    setIsRequestStockModalOpen(false);
    setSelectedProductId(null);
  };

  return (
    <div className="bg-white w-full">
      <div className="mx-auto">
        <div className="mt-4 flex flex-col gap-2">
          {productsData.map((product) => {
            const stockItem = allStock.find(
              (item) => item.productId === product.id,
            );
            let stockQuantity = stockItem ? stockItem.quantity : null;

            if (!stockQuantity) {
              stockQuantity = 0;
            }
            // console.log('stock', stockItem);
            return (
              <div
                key={product.id}
                className="flex items-center cursor-pointer justify-between border pr-5 rounded-lg bg-white shadow"
              >
                <Image
                  src={
                    product.productPhotos && product.productPhotos[0]
                      ? `${baseUrll}/photo-product/${product.productPhotos[0].photo_product}`
                      : '/default-product.webp'
                  }
                  alt={product.title}
                  width={112}
                  height={112}
                  className="h-28 w-28 object-cover rounded-l-lg mr-4"
                />
                <div className="flex-grow">
                  <h3 className="text-md font-medium mr-4">{product.title}</h3>
                  <p className="text-sm text-gray-500">
                    Rp {product.price.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Weight: {product.weight} gram
                  </p>
                  <p className="text-sm text-gray-500">
                    Stock: {stockQuantity}
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
                    <div className="absolute w-36 text-xs right-2 mt-1 bg-white border rounded shadow-xl z-10">
                      <li
                        className="px-4 py-2 w-full hover:bg-gray-100 cursor-pointer flex items-center"
                        onClick={() => handleCreateStockClick(product.id)}
                      >
                        <PiArchiveBoxBold className="mr-2 size-4" />
                        Create Stock
                      </li>
                      <li
                        className="px-4 py-2 w-full hover:bg-gray-100 cursor-pointer flex items-center"
                        onClick={() => handleRequestStockClick(product.id)}
                      >
                        <PiHandCoinsBold className="mr-2 size-4" />
                        Request Stock
                      </li>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isModalOpen && selectedProductId && (
            <StockCreationModal
              productId={selectedProductId}
              warehouseId={warehouseId}
              onClose={handleCloseModal}
              onStockCreated={function (): void {
                throw new Error('Function not implemented.');
              }}
              onSuccess={fetchAllProducts}
            />
          )}
          {isRequestStockModalOpen && selectedProductId && (
            <RequestStockModal
              productId={selectedProductId}
              warehouseId={warehouseId}
              onClose={handleCloseRequestStockModal}
              onSuccess={() => {
                refreshWarehouse;
                handleCloseRequestStockModal();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CardAllProductWarehouse;
