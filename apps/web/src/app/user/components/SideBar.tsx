'use client';

import { baseUrl, baseUrll } from '@/app/utils/database';
import { RootState } from '@/lib/store';
import axios, { AxiosError } from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaAddressCard, FaUser } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

interface IUser {
  data: any;
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  contact: number;
  profile_picture?: string;
  isVerified: boolean;
}
// interface SideBarProps {
//   data: Partial<IUser>;
//   onSuccess: () => void;
// }

const Sidebar: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();

  return (
    <>
      <div className="md:w-64 w-full bg-white p-4 md:border-r-2 border-gray-200 lg:mt-20 mt-2">
        {/* Navigation */}
        <div className="flex flex-col">
          <button
            onClick={() => router.push('/user')}
            className="flex items-center font-semibold px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md mb-2 transform transition-all hover:scale-105 duration-300 "
            style={{ backgroundColor: '#e5e7eb' }}
          >
            <FaUser className="mr-2" /> Profile
          </button>
          <button
            onClick={() => router.push('/user/address')}
            className="flex items-center font-semibold px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transform transition-all hover:scale-105 duration-300 "
            style={{ backgroundColor: '#e5e7eb' }}
          >
            <FaAddressCard className="mr-2" /> Address
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
