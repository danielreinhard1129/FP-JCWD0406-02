// WarehouseCard.tsx
import Link from 'next/link';
import React from 'react';
import { FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

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
  refreshWarehousePage: () => void;
}

export const WarehouseCard: React.FC<WarehouseCardProps> = ({
  warehouseData,
  refreshWarehousePage,
}) => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {warehouseData.map((warehouse) => (
          <div
            key={warehouse.id}
            className="bg-white rounded-lg shadow-md overflow-hidden m-4"
          >
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
