import React, { useState } from 'react';
import { FaTimes, FaTrashAlt } from 'react-icons/fa';

interface DeleteUserProps {
  // Additional props if needed, like userId
}

const DeleteUser: React.FC<DeleteUserProps> = ({}) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleDeleteConfirm = () => {
    console.log('User deleted'); // Replace with actual delete logic
    setIsConfirmOpen(false);
  };

  return (
    <div className="items-center">
      <div
        className="text-gray-400 hover:text-red-500 cursor-pointer text-xs"
        onClick={() => setIsConfirmOpen(true)}
      >
        <FaTrashAlt />
      </div>

      {isConfirmOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex justify-center items-center">
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
              Are you sure you want to delete this user?
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
                onClick={handleDeleteConfirm}
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

export default DeleteUser;
