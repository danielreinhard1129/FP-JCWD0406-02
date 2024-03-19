// DeleteAddressComp.tsx
import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { baseUrl } from '@/app/utils/database';
import { toast } from 'sonner';

interface DeleteAddressProps {
  isPrimary: boolean;
  addressId?: number;
  onSuccess: () => void;
}

const DeleteAddressComp: React.FC<DeleteAddressProps> = ({
  isPrimary,
  addressId,
  onSuccess,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`${baseUrl}/users/delete-address/${addressId}`);
      onSuccess();
      setIsModalOpen(false);
      toast.success('Address delete successfully');
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMsg = error.response?.data || error.message;
        toast.error(errorMsg);
      }
    }
  };

  return !isPrimary ? (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-transparent w-full hover:bg-red-600 text-gray-400 font-normal text-xs hover:text-white py-1 px-4 hover:border-transparent rounded-lg "
      >
        Delete
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="mb-4">
              <span className="text-red-500 text-3xl">⚠️</span>
            </div>
            <h3 className="font-bold text-xl">Delete Address</h3>
            <p className="text-sm">
              Are you sure you want to delete this address?
            </p>
            <div className="flex items-center justify-center mt-8 space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-sm bg-teal-100 hover:bg-teal-200 text-teal-700 py-2 px-4 rounded-lg transition duration-150 ease-in-out"
              >
                No, Keep it.
              </button>
              <button
                onClick={handleDelete}
                className="text-sm bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition duration-150 ease-in-out"
              >
                Yes, Delete!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  ) : null;
};

export default DeleteAddressComp;
