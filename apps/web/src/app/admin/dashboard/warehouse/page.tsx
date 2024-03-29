'use client';

import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import AdminSidebar from '../../components/SidebarDashboard';
import HeaderWarehouseManagement from './components/HeaderWarehouseManagement';
import { baseUrl } from '@/app/utils/database';
import { toast } from 'sonner';
import { AuthGuard } from '@/components/protected-route/components/AuthGuard';
import WarehouseCard from './components/CardWarehouse';

const Warehouse = () => {
  const [warehouses, setWarehouses] = useState([]);

  const getWarehouses = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/warehouses/get-all-warehouses`,
      );
      setWarehouses(response.data.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMsg = error.response?.data || error.message;
        toast.error(errorMsg);
      }
    }
  };

  useEffect(() => {
    getWarehouses();
  }, []);

  return (
    <div className="flex gap-4 min-h-screen mx-auto max-w-7xl mt-8">
      <AdminSidebar />
      <div className="w-full space-y-4">
        <HeaderWarehouseManagement getWarehouses={getWarehouses} />
        <div className="flex flex-wrap">
          <WarehouseCard
            warehouseData={warehouses}
            getWarehouses={getWarehouses}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthGuard(Warehouse);
