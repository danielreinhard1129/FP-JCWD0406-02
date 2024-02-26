import Link from 'next/link';
import React from 'react';
import { FaPlus } from 'react-icons/fa';

const HeaderAdminManagement: React.FC = () => {
  return (
    <div className="flex justify-between w-full items-center bg-white px-4 py-2 border-b">
      <h1 className="text-xl font-semibold text-gray-800">Admin Management</h1>
    </div>
  );
};

export default HeaderAdminManagement;
