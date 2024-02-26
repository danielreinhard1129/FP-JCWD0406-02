import React, { useState } from 'react';
import { FaEdit, FaTimes } from 'react-icons/fa';

interface User {
  id: number;
  roleId: number;
}

interface EditRoleProps {
  //   user: User;
}

const EditRole: React.FC<EditRoleProps> = ({}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //   const [newRoleId, setNewRoleId] = useState(user.roleId.toString());

  const handleRoleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setNewRoleId(event.target.value);
  };

  const handleSaveChanges = () => {
    setIsModalOpen(false);
    // Implement the save logic here
  };

  return (
    <div className="items-center">
      <div
        className="text-gray-400 hover:text-blue-500 cursor-pointer text-sm"
        onClick={() => setIsModalOpen(true)}
      >
        <FaEdit />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow ">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Asign as Admin/User</h2>

              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={() => setIsModalOpen(false)}
              >
                <FaTimes />
              </button>
            </div>
            <h2 className="text-xs font-normal text-gray-500">
              (3 = User || 2 = Admin Warehouse)
            </h2>

            {/* Input field for Role ID */}
            <div className="mb-4 mt-4">
              <label
                htmlFor="roleId"
                className="block text-sm font-medium text-gray-700"
              >
                Role ID
              </label>
              <input
                id="roleId"
                type="text"
                // value={newRoleId}
                // onChange={handleRoleIdChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 bg-teal-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-teal-700 active:bg-teal-700 focus:outline-none focus:border-teal-700 focus:ring focus:ring-teal-200 disabled:opacity-25 transition"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditRole;
