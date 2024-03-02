'use client';
import React, { useState } from 'react'; // Import useState
import { FaCheckCircle, FaTimes } from 'react-icons/fa';
import DeleteUser from './DeleteCardUser';
import EditRole from './UpdateCardUser';

interface Role {
  id: number;
  role_name: String;
}

interface User {
  id: number;
  first_name?: string;
  last_name?: string;
  username: string;
  email: string;
  roleId?: number;
  isVerified: boolean;
  profile_picture?: string;
  contact?: string;
  Role?: Role;
}

interface CardAllUserProps {
  userData: User[];
  refreshAdminPage: () => void;
}

const CardAllUser: React.FC<CardAllUserProps> = ({
  userData,
  refreshAdminPage,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <div className="flex flex-wrap">
      {userData.map((user) => (
        <div
          key={user.id}
          className="relative flex items-center bg-amber-100 shadow rounded-xl mx-1 my-2 max-w-xs w-full pr-4"
        >
          <div className="absolute right-2 top-1 flex items-center space-x-2">
            {/* <EditRole userId={user.id} /> */}
            <DeleteUser userId={user.id} onSuccess={refreshAdminPage} />
          </div>

          <img
            className="object-fill rounded-l-xl w-32 h-32"
            src={user.profile_picture || '/default-avatar.png'}
            alt={`${user.first_name} ${user.last_name}`}
          />

          <div className="pl-4 flex flex-col justify-between flex-grow mt-2">
            <div className="flex gap-2 items-center">
              <h2 className="text-md font-medium">
                {`${user.first_name || 'No'} ${user.last_name || 'Name'}`}
              </h2>

              <FaCheckCircle
                className={user.isVerified ? 'text-sky-500' : 'text-gray-100'}
              />
            </div>
            <p className="text-gray-600 text-sm">
              {user.Role ? `${user.Role.role_name}` : 'Role: Not assigned'}
            </p>
            <p className="text-gray-600 text-sm">{`${user.username}`}</p>
            <button
              className="mt-3 text-teal-600 text-xs hover:underline"
              onClick={() => {
                setSelectedUser(user); // Set the selected user
                setIsModalOpen(true); // Open the modal
              }}
            >
              Show More
            </button>
          </div>
        </div>
      ))}

      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 max-w-md w-full rounded-lg shadow-lg">
            {/* User Details Here */}
            <div className="flex justify-between items-center">
              <h2 className="text-xs font-thin">Detail Information</h2>
              <div className="flex justify-end items-center gap-1">
                <h5 className="text-xs font-thin">Show Less</h5>
                <button
                  className="text-xl text-gray-600 hover:text-gray-800"
                  onClick={() => setIsModalOpen(false)} // Close the modal
                  aria-label="Close modal"
                >
                  <FaTimes />
                </button>
              </div>
            </div>
            <h2 className="text-xl font-semibold">
              {selectedUser.Role
                ? `${selectedUser.Role.role_name}`
                : 'Role: Not assigned'}
            </h2>
            <hr className="my-2" />
            <div className="mt-4 ">
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold mr-2">Name</p>
                <p className="font-semibold mr-2">
                  {`${selectedUser.first_name || 'No'} ${
                    selectedUser.last_name || 'Name'
                  }`}
                </p>
              </div>
              <div className="flex justify-between items-center  mb-2">
                <p className="font-semibold mr-2">Email</p>
                <p>{selectedUser.email}</p>
              </div>
              <div className="flex justify-between items-center  mb-2">
                <p className="font-semibold mr-2">Username</p>
                <p>{selectedUser.username}</p>
              </div>
              <div className="flex justify-between items-center  mb-2">
                <p className="font-semibold mr-2">Contact</p>
                <p>{selectedUser.contact}</p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold mr-2">Status</p>
                <p
                  className={
                    selectedUser.isVerified ? 'text-green-500' : 'text-red-500'
                  }
                >
                  {selectedUser.isVerified ? 'Verified' : 'Not Verified'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardAllUser;
