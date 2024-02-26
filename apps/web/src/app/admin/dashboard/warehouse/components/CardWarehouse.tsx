import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaWarehouse } from 'react-icons/fa';

type Warehouse = {
  id: number;
  name: string;
  address: string;
  contact: string;
};

const warehouses: Warehouse[] = [
  {
    id: 1,
    name: 'Warehouse DC Cakung',
    address:
      'Penggilingan, Kec. Cakung, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13940',
    contact: '(021)-540-1765 ',
  },
  {
    id: 2,
    name: 'Warehouse Bandung',
    address: 'Antapani: Jl. A H Nasution No. 14, Jatihandap ',
    contact: '(022) 601-1304',
  },
  {
    id: 3,
    name: 'Warehouse Yogyakarta',
    address: 'Antapani: Jl. A H Nasution No. 14, Jatihandap ',
    contact: '(022) 601-1304',
  },
  // ...more warehouses
];

export const WarehouseCard: React.FC<{ warehouse: Warehouse }> = ({
  warehouse,
}) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
    <div className="p-4">
      <h3 className="text-lg font-semibold">{warehouse.name}</h3>
      <p className="text-sm text-gray-600 flex items-center mt-2">
        <FaMapMarkerAlt className="mr-2" />
        {warehouse.address}
      </p>
      <p className="text-sm text-gray-600 flex items-center mt-1">
        <FaPhone className="mr-2" />
        {warehouse.contact}
      </p>
    </div>
  </div>
);

const WarehouseGrid: React.FC = () => (
  <div className="container mx-auto px-4 py-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {warehouses.map((warehouse) => (
        <WarehouseCard key={warehouse.id} warehouse={warehouse} />
      ))}
    </div>
  </div>
);

export default WarehouseGrid;
