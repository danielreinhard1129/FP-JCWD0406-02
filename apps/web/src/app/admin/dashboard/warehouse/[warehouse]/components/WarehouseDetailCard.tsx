// WarehouseDetailCard.tsx
import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaBoxOpen } from 'react-icons/fa';

export interface IWarehouse {
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

interface WarehouseDetailCardProps {
  warehouse: Partial<IWarehouse>;
}

const WarehouseDetailCard: React.FC<WarehouseDetailCardProps> = ({
  warehouse,
}) => {
  // Construct the full address from the provided warehouse details
  const fullAddress = `${warehouse.road}, ${warehouse.village}, ${warehouse.subdistrict}, ${warehouse.city}, ${warehouse.state}, ${warehouse.postcode}`;

  return (
    <div className="">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-semibold">{warehouse.name}</h2>
          <p className="text-md text-gray-600 flex items-center mt-2">
            <FaMapMarkerAlt className="mr-2 size-7" />
            {fullAddress}
          </p>
          <p className="text-md text-gray-600 flex items-center mt-1">
            <FaPhone className="mr-2" />
            {warehouse.contact}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WarehouseDetailCard;
