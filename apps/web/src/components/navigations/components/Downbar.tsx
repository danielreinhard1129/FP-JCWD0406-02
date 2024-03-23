// components/BottomNavbar.tsx
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { IoHomeOutline, IoCartOutline, IoPersonOutline } from 'react-icons/io5';
import { FiPackage } from 'react-icons/fi';
import { CgSmartHomeLight } from 'react-icons/cg';

const BottomNavbar: React.FC = () => {
  const router = useRouter();

  return (
    <div className="fixed inset-x-0 bottom-0 bg-white shadow-lg py-2 md:hidden">
      <div className="flex justify-around items-center">
        <button
          onClick={() => router.push('/')}
          className="flex flex-col items-center"
        >
          <IoHomeOutline className="text-2xl" />
          <span className="block text-xs">Home</span>
        </button>
        <button
          onClick={() => router.push('/products')}
          className="flex flex-col items-center"
        >
          <CgSmartHomeLight className="text-2xl" />
          <span className="block text-xs">Catalogs</span>
        </button>
        <button
          onClick={() => router.push('/order')}
          className="flex flex-col items-center"
        >
          <FiPackage className="text-2xl font-normal" />
          <span className="block text-xs">Orders</span>
        </button>
        <button
          onClick={() => router.push('/user')}
          className="flex flex-col items-center"
        >
          <IoPersonOutline className="text-2xl" />
          <span className="block text-xs">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNavbar;
