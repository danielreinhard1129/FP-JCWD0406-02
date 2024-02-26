'use client';
import React, { useState } from 'react';
import { FaCheckCircle, FaEdit, FaTimes, FaTrashAlt } from 'react-icons/fa';
import UpdateCardUser from './UpdateCardUser';
import EditRole from './UpdateCardUser';
import DeleteUser from './DeleteCardUser';

interface User {
  id: number;
  firstName?: string;
  lastName?: string;
  username: string;
  email: string;
  roleId?: number;
  isVerified: boolean;
  profilePicture?: string;
  contact?: number; // Additional user details
}

interface UserCardProps {
  user: User;
  onEdit: () => void;
  onDelete: () => void;
  onDetails: () => void;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  onEdit,
  onDelete,
  onDetails,
}) => {
  return (
    <div className="relative flex items-center bg-white shadow rounded-xl mx-1 my-2 max-w-xs w-full pr-4">
      {/* Edit and Delete Icons */}
      <div className="absolute right-2 top-1 flex items-center space-x-2">
        <EditRole />
        <DeleteUser />
      </div>

      {/* User Image */}
      <img
        className="object-fill rounded-l-xl w-32"
        src={user.profilePicture || '/default-avatar.png'}
        alt={`${user.firstName} ${user.lastName}`}
      />

      {/* User Details */}
      <div className="pl-4 flex flex-col justify-between flex-grow">
        <div className="flex gap-2 items-center">
          <h2 className="text-md font-medium">{`${user.firstName} ${user.lastName}`}</h2>
          <FaCheckCircle
            className={user.isVerified ? 'text-sky-500' : 'text-gray-100'}
          />
        </div>
        <p className="text-gray-600 text-sm">
          {user.roleId ? `Role ID: ${user.roleId}` : 'Role: Not assigned'}
        </p>
        <p className="text-gray-600 text-sm">{`${user.username}`}</p>
        {/* <p className="text-gray-600 text-sm">{`Email: ${user.email}`}</p> */}
        <button
          className="mt-3 text-teal-600 text-xs hover:underline"
          onClick={onDetails}
        >
          Show More
        </button>
      </div>
    </div>
  );
};

const CardAllUser: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const users: User[] = [
    {
      id: 1,
      firstName: 'Tegar',
      lastName: 'Iwafa',
      username: 'palingtegar',
      email: 'palingtegar@example.com',
      isVerified: true,
      profilePicture: '/avatar.webp',
      contact: 86543218745,
    },
    {
      id: 2,
      firstName: 'Jordy',
      lastName: 'Repi',
      username: 'jordybinal',
      email: 'jardy@example.com',
      isVerified: true,
      profilePicture: '/avatar.webp',
      contact: 86543218745,
    },
    {
      id: 3,
      firstName: 'Imam',
      lastName: 'Afizi',
      username: 'janedoe',
      email: 'mamz@example.com',
      isVerified: false,
      profilePicture: '/avatar.webp',
      contact: 86543218745,
    },
    {
      id: 4,
      firstName: 'Daniel',
      lastName: 'Reinhard',
      username: 'danieeeeel',
      email: 'daniel@example.com',
      isVerified: true,
      profilePicture: '/avatar.webp',
      contact: 86543218745,
    },
    {
      id: 5,
      firstName: 'Baso',
      lastName: 'Afrizy',
      username: 'sobaso',
      email: 'baso@example.com',
      isVerified: false,
      profilePicture: '/avatar.webp',
      contact: 86543218745,
    },
  ];

  const handleEdit = (user: User) => {
    console.log('Edit:', user.id);
    // Set up logic to edit user
  };

  const handleDelete = (user: User) => {
    console.log('Delete:', user.id);
    // Set up logic to delete user
  };

  const handleDetails = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="flex flex-wrap">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={() => handleEdit(user)}
            onDelete={() => handleDelete(user)}
            onDetails={() => handleDetails(user)}
          />
        ))}
      </div>

      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            {/* User Details Here */}
            <div className="flex justify-between items-center">
              <h2 className="text-xs font-thin">Detail Information</h2>
              <div className="flex justify-end items-center gap-1">
                <h5 className="text-xs font-thin">Show Less</h5>
                <button
                  className="text-xl text-gray-600 hover:text-gray-800"
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close modal"
                >
                  <FaTimes />
                </button>
              </div>
            </div>
            <h2 className="text-xl font-semibold">{`${selectedUser.firstName} ${selectedUser.lastName}`}</h2>
            <hr className="my-2" />
            <div className="mt-4">
              <div className="flex items-center mb-2">
                <p className="font-semibold mr-2">Role ID:</p>
                <p>{selectedUser.roleId}</p>
              </div>
              <div className="flex items-center mb-2">
                <p className="font-semibold mr-2">Email:</p>
                <p>{selectedUser.email}</p>
              </div>
              <div className="flex items-center mb-2">
                <p className="font-semibold mr-2">Username:</p>
                <p>{selectedUser.username}</p>
              </div>
              <div className="flex items-center mb-2">
                <p className="font-semibold mr-2">Contact:</p>
                <p>{selectedUser.contact}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardAllUser;
