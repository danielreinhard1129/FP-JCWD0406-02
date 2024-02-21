// DeleteAddressComp.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '@/app/utils/database';

interface DeleteAddressProps {
  addressId?: number;
  onSuccess: () => void;
}

const DeleteAddressComp: React.FC<DeleteAddressProps> = ({
  addressId,
  onSuccess,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`${baseUrl}/users/delete-address/${addressId}`);
      onSuccess();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-transparent w-full mr-1 hover:bg-red-600 text-teal-600 font-normal text-xs hover:text-white py-1 px-4 border hover:border-transparent rounded-lg"
      >
        Delete
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white font-medium p-6 rounded-lg shadow-lg">
            <p>Are you sure you want to delete this address?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-sm bg-gray-200 hover:bg-gray-300 text-black py-2 px-4 rounded-lg mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="text-sm bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteAddressComp;
