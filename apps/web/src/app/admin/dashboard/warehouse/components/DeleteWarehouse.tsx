// ConfirmDeleteWarehouse.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { baseUrl } from '@/app/utils/database';
import { FaTrashAlt } from 'react-icons/fa';

interface ConfirmDeleteWarehouseProps {
  warehouseId: number;
  onSuccess: () => void;
}

const ConfirmDeleteWarehouse: React.FC<ConfirmDeleteWarehouseProps> = ({
  warehouseId,
  onSuccess,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${baseUrl}/warehouses/delete-warehouse/${warehouseId}`,
      );
      toast.success('Warehouse deleted successfully');
      onSuccess();
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Failed to delete warehouse');
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-gray-400 hover:text-red-500 cursor-pointer text-xs"
      >
        <FaTrashAlt />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Delete Warehouse
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete the warehouse?
                </p>
              </div>
              <div className="items-center px-4 py-3 flex justify-center gap-4">
                <button
                  className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md hover:bg-red-700"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md hover:bg-gray-700"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmDeleteWarehouse;
