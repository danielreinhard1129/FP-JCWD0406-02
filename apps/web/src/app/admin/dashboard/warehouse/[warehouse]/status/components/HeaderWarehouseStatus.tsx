'use client';
import React from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useRouter } from 'next/navigation';

const HeaderWarehouseStatus: React.FC = () => {
  const router = useRouter();

  const goBack = () => {
    router.back(); // This will take you back to the previous page
  };

  return (
    <div className="flex sticky justify-between top-16 items-center bg-white px-4 py-2 border-b z-20">
      <div onClick={goBack} className="flex items-center gap-2">
        <IoMdArrowRoundBack className="text-xl font-semibold text-gray-800 cursor-pointer" />
        <h1 className="text-md font-semibold text-gray-800 cursor-pointer">
          Back to Warehouse
        </h1>
      </div>
      <h1 className="text-xl font-semibold text-gray-800 cursor-pointer">
        Req Status
      </h1>
    </div>
  );
};

export default HeaderWarehouseStatus;
