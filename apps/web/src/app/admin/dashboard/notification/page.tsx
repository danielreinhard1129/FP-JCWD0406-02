'use client';
import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../components/SidebarDashboard';
import HeaderNotificationSuperAdmin from './components/HeaderNotificationSuperAdmin';
import ReqStockCard from './components/ReqStockCard';
import axios, { AxiosError } from 'axios';
import { baseUrl } from '@/app/utils/database';
import { AuthGuard } from '@/components/protected-route/components/AuthGuard';
import { toast } from 'sonner';
import TabsNotificationManagement from './components/TabNotificationManagement';

// These interfaces should ideally be moved to a separate types.ts file
interface IWarehouse {
  id: number;
  name: string;
}

interface IProduct {
  id: number;
  title: string;
}

interface IReqStock {
  id: number;
  warehouse: IWarehouse;
  product: IProduct;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  status: string;
}

const NotificationSuperAdmin = () => {
  const [requestStock, setRequestStock] = useState<IReqStock[]>([]);

  console.log(requestStock);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/warehouses/req-stock`);
      if (response.data?.data) {
        setRequestStock(response.data.data as IReqStock[]);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMsg = error.response?.data || error.message;
        toast.error(errorMsg);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex gap-4 mx-auto max-w-7xl mt-8">
      <AdminSidebar />
      <div className="w-full space-y-2">
        <HeaderNotificationSuperAdmin />
        <TabsNotificationManagement
          reqStocks={requestStock}
          fetchData={fetchData}
        />
      </div>
    </div>
  );
};

export default AuthGuard(NotificationSuperAdmin);
