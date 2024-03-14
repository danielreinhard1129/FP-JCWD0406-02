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
      onStockCreated();
      onClose();
      onSuccess();
      toast.success('Success Added Stock');
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMsg = error.response?.data || error.message;
        toast.error(errorMsg);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      style={{ backdropFilter: 'blur(5px)' }}
    >
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-lg font-bold mb-4">
          Create Stock for this Warehouse
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            placeholder="Enter quantity"
            min="1"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg text-black bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border rounded-lg text-white bg-teal-600 hover:bg-teal-700"
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
