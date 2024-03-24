// components/BottomNavbar.tsx
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { IoHomeOutline, IoCartOutline, IoPersonOutline } from 'react-icons/io5';
import { FiPackage } from 'react-icons/fi';
import { CgSmartHomeLight } from 'react-icons/cg';
import { useAppSelector } from '@/lib/hooks';
import Link from 'next/link';
import { UserAuth } from '@/app/utils/context/authContext';

const BottomNavbar: React.FC = () => {
  const user = useAppSelector((state) => state.user);
  const userId = user.id;
  const router = useRouter();
  const { userGoogle } = UserAuth();
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
        {userId || userGoogle ? (
          <button
            onClick={() => router.push('/user')}
            className="flex flex-col items-center"
          >
            <IoPersonOutline className="text-2xl" />
            <span className="block text-xs">Profile</span>
          </button>
        ) : (
          <button className="flex flex-col items-center">
            <Link
              href="/login"
              className="text-sm font-semibold leading-6 text-gray-900 "
            >
              <IoPersonOutline className="text-2xl" />
              <span className="block text-xs">Login</span>
            </Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default BottomNavbar;
