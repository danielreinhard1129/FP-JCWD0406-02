// NewStockCreationModal.tsx

import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { baseUrl } from '@/app/utils/database';
import { toast } from 'sonner';
import WarehouseSelect from '../../warehouse/components/WarehouseSelect';
import { IStock } from '@/types/warehouse.types';

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
  totalQuantity: number;
  Stock: IStock[];
}

interface NewStockCreationModalProps {
  product: IProduct;
  onClose: () => void;
  onStockCreated: () => void;
}

const NewStockCreationModal: React.FC<NewStockCreationModalProps> = ({
  product,
  onClose,
  onStockCreated,
}) => {
  const [quantity, setQuantity] = useState<number>(0);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState<number | null>(
    null,
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedWarehouseId) {
      toast.error('Please select a warehouse.');
      return;
    }

    try {
      await axios.post(`${baseUrl}/warehouses/create-stock`, {
        productId: product.id,
        warehouseId: selectedWarehouseId,
        quantity,
      });
      onStockCreated();
      onClose();
      toast.success('Stock created successfully');
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMsg = error.response?.data || error.message;
        toast.error(errorMsg);
      }
    }
  };
  const handleWarehouseChange = (warehouseId: number) => {
    setSelectedWarehouseId(warehouseId);
  };
  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50"
      style={{ backdropFilter: 'blur(3px)' }}
    >
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            Create New Stock for {product.title}
          </h2>
          <p className="text-gray-600">
            Enter the fields below to create new stock
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="warehouse"
              className="block text-gray-700 text-sm font-semibold mb-1"
            >
              Warehouse
            </label>
            <WarehouseSelect onChange={handleWarehouseChange} />
          </div>
          <div>
            <label
              htmlFor="quantity"
              className="block text-gray-700 text-sm font-semibold mb-1"
            >
              Quantity
            </label>
            <input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              placeholder="Enter quantity"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="p-2 px-4 font-medium text-sm bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="p-2 px-4 font-medium text-sm bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Create Stock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewStockCreationModal;
