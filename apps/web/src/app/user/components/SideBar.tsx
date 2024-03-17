'use client';

import { baseUrll } from '@/app/utils/database';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaAddressCard, FaUser } from 'react-icons/fa6';

const Sidebar = (data: any) => {
  const dataUser = data.data;

  const router = useRouter();

  return (
    <div className="md:w-64 w-full bg-white p-4 md:border-r-2 border-gray-200 lg:mt-20 mt-2">
      <div className="flex flex-col items-center mb-6">
        {/* Profile icon */}
        <div className="bg-teal-500 rounded-full overflow-hidden w-44 h-44 mb-3">
          <Image
            src={
              dataUser?.profile_picture
                ? `${baseUrll}/photo-profile/${dataUser.profile_picture}`
                : '/default_avatar.png'
            }
            alt="Profile Picture"
            width={200}
            height={200}
            className="object-cover"
          />
        </div>
        <h1 className="text-gray-900 text-lg font-semibold">
          {dataUser?.username}
        </h1>
      </div>

      {/* Navigation */}
      <div className="flex flex-col">
        <button
          onClick={() => router.push('/user')}
          className="flex items-center font-semibold px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md mb-2"
          style={{ backgroundColor: '#e5e7eb' }}
        >
          <FaUser className="mr-2" /> Profile
        </button>
        <button
          onClick={() => router.push('/user/address')}
          className="flex items-center font-semibold px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          style={{ backgroundColor: '#e5e7eb' }}
        >
          <FaAddressCard className="mr-2" /> Address
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
