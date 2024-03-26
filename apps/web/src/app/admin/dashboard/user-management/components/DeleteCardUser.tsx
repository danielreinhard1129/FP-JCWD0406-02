// DeleteUserComp.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '@/app/utils/database';
import { FaTrashAlt, FaTimes } from 'react-icons/fa';
import { toast } from 'sonner';

interface DeleteUserProps {
  userId: number;
  onSuccess: () => void;
}

const DeleteUserComp: React.FC<DeleteUserProps> = ({ userId, onSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`${baseUrl}/users/delete-user/${userId}`);

      setIsModalOpen(false);
      onSuccess();
      toast.success('User delete successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="items-center">
      <div
        className="text-gray-400 hover:text-red-500 cursor-pointer text-xs"
        onClick={() => setIsModalOpen(true)}
      >
        <FaTrashAlt />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Confirm Delete</h2>
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={() => setIsModalOpen(false)}
              >
                <FaTimes />
              </button>
            </div>
            <p className="text-sm text-gray-600">
              Are you sure you want to delete this user?
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                className="bg-transparent hover:bg-gray-200 text-gray-700 font-semibold py-1 px-4 border border-gray-300 rounded-lg shadow-sm"
                onClick={() => setIsModalOpen(false)}
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
    </div>
  );
};

export default DeleteUserComp;
