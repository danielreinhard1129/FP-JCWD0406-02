import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner'; // Adjust import based on your notification library
import { baseUrl } from '@/app/utils/database'; // Adjust import based on your setup

interface UpdateStockModalProps {
  stockId: number;
  currentQuantity: number;
  onClose: () => void;

  onSuccess: () => void;
}

const UpdateStockModal: React.FC<UpdateStockModalProps> = ({
  stockId,
  currentQuantity,
  onClose,
  onSuccess,
}) => {
  const [quantity, setQuantity] = useState<number>(currentQuantity);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.patch(`${baseUrl}/warehouses/update-stock/${stockId}`, {
        quantity,
      });
      toast.success('Stock updated successfully');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error updating stock:', error);
      toast.error('Failed to update stock');
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center"
      style={{ backdropFilter: 'blur(3px)' }}
    >
      <div className="bg-white p-6 rounded-lg shadow-2xl max-w-md w-full mx-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Update Stock Quantity
        </h2>
        <h5 className="text-xs font-normal mb-4 text-gray-800">
          Adjust stock quantity here
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
              className="w-full p-3 border border-teal-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="0"
              required
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
              Update Stock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateStockModal;
