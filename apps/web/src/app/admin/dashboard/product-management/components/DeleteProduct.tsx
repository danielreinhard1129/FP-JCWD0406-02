// DeleteProductComp.tsx
'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '@/app/utils/database'; // Adjust the import path as necessary
import { FaRegTrashAlt, FaTimes } from 'react-icons/fa';
import { toast } from 'sonner';

interface DeleteProductProps {
  productId: number;
  onSuccess: () => void;
}

const DeleteProduct: React.FC<DeleteProductProps> = ({
  productId,
  onSuccess,
}) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`${baseUrl}/warehouses/delete-product/${productId}`);
      onSuccess(); // Refresh the product list or trigger any other action after deletion
      setIsConfirmOpen(false); // Close the confirmation modal
      toast.success('Product delete successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <>
      <li
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
        onClick={() => setIsConfirmOpen(true)}
      >
        <FaRegTrashAlt className="mr-2" /> Delete
      </li>

      {isConfirmOpen && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex justify-center items-center"
          style={{ backdropFilter: 'blur(3px)' }}
        >
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Confirm Delete</h2>
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={() => setIsConfirmOpen(false)}
              >
                <FaTimes />
              </button>
            </div>
            <p className="text-sm text-gray-600">
              Are you sure you want to delete this product?
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                className="bg-transparent hover:bg-gray-200 text-gray-700 font-semibold py-1 px-4 border border-gray-300 rounded-lg shadow-sm"
                onClick={() => setIsConfirmOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded-lg"
                onClick={handleDelete}
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

export default DeleteProduct;
