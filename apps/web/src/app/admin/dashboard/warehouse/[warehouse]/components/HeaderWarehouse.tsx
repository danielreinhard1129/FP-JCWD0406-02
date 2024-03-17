import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';
import { FiBarChart2, FiBell, FiShoppingBag } from 'react-icons/fi';
import { LuWarehouse } from 'react-icons/lu';

const HeaderWarehouse: React.FC = () => {
  const params = useParams();
  // console.log('hesderr', params.warehouse);
  const paramsId = params.warehouse;

  return (
    <div className="flex sticky top-16 justify-between items-center bg-white px-4 py-2 border-b z-20">
      <h1 className="text-xl font-semibold text-gray-800">
        Warehouse Management
      </h1>
      <div className="flex items-center font-medium space-x-6">
        <Link href={``}>
          <div className="flex items-center text-gray-600 hover:text-teal-600">
            <FiBarChart2 size={20} />
            <span className="ml-2">Statistic</span>
          </div>
        </Link>
        <Link href={`${paramsId}/orders`}>
          <div className="flex items-center text-gray-600 hover:text-teal-600">
            <FiShoppingBag size={20} />
            <span className="ml-2">Orders</span>
          </div>
        </Link>
        <Link href={`${params.warehouse}/notifications`}>
          <div className="flex items-center text-gray-600 hover:text-teal-600">
            <FiBell size={20} />
            <span className="ml-2">Notification</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HeaderWarehouse;
