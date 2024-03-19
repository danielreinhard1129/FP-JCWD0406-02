import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '@/app/utils/database'; // Update this with your actual base URL

interface IWarehouse {
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

interface WarehouseAutoCompleteProps {
  onWarehouseSelect: (warehouseName: string) => void;
}

const WarehouseAutoComplete: React.FC<WarehouseAutoCompleteProps> = ({
  onWarehouseSelect,
}) => {
  const [warehouses, setWarehouses] = useState<IWarehouse[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  console.log(warehouses);

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/warehouses/get-all-warehouses`,
        );
        setWarehouses(response.data.data);
      } catch (error) {
        console.error('Failed to fetch warehouses:', error);
      }
    };

    fetchWarehouses();
  }, []);

  const filteredWarehouses =
    searchTerm.length > 0
      ? warehouses.filter((warehouse) =>
          warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      : [];

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setShowOptions(true);
  };

  const handleOptionClick = (warehouseName: string) => {
    setSearchTerm(warehouseName);
    onWarehouseSelect(warehouseName);
    setShowOptions(false);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full p-3 border border-gray-300 rounded-xl text-gray-700 focus:ring-teal-500 focus:border-teal-500 transition duration-150 ease-in-out"
        placeholder="Search for a warehouse..."
        onFocus={() => setShowOptions(true)}
        onBlur={() => setTimeout(() => setShowOptions(false), 200)} // Delay to allow option click to register
      />
      {showOptions && filteredWarehouses.length > 0 && (
        <div className="absolute z-10 space-y-1 w-full p-2 bg-white border border-gray-300 max-h-60 overflow-auto rounded-xl">
          {filteredWarehouses.map((warehouse) => (
            <div
              key={warehouse.id}
              onClick={() => handleOptionClick(warehouse.name)}
              className="flex items-center rounded-lg p-2 hover:bg-teal-200 cursor-pointer text-sm"
            >
              {warehouse.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WarehouseAutoComplete;
