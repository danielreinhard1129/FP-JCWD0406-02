import React from 'react';
import Image from 'next/image';
import { FaEnvelope, FaPhone } from 'react-icons/fa';
import { baseUrll } from '@/app/utils/database';

interface Role {
  id: number;
  role_name: string;
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

interface AdminCardProps {
  admin: User;
  onClick: (adminId: number) => void;
}

const SelectAdminCard: React.FC<AdminCardProps> = ({ admin, onClick }) => {
  return (
    <div
      className="relative flex items-center h-20 bg-white shadow-sm border cursor-pointer rounded-xl pr-4 hover:bg-gray-100 transition duration-150 ease-in-out"
      onClick={() => onClick(admin.id)}
    >
      <div className="relative w-20 h-20 overflow-hidden rounded-l-xl">
        <Image
          src={
            admin.profile_picture
              ? `${baseUrll}/photo-profile/${admin.profile_picture}`
              : '/default-avatar.png'
          }
          alt="Admin"
          layout="fill"
          objectFit="cover"
          className="rounded-l-xl"
        />
      </div>
      <div className="pl-4 flex flex-col justify-between flex-grow">
        <div className="gap-1 items-center">
          <h2 className="text-sm font-medium">{`${admin.first_name} ${admin.last_name}`}</h2>
          <p className="text-xs text-gray-500">{admin.Role?.role_name}</p>
        </div>
        <div className="flex items-center text-xs text-gray-600">
          <FaEnvelope className="mr-2" />
          {admin.email}
        </div>
        <div className="flex items-center text-xs text-gray-600">
          <FaPhone className="mr-2" />
          {admin.contact}
        </div>
      </div>
    </div>
  );
};

export default SelectAdminCard;
