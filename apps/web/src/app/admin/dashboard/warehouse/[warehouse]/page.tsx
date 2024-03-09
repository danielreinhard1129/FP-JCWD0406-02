'use client';
// Assuming you're in a file like pages/warehouses/[warehouseId].tsx
import AdminSidebar from '@/app/admin/components/SidebarDashboard';
import { baseUrl } from '@/app/utils/database';
import axios, { AxiosError } from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import AdminIdentityCard from './components/AdminIdentityCard';
import HeaderWarehouse from './components/HeaderWarehouse';
import WarehouseDetailCard from './components/WarehouseDetailCard';
import { toast } from 'sonner';

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

const WarehouseDetail = () => {
  const [warehouse, setWarehouse] = useState([]);

  const params = useParams();

  const getWarehouseDetails = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/warehouses/branch/${params.warehouse}`,
      );

      setWarehouse(response.data.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMsg = error.response?.data || error.message;
        toast.error(errorMsg);
      }
    }
  };

  useEffect(() => {
    getWarehouseDetails();
  }, [params.warehouse]);

  return (
    <div className="flex gap-4 mx-auto max-w-7xl mt-8">
      <AdminSidebar />
      <div className="w-full space-y-4">
        <HeaderWarehouse />
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 px-4">
            <WarehouseDetailCard
              warehouse={warehouse as unknown as IWarehouse}
            />
            <AdminIdentityCard />
          </div>
          {/* Additional content here  for tab */}
        </div>
      </div>
    </div>
  );
};

export default WarehouseDetail;
