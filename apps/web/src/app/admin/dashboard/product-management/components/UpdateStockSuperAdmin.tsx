// UpdateStockModal.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { baseUrl } from '@/app/utils/database';
import WarehouseSelect from '../../warehouse/components/WarehouseSelect';
import { IStock } from '@/types/warehouse.types';

interface UpdateStockModalProps {
  stockId: number;
  onClose: () => void;
  onStockUpdated: () => void;
}

const UpdateStockModal: React.FC<UpdateStockModalProps> = ({
  stockId,
  onClose,
  onStockUpdated,
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
      const response = await axios.patch(
        `${baseUrl}/warehouses/update-stock/${stockId}`,
        {
          warehouseId: selectedWarehouseId,
          quantity,
        },
      );
      toast.success(response.data.message);
      onStockUpdated();
      onClose();
    } catch (error) {
      toast.error('Error updating stock');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-lg font-bold mb-4">Update Stock</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <WarehouseSelect
              onChange={(warehouseId) => setSelectedWarehouseId(warehouseId)}
            />
          </div>
          <div>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="0"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter new quantity"
            />
          </div>
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
