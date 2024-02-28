// DeleteCategory.tsx
'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '@/app/utils/database'; // Adjust the import path as necessary
import { FaRegTrashAlt, FaTimes } from 'react-icons/fa';
import { toast } from 'sonner'; // Ensure you have a toast library or replace with your notification system

interface DeleteCategoryProps {
  categoryId: number;
  onSuccess: () => void; // Function to refresh categories list or handle additional actions after deletion
}

const DeleteCategory: React.FC<DeleteCategoryProps> = ({
  categoryId,
  onSuccess,
}) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`${baseUrl}/warehouses/delete-category/${categoryId}`);
      onSuccess(); // Refresh the category list or trigger any other action after deletion
      setIsConfirmOpen(false); // Close the confirmation modal
      toast.success('Category deleted successfully');
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Failed to delete category');
    }
  };

  return (
    <>
      <button
        className="text-gray-600 hover:text-red-700 flex text-xs items-center"
        onClick={() => setIsConfirmOpen(true)}
      >
        <FaRegTrashAlt className="" />
      </button>

      {isConfirmOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Confirm Delete</h2>
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={() => setIsConfirmOpen(false)}
              >
                <FaTimes />
              </button>
            </div>
            <p className="text-sm text-gray-600">
              Are you sure you want to delete this category?
            </p>
            <div className="mt-4 flex justify-end gap-3">
              <button
                className="bg-transparent hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded-lg shadow-sm"
                onClick={() => setIsConfirmOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
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

export default DeleteCategory;
