import { baseUrll } from '@/app/utils/database';
import { Button, FileInput, Label } from 'flowbite-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaUserCircle } from 'react-icons/fa';

import ModalNonAsignAdmin from './ModalNonAsignAdmin';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { toast } from 'sonner';
import UnSetAdmin from './UnsetAdminWarehouse';
import { PiUserSwitch } from 'react-icons/pi';

interface IRole {
  id: number;
  role_name: string;
}

interface IUser {
  id: number;
  first_name?: string;
  last_name?: string;
  username: string;
  email: string;
  roleId?: number;
  isVerified: boolean;
  profile_picture?: string;
  contact?: string;
  Role?: IRole;
}
interface AdminIdentityCardProps {
  admin: IUser | null;
  warehouseData: number;
  refreshWarehouse: () => void;
}

const AdminIdentityCard: React.FC<AdminIdentityCardProps> = ({
  admin,
  warehouseData,
  refreshWarehouse,
}) => {
  const roleId = useSelector((state: RootState) => state.user.roleId);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    if (roleId === 1) {
      setModalOpen(true);
    } else {
      toast.error('Cannot Access!!');
    }
  };

  const closeModal = () => setModalOpen(false);

  return (
    <div>
      {admin ? (
        <div className="relative group">
          <div className="relative flex items-center cursor-pointer h-40 bg-white shadow-md rounded-xl pr-4">
            <div className="relative w-40 h-40 overflow-hidden rounded-l-xl">
              <Image
                src={
                  admin?.profile_picture
                    ? `${baseUrll}/photo-profile/${admin.profile_picture}`
                    : '/default-avatar.png'
                }
                alt="Admin"
                fill
                objectFit="cover"
                className="rounded-l-xl"
                onClick={openModal}
              />
            </div>
            {roleId === 1 ? (
              <div className="absolute right-2 top-1 flex items-center space-x-2">
                <UnSetAdmin
                  onSuccess={refreshWarehouse}
                  warehouseId={warehouseData}
                />
              </div>
            ) : null}
            <div
              className="pl-4 flex flex-col justify-between flex-grow"
              onClick={openModal}
            >
              <div className="gap-2 items-center">
                <h2 className="text-lg font-medium">{`${
                  admin.first_name ? admin.first_name : 'Admin'
                } ${admin.last_name ? admin.last_name : 'Name'}`}</h2>
                <p className="text-sm text-gray-500">{admin.Role?.role_name}</p>
              </div>
              <div className="flex items-center text-sm text-gray-600 mt-2">
                <FaEnvelope className="mr-2" />
                {admin.email}
              </div>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <FaPhone className="mr-2" />
                {admin.contact}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="flex items-center justify-center h-40 bg-white shadow-lg rounded-xl"
          onClick={openModal}
        >
          <div className="p-4 relative flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <PiUserSwitch className="text-gray-300 h-16 w-16 md:h-16 md:w-16 " />
            <p className="text-xs text-gray-500 mt-1 text-center p-1">
              There is no Admin In this warehouse. Set one to manage.
            </p>
            <button
              onClick={openModal}
              className="bg-transparent text-gray-700 font-bold py-1 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-300 ease-in-out mt-1"
            >
              Set Admin
            </button>
          </div>
        </div>
      )}
      {isModalOpen && (
        <ModalNonAsignAdmin
          isOpen={isModalOpen}
          onClose={closeModal}
          warehouseId={warehouseData}
          onSuccess={refreshWarehouse}
        />
      )}
    </div>
  );
};

export default AdminIdentityCard;
