import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner'; // Adjust import based on your notification library
import { baseUrl } from '@/app/utils/database'; // Adjust import based on your setup

interface UpdateStockModalProps {
  stockId: number;
  currentQuantity: number;
  onClose: () => void;
  onStockUpdated: () => void;
}

const UpdateStockModal: React.FC<UpdateStockModalProps> = ({
  stockId,
  currentQuantity,
  onClose,
  onStockUpdated,
}) => {
  const [quantity, setQuantity] = useState<number>(currentQuantity);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.patch(`${baseUrl}/warehouses/update-stock/${stockId}`, {
        quantity,
      });
      toast.success('Stock updated successfully');
      onStockUpdated();
      onClose();
    } catch (error) {
      console.error('Error updating stock:', error);
      toast.error('Failed to update stock');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Update Stock Quantity</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            className="input border border-gray-300 p-2 rounded w-full"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="0"
          />
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Update Stock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateStockModal;
