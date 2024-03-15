// WarehouseSelect.tsx

import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { baseUrl } from '@/app/utils/database';
import { toast } from 'sonner';

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

interface WarehouseSelectProps {
  onChange: (warehouseId: number) => void; // Function to lift state up
}

const WarehouseSelect: React.FC<WarehouseSelectProps> = ({ onChange }) => {
  const [warehouses, setWarehouses] = useState<IWarehouse[]>([]);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState('');
  // console.log(selectedWarehouseId);

  const fetchWarehouses = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/warehouses/get-all-warehouses`,
      );

      console.log('ini warehouse select', response.data.data);

      setWarehouses(response.data.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMsg = error.response?.data || error.message;
        toast.error(errorMsg);
      }
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const handleWarehouseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const warehouseId = e.target.value;
    setSelectedWarehouseId(warehouseId);
    onChange(Number(warehouseId));
  };

  return (
    <select
      value={selectedWarehouseId}
      onChange={handleWarehouseChange}
      required
      className="w-full p-3 border border-gray-300 rounded-xl text-gray-700 focus:ring-teal-500 focus:border-teal-500 transition duration-150 ease-in-out"
    >
      <option value="">Select Warehouse</option>
      {warehouses.map((warehouse) => (
        <option key={warehouse.id} value={warehouse.id}>
          {warehouse.name}
        </option>
      ))}
    </select>
  );
};

export default WarehouseSelect;
