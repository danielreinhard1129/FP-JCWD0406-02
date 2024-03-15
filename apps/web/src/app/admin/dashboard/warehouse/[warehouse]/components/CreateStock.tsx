// StockCreationModal.tsx

import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { baseUrl } from '@/app/utils/database';
import { toast } from 'sonner';

interface StockCreationModalProps {
  productId: number;
  warehouseId: number;
  onClose: () => void;
  onStockCreated: () => void;
  onSuccess: () => void;
}

const StockCreationModal: React.FC<StockCreationModalProps> = ({
  productId,
  warehouseId,
  onClose,
  onStockCreated,
  onSuccess,
}) => {
  const [quantity, setQuantity] = useState<number>(0);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const payload = {
      productId,
      warehouseId,
      quantity,
    };
    try {
      await axios.post(`${baseUrl}/warehouses/create-stock`, payload);
      toast.success('Success Added Stock');
      onClose();
      onSuccess();
      onStockCreated();
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMsg = error.response?.data || error.message;
        toast.error(errorMsg);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      style={{ backdropFilter: 'blur(3px)' }}
    >
      <div className="bg-white p-6 rounded-lg shadow-2xl max-w-md w-full mx-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Create Stock for this Warehouse
        </h2>
        <h5 className="text-xs font-normal mb-4 text-gray-800">
          Insert this product to ready stock in this warehouse by Setting the
          Stock
        </h5>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="first_name"
              className="block text-gray-700 text-sm font-semibold mb-1"
            >
              Quantity
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              placeholder="Enter quantity"
              min="1"
              required
              className="w-full p-3 border border-teal-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm rounded-lg text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              Create Stock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StockCreationModal;
