// WarehouseCard.tsx
import Link from 'next/link';
import React from 'react';
import { FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import ConfirmDeleteWarehouse from './DeleteWarehouse';

interface Warehouse {
  id: number;
  name: string;
  contact: string;
  road: string;
  subdistrict: string;
  city: string;
  state: string;
  postcode: number;
  village: string;
}

interface WarehouseCardProps {
  warehouseData: Warehouse[];
  getWarehouses: () => Promise<void>;
}

const WarehouseCard: React.FC<WarehouseCardProps> = ({
  warehouseData,
  getWarehouses,
}) => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {warehouseData.map((warehouse) => (
          <div
            key={warehouse.id}
            className=" relative bg-amber-100 rounded-lg shadow-md overflow-hidden m-4 border-l-8 border-teal-500"
          >
            <div className="absolute right-2 top-1 flex items-center space-x-2">
              <ConfirmDeleteWarehouse
                warehouseId={warehouse.id}
                onSuccess={getWarehouses}
              />
            </div>
            <Link href={`/admin/dashboard/warehouse/${warehouse.id}`}>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{warehouse.name}</h3>
                <p className="text-sm text-gray-600 flex items-center mt-2">
                  <FaMapMarkerAlt className="mr-2" />
                  {`${warehouse.road}, ${warehouse.village}, ${warehouse.subdistrict}, ${warehouse.city}, ${warehouse.state}, ${warehouse.postcode}`}
                </p>
                <p className="text-sm text-gray-600 flex items-center mt-1">
                  <FaPhone className="mr-2" />
                  {warehouse.contact}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WarehouseCard;
