import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaBoxOpen } from 'react-icons/fa';

type Warehouse = {
  id: number;
  name: string;
  address: string;
  contact: string;
};

type Product = {
  id: number;
  name: string;
  stock: number;
};

const warehouseDetail: Warehouse = {
  id: 1,
  name: 'Warehouse DC Cakung',
  address:
    'Penggilingan, Kec. Cakung, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13940',
  contact: '(021)-540-1765',
};

const WarehouseDetailCard: React.FC = () => {
  return (
    <div className="">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-semibold">{warehouseDetail.name}</h2>
          <p className="text-md text-gray-600 flex items-center mt-2">
            <FaMapMarkerAlt className="mr-2 size-7" />
            {warehouseDetail.address}
          </p>
          <p className="text-md text-gray-600 flex items-center mt-1">
            <FaPhone className="mr-2" />
            {warehouseDetail.contact}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WarehouseDetailCard;
